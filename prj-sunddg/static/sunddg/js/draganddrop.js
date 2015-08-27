  // $(function() {

  $(document).ready(function(){
    // there's the gallery and the trash
    var $gallery = $( "#gallery" );
     // $trash = $( "#trash" );
    var $partner1 = $("#partner1");
    var $partner2 = $("#partner2");


    // let the gallery items be draggable
    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });

    // let the trash be droppable, accepting the gallery items
    // $trash.droppable({
    //   accept: "#gallery > li",
    //   activeClass: "ui-state-highlight",
    //   drop: function( event, ui ) {
    //     deleteImage( ui.draggable );
    //   }
    // });

    // $trash.droppable({
    //   accept: "#gallery > li",
    //   activeClass: "ui-state-highlight",
    //   drop: function( event, ui ) {
    //     deleteImage( ui.draggable );
    //   }
    // });

    $partner1.droppable({
      accept: "#gallery > li",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        setPartner1( ui.draggable );
      }
    });

    $partner2.droppable({
      accept: "#gallery > li",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        setPartner2( ui.draggable );
      }
    });

    // let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: ".partners > li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        resetChain( ui.draggable );
      }
    });

    // image deletion function
    // var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
    // function deleteImage( $item ) {
    //   $item.fadeOut(function() {
    //     var $list = $( "ul", $trash ).length ?
    //       $( "ul", $trash ) :
    //       $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );

    //     $item.find( "a.ui-icon-trash" ).remove();
    //     $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
    //       $item
    //         .animate({ width: "48px" });
    //     });
    //   });
    // }

    var reset_chain_icon = "<a title='Reset this chain' class='ui-icon ui-icon-refresh'>Reset</a>";
    function setPartner1( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $partner1 ).length ?
          $( "ul", $partner1 ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $partner1 );

        $item.find( "a.ui-icon-triangle-1-sw" ).remove();
        $item.find( "a.ui-icon-triangle-1-se" ).remove();
        var aux = $item.find( "input" ).val();
        $item.find( "input" ).val(aux.replace(".no", ".P1"));
        $item.append( reset_chain_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" });
        });
      });
    }

    var reset_chain_icon = "<a title='Reset this chain' class='ui-icon ui-icon-refresh'>Reset</a>";
    function setPartner2( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $partner2 ).length ?
          $( "ul", $partner2 ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $partner2 );

        $item.find( "a.ui-icon-triangle-1-sw" ).remove();
        $item.find( "a.ui-icon-triangle-1-se" ).remove();
        var aux = $item.find( "input" ).val();
        $item.find( "input" ).val(aux.replace(".no", ".P2"));
        $item.append( reset_chain_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" });
        });
      });
    }

    // image recycle function
    // var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
    // function recycleImage( $item ) {
    //   $item.fadeOut(function() {
    //     $item
    //       .find( "a.ui-icon-refresh" )
    //         .remove()
    //       .end()
    //       .css( "width", "96px")
    //       .append( trash_icon )
    //       .end()
    //       .appendTo( $gallery )
    //       .fadeIn();
    //   });
    // }


    var addP1 = '<a title="Add as Partner 1" class="ui-icon ui-icon-triangle-1-sw">P1</a>';
    var addP2 = '<a title="Add as Partner 2" class="ui-icon ui-icon-triangle-1-se">P2</a>';
    function resetChain( $item ) {
      $item.fadeOut(function() {
        $item.find( "a.ui-icon-refresh" ).remove();
        var aux = $item.find( "input" ).val();
        $item.find( "input" ).val(aux.replace(/\.P\d/, ".no"));
        $item.css( "width", "96px");
        $item.append(addP1);
        $item.append(addP2);
        $item.appendTo( $gallery ).fadeIn();
      });
    }

    // resolve the icons behavior with event delegation
    $( "ul.gallery > li" ).click(function( event ) {
      var $item = $( this ),
        $target = $( event.target );

      // if ( $target.is( "a.ui-icon-trash" ) ) {
      //   deleteImage( $item );
      // } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
      //   viewLargerImage( $target );
      // } else if ( $target.is( "a.ui-icon-refresh" ) ) {
      //   recycleImage( $item );
      // }

      if( $target.is( "a.ui-icon-triangle-1-sw")) {
        setPartner1( $item );
      } else if ( $target.is( "a.ui-icon-triangle-1-se")) {
        setPartner2( $item );
      } else if ($target.is( "a.ui-icon-refresh" ) ) {
        resetChain( $item);
      }

      return false;
    });
  // });
});