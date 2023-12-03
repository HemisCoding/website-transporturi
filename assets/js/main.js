/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {


	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

		document.addEventListener("DOMContentLoaded", function() {
			animateValue("stat-courses", 0, 300, 2000, '+');
			animateValue("stat-clients", 0, 1000, 2000, '+');
			animatePercentage("stat-safety", 0, 100, 2000); // Aici nu este necesar pentru că este un procentaj
		});

		function animateValue(id, start, end, duration, prefix = '') {
			var range = end - start;
			var current = start;
			var increment = end > start? 1 : -1;
			var stepTime = Math.abs(Math.floor(duration / range));
			var obj = document.getElementById(id);
			var timer = setInterval(function() {
				current += increment;
				obj.textContent = prefix + current; // Adăugăm prefixul la text
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}

		function animatePercentage(id, start, end, duration) {
			var range = end - start;
			var current = start;
			var increment = end > start? 1 : -1;
			var stepTime = Math.abs(Math.floor(duration / range));
			var obj = document.getElementById(id);
			var timer = setInterval(function() {
				current += increment;
				obj.textContent = current + "%";
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}

		$('a[href^="#"]').on('click', function(event) {
			var target = $(this.getAttribute('href'));
			if( target.length ) {
			  event.preventDefault();
			  $('html, body').stop().animate({
				scrollTop: target.offset().top
			  }, 1000);
			}
		  });

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);