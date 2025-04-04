/*-----------------------------------------------------------------------------------

    Theme Name: Monity - CCTV & Security WordPress Theme
    Description: CCTV & Security WordPress Theme
    Author: Website Design Templates
    Version: 1.3

    ---------------------------------- */

(function($) {

    "use strict";

    var $window = $(window);

    $("#preloader").fadeOut("normall", function() {
        $(this).remove()
    }), $window.on("scroll", function() {
        $window.scrollTop() < $(".navbar-default").outerHeight() + 200 ? $("header").removeClass("scrollHeader").addClass("fixedHeader") : ($("header").removeClass("fixedHeader").addClass("scrollHeader"), $(".fixed-header header").removeClass("scrollHeader").addClass("fixedHeader"))
    });

    const scrollTopPercentage = () => {
        const scrollPercentage = () => {
            const scrollTopPos = document.documentElement.scrollTop;
            const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
            const scrollElementWrap = $(".scroll-top-percentage");

            scrollElementWrap.css("background", `conic-gradient( #fcaf17 ${scrollValue}%, #1158e7 ${scrollValue}%)`);

            if (scrollTopPos > 100) {
                scrollElementWrap.addClass("active");
            } else {
                scrollElementWrap.removeClass("active");
            }

            if (scrollValue < 96) {
                $("#scroll-value").text(`${scrollValue}%`);
            } else {
                $("#scroll-value").html('<i class="fa-solid fa-angle-up"></i>');
            }
        }
        window.onscroll = scrollPercentage;
        window.onload = scrollPercentage;

        // Back to Top
        function scrollToTop() {
            document.documentElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        $(".scroll-top-percentage").on("click", scrollToTop);
    }
    scrollTopPercentage();

    var pageSection = $(".parallax,.bg-img");
    pageSection.each(function(t) {
        $(this).attr("data-background") && $(this).css("background-image", "url(" + $(this).data("background") + ")")
    }), $(".story-video").magnificPopup({
        delegate: ".video",
        type: "iframe"
    }), $(".popup-social-video").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1
    });
    var wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !1,
        live: !0
    });

    function monity_quantity_icon() {
        $(".single-product .cart .quantity").append('<span class="quantity-icon"><input class="plus" type="button" value="+"><input class="minus" type="button" value="-"></span>'), $(".plus").on("click", function() {
            $(this).parents(".quantity").find('input[type="number"]').get(0).stepUp(), $(this).parents(".woocommerce-cart-form").find(".actions .button").removeAttr("disabled")
        }), $(".minus").on("click", function() {
            $(this).parents(".quantity").find('input[type="number"]').get(0).stepDown(), $(this).parents(".woocommerce-cart-form").find(".actions .button").removeAttr("disabled")
        }), $(".woocommerce-cart-form .actions .button").removeAttr("disabled")
    }

    function SetResizeContent() {
        $(window).width() < 992 && $(".navbar-nav .dropdown-menu.sub-menu").css("display", "none")
    }
    wow.init(), $(".wpml-ls-menu-item a, .pll-parent-menu-item a, .lang-item a").each(function() {
        var t = $(this),
            e = t.text();
        t.html(e.replace("&lt", "<").replace("&gt", ">"))
    }), 0 !== $(".woocommerce").length && (monity_quantity_icon(), $(document).ajaxComplete(function() {
        monity_quantity_icon()
    })), $window.resize(function(t) {
        setTimeout(function() {
            SetResizeContent()
        }, 500), t.preventDefault()
    }), SetResizeContent();


    // === when document ready === //
    $(document).ready(function() {

        $(".service-carousel").owlCarousel({
            center: !1,
            items: 2,
            loop: !0,
            dots: !1,
            margin: 0,
            autoplay: !0,
            autoplayTimeout: 5e3,
            smartSpeed: 900,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2,
                    center: !1
                },
                1200: {
                    items: 3,
                    center: !1
                },
                1400: {
                    items: 3
                }
            }
        }),$(".service-carousel1").owlCarousel({
            center: false,
            items: 2,
            loop: true,
            dots: false,
            nav: true,
            navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
            margin: 28,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1399: {
                    items: 4
                },
                1599: {
                    items: 5
                }
            }
        });
         $(".service-slider").owlCarousel({
            center: !1,
            items: 2,
            loop: !0,
            dots: !1,
            nav: !0,
            navText: ["<i class='fa-solid fa-arrow-left text-primary'></i>", "<i class='fa-solid fa-arrow-right text-primary'></i>"],
            margin: 30,
            autoplay: !0,
            autoplayTimeout: 5e3,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1400: {
                    items: 4
                }
            }
        }), $(".testimonial-style1").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            margin: 0,
            autoplay: !0,
            thumbs: !0,
            thumbsPrerendered: !0,
            autoplayTimeout: 5e3,
            items: 1,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1,
                    nav: !1
                },
                600: {
                    items: 1,
                    nav: !1
                },
                768: {
                    items: 1
                }
            }
        }), $(".testimonial-carousel1").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            margin: 20,
            autoplay: !0,
            thumbs: !0,
            thumbsPrerendered: !0,
            autoplayTimeout: 5e3,
            items: 1,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1,
                    nav: !1
                },
                600: {
                    items: 1,
                    nav: !1
                },
                1e3: {
                    items: 1
                }
            }
        }), $(".testimonial-carousel2").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            margin: 30,
            autoplay: !0,
            autoplayTimeout: 5e3,
            items: 1,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1e3: {
                    items: 1
                }
            }
        }), $(".testimonial-carousel4").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            nav: !0,
            dots: !1,
            margin: 40,
            autoplay: !0,
            thumbs: !0,
            thumbsPrerendered: !0,
            autoplayTimeout: 5e3,
            smartSpeed: 1500,
            items: 1
        }), $(".testimonial-style4").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            autoplayTimeout: 5e3,
            items: 1,
            smartSpeed: 1500,
            nav: !0,
            dots: !0,
            center: !1,
            margin: 10,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 1
                },
                1400: {
                    items: 1
                }
            }
        }), $(".portfolio-carousel-one").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            center: !1,
            autoplayTimeout: 5e3,
            smartSpeed: 1500,
            nav: !1,
            dots: !1,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                767: {
                    items: 2
                },
                1199: {
                    items: 3
                },
                1599: {
                    items: 4
                }
            }
        }), $(".portfolio-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            center: !1,
            autoplayTimeout: 5e3,
            smartSpeed: 1500,
            nav: !1,
            dots: !1,
            margin: 20,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        }), $(".portfolio-carousel-02").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            center: !1,
            autoplayTimeout: 5e3,
            smartSpeed: 1500,
            nav: !0,
            navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
            dots: !1,
            margin: 30,
            responsive: {
                0: {
                    items: 1,
                    nav: !1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        }), $(".project-detail-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 900,
            nav: !1,
            dots: !0,
            center: !1,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2,
                    margin: 15
                },
                768: {
                    items: 2,
                    margin: 15
                },
                992: {
                    items: 3
                }
            }
        }), $(".client-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !1,
            center: !1,
            margin: 0,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                992: {
                    items: 1
                }
            }
        }), $(".client-style1").owlCarousel({
            loop: !0,
            nav: !1,
            dots: !1,
            autoplay: !0,
            smartSpeed: 1500,
            autoplayTimeout: 12e3,
            responsiveClass: !0,
            autoplayHoverPause: !1,
            responsive: {
                0: {
                    items: 1,
                    margin: 30
                },
                481: {
                    items: 2,
                    margin: 15
                },
                576: {
                    items: 3,
                    margin: 30
                },
                992: {
                    items: 4,
                    margin: 40
                },
                1200: {
                    items: 5,
                    margin: 60
                },
                1600: {
                    items: 7,
                    margin: 80
                }
            }
        }), $(".team-carousel").owlCarousel({
            center: !1,
            items: 2,
            loop: !0,
            dots: !1,
            margin: 30,
            autoplay: !0,
            autoplayTimeout: 5e3,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2,
                    center: !1
                },
                1200: {
                    items: 2,
                    center: !1
                },
                1399: {
                    items: 2
                }
            }
        }), $(".slider-fade1").owlCarousel({
            items: 1,
            loop: !0,
            dots: !1,
            margin: 0,
            nav: !0,
            navText: ["<i class='fa-solid fa-arrow-left text-secondary'></i>", "<i class='fa-solid fa-arrow-right text-secondary'></i>"],
            autoplay: !0,
            smartSpeed: 1500,
            mouseDrag: !1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            responsive: {
                992: {
                    nav: !1,
                    dots: !0
                }
            }
        }), $(".slider-fade2").owlCarousel({
            items: 1,
            loop: !0,
            dots: !0,
            margin: 0,
            nav: !1,
            navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
            autoplay: !0,
            autoplayTimeout: 6e3,
            smartSpeed: 1500,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            responsive: {
                992: {
                    nav: !0,
                    dots: !1
                }
            }
        }), $(".slider-fade3").owlCarousel({
            items: 1,
            loop: !0,
            dots: !0,
            margin: 0,
            nav: !1,
            navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
            autoplay: !0,
            autoplayTimeout: 6e3,
            smartSpeed: 1500,
            mouseDrag: !1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            responsive: {
                992: {
                    nav: !0,
                    dots: !1
                }
            }
        }), $(".owl-carousel").owlCarousel({
            items: 1,
            loop: !0,
            dots: !1,
            margin: 0,
            autoplay: !0,
            smartSpeed: 500
        });
        var owl = $(".slider-fade1");
        owl.on("changed.owl.carousel", function(e) {
            e = e.item.index - 2;
            $("span").removeClass("animated fadeInUp"), $("h1").removeClass("animated fadeInUp"), $("p").removeClass("animated fadeInUp"), $("a").removeClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("span").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("h1").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("p").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("a").addClass("animated fadeInUp")
        }), (owl = $(".slider-fade3")).on("changed.owl.carousel", function(e) {
            e = e.item.index - 2;
            $("span").removeClass("animated fadeInUp"), $("h1").removeClass("animated fadeInUp"), $("a").removeClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("span").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("h1").addClass("animated fadeInUp"), $(".owl-item").not(".cloned").eq(e).find("a").addClass("animated fadeInUp")
        }), $(".countdown").countdown({
            date: "01 Jun 2027 00:01:00",
            format: "on"
        }), $(".current-year").text((new Date).getFullYear()), $(".navbar-nav li.has-sub").removeClass("active"), $("header").hasClass("header-style1") && $("body").addClass("header-style1"), $("header").hasClass("header-style2") && $("body").addClass("header-style2"), $("header").hasClass("header-style3") && $("body").addClass("header-style3"), $(".odometer").waypoint(function(e) {
            "down" === e && (e = $(this.element).attr("data-count"), $(this.element).html(e))
        }, {
            offset: "80%"
        });

    });

    function wlt_overlay_bg() {
        $(".wlt-overlay-bg").hasClass("active") ? $(".wlt-overlay-bg").animate({
            opacity: "0"
        }, 500, function() {
            $(".wlt-overlay-bg").removeClass("active").hide()
        }) : $(".wlt-overlay-bg").addClass("active").show().animate({
            opacity: "1"
        }, 500, function() {})
    }
    $(document).ready(function() {
        $(".wlt-btn, .wlt-overlay-bg").on("click", function() {
            wlt_overlay_bg(), $(".wlt-sidebar-main").toggleClass("active")
        }), $(".wlt-sidebar-inner").scrollbar()
    });

    // === when window loading === //
    $window.on("load", function() {

        $(".portfolio-gallery").lightGallery(), $(".portfolio-link").on("click", o => {
            o.stopPropagation()
        });

    });

})(jQuery);