/**
 * Muffin Header Builder
 *
 * 1.0 | Muffin Group
 */

var Mfn_HB = ( function( $ ){
  "use strict";

  /**
   * Init
   */
  function init(){

    menu.init();

    bind();








  }

  /**
   * Menu related functions
   */
  var menu = {

    init : function(){

      var mobileInit = '';

      $( '.mhb-menu ul.menu' ).each(function( index ){

        if( $( this ).parent().hasClass( 'tabletMobile' ) ){
          mobileInit = 959;
        } else {
          mobileInit = 768;
        }

        $( this ).mfnMenu({
          addLast     : false,
          arrows      : false,
          responsive	: true,
          mobileInit	: mobileInit
        });

      });

    },

    toggle : function( button ){

      var menu = $( button ).siblings( 'ul.menu' );



      menu.stop(true,true).slideToggle(200);

    }

  }


  function retinaLogo(){

    if( window.devicePixelRatio > 1 ){

      $( '.mhb-logo img[data-retina]' ).each( function(){

        var height = 0;

        if( ! $( this ).attr( 'height' ) ){
          var height = $( this ).height();
        }

        $( this ).attr( 'src', $( this ).data( 'retina' ) );

        if( height ){
          $( this ).attr( 'height', height );
        }

      });

    }

  }

  var sticky = {

    init : function(){

      var sticky_wrapper = $( '.mhb-grid' );
      var start_y = 0;
      var window_y = $( window ).scrollTop();
      var current_view = $( '.mhb-view' ).filter( ':visible' );

      if( window_y > start_y ){

        if( ! sticky_wrapper.hasClass( 'is-sticky' ) ){
          sticky_wrapper.addClass( 'is-sticky' );

          this.placeholderHeight( current_view );
        }

      } else {

        if( sticky_wrapper.hasClass( 'is-sticky' ) ){
          sticky_wrapper.removeClass( 'is-sticky' );
        }

      }

    },

    placeholderHeight : function( current_view ){

       $( '.mhb-placeholder' ).height( current_view.height() );

    }

  }

  var search = {

    toggle : function( search_wrapper ){
      $( search_wrapper ).next( 'form' ).fadeToggle()
        .find( '.field' ).focus();
    }

  }

  function bind(){

    // menu | menu toggle click | mobile menu open
    $( '.mhb-menu' ).on( 'click', '.mobile-menu-toggle', function(e){
  		e.preventDefault();
      menu.toggle( this );
  	});

    // search | icon click | form open
    $( '.mhb-extras' ).on( 'click', '.search-icon', function(e){
  		e.preventDefault();
      search.toggle( this );
  	});

    // window.scroll ---
    $( window ).scroll( function(){
      sticky.init();
    });

    // window.load ---
    $( window ).load( function(){
      retinaLogo();
    });

  }


  /**
	 * Return
	 */
	return {
		init: init

  };

})(jQuery);

jQuery( document ).ready( function(){
  Mfn_HB.init();
});
