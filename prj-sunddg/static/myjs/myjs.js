
$(document).foundation({
  abide : {
    patterns: {
      pdb: /^[1-9]{1}[a-zA-Z0-9 _-]{3}$/,
      alfanumerico:/^[a-zA-Z0-9 _-]+$/
    }
  }
});




$(document).ready(function() {

// para leer el codigo pdb y obtener la descripcion y bioassemblies

  var positions = {}
  positions[1] = "1st"
  positions[2] = "2nd"
  positions[3] = "3rd"
  positions[4] = "4th"
  positions[5] = "5th"
  positions[6] = "6th"
  positions[7] = "7th"
  positions[8] = "8th"
  positions[9] = "9th"

  function look_up_pdb(pdb) {
        current_url = window.location.href
        root = ""
        if (current_url.search(/index\.fcgi/) < 0) { root = "index.fcgi/"}
        //$.get("http://www.rcsb.org/pdb/rest/describePDB", {
        $.get(root+"describePDB/"+pdb)
        .done(function (xml1){
          if ("name" in xml1) {
            xml = xml1['name']
            var pdb_title = $(xml).find('PDB').first().attr("title");
            if (!pdb_title) {
              pdb_title = "Unknown PDB identifier";
              $("#pdb_description").css("display", "none");
              $("#pdb_description").text(pdb_title);
              $("#pdb_description").addClass("panel callout radius");
              $("#pdb_description").fadeIn("fast");
            }
            else
            {
              $("#pdb_description").css("display", "none");
              $("#pdb_description").text(pdb_title);
              $("#pdb_description").addClass("panel callout radius");
              $("#pdb_description").fadeIn("fast");
              var large = $(xml).find('PDB').first().attr("largeStructure")
              //console.log(large)
              if (large != undefined)
              {
                $("#large_warning").css("display", "none");
                $("#large_warning").addClass("alert alert-box radius");
                $("#large_warning").html("This PDB is flagged as a large structure and does not have a standard PDB format. It may not run properly on this server");
                $("#large_warning").fadeIn("fast");
                var large = $(xml).find('PDB').first().attr("largeStructure")
              }
            }
          }
          else {
            warning = xml1["error"]
            $("#pdb_description").css("display", "none");
            $("#pdb_description").addClass("alert alert-box radius");
            $("#pdb_description").html(warning);
            $("#pdb_description").fadeIn("fast");
          }
        });

        // $.get("http://www.rcsb.org/pdb/rest/getEntityInfo", {
        $.get(root+"getEntityInfo/"+pdb)
        .done(function (xml1){
          if ("name" in xml1) {
            xml = xml1['name']
            var obsolete = $(xml).find('obsolete');
            if(obsolete.length)
            {
              var replacedby = $(xml).find('PDB').first().attr("replacedBy");
              console.log(replacedby);
              warning = "Warning: this PDB is OBSOLETE. It has been replaced by entry "+replacedby+". More information <a href=\"http://www.rcsb.org/pdb/explore.do?structureId="+pdb+"\" target=\"_blank\" style=\"color:black\">here</a>";
              $("#pdb_warning").css("display", "none");
              $("#pdb_warning").addClass("alert alert-box radius");
              $("#pdb_warning").html(warning);
              $("#pdb_warning").fadeIn("fast");
            }
            else
            {
              var pdb_title = $(xml).find('PDB').attr("structureId");
              if (!pdb_title) {
                pdb_title = "Unknown PDB identifier";
                $("#bioassemblies").children().remove()
                $("#bioassemblies").append($("<option>"+positions[1]+"</option>").attr("value",1));
              }
              else 
              {
                var number_assemblies = $(xml).find('PDB').first().attr("bioAssemblies");
                if (parseInt(number_assemblies) > 1) {
                  $("#bioassemblies").children().remove()
                  for (i = 1; i<=parseInt(number_assemblies); i++)
                  {
                    $("#bioassemblies").append($("<option>"+positions[i]+"</option>").attr("value",i));
                  }
                }
                var method = $(xml).find('Method').attr("name");
                if (method.search(/nmr/i) >= 0)
                {
                  // structure is NMR
                  $("[name=isNMR]").prop("value", "1")
                  $("[name=pdb_mol]").prop("disabled", true)
                  $("[name=pdb_mol]").prop("checked", false)
                  warning = "*NMR structure detected. First model will be used";
                  $("#nmr_warning").css("display", "none");
                  //$("#nmr_warning").addClass("secondary alert-box radius");
                  $("#nmr_warning").html(warning);
                  $("#nmr_warning").fadeIn("fast");
                }
                else
                {
                  if (method.search(/electron/i) >= 0 || method.search(/Microscopy/i) >= 0)
                  {
                    warning = "Warning: this PDB was solved using Electron Microscopy. Mutabind does not work on Electron Microscopy PDBs due to missing side chain atoms.";
                    $("#pdb_warning").css("display", "none");
                    $("#pdb_warning").addClass("alert alert-box radius");
                    $("#pdb_warning").html(warning);
                    $("#pdb_warning").fadeIn("fast");
                  }
                  else
                  {
                    // structure is not NMR or EM
                    $("[name=isNMR]").prop("value", "0")
                    $("[name=pdb_mol]").prop("disabled", false)
                    $($("[name=pdb_mol]")[0]).prop("checked", true)
                    $("#nmr_warning").html("");
                  }

                }
              }
            }
          }
          else {
            warning = xml1["error"]
            $("#pdb_warning").css("display", "none");
            $("#pdb_warning").addClass("alert alert-box radius");
            $("#pdb_warning").html(warning);
            $("#pdb_warning").fadeIn("fast");
          }
        });

    }

    function pdb_code_updated(e) {
        pdb = $("#pdb_id_input").val();
        if (pdb.length == 4) {
            look_up_pdb(pdb);
        }
        else
        {
            $("#pdb_description").fadeOut("fast", function(){
              $("#pdb_description").empty();
              $("#pdb_description").removeClass();
            });
            
            $("#large_warning").fadeOut("fast", function(){
              $("#large_warning").empty();
              $("#large_warning").removeClass();
            });

            $("#pdb_warning").fadeOut("fast", function(){
              // $("#pdb_warning").empty();
              // $("#pdb_warning").removeClass();
            });

            $("#nmr_warning").html("");
            $("[name=pdb_mol]").prop("disabled", false)
            $($("[name=pdb_mol]")[0]).prop("checked", true)
        }
    }

 //Binder
 $("#pdb_id_input").bind('input propertychange', pdb_code_updated);

 $(function(){
    var somevalue = $("#pdb_id_input").val()
    if (somevalue.length == 4){
      look_up_pdb(somevalue);
    }
 });

 });