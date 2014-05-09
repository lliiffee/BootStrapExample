/*

 var woocommerce = {
 init: function() {

 },
 productSetup: function() {
 jQuery('ul.products').imagesLoaded(function() {
 jQuery('ul.products li').each(function() {
 var productImageHeight = jQuery(this).find('.product-image > img').height();
 if (jQuery('#container').width() <= 1024 && jQuery(this).find('figure > figcaption').is(":visible")) {
 productImageHeight = productImageHeight + 20;
 }
 jQuery(this).find('figure').css('padding-bottom', productImageHeight  + 'px');
 });
 });
 },
 productCarousel: function() {

 var products = jQuery('.product-carousel');

 products.addClass('carousel-wrap');

 var carousel = products.find('ul.products');

 carousel.each(function() {
 var carouselPrev = jQuery(this).parent().parent().find('.prev');
 var carouselNext = jQuery(this).parent().parent().find('.next');
 var carouselColumns = parseInt(jQuery(this).parent().parent().attr("data-columns"), 10);

 jQuery(this).imagesLoaded(function () {
 jQuery(this).carouFredSel({
 items				: carouselColumns,
 scroll : {
 visible			: {
 width: carousel.find("> li:first").width(),
 min: 1,
 max: carouselColumns
 },
 easing			: "easeInOutCubic",
 duration		: 800,
 pauseOnHover	: true
 },
 auto : {
 play			: false
 },
 prev : {
 button			: carouselPrev,
 key				: "left"
 },
 next : {
 button			: carouselNext,
 key				: "right"
 },
 onCreate : function() {
 woocommerce.resizeCarousel();
 $(window).smartresize(function() {
 woocommerce.resizeCarousel();
 });
 }
 });
 });
 });
 },
 resizeCarousel: function() {
 var carousel = jQuery('.product-carousel').find('.products');

 carousel.each(function() {
 var carouselItem = jQuery(this).find('li');
 var itemWidth = carouselItem.width() + carouselItem.css('margin-left');
 var visible = parseInt(carousel.parent().parent().attr("data-columns"), 10);

 if (jQuery('#container').width() < 460 && jQuery('body').hasClass('responsive-fluid')) {
 visible = 1;
 } else if (jQuery('#container').width() < 768 && jQuery('body').hasClass('responsive-fluid')) {
 visible = 2;
 }

 carousel.trigger("configuration", {
 items : {
 width : itemWidth
 },
 scroll : {
 items: visible
 }
 });

 });
 },
 variations: function() {
 jQuery('.variations select').each( function() {
 var variationSelect = jQuery(this);
 variationSelect.live("change", function(){
 if (jQuery('#sf-included').hasClass('has-productzoom')) {
 jQuery('.zoomContainer').remove();
 setTimeout(function() {
 jQuery('.product-slider-image').each(function() {
 jQuery(this).data('zoom-image', jQuery(this).parent().find('a.zoom').attr('href'));
 });
 jQuery('#product-img-slider li:first').find('.product-slider-image').elevateZoom({
 zoomType: "inner",
 cursor: "crosshair",
 responsive: true,
 zoomWindowFadeIn: 500,
 zoomWindowFadeOut: 750
 });
 jQuery('#product-img-slider').flexslider(0);
 }, 500);
 } else {
 setTimeout(function() {
 jQuery('#product-img-slider').flexslider(0);
 var flexViewport = jQuery('#product-img-slider').find('.flex-viewport'),
 flexsliderHeight = flexViewport.find('ul.slides').css('height');
 flexViewport.animate({
 'height': flexsliderHeight
 }, 300);
 jQuery('#product-img-slider').flexslider(0);
 }, 500);
 }
 });
 });
 }
 };

 */

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

function clearFormFields(o) {
	if (o.clearInputs == null)
		o.clearInputs = true;
	if (o.clearTextareas == null)
		o.clearTextareas = true;
	if (o.passwordFieldText == null)
		o.passwordFieldText = false;
	if (o.addClassFocus == null)
		o.addClassFocus = false;
	if (!o.filter)
		o.filter = "default";
	if (o.clearInputs) {
		var inputs = document.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if ((inputs[i].type == "text" || inputs[i].type == "password") && inputs[i].className.indexOf(o.filterClass)) {
				inputs[i].valueHtml = inputs[i].value;
				inputs[i].onfocus = function() {
					if (this.valueHtml == this.value)
						this.value = "";
					if (this.fake) {
						inputsSwap(this, this.previousSibling);
						this.previousSibling.focus();
					}
					if (o.addClassFocus && !this.fake) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				inputs[i].onblur = function() {
					if (this.value == "") {
						this.value = this.valueHtml;
						if (o.passwordFieldText && this.type == "password")
							inputsSwap(this, this.nextSibling);
					}
					if (o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-" + o.addClassFocus, "");
					}
				}
				if (o.passwordFieldText && inputs[i].type == "password") {
					var fakeInput = document.createElement("input");
					fakeInput.type = "text";
					fakeInput.value = inputs[i].value;
					fakeInput.className = inputs[i].className;
					fakeInput.fake = true;
					inputs[i].parentNode.insertBefore(fakeInput, inputs[i].nextSibling);
					inputsSwap(inputs[i], null);
				}
			}
		}
	}
	if (o.clearTextareas) {
		var textareas = document.getElementsByTagName("textarea");
		for (var i = 0; i < textareas.length; i++) {
			if (textareas[i].className.indexOf(o.filterClass)) {
				textareas[i].valueHtml = textareas[i].value;
				textareas[i].onfocus = function() {
					if (this.value == this.valueHtml)
						this.value = "";
					if (o.addClassFocus) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				textareas[i].onblur = function() {
					if (this.value == "")
						this.value = this.valueHtml;
					if (o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-" + o.addClassFocus, "");
					}
				}
			}
		}
	}
	function inputsSwap(el, el2) {
		if (el)
			el.style.display = "none";
		if (el2)
			el2.style.display = "inline";
	}

}

if (window.addEventListener)
	window.addEventListener("load", initPage, false);
else if (window.attachEvent)
	window.attachEvent("onload", initPage);

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

})(jQuery, 'smartresize');

