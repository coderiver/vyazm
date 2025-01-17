$(document).ready(function() {

	// popup
	(function() {
		var body  = $('body'),
			enter = $('.js-popup-enter'),
			popup = $('.js-popup'),
			close = $('.js-popup-close'),
			sl    = $('.js-sl');
		enter.on('click', function() {
			var _this = $(this),
				el = _this.data('popup');
			popup.fadeOut(200);
			$('.' + el).fadeIn(200);
			body.addClass('no-scroll');
			// gallery
			if (el == 'js-popup-gallery') {
				var index = _this.data('index');
				if (!sl.hasClass('is-inited')) {
					sl.addClass('is-inited');
					sl.slick({
						slide: '.js-sl-item',
						fade: true
					});
					sl.slick('slickGoTo', index);
				}
				sl.slick('slickGoTo', index);
			}
			return false;
		});
		close.on('click', function() {
			popup.fadeOut(200);
			body.removeClass('no-scroll');
		});
	}());

	// header menu
	$('.js-btn-menu').click(function(e) {
		e.preventDefault();

		$('.js-menu').addClass('is-active');
	});

	$('.js-tel-ico').click(function(e) {
		e.preventDefault();

		$('.js-header-popup').addClass('is-active');
	});

	$('.js-close').click(function(e) {
		e.preventDefault();
		$(this).closest('.js-header-popup').removeClass('is-active');
	});

	$('body').click(function(e) {
		if ( !$(e.target).is('.js-btn-menu') && !$(e.target).is('.js-menu')) {
			$('.js-menu').removeClass('is-active');
		}
	});

	// zoom
	if ($(window).width() > 768) {
		var image = $('.js-zoom');
		var zoomConfig = {
			zoomType: 'lens',
			lensShape: 'round',
			lensSize: 126,
			borderSize: 3,
			borderColour: '#fff'
		};
		var zoomActive = false;

		image.on('mouseenter', function() {
		    image.elevateZoom(zoomConfig);
		});

		image.on('mouseleave', function() {
			$.removeData(image, 'elevateZoom');
		});
	}

	// tabs
	$('.js-tabs-link').on('click', function() {
		var name = $(this).html(),
			borderColor = $(this).data('color'),
			currItem = $('.js-tabs-block[data-name=' + name + ']');
			border = currItem.find('img').css('border-color', borderColor);

		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
		$('.js-tabs-link[data-name=' + name + ']').addClass('is-active');
		currItem.siblings().removeClass('is-active');
		currItem.addClass('is-active');
	});

	// animate to anchor link
	$('.js-link').click(function(e) {
		var headerHeight = $('.js-header').outerHeight();

		e.preventDefault();
		$(this).parent().siblings().children().removeClass('is-active');
		$(this).addClass('is-active');
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - headerHeight
		}, 500);
	});

	// form validation
	(function() {
		var headerpopup  = $('.js-header-popup'),
			thanks = $('.js-popup-thanks'),
			body   = $('body');
		// welcome
		$.validate({
			form: '#popup-form',
			onSuccess: function() {
				post_data = {
					'name': $('#popup-form input[name=name]').val(),
					'tel': $('#popup-form input[name=tel]').val()
				};
				// Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {
						console.log('error');
					}
					else {
						// reset values in all input fields
						headerpopup.removeClass('is-active');
						thanks.fadeIn('fast');
						console.log('bla');
						$('#popup-form').get(0).reset();
					}
				}, 'json');
				return false;
			}
		});
		// footer
		$.validate({
			form : '#form-footer',
			onSuccess: function() {
				post_data = {
					'name': $('#form-footer input[name=name]').val(),
					'email': $('#form-footer input[name=email]').val(),
					'comment': $('#form-footer textarea[name=comment]').val()
				};
				//Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {}
					else {
						thanks.fadeIn('fast');
						$('#form-footer').get(0).reset();
					}
				}, 'json');
				return false;
			}
		});
	}());

});