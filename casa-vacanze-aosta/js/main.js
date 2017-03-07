;(function () {
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Burger Menu
	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			event.preventDefault();
			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}
		});
	};

	var goToTop = function() {
		$('.js-gotop').on('click', function(event){
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	};

	// Page Nav
	var clickMenu = function() {
		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-fh5co-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});
	};

	// Reflect scrolling in navigation
	var navActive = function(section) {
		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});
	};

	var navigationSection = function() {
		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});
	};

	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){
		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			}
		});
	};

	// Animations
	var animateSection = function (sectionName, fade, time) {
		var $section = $('#fh5co-' + sectionName);
		if ( $section.length > 0 ) {	
			$section.waypoint( function( direction ) {				
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout(function() {
						$section.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass(fade + ' animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, time);

					$(this.element).addClass('animated');
				}
			}, { offset: '80%' } );
		}
	};

	var animateSectionAndChildren = function (sectionName, correction, fade1, fade2, fade1Time, counterTime) {
		var $section = $('#fh5co-' + sectionName);
		if ( $section.length > 0 ) {	
			$section.waypoint( function( direction ) {				
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					var fade2Time = $section.find('.to-animate').length;
					fade2Time = parseInt((fade2Time * 200) + correction);

					setTimeout(function() {
						$section.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass(fade1 + ' animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, fade1Time);
					
					setTimeout(function() {
						$section.find('.js-counter').countTo({
						 	formatter: function (value, options) {
								return value.toFixed(options.decimals);
							}
						});
					}, counterTime);

					setTimeout(function() {
						$section.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass(fade2 + ' animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, fade2Time);

					$(this.element).addClass('animated');
				}
			}, { offset: '80%' } );
		}
	};

	// Document on load.
	$(function(){
		parallax();
		burgerMenu();
		clickMenu();
		windowScroll();
		navigationSection();
		goToTop();


		// Animations
		animateSection('home', 'fadeInUp', 200);
		animateSection('intro', 'fadeInRight', 1000);
		animateSection('work', 'fadeInUp', 200);
		animateSection('about', 'fadeInUp', 200);
		animateSection('contact', 'fadeInUp', 200);
		animateSection('map', 'fadeInUp', 200);
		animateSection('prices', 'fadeInUp', 200);
		animateSection('weather', 'fadeInUp', 200);
		
		//animateSectionAndChildren('testimonials', -400, 'fadeInUp', 'fadeInDown', 200, 0);
		animateSectionAndChildren('services', -400, 'fadeInUp', 'bounceIn', 200, 0);
		//animateSectionAndChildren('counters', 400, 'fadeInUp', 'bounceIn', 200, 400);
	});


}());