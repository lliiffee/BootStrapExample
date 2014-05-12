

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

	if ($('.top-loved .fav-items').exists()) {
		setTimeout(function() {
			$('.top-loved .fav-items').masonry({
				columnWidth : 256,
				isResizable : true
			});
		}, 800);
	}

	function isInt(n) {
		return n % 1 === 0;
	}

	if ($('#pagesearch').exists()) {
		$('#pagesearch').submit(function(e) {
			var value = $(this).find('input').val();
			if (isInt(value)) {
				window.location.href = $(this).attr('action').replace('2', value);
			} else {
				window.location.href = 'http://fuckingyoung.es?s=' + value;
			}
			e.preventDefault();
			return false;
		});
	}

	function isMobile() {
		if ($(window).width() <= 767) {
			return true;
		} else {
			return false;
		}
	}

	var mobile_ = isMobile();
	$(window).resize(function() {
		mobile_ = isMobile();
	});
	$('header .btn-menu').click(function() {
		if (mobile_) {
			$('header .drop').slideToggle(400, function() {
				$('header').toggleClass('active');
			});
		}
		return false;
	});
	$('html').click(function() {
		if (mobile_) {
			$('header .drop').hide(400, function() {
				$('header').removeClass('active');
			});
		}
	});
	$('header .drop').click(function(event) {
		event.stopPropagation();
	});

	if ($('.post-inner').exists()) {
		$('.post-inner .prev-article span').css({
			opacity : 0,
			marginLeft : "-100%"
		});
		$('.post-inner .next-article span').css({
			opacity : 0,
			marginRight : "-100%"
		});
		$('.post-inner .prev-article').hover(function() {
			$(this).find('span').stop().animate({
				marginLeft : "0",
				opacity : 1
			});
		}).mouseleave(function() {
			$(this).find('span').stop().animate({
				marginLeft : "-100%",
				opacity : 0
			});
		});
		$('.post-inner .next-article').hover(function() {
			$(this).find('span').stop().animate({
				marginRight : "0",
				opacity : 1
			});
		}).mouseleave(function() {
			$(this).find('span').stop().animate({
				marginRight : "-100%",
				opacity : 0
			});
		});
	}

	$(window).scroll(function() {
		if ($('.post-inner').exists()) {
			var h_w = $(window).height();
			var f_c = $('.f-comments').offset().top - h_w;
			if ($(window).scrollTop() > h_w && $(window).scrollTop() < f_c) {
				$('.post-inner .prev-article').fadeIn();
				$('.post-inner .next-article').fadeIn();
			} else {
				$('.post-inner .prev-article').fadeOut();
				$('.post-inner .next-article').fadeOut();
			}
		}
	});

	$('header .panel .search-form .text input').focus(function() {
		if (!mobile_) {
			$(this).closest('.text').animate({
				width : "176px",
				marginLeft : "-30px"
			});
		}
	}).focusout(function() {
		if (!mobile_) {
			if ($(this).val() == '') {
				$(this).closest('.text').animate({
					width : "66px",
					marginLeft : "0"
				});
			}
		}
	});

	$('.filter-in ul.filter-cats > li').hover(function() {
		$(this).find('.sub-block').addClass('show-dropdown');
	}, function() {
		$(this).find('.sub-block').removeClass('show-dropdown');
	});

	/* STORE */

	$('li.parent.shopping-bag-item').hover(function() {
		$(this).find('ul.sub-menu').first().addClass('show-dropdown');
	}, function() {
		$(this).find('ul.sub-menu').first().removeClass('show-dropdown');
	});

	if ($('body').hasClass('woocommerce-cart') || $('body').hasClass('woocommerce-account') || $('body').hasClass('woocommerce-page')) {

		$('figcaption .add_to_cart_button').on('click', function() {
			var button = $(this);
			var added_text = button.attr("data-added_text");
			button.addClass("product-added");
			button.text(added_text);
		});

		$('.show-products-link').on('click', function(e) {
			e.preventDefault();
			var linkHref = $(this).attr('href').replace('?', '');
			var currentQuery = document.location.search;

			if (currentQuery.indexOf('?show') >= 0) {
				window.location = $(this).attr('href');
			} else if (currentQuery.indexOf('?') >= 0) {
				window.location = currentQuery + '&' + linkHref;
			} else {
				window.location = document.location + '?' + linkHref;
			}
		});

		$('ul.products li').hover(function() {
			var imageOverlay = $(this).find('.image-overlay');
			imageOverlay.animate({
				top : $(this).height() * -1
			}, 400);
		}, function() {
			var imageOverlay = jQuery(this).find('.image-overlay');
			imageOverlay.animate({
				top : 0
			}, 400);
		});

		$('.shipping-calculator-form input').keypress(function(e) {
			if (e.which == 10 || e.which == 13) {
				$(".update-totals-button button").click();
			}
		});

		$("#product-accordion").accordion({
			collapsible : true
		});
	}

	/* LOVES */

	function loveIt(link) {
		if (link.hasClass('active'))
			return false;

		link.closest('.item').removeClass('not-loved').addClass('already-loved');

		$.post(ajaxurl, {
			action : 'fy-loves',
			likes_id : link.attr('id')
		}, function(data) {
			link.html(data).closest('.item.type-love').attr('title', 'You already love this');
			link.addClass('active');
		});
	}


	$('.fy-loves').live('click', function() {
		loveIt($(this));
		return false;
	});

	$('#love-meta .love-it.not-loved').click(function() {
		var elem = $(this);

		if (elem.hasClass('already-loved'))
			return false;

		$.post(ajaxurl, {
			action : 'fy-loves',
			likes_id : elem.attr('id')
		}, function(data) {
			elem.find('span').html('You already love this.');
			elem.removeClass('not-loved').addClass('already-loved');
		});
		return false;
	});

	$('.fy-loves').each(function() {
		var id = $(this).attr('id');
		$(this).load(ajaxurl, {
			action : 'fy-loves',
			post_id : id
		});
	});

	$('.fy-loves').each(function() {
		var id = $(this).attr('id');
		$(this).load(ajaxurl, {
			action : 'fy-loves',
			post_id : id
		});
	});

	/* SINGLE */

	if ($('.f-comments').exists()) {
		if ($(".f-comments").width() != document.getElementsByClassName("fb-comments")[0].getAttribute("data-width")) {
			$(".fb-comments").attr("data-width", $(".f-comments").width());
		}
		$(window).smartresize(function() {
			if ($(".f-comments").width() != document.getElementsByClassName("fb-comments")[0].getAttribute("data-width")) {
				$(".fb-comments").attr("data-width", $(".f-comments").width());
				FB.XFBML.parse($(".f-comments")[0]);
			}
		});
	}

});

function initPage() {
	clearFormFields({
		clearInputs : true,
		clearTextareas : true,
		passwordFieldText : true,
		addClassFocus : "focus",
		filterClass : "default"
	});
}



if (window.addEventListener)
	window.addEventListener("load", initPage, false);
else if (window.attachEvent)
	window.attachEvent("onload", initPage);
/*
(function($, sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function(func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this, args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	// smartresize
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};

}
)(jQuery, 'smartresize');
*/

