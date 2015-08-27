
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


  function look_up_pdb(pdb) {

        $.get("http://www.rcsb.org/pdb/rest/describePDB", {
            structureId: pdb,
        })
        .done(function (xml){
          var pdb_title = $(xml).find('PDB').first().attr("title");
          if (!pdb_title) {
            pdb_title = "Unknown PDB identifier";
            $("#pdb_description").text(pdb_title);
            $("#pdb_description").addClass("panel callout radius");
          }
          else
          {
            $("#pdb_description").text(pdb_title);
            $("#pdb_description").addClass("panel callout radius");
          }

        });

        $.get("http://www.rcsb.org/pdb/rest/getEntityInfo", {
            structureId: pdb,
        })
        .done(function (xml){
          var obsolete = $(xml).find('obsolete');
          if(obsolete.length)
          {
            warning = "Warning: this PDB is OBSOLETE. More information <a href=\"http://www.rcsb.org/pdb/explore.do?structureId="+pdb+"\" target=\"_blank\" style=\"color:black\">here</a>";
            $("#pdb_warning").addClass("alert alert-box");
            $("#pdb_warning").html(warning);
          }
          else
          {
            var number_assemblies = $(xml).find('PDB').first().attr("bioAssemblies");
            if (number_assemblies > 1) {
            warning = "Warning: this PDB contains multiple bioassemblies. The default bioassembly will be used. More information <a href=\"http://www.rcsb.org/pdb/explore.do?structureId="+pdb+"\" target=\"_blank\" style=\"color:black\">here</a>";
            $("#pdb_warning").addClass("secondary alert-box");
            $("#pdb_warning").html(warning);
            }
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
            $("#pdb_description").empty();
            $("#pdb_description").removeClass();
            $("#pdb_warning").empty();
            $("#pdb_warning").removeClass();
        }
    }

 //Binder
 $("#pdb_id_input").bind('input propertychange', pdb_code_updated);

 });