/* Solo Shopify Theme v1.0 (jQuery 1.3.1 required). Copyright (c) Pixellent, LLC <http://www.pixellent.com>. */

// Clear Inputs
$.cleared = function(field) {
	
	if ($(field).length > 0 ) {
		$(field).each(function() {
			var text = $(this).val();
			$(this).focus(function() { if ($(this).val() == text) { $(this).val(''); }; });
			$(this).blur(function() { if ($(this).val() == '') { $(this).val(text); }; });
		});
	};
	
};

// Slider
$.slider = function(container, slider, prev, next) {
	
	if ($(container).length > 0 ) {
		
		var width = parseInt($(slider + " li").length) * 116;
		if ($(slider + " li").length < 6) { $(next).addClass("inactive"); };
		
		$(prev).unbind("click");
		$(prev).click(function() {
			if ($(prev).hasClass("inactive") || $(prev).hasClass("disabled")) {
				return false;
			} else {
				$(prev).addClass("disabled");
				var position = parseInt($(slider).css("margin-left"));
				var move = (position + 580) + "px";
				$(slider).animate({ marginLeft: move }, 1000, "easeInOutQuint", function() {
					var next_click = parseInt($(slider).css("margin-left")) + 580;
					if (next_click > 0) { $(prev).addClass("inactive"); };
					$(next).removeClass("inactive");
					$(prev).removeClass("disabled");
				});
			};
			return false;
		});
		
		$(next).unbind("click");
		$(next).click(function() {
			if ($(next).hasClass("inactive") || $(next).hasClass("disabled")) {
				return false;
			} else {
				$(next).addClass("disabled");
				var position = parseInt($(slider).css("margin-left"));
				var move = (position - 580) + "px";
				$(slider).animate({ marginLeft: move }, 1000, "easeInOutQuint", function() {
					var next_click = parseInt($(slider).css("margin-left")) + -580;
					if ((next_click + width) <= 0) { $(next).addClass("inactive"); };
					$(prev).removeClass("inactive");
					$(next).removeClass("disabled");
				});
			};
			return false;
		});
		
	};
	
};

// Initialize page elements after the DOM is loaded
$(document).ready(function() {
	
	$.cleared("input.field");
	$.slider("div#slider", "div#slider ul", "div#prev a", "div#next a");
	
});