//Global var
var metaTown = {};

(function ($) {

    // USE STRICT
    "use strict";

    //----------------------------------------------------/
    // Predefined Variables
    //----------------------------------------------------/
    var $window = $(window),
        $document = $(document);

    /*
    #################################
        -- SCREEN RESIZING SETTINGS --
    #################################
    */
    var topBarDetails = $(".top-bar-details li");
    
    var location = $("#location");
    var headphone = $("#headphone");
    var envelope = $("#envelope");

    metaTown.topbarHeader = function () {
        if ($(window).width() < 800) {
        	// console.log(headphone.children('span').css('display','none'));
        	location.children('span').css('display','none');
        	headphone.children('span').css('display','block');
        	envelope.children('span').css('display','none');

        	headphone.addClass('li_block');
        } else {
        	location.children('span').css('display','block');
        	headphone.children('span').css('display','block');
        	envelope.children('span').css('display','block');
        }
        /*topBarDetails.click(function(){
    		console.log(jQuery(this));
        });*/
    };

    topBarDetails.on('click',function(){
    	var clickedLi = jQuery(this)[0].id;
    	// var data = clickedLi[0].className;
    	// console.log(clickedLi);
    	if(clickedLi == 'location'){
    		// console.log(clickedLi);
        	location.children('span').css('display','block');
        	headphone.children('span').css('display','none');
        	envelope.children('span').css('display','none');
        	
        	location.addClass('li_block');
        	headphone.removeClass('li_block');
        	envelope.removeClass('li_block');
    	}
    	if(clickedLi == 'headphone'){
        	location.children('span').css('display','none');
        	headphone.children('span').css('display','block');
        	envelope.children('span').css('display','none');

        	location.removeClass('li_block');
        	headphone.addClass('li_block');
        	envelope.removeClass('li_block');
    	}
    	if(clickedLi == 'envelope'){
        	location.children('span').css('display','none');
        	headphone.children('span').css('display','none');
        	envelope.children('span').css('display','block');

        	location.removeClass('li_block');
        	headphone.removeClass('li_block');
        	envelope.addClass('li_block');
    	}
    });

    //Document Ready Functions
    $document.ready(function(){
        metaTown.topbarHeader()
    });

    //Document Resize Functions
    $window.resize(function () {
        metaTown.topbarHeader()
    });

})(jQuery);