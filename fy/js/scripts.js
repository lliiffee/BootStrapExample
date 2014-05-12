jQuery(document).ready(function($) {
	$.fn.exists = function() {
		return this.length > 0;
	}
	if (window.PIE) {
		$('.ie-fix').each(function() {
			PIE.attach(this);
		});
	}

	if ($('#panel').exists()) {
		$('#panel').sticky({
			topSpacing : 0
		});
	}

	if ($('#filter').exists()) {
		$('#filter').sticky({
			topSpacing : 40
		});
	}

	if ($('#flexslider-1').exists()) {
		$('#flexslider-1').flexslider({
			animation : "fade"
		});
	}

	if ($('#flexslider-2').exists()) {
		$('#flexslider-2').flexslider({
			animation : "fade"
		});
	}

	if ($('#flexslider-3').exists()) {
		$('#flexslider-3 img').wrap('<li><div class="slide-block"></div></li>');

		$('#flexslider-3').flexslider({
			animation : "fade",
			controlNav : false,
			start : function(slider) {
				$('#flexslider-3').find('.cur-num').text(slider.currentSlide + 1);
				$('#flexslider-3').find('.amount').text(slider.count);
			},
			after : function(slider) {
				$('#flexslider-3').find('.cur-num').text(slider.currentSlide + 1);
			}
		});
	}

	if ($('#posts-1').exists()) {
		setTimeout(function() {
			$('#posts-1').masonry({
				columnWidth : 320,
				isResizable : true
			});
		}, 800);
	}

});	

