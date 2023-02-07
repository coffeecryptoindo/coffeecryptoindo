
'use strict';
jQuery(function($) {
    $.fn.vcParticles3DBackground = function(Options, Callback) {
        var CreateElement = $(this);
        var ElementId = CreateElement.attr("id");
        var parentRow = getParentRow(CreateElement);
        parentRow.css("position", "relative");
        var Element = parentRow.prepend('<div id="' + ElementId + '" class="vc-particles3d-background-bg"></div>');

		$("#" + ElementId).css("position","absolute").css("top","0").css("left","0").css("width","100%").css("height","100%").css("z-index","1");
		$("#" + ElementId).find("canvas").css("width","100%").css("height","100%");
		
		$("#" + ElementId).threedlinesanimation({
				particleColor: CreateElement.attr("data-particlecolor") ? CreateElement.attr("data-particlecolor") : "#FFFFFF",
				particleOpacity: CreateElement.attr("data-particleopacity") ? parseFloat(CreateElement.attr("data-particleopacity")) : .5,
				lineColor: CreateElement.attr("data-linecolor") ? CreateElement.attr("data-linecolor") : "#FFFFFF",
				lineOpacity: CreateElement.attr("data-lineopacity") ? parseFloat(CreateElement.attr("data-lineopacity")) : 0.2,
				particlesAmmount: CreateElement.attr("data-particlesammount") ? parseInt(CreateElement.attr("data-particlesammount")) : 150,
				moveSpeed: CreateElement.attr("data-movespeed") ? parseFloat(CreateElement.attr("data-movespeed")) : 0.35,
				cameraXMoveMax: CreateElement.attr("data-cameraxmovemax") ? parseFloat(CreateElement.attr("data-cameraxmovemax")) : 6,
				cameraYMoveMax: CreateElement.attr("data-cameraymovemax") ? parseFloat(CreateElement.attr("data-cameraymovemax")) : 3.5,
				cameraXMoveElastic: CreateElement.attr("data-cameraxmoveelastic") ? parseFloat(CreateElement.attr("data-cameraxmoveelastic")) : 0.02,
				cameraYMoveElastic: CreateElement.attr("data-cameraymoveelastic") ? parseFloat(CreateElement.attr("data-cameraymoveelastic")) : 0.02,
				particleSize: CreateElement.attr("data-particlesize") ? parseInt(CreateElement.attr("data-particlesize")) : 5 
				
			});
        CreateElement.remove();

        function getParentRow(Element) {
            return Element.parents(".boomapps_vcrow, .vc_row, .wpb_row").eq(0);
        }
    }


    $(".vc-particles3d-background").each(function() {
        $(this).vcParticles3DBackground();
    });



});