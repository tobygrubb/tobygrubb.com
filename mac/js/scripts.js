$(function() {
	
/*--------------------------------------------------
First Load Page
---------------------------------------------------*/

	var current_url = $(location).attr('href');
	
	$('body').waitForImages({
		finished: function() {
			
			setTimeout(function(){
				$('header').removeClass('first-load');
				setTimeout(function(){
					$('#header-wrapper').animate({opacity : 1},200);
				}, 200);
				openWebsite();
			},1000);
		},
		waitForAll: true
	});
	
	
	
/*--------------------------------------------------
Change Ajax Pages
---------------------------------------------------*/

	$(".ajax-link").live("click", function(){
		$this = $(this);
		var link = $this.attr('href');
		if( link != current_url && link != '#' ) { 
			$.ajax({
				url:link,
				processData:true, 
				dataType:'html', 
				success:function(data){
					document.title = $(data).filter('title').text(); 
					current_url = link;
					if (typeof history.pushState != 'undefined') history.pushState( data, 'Page', link );  
					var content_to_display = "#content-ajax";
					var current_container = $( content_to_display );
					var header_to_display = "#header-wrapper";
					var current_header = $( header_to_display );
					var footer_to_display = "#footer-content";
					var current_footer = $( footer_to_display );					
					
					delay = 0;					
					
					setTimeout(function(){						
						
						$(".tg-mask").fadeIn(500);
						$("#tgloader").delay(50).fadeIn(100);
						$('html, body').delay(600).animate({ scrollTop:  0  },50);						
						
						setTimeout(function(){
							
							current_container.html(' ');
							current_container.html( $(data).find( content_to_display ).html() );
							current_header.html(' ');
							current_header.html( $(data).find( header_to_display ).html() );
							current_footer.html(' ');
							current_footer.html( $(data).find( footer_to_display ).html() );
							$('body').waitForImages({
								finished: function() {
									openWebsite();
									_gaq.push(['_trackPageview'], '/'+current_url); 
								},										
								waitForAll: true
							});								
							
						},1100);
					},delay);
				}
			});
		}
		return false;
	});
	
	

/*--------------------------------------------------
Initialization Function Open Page
---------------------------------------------------*/

	function openWebsite() {
		$("header").removeClass("hbg");
		initScripts();		
		setTimeout(function(){
			$("#tgloader").fadeOut(100);			
			$(".tg-mask").fadeOut(500);							
		},1000);
		
	}//End openWebsite
	
	
	
/*--------------------------------------------------
Initialization General Scripts for all pages
---------------------------------------------------*/

    function initScripts() {
		
		$(document).ready(function(){			
			HeaderBackground();
			SmoothScroll();
			BackToTop();
			HideShowMenu();
			MenuOverlay();
			HeroHeight();
			HeroParallax();
			FullScreenSlider();
			SliderBg();
			ClassicSlider();	
			MasonryPortfolio();
			ToggleSecondaryMenu();
			ContactMap();
			ContactForm();
			BlogPost();
			AppearIteam();
			VideoHeader();
			Shortcodes();
			TwitterFeed();				
		});
		
		$(window).ready(function() {
			MenuOverlayResponsive();			
		});
		
		$(window).on( 'resize', function () {
			MenuOverlayResponsive();
			HeroHeight();			
		});
		
	} //End initScripts
	
	
	
/*--------------------------------------------------
Function SmoothScroll
---------------------------------------------------*/
	
	function SmoothScroll() {

		$(function () {
			var platform = navigator.platform.toLowerCase();
			if (platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) {
				if ($.browser.webkit) {
					$.srSmoothscroll();
				}
			}
		});

	}//End SmoothScroll
	
	
	
/*--------------------------------------------------
Function Back To Top Button
---------------------------------------------------*/
	
	function BackToTop() {
	
		$(window).scroll(function(){
			if ($(this).scrollTop() > $(window).height() *0.7 ) {
				$('.scrolltotop').fadeIn();
			} else {
				$('.scrolltotop').fadeOut();
			}
		});
		
		//Click event to scroll to top
		$('.scrolltotop').click(function(){
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
	
	}//End BackToTop
	
	
	
/*--------------------------------------------------
Function Change Header Background On Scroll
---------------------------------------------------*/
	
	function HeaderBackground() {
	
		if ($("#hero").length <= 0) {
			$("#secondary-menu").removeClass("hide-secondary");
			$("header").addClass("hbg");
		};
	
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= $("#hero").height()) {
				$("header").addClass("hbg");
				$("#secondary-menu").removeClass("hide-secondary");
			} else {
				$("header").removeClass("hbg");
				$("#secondary-menu").addClass("hide-secondary");
			}
		});
	
	}//End HeaderBackground

/*--------------------------------------------------
Function Menu Animations
---------------------------------------------------*/

$(".list-close").click(function(){
	$(".first").toggleClass("active");
	$(".second").toggleClass("active");
	$(".third").toggleClass("active");
});

$(".info-close").click(function(){
	$(".dot").toggleClass("active");
	$(".dash").toggleClass("active");
});

/*--------------------------------------------------
Function Hide Show Menu
---------------------------------------------------*/
	
	function HideShowMenu() {
		
		
			
			var didScroll;
			var lastScrollTop = 0;
			var delta = 5;
			var navbarHeight = $('header').outerHeight();
			var navbarHideAfter = 20
			
			$(window).scroll(function(event){
				didScroll = true;
			});
			
			
			if( $('.hsm').length > 0 ){
				
				setInterval(function() {
					if (didScroll) {
						hasScrolled();
						didScroll = false;
					}
				}, 100);
			
			}
		
			return false;
			
			function hasScrolled() {
				var st = $(this).scrollTop();
				
				// Make sure they scroll more than delta
				if(Math.abs(lastScrollTop - st) <= delta)
					return;
				
				// If they scrolled down and are past the navbar, add class .nav-up.
				// This is necessary so you never see what is "behind" the navbar.
				if (st > lastScrollTop && st > navbarHideAfter){
					// Scroll Down
					if( $('.hsm').length > 0 ){
					$('header').removeClass('nav-down').addClass('nav-up');
					}
				} else {
					// Scroll Up
					if( $('.hsm').length > 0 ){
					if(st + $(window).height() < $(document).height()) {
						$('header').removeClass('nav-up').addClass('nav-down');
					}
					}
				}
				
				lastScrollTop = st;
			}
			
		
		
	}//End HideShowMenu
	
	
	
/*--------------------------------------------------
Function Menu Overlay
---------------------------------------------------*/	
	
	function MenuOverlay() {	
	
		var Menu = {
			settings: {
				menubtn: $(".tg-menubtn"),
				menu: $(".tg-overlay-menu"),
				navigation: $("header"),
				closebtn: $(".tg-menuclosebtn"),
				bg: $(".tg-menubg"),
				container: $(".tg-menu-container"),
				menuitem: $('a.no-action'),
				submenuitem: $('.submenu'),
				isOpen: !1,
				isAnimating: !1
			},
			init: function() {
				this.bindUIActions()
			},
			bindUIActions: function() {
				var e = this.settings;
				e.menubtn.click(function() {
					Menu.toggle()
				});
				e.bg.click(function() {
					Menu.close()
				});
				e.container.click(function() {
					Menu.close()
				});
				e.closebtn.click(function() {
					Menu.close()
				});
				$(window).keydown(function(e) {
					e.which === 27 && Menu.close()
				});				
				e.submenuitem.click(function() {
					Menu.close()
				});				
				e.menuitem.click(function() {
					return false
				});
			},
			toggle: function() {
				var e = this.settings;
				e.isOpen ? Menu.close() : Menu.open()
			},
			open: function() {
				function t() {
					e.menu.addClass("is-active");
					e.closebtn.addClass("is-active");
					e.navigation.addClass("nav-up");
					e.isAnimating = !1,
					$.each($('.menu-item'), function(i, el){setTimeout(function(){$(el).animate({'opacity':1.0});},500 + ( i * 80 ));});				
				}
				var e = this.settings;
				if (e.isAnimating === !1) {
					e.isOpen = !0;
					e.isAnimating = !0;
					e.menu.css("display", "block");
					setTimeout(t, 100)
				}
			},
			close: function() {
				$.each($('.menu-item').get().reverse(), function(i, el){setTimeout(function(){$(el).css({'opacity':0});},1 + ( i * 60 ));});
				function t() {
					e.menu.css("display", "none");
					e.isAnimating = !1
				}
				var e = this.settings;
				if (e.isAnimating === !1) {
					e.isOpen = !1;
					e.isAnimating = !0;
					e.menu.removeClass("is-active");
					e.closebtn.removeClass("is-active");
					e.navigation.removeClass("nav-up");
					setTimeout(t, 1200)
				}
			}
		};
		
		if( $('.tg-overlay-menu').length > 0 ){
		
		Menu.init();
		
		}
		
		$(".submenu").hover(
			function () {
			 	$(this).parent().children('a').addClass("active");
			}, function () {
			 	$(this).parent().children('a').removeClass("active");
			}
		);
	
	
	}//End MenuOverlay
	


/*--------------------------------------------------
Function Menu Overlay Responsive
---------------------------------------------------*/	
	
	function MenuOverlayResponsive() {
	
		var winHeight = window.innerHeight
		var winWidth = window.innerWidth
		if (winWidth > 750) {
			$('.scr_menu').css( { 
				height : winHeight -250 + 'px',
				width : winWidth + 25 + 'px' 
			});
		} else {
			$('.scr_menu').css( { 
				height : winHeight -200 + 'px',
				width : winWidth + 25 + 'px' 
			});
		}
	
	}//End MenuOverlayNavPos
	
	
	
/*--------------------------------------------------
Function Hero Height
---------------------------------------------------*/	
	
	function HeroHeight() {
		if( $('#hero').length > 0 ){
			
			if ($('#hero').hasClass('hero-big')) {
				var heights = window.innerHeight;
				document.getElementById("hero").style.height = heights * 0.85 + "px";
			} else if ($('#hero').hasClass('hero-small')) {
				var heights = window.innerHeight;
				document.getElementById("hero").style.height = heights * 0.40 + "px";				
			} else  {			
				var heights = window.innerHeight;
				document.getElementById("hero").style.height = heights + "px";
			} 
			
		}
		
		if( $('#video-container').length > 0 ){
		
			$("#playmovie").css({'height':($("#hero").height()+'px')});
		
		}
		
	}//End HeroParallax
	
	
	
/*--------------------------------------------------
Function Hero Parallax
---------------------------------------------------*/	
	
	function HeroParallax() {
	
		var page_title = $('body');
			var block_intro = page_title.find('#hero');
			if( block_intro.length > 0 ) var block_intro_top = block_intro.offset().top;	
		$( window ).scroll(function() {
			var current_top = $(document).scrollTop(); 
			var hero_height = $('#hero').height();
			if( $('#hero').hasClass('parallax-hero')){			  
				block_intro.css('top', (current_top*0.5));			
			}
			if( $('#hero').hasClass('static-hero')){			  
				block_intro.css('top', (current_top*1));			
			}
			if( $('#hero').hasClass('opacity-hero')){				 
				block_intro.css('opacity', (1 - current_top/hero_height*1));
			}
		});
	
	}//End HeroParallax
	
	
	
/*--------------------------------------------------
Function Full Screen Slider
---------------------------------------------------*/	
		
	function FullScreenSlider() {
		
		if( $('.tg-slider').length > 0 ){	
			$('.tg-slider').flexslider({
				animation: "fade",
				direction: "horizontal",
				animationSpeed: 1000,
				animationLoop: true,
				controlNav: false,
				slideshow: false,				
				before: function(slider) {
					$('.tg-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'easeOutQuad', duration: 500});
					slider.slides.eq(slider.currentSlide).delay(500);
					slider.slides.eq(slider.animatingTo).delay(500);
				},
				after: function(slider) {
					$('.tg-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'easeOutQuad', duration: 500});			
				},
				useCSS: true			
			});
		}
		
		
	
	}//End FullScreenSlider
	
	
	
/*--------------------------------------------------
Function Slider Background Change Logo and Menu Color 
---------------------------------------------------*/	
		
	function SliderBg() {
		
		if ($('li.dark-bg').hasClass("flex-active-slide")){
		   $("#logo img").attr('src', 'images/logo_white.png');
		   $(".tg-menubtn .btn_menu_line").css('background-color', '#fff');			   
		}
		
		if ($('#hero').hasClass("dark-bg")){
		   $("#logo img").attr('src', 'images/logo_white.png');
		   $(".tg-menubtn .btn_menu_line").css('background-color', '#fff');			   
		}
			
		$('.flex-direction-nav').on("click touchstart",function(){
			if($('li.dark-bg').hasClass("flex-active-slide")){
				setTimeout(function(){
					$("#logo img").attr('src', 'images/logo_white.png');
					$(".tg-menubtn .btn_menu_line").css('background-color', '#fff');
				},900);
			}
			else {       
				setTimeout(function(){
					$("#logo img").attr('src', 'images/logo.png');
					$(".tg-menubtn .btn_menu_line").css('background-color', '#222');
				},900);
			}
		});
		
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= $("#hero").height()) {
				$("#logo img").attr('src', 'images/logo.png');
				$(".tg-menubtn .btn_menu_line").css('background-color', '#222');
			} else {				
				if($('li.dark-bg').hasClass("flex-active-slide")) {
					$("#logo img").attr('src', 'images/logo_white.png');
					$(".tg-menubtn .btn_menu_line").css('background-color', '#fff');
				}
				if ($('#hero').hasClass("dark-bg")){
				   $("#logo img").attr('src', 'images/logo_white.png');
				   $(".tg-menubtn .btn_menu_line").css('background-color', '#fff');			   
				}
			}
		});
	
	}//End SliderBg	
	
	
	
/*--------------------------------------------------
Function Classic Slider
---------------------------------------------------*/	
		
	function ClassicSlider() {
		
		if( $('.classic-slider').length > 0 ){	
			$('.classic-slider').flexslider({
				animation: "slide",
				direction: "horizontal",
				animationSpeed: 1000,
				animationLoop: true,
				controlNav: false,
				slideshow: false,						
			});
		}
		
	}//End ClassicSlider	
	
	
	
/*--------------------------------------------------
Function Masonry Portfolio
---------------------------------------------------*/	
		
	function MasonryPortfolio() {	
	
		if( $('#portfolio-wrap').length > 0 ){	
		
			var $container = $('#portfolio');
		
			$container.isotope({
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			$('#filters a').click(function(){
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector });		
				return false;
			});
				
			
			
			$(document).scroll(function () {
				if($('.auto-construct').length > 0 ){
					var y = $(this).scrollTop();
					var t = $('#portfolio').offset().top + $('#portfolio').height() - window.innerHeight;
					if (y > t) {
						$('#portfolio').removeClass('auto-construct')
					} 
				}
			});
			
			$(window).on( 'resize', function () {
			
				var winWidth = window.innerWidth;
				columnNumb = 1;			
				var attr_col = $('#portfolio').attr('data-col');
					
				 if (winWidth >= 1466) {
					
					$('#portfolio-wrap').css( {width : 1360  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 1280  + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
					
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
						
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 80 + 'px',
							height : postWidth - 80 + 'px',
							margin : 40 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 80 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 2 - 80 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 80 + 'px',
							height : postWidth * 2 - 80 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 2  + 'px'  
						});
					});
					
					
				} else if (winWidth > 1024) {
					
					$('#portfolio-wrap').css( {width : 1000  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 940  + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
								
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
					
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 60 + 'px',
							height : postWidth - 60 + 'px',
							margin : 30 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 60 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 2 - 60 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 60 + 'px',
							height : postWidth * 2 - 60 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 2  + 'px'  
						});
					});
					
					
				} else if (winWidth > 767) {
					
					$('#portfolio-wrap').css( {width : 640  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 600  + 'px'});
					
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 2;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 40 + 'px',
							height : postWidth - 40 + 'px',
							margin : 20 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 40 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 2 - 40 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 40 + 'px',
							height : postWidth * 2 - 40 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 2  + 'px'  
						});
					});
					
					
				}	else if (winWidth > 479) {
					
					$('#portfolio-wrap').css( {width : 440  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 400  + 'px'});
					
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 40 + 'px',
							height : postWidth  - 40 + 'px',
							margin : 20 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth - 40 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 2 - 40 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth - 40 + 'px',
							height : postWidth - 40 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth  + 'px',
							height : postWidth + 'px'  
						});
					});
					
					
				}
				
				else if (winWidth <= 479) {
					
					$('#portfolio-wrap').css( {width : 280  + 'px'});
					$('#portfolio-wrap.no-gutter').css( {width : 240  + 'px'});
					
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 40 + 'px',
							height : postWidth * 0.75 - 40 + 'px',
							margin : 20 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth * 0.75  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth - 40 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.item.tall').css( {
							height : postWidth * 1.5 - 40 + 'px'  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 1.5  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth - 40 + 'px',
							height : postWidth - 40 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth + 'px',
							height : postWidth + 'px'  
						});
					});
					
					
				}		
				return columnNumb;
				
			
			}).resize();
		
			$("#all").click();	
			
			
			if (window.innerWidth >= 1466) {
					if($('.auto-construct').length > 0 ){		
						$('.item').each(function(i){
							$(this).css({'opacity':0, 'margin-top':180 + 'px', 'margin-bottom':80 + 'px'});	
							
							if($('.auto-construct').length > 0 ){		
								$(this).appear(function() {							
									$(this).delay(i*50).animate({'opacity':1, 'margin-top':40 + 'px', 'margin-bottom':40 + 'px'},300,'easeOutSine');
								});
							}					
							
						});
					}
				} else if (window.innerWidth > 1024) {
					if($('.auto-construct').length > 0 ){		
						$('.item').each(function(i){
							$(this).css({'opacity':0, 'margin-top':180 + 'px', 'margin-bottom':80 + 'px'});	
							
							if($('.auto-construct').length > 0 ){		
								$(this).appear(function() {							
									$(this).delay(i*50).animate({'opacity':1, 'margin-top':30 + 'px', 'margin-bottom':30 + 'px'},300,'easeOutSine');
								});
							}					
							
						});
					}
			}
			
			
		}
	
	}//End MasonryPortfolio



/*--------------------------------------------------
Function Toggle Secondary Menu
---------------------------------------------------*/	
		
	function ToggleSecondaryMenu() {		
		
	$('.toggle-filters').click(function() {
		
		if ($("#filters").hasClass('filters-hide')){
			$("#filters").toggleClass("filters-hide");
			setTimeout(function(){
				$('html, body').animate({ scrollTop: $("#main").offset().top +1 }, 500);
			},( 100 ));		
		} else {
			$("#filters").toggleClass("filters-hide");
		}		
		if($(this).text()=="Filters")
		{
			$(this).text("Hide");
		} else {
			$(this).text("Filters");
		}
		return false;
	});
	
	
	$('.toggle-sm').click(function() {
		
		if ($("#contact-info").hasClass('contact-hide')){		
			$("#contact-info").toggleClass("contact-hide");	
			setTimeout(function(){
				$('html, body').animate({ scrollTop: $("#main").offset().top +1 }, 500);
			},( 100 ));			
		} else {
			$("#contact-info").toggleClass("contact-hide");
		}		
		if($(this).text()=="Contact")
		{
			$(this).text("Hide");
		} else {
			$(this).text("Contact");
		}
		return false;
	});	
	
	
	$('.toggle-search').click(function() {
		
		if ($("#search-box").hasClass('search-hide')){		
			$("#search-box").toggleClass("search-hide");	
			setTimeout(function(){
				$('html, body').animate({ scrollTop: $("#main").offset().top +1 }, 500);
			},( 100 ));			
		} else {
			$("#search-box").toggleClass("search-hide");
		}		
		if($(this).text()=="Search")
		{
			$(this).text("Hide");
		} else {
			$(this).text("Search");
		}
		return false;
	});
	
	
	$('.toggle-share').click(function() {
		
		if ($("#post-sharing").hasClass('share-hide')){		
			$("#post-sharing").toggleClass("share-hide");	
			setTimeout(function(){
				$('html, body').animate({ scrollTop: $("#main").offset().top +1 }, 500);
			},( 100 ));			
		} else {
			$("#post-sharing").toggleClass("share-hide");
		}		
		if($(this).text()=="Share")
		{
			$(this).text("Hide");
		} else {
			$(this).text("Share");
		}
		return false;
	});		
	
	
	}//End ToggleSecondaryMenu
	
	
	
/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/	
		
	function ContactMap() {	
	
	if( jQuery('#map_canvas').length > 0 ){	
		var settings = {
			zoom: 16,
			center: new google.maps.LatLng(43.270441,6.640888),
			mapTypeControl: false,
			scrollwheel: false,
			draggable: true,
			panControl:false,
			scaleControl: false,
			zoomControl: false,
			streetViewControl:false,
			navigationControl: false,
			mapTypeId: google.maps.MapTypeId.SATELLITE};		
		var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});	
		var contentString = '<div id="content-map-marker" style="text-align:left; padding-top:10px; padding-left:10px">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h4 id="firstHeading" class="firstHeading" style="color:#000; margin-bottom:0px;"><strong>Hello Friend!</strong></h4>'+
			'<div id="bodyContent">'+
			'<p style="font-family:Verdana; color:#999; font-size:12px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
			'</div>'+
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});	
		var companyImage = new google.maps.MarkerImage('images/marker.png',
			new google.maps.Size(58,63),<!-- Width and height of the marker -->
			new google.maps.Point(0,0),
			new google.maps.Point(35,20)<!-- Position of the marker -->
		);
		var companyPos = new google.maps.LatLng(43.270441,6.640888);	
		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyImage,               
			title:"Our Office",
			zIndex: 3});	
		google.maps.event.addListener(companyMarker, 'click', function() {
			infowindow.open(map,companyMarker);
		});	
	}
	
	return false
	
	}//End ContactMap
	
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( jQuery('#contact-formular').length > 0 ){
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
				$('#message').hide();
				$('#submit').attr('disabled','disabled');		
				$.post(action, {
					name: $('#name').val(),
					email: $('#email').val(),
					phone: $('#phone').val(),
					comments: $('#comments').val()
				},
				function(data){
					document.getElementById('message').innerHTML = data;
					$('#message').slideDown('slow');
					$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
					$('#submit').removeAttr('disabled');
					if(data.match('success') != null) $('#contactform').slideUp('slow');
	
				}
				);		
				});		
				return false;		
			});		
		}

	}//End ContactForm
	
	
	
/*--------------------------------------------------
Function BlogPost
---------------------------------------------------*/
	
	function BlogPost() {

		$("a.post-title").hover(
			 function () {
				 $(this).parent().parent().addClass("post-hover");
			 }, function () {
				 $(this).parent().parent().removeClass("post-hover");
			 }
		 );
		 
	}//End BlogPost	
	
	
	
/*--------------------------------------------------
Function AppearIteam
---------------------------------------------------*/	
		
	function AppearIteam() {		
		
		$('.has-animation').each(function() {	
			$(this).appear(function() {
				if($(this).attr('data-animation') == 'fade-in-from-left'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'left' : '0px'
					},500,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in-from-right'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'right' : '0px'
					},500,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'bottom' : '0px'
					},500,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in') {
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1
					},500,'easeOutSine');	
				} else if($(this).attr('data-animation') == 'grow-in') {
					var $that = $(this);
					setTimeout(function(){ 
						$that.transition({ scale: 1, 'opacity':1 },900,'easeInCubic');
					},$that.attr('data-delay'));
				}			
			},{accX: 0, accY: -105},'easeInCubic');
		
		});		
	
	}//End AppearIteam
	
	
/*--------------------------------------------------
Function VideoHeader
---------------------------------------------------*/
	
	function VideoHeader() {
		
		if( $('#video-container').length > 0 ){
		
			var onMobile = false;
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { onMobile = true; }
		
				if( ( onMobile === false ) ) {
		
					$(".player").mb_YTPlayer();
					
					setTimeout(function() {
						  $('#bgndVideo').pauseYTP();
					}, 1000);		
					
					$('#playmovie').click(function() {			
							$('#playmovie').addClass('hidden-play');
							setTimeout(function(){
								$('#playmovie').fadeOut();	
							}, 600);
							$('#bgndVideo').playYTP();
										
					});			
					
					$('#stopmovie').click(function() {			
						$('#playmovie').fadeIn(1);
						setTimeout(function(){
							$('#playmovie').removeClass('hidden-play');				
							$('#bgndVideo').pauseYTP();				
						}, 100);
					});	
			
				} else {
				
					/* as a fallback we add a special class to the header which displays a poster image */ 
					$('#home').addClass('video-section');
					
					/* hide player */
					$(".player").hide();
					
					$(".play-icon").hide();
					
				}
				
		}
				 
	}//End VideoHeader	
	
	
	
				
/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/	
		
	function Shortcodes() {			
		
		//Progress bar animations	
		$('.progress-bar li').each(function(i){		
			$(this).appear(function(){			
				var percent = $(this).find('span').attr('data-width');
				var $endNum = parseInt($(this).find('span strong i').text());
				var $that = $(this);			
				$(this).find('span').animate({
					'width' : percent + '%'
				},1600, function(){
				});			
				$(this).find('span strong').animate({
					'opacity' : 1
				},1400);			
				$(this).find('span strong i').countTo({
					from: 0,
					to: $endNum,
					speed: 1200,
					refreshInterval: 30,
					onComplete: function(){}
				});	 
				if(percent == '100'){
					$that.find('span strong').addClass('full');
				}	
			});
		});	
		
		
		// Accordion	  
		$('dl.accordion dt').filter(':first-child').addClass('accordion-active');
		$('dd.accordion-content').filter(':nth-child(n+3)').slideUp(1).addClass('hide');		
		$('dl.accordion').on('click', 'dt', function() {
			$(this).addClass('accordion-active').next().slideDown(200).siblings('dd.accordion-content').slideUp(200).prev().removeClass('accordion-active');						
		});	
		$('dl.accordion').on('click', 'dt.accordion-active', function() {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(200);
		});
		
		
		// Toggle	
		$(".toggle_container").hide(); 
		$("span.toggle-title").click(function(){
			$(this).toggleClass("toggle-active").next().slideToggle("normal");
			return false; 
		});
		
		
		// Tabs	
		$(".tab_container").hide(); 
		$("ul.tabs li:first").addClass("tab-active").show(); 
		$(".tab_container:first").show(); 		
		$("ul.tabs li").click(function() {
			$("ul.tabs li").removeClass("tab-active"); 
			$(this).addClass("tab-active"); 
			$(".tab_container").hide(); 
			var activeTab = $(this).find("a").attr("href"); 
			$(activeTab).fadeIn(); 
			return false;
		});
			
			
		// Milestone counters
		$('.tg-counter').each(function() {
			$(this).appear(function() {
				var $endNum = parseInt($(this).find('.number').text());
				$(this).find('.number').countTo({
					from: 0,
					to: $endNum,
					speed: 1500,
					refreshInterval: 30
				});
			},{accX: 0, accY: 0});
		});
		
		
		//Fading Out AlertBox
		$('.shortcode_alertbox').find('.box_close').click(function(){
			$(this).parents('.alertboxes').animate({opacity:0},300).animate({height:"0px"});
		});	
		
		
		//ColorBox
		$('a.gallery').colorbox({rel:'gal', maxWidth: "95%", maxHeight: "95%"});
		
		
		//Parallax
		$('.parallax').each(function(){	
			$(this).parallax("30%", 0.1);	
		});
		
		
		// Radial Counters	
		if( jQuery('.radial-counter').length > 0 ){		
			$(".knob").knob({
				width: 140,
				height: 140,
				fgColor: '#eee',
				bgColor: '#fff',
				inputColor: '#fff',
				dynamicDraw: true,
				thickness: 0.05,
				tickColorizeValues: true,
				skin:'tron',
				readOnly:true,
			});	
			$(".knob").appear(function(e){			
				var $this = $(this);
				var myVal = $this.attr("data-gal");	
			   $({value: 0}).animate({value: myVal}, {
				   duration: 2000,
				   easing: 'swing',
				   step: function () {
					   $this.val(Math.ceil(this.value)).trigger('change');
				   }
			   })			
			});	
		}
		
		
		//Video Image Play Cover
		$('.vimeo a,.youtube a').click(function (e) {
			e.preventDefault();
			var videoLink = $(this).attr('href');
			var classeV = $(this).parent();
			var PlaceV = $(this).parent();
			if ($(this).parent().hasClass('youtube')) {
				$(this).parent().wrapAll('<div class="cntVid">');
				$(PlaceV).html('<iframe frameborder="0" height="333" src="' + videoLink + '?autoplay=1&showinfo=0" title="YouTube video player" width="547"></iframe>');
			} else {
				$(this).parent().wrapAll('<div class="cntVid">');
				$(PlaceV).html('<iframe src="' + videoLink + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;color=ffffff" width="500" height="281" frameborder="0"></iframe>');
			}
		});
			
	
	}//End Shortcodes
	
	
	
/*--------------------------------------------------
Function TwitterFeed
---------------------------------------------------*/	
		
	function TwitterFeed() {
		
		if ($('#twitter-feed').length > 0 ){
			$('#twitter-feed').tweet({
				username: 'envato',
				join_text: 'auto',
				avatar_size: 0,
				count: 3
			});
			
			$('#twitter-feed').find('ul').addClass('slides');
			$('#twitter-feed').find('ul li').addClass('slide');
			$('.twitter-slider').flexslider({
				animation: "slide",
				direction: "horizontal",
				smoothHeight: true,
				controlNav: true,
				controlsContainer:".twitter-nav",
				directionNav: false,
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		};
	
	
	}//End TwitterFeed
	

})//End All


