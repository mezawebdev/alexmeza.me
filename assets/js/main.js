(function($) {

	

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$html = $('html');

		// Disable animations/transitions until the page has loaded.
			$html.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$html.removeClass('is-loading');
				}, 0);
			});

		// Touch mode.
			if (skel.vars.mobile) {

				var $wrapper;

				// Create wrapper.
					$body.wrapInner('<div id="wrapper" />');
					$wrapper = $('#wrapper');

					/* Fuck this shit messing everything.
					// Hack: iOS vh bug.
						if (skel.vars.os == 'ios')
							$wrapper
								.css('margin-top', -25)
								.css('padding-bottom', 25);
					*/

					// Pass scroll event to window.
						$wrapper.on('scroll', function() {
							$window.trigger('scroll');
						});

				// Scrolly.
					$window.on('load.hl_scrolly', function() {

						$('.scrolly').scrolly({
							speed: 1500,
							parent: $wrapper,
							pollOnce: true
						});

						$window.off('load.hl_scrolly');

					});

				// Enable touch mode.
					$html.addClass('is-touch');

			}
			else {

				// Scrolly.
					$('.scrolly').scrolly({
						speed: 1500
					});

			}

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			var $header = $('#header'),
				$headerTitle = $header.find('header'),
				$headerContainer = $header.find('.container');

			// Make title fixed.
				if (!skel.vars.mobile) {

					$window.on('load.hl_headerTitle', function() {

						skel.on('-medium !medium', function() {

							$headerTitle
								.css('position', 'fixed')
								.css('height', 'auto')
								.css('top', '50%')
								.css('left', '0')
								.css('width', '100%')
								.css('margin-top', ($headerTitle.outerHeight() / -2));

						});

						skel.on('+medium', function() {

							$headerTitle
								.css('position', '')
								.css('height', '')
								.css('top', '')
								.css('left', '')
								.css('width', '')
								.css('margin-top', '');

						});

						$window.off('load.hl_headerTitle');

					});

				}

			// Scrollex.
				skel.on('-small !small', function() {
					$header.scrollex({
						terminate: function() {

							$headerTitle.css('opacity', '');

						},
						scroll: function(progress) {

							// Fade out title as user scrolls down.
								if (progress > 0.5)
									x = 1 - progress;
								else
									x = progress;

								$headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

						}
					});
				});

				skel.on('+small', function() {

					$header.unscrollex();

				});

		 /////////////////////////////////
		// START OF Edits by Alex Meza //
	   /////////////////////////////////

		/* Globals */
		var windowObj = $(window);
		var projectIcons = $("#projects-reel-container li").not($(".disabled"));
		var disabledProject = $(".disabled");
		var modalWrapper = $("#modal-wrapper"); // Fixed Position 
		var fixedElementOffSet = modalWrapper.offset().top;
		var modalContent = $("#modal-content");
		var modalContentClose = $("#modal-content button");
		var learnMoreButton = $("#learn-more");
		var isMobile = false;
		var currentUrl = window.location.href;
		var currentPage = currentUrl.split("/");
		var beforeElement = $(".main .container:before");
		var closeWindowButton = $(".red");
		var minimizeWindowButton = $(".yellow");
		var expandWindowButton = $(".green");
		var evenProject = $(".even");
		var oddProject = $(".odd");
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var navbarBars = $("#navigation-main .navbar-bars a");
		var navbarExpand = $("#navigation-main .navbar-expand");
		var navbarWrapper = $("#navbar-wrapper");
		console.log(windowWidth);
		console.log(currentPage);
		console.log(beforeElement);

		function hideDiv(data) {
			$(data).fadeOut(400);
		}

		function showDiv(data) {
			$(data).fadeIn(400);
		}

		function setPositionAbsolute (data) {
			$(data).css("position", "absolute");
			console.log(fixedElementOffSet);
		}

		function setOverflowYAuto (data) {
			$(data).css("overflow-y", "auto");
		}

		function adjustFixedIfMobile(data) {
			var scrollTop = windowObj.scrollTop();
			if (fixedElementOffSet < scrollTop) {
				modalWrapper.css("top", scrollTop);
			}
			else {
				modalWrapper.css("top", 0);
			}
		}

		/* Check to see if Mobile */
		if (/Mobi/.test(navigator.userAgent)) {
			isMobile = true;
			setPositionAbsolute(modalWrapper);
			setOverflowYAuto(modalWrapper);
		}

		/* Particles JS */
		particlesJS.load('particles-js', 'assets/particles.json', function() {
		 	console.log('callback - particles.js config loaded');
		});

		console.log(window.width);

		/* Header: Types out website title and animates cursor and fixed ::before space */
		if (currentPage[3] === "#" || currentPage[3] === "" || currentPage[3] === "index.html" || currentPage[3] === "index.html?" || currentPage[3] === "index.html?#" || currentPage[3] === "index.html#") {
			if ( ! isMobile) {
				$("#navbar-wrapper").css("display", "none");
				$("#main-title").typed({
					strings: ["Alex<br /><span class='last-name'>Meza</span><span class='typed-cursor last-name move-down'>|</span>"],
					typeSpeed: 20,
					startDelay: 2000,
					showCursor: false
				});
			}
			else {
				$(navbarWrapper).css("height", "60px");
				$("#header").css("display", "none");
				$("#navbar-wrapper").replaceWith("<div class='navbar'><h1><a href='index.html'> ALEX<br /> <span style='position: relative; left: 3px;''>MEZA</a></span></h1><h4>Full Stack Web Developer</h4><ul><li><a href='index.html'>HOME</a></li><span>&nbsp;&middot;</span><li><a href='projects.html'>PROJECTS</a></li><span>&nbsp;&middot;</span><li><a href='about.html'>ABOUT</a></li></ul></div>");
				$("#one").css("margin-top", "0");
			}
		}
		else {
			console.log("currentPage[3] = " + currentPage[3]);
			$(".main .container").toggleClass("projects-page");
			$("#main-title").typed({
				strings: ["Alex<br /><span class='last-name'>Meza</span><span class='typed-cursor last-name move-down'>|</span>"],
				typeSpeed: 20,
				startDelay: 2000,
				showCursor: false
			});
		}


		/* Navbar Collapse */
		$(navbarBars).on("click", function(e) {
			e.preventDefault();
			if (navbarExpand.css("opacity") === "1") {
					navbarExpand.animate({
					opacity: 0,
					height: "0px"
				});
			}
			else {
				navbarExpand.animate({
					opacity: 1,
					height: "50%"
				});
			}
		});

		/* Fix for highlighting active class on navigation */
		if (currentPage[3] === "projects.html" || currentPage[3] === "projects.html?" || currentPage[3] === "projects.html#" || currentPage[3] === "projects.html?#") {
			$(".navbar ul li:nth-child(3)").toggleClass("active");
			$(".major").css("margin-top", "10px");

		}
		else if (currentPage[3] === "about.html" || currentPage[3] === "about.html?" || currentPage[3] === "about.html#" || currentPage[3] === "about.html?#") {
			$(".navbar ul li:nth-child(5)").toggleClass("active");
			$(".major").css("margin-top", "10px");
		}
		else {
			$(".navbar ul li:nth-child(1)").toggleClass("active");
		}

		/* Previous Attempts */
		/*
		if (currentPage[3] === "projects" || currentPage[3] === "projects#" || currentPage[3] === "projects?" || currentPage[3] === "projects.html" || currentPage[3] === "projects.html?") {
			console.log("currentPage[3] = projects");
			$(".main .container").toggleClass("projects-page");
			$("#main-title").typed({
				strings: ["Alex<br /><span class='last-name'>Meza</span><span class='typed-cursor last-name move-down'>|</span>"],
				typeSpeed: 20,
				startDelay: 2000,
				showCursor: false
			});
		}
		else {
			$("#main-title").typed({
				strings: ["Alex<br /><span class='last-name'>Meza</span><span class='typed-cursor last-name move-down'>|</span>"],
				typeSpeed: 20,
				startDelay: 2000,
				showCursor: false
			});
		}
		*/

		setTimeout(function() {
			$(".delay-fadeIn").animate({
				opacity: "1"
			})
		}, 4500);

		/* Finder Window Button Handlers */
		$(closeWindowButton).on("mouseover", function() {
			$(".red i").css("display", "inline");
		});
		$(closeWindowButton).on("mouseout", function() {
			$(".red i").css("display", "none");
		});
		$(minimizeWindowButton).on("mouseover", function() {
			$(".yellow i").css("display", "inline");
		});
		$(minimizeWindowButton).on("mouseout", function() {
			$(".yellow i").css("display", "none");
		});
		$(expandWindowButton).on("mouseover", function() {
			$(".green i").css("display", "inline");
		});
		$(expandWindowButton).on("mouseout", function() {
			$(".green i").css("display", "none");
		});


		/* Modal Event Handlers */

		windowObj.scroll(function() {
			if (isMobile) {
				adjustFixedIfMobile();
			}
		});

		$(disabledProject).on("click", function(e) {
			e.preventDefault();
		});
		/*
		$(projectIcons).not(projectIcons[1]).on("click", function(e) {
			console.log("Selected Projects: " + e);
			e.preventDefault();
			showDiv(modalWrapper);
		});
		$(modalContentClose).add(modalWrapper).on("click", function() {
			hideDiv(modalWrapper);
		});
		$(modalContent).on("click", function(e) {
			e.stopPropagation();
		});
		*/


		/* Projects Page Reel Handlers */
		$(".section.group a").on("click", function(data) {
			data.preventDefault();
		});


		//////// END OF EDITS BY ALEX MEZA ///////

	});

})(jQuery);
