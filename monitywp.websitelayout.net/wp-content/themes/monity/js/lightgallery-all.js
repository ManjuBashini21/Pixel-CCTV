! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(m) {
    ! function() {
        "use strict";
        var o = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            ariaLabelledby: "",
            ariaDescribedby: "",
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1,
            supportLegacyBrowser: !0
        };

        function t(e, t) {
            if (this.el = e, this.$el = m(e), this.s = m.extend({}, o, t), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBarTimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = m(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(m(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
        }
        t.prototype.init = function() {
            var e = this;
            e.s.preload > e.$items.length && (e.s.preload = e.$items.length);
            var t = window.location.hash;
            0 < t.indexOf("lg=" + this.s.galleryId) && (e.index = parseInt(t.split("&slide=")[1], 10), m("body").addClass("lg-from-hash"), m("body").hasClass("lg-on") || (setTimeout(function() {
                e.build(e.index)
            }), m("body").addClass("lg-on"))), e.s.dynamic ? (e.$el.trigger("onBeforeOpen.lg"), e.index = e.s.index || 0, m("body").hasClass("lg-on") || setTimeout(function() {
                e.build(e.index), m("body").addClass("lg-on")
            })) : e.$items.on("click.lgcustom", function(t) {
                try {
                    t.preventDefault(), t.preventDefault()
                } catch (e) {
                    t.returnValue = !1
                }
                e.$el.trigger("onBeforeOpen.lg"), e.index = e.s.index || e.$items.index(this), m("body").hasClass("lg-on") || (e.build(e.index), m("body").addClass("lg-on"))
            })
        }, t.prototype.build = function(e) {
            var t = this;
            t.structure(), m.each(m.fn.lightGallery.modules, function(e) {
                t.modules[e] = new m.fn.lightGallery.modules[e](t.el)
            }), t.slide(e, !1, !1, !1), t.s.keyPress && t.keyPress(), 1 < t.$items.length ? (t.arrow(), setTimeout(function() {
                t.enableDrag(), t.enableSwipe()
            }, 50), t.s.mousewheel && t.mousewheel()) : t.$slide.on("click.lg", function() {
                t.$el.trigger("onSlideClick.lg")
            }), t.counter(), t.closeGallery(), t.$el.trigger("onAfterOpen.lg"), 0 < t.s.hideBarsDelay && t.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                t.$outer.removeClass("lg-hide-items"), clearTimeout(t.hideBarTimeout), t.hideBarTimeout = setTimeout(function() {
                    t.$outer.addClass("lg-hide-items")
                }, t.s.hideBarsDelay)
            }), t.$outer.trigger("mousemove.lg")
        }, t.prototype.structure = function() {
            var e = "",
                t = "",
                o = 0,
                i = "",
                s = this;
            for (m("body").append('<div class="lg-backdrop"></div>'), m(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), o = 0; o < this.$items.length; o++) e += '<div class="lg-item"></div>';
            this.s.controls && 1 < this.$items.length && (t = '<div class="lg-actions"><button type="button" aria-label="Previous slide" class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button type="button" aria-label="Next slide" class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (i = '<div role="status" aria-live="polite" class="lg-sub-html"></div>');
            var i = '<div tabindex="-1" aria-modal="true" ' + (this.s.ariaLabelledby ? 'aria-labelledby="' + this.s.ariaLabelledby + '"' : "") + " " + (this.s.ariaDescribedby ? 'aria-describedby="' + this.s.ariaDescribedby + '"' : "") + ' role="dialog" class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + e + '</div><div class="lg-toolbar lg-group"><button type="button" aria-label="Close gallery" class="lg-close lg-icon"></button></div>' + t + i + "</div></div>";
            m("body").append(i), this.$outer = m(".lg-outer"), this.$outer.focus(), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), s.setTop(), m(window).on("resize.lg orientationchange.lg", function() {
                setTimeout(function() {
                    s.setTop()
                }, 100)
            }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && 1 < this.$items.length && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss() && ((i = this.$outer.find(".lg-inner")).css("transition-timing-function", this.s.cssEasing), i.css("transition-duration", this.s.speed + "ms")), setTimeout(function() {
                m(".lg-backdrop").addClass("in")
            }), setTimeout(function() {
                s.$outer.addClass("lg-visible")
            }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" aria-label="Download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = m(window).scrollTop()
        }, t.prototype.setTop = function() {
            var e, t, o;
            "100%" !== this.s.height && (t = ((e = m(window).height()) - parseInt(this.s.height, 10)) / 2, o = this.$outer.find(".lg"), e >= parseInt(this.s.height, 10) ? o.css("top", t + "px") : o.css("top", "0px"))
        }, t.prototype.doCss = function() {
            return !! function() {
                for (var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], t = document.documentElement, o = 0, o = 0; o < e.length; o++)
                    if (e[o] in t.style) return !0
            }()
        }, t.prototype.isVideo = function(e, t) {
            var o = this.s.dynamic ? this.s.dynamicEl[t].html : this.$items.eq(t).attr("data-html");
            if (!e) return o ? {
                html5: !0
            } : (console.error("lightGallery :- data-src is not provided on slide item " + (t + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
            var i = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                o = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                t = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                e = e.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return i ? {
                youtube: i
            } : o ? {
                vimeo: o
            } : t ? {
                dailymotion: t
            } : e ? {
                vk: e
            } : void 0
        }, t.prototype.counter = function() {
            this.s.counter && m(this.s.appendCounterTo).append('<div id="lg-counter" role="status" aria-live="polite"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
        }, t.prototype.addHtml = function(e) {
            var t, o, i, s = null;
            this.s.dynamic ? this.s.dynamicEl[e].subHtmlUrl ? t = this.s.dynamicEl[e].subHtmlUrl : s = this.s.dynamicEl[e].subHtml : (o = this.$items.eq(e)).attr("data-sub-html-url") ? t = o.attr("data-sub-html-url") : (s = o.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !s && (s = o.attr("title") || o.find("img").first().attr("alt"))), t || (null != s ? "." !== (i = s.substring(0, 1)) && "#" !== i || (s = (this.s.subHtmlSelectorRelative && !this.s.dynamic ? o.find(s) : m(s)).html()) : s = ""), ".lg-sub-html" === this.s.appendSubHtmlTo ? t ? this.$outer.find(this.s.appendSubHtmlTo).load(t) : this.$outer.find(this.s.appendSubHtmlTo).html(s) : t ? this.$slide.eq(e).load(t) : this.$slide.eq(e).append(s), null != s && ("" === s ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [e])
        }, t.prototype.preload = function(e) {
            for (var t = 1, o = 1, t = 1; t <= this.s.preload && !(t >= this.$items.length - e); t++) this.loadContent(e + t, !1, 0);
            for (o = 1; o <= this.s.preload && !(e - o < 0); o++) this.loadContent(e - o, !1, 0)
        }, t.prototype.loadContent = function(t, e, o) {
            var i, a, s, r, l, n, d = this,
                c = !1,
                u = function(e) {
                    for (var t = [], o = [], i = 0; i < e.length; i++) {
                        var s = e[i].split(" ");
                        "" === s[0] && s.splice(0, 1), o.push(s[0]), t.push(s[1])
                    }
                    for (var r = m(window).width(), l = 0; l < t.length; l++)
                        if (parseInt(t[l], 10) > r) {
                            a = o[l];
                            break
                        }
                },
                h = d.s.dynamic ? (d.s.dynamicEl[t].poster && (c = !0, s = d.s.dynamicEl[t].poster), l = d.s.dynamicEl[t].html, a = d.s.dynamicEl[t].src, n = d.s.dynamicEl[t].alt, d.s.dynamicEl[t].responsive && u(d.s.dynamicEl[t].responsive.split(",")), r = d.s.dynamicEl[t].srcset, d.s.dynamicEl[t].sizes) : ((g = d.$items.eq(t)).attr("data-poster") && (c = !0, s = g.attr("data-poster")), l = g.attr("data-html"), a = g.attr("href") || g.attr("data-src"), n = g.attr("title") || g.find("img").first().attr("alt"), g.attr("data-responsive") && u(g.attr("data-responsive").split(",")), r = g.attr("data-srcset"), g.attr("data-sizes")),
                u = !1;
            d.s.dynamic ? d.s.dynamicEl[t].iframe && (u = !0) : "true" === d.$items.eq(t).attr("data-iframe") && (u = !0);
            var g = d.isVideo(a, t);
            if (!d.$slide.eq(t).hasClass("lg-loaded")) {
                if (u ? d.$slide.eq(t).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + d.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + a + '"  allowfullscreen="true"></iframe></div></div>') : c ? (u = "", u = g && g.youtube ? "lg-has-youtube" : g && g.vimeo ? "lg-has-vimeo" : "lg-has-html5", d.$slide.eq(t).prepend('<div class="lg-video-cont ' + u + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + s + '" /></div></div>')) : g ? (d.$slide.eq(t).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), d.$el.trigger("hasVideo.lg", [t, a, l])) : (n = n ? 'alt="' + n + '"' : "", d.$slide.eq(t).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" ' + n + ' src="' + a + '" /></div>')), d.$el.trigger("onAferAppendSlide.lg", [t]), i = d.$slide.eq(t).find(".lg-object"), h && i.attr("sizes", h), r && (i.attr("srcset", r), this.s.supportLegacyBrowser)) try {
                    picturefill({
                        elements: [i[0]]
                    })
                } catch (e) {
                    console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                }
                ".lg-sub-html" !== this.s.appendSubHtmlTo && d.addHtml(t), d.$slide.eq(t).addClass("lg-loaded")
            }
            d.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                var e = 0;
                o && !m("body").hasClass("lg-from-hash") && (e = o), setTimeout(function() {
                    d.$slide.eq(t).addClass("lg-complete"), d.$el.trigger("onSlideItemLoad.lg", [t, o || 0])
                }, e)
            }), g && g.html5 && !c && d.$slide.eq(t).addClass("lg-complete"), !0 === e && (d.$slide.eq(t).hasClass("lg-complete") ? d.preload(t) : d.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                d.preload(t)
            }))
        }, t.prototype.slide = function(e, t, o, i) {
            var s, r, l, a, n, d = this.$outer.find(".lg-current").index(),
                c = this;
            c.lGalleryOn && d === e || (s = this.$slide.length, r = c.lGalleryOn ? this.s.speed : 0, c.lgBusy || (this.s.download && ((l = c.s.dynamic ? !1 !== c.s.dynamicEl[e].downloadUrl && (c.s.dynamicEl[e].downloadUrl || c.s.dynamicEl[e].src) : "false" !== c.$items.eq(e).attr("data-download-url") && (c.$items.eq(e).attr("data-download-url") || c.$items.eq(e).attr("href") || c.$items.eq(e).attr("data-src"))) ? (m("#lg-download").attr("href", l), c.$outer.removeClass("lg-hide-download")) : c.$outer.addClass("lg-hide-download")), this.$el.trigger("onBeforeSlide.lg", [d, e, t, o]), c.lgBusy = !0, clearTimeout(c.hideBarTimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                c.addHtml(e)
            }, r), this.arrowDisable(e), i || (e < d ? i = "prev" : d < e && (i = "next")), t ? (this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), 2 < s ? (a = e - 1, n = e + 1, (0 === e && d === s - 1 || e === s - 1 && 0 === d) && (n = 0, a = s - 1)) : (a = 0, n = 1), "prev" === i ? c.$slide.eq(n).addClass("lg-next-slide") : c.$slide.eq(a).addClass("lg-prev-slide"), c.$slide.eq(e).addClass("lg-current")) : (c.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === i ? (this.$slide.eq(e).addClass("lg-prev-slide"), this.$slide.eq(d).addClass("lg-next-slide")) : (this.$slide.eq(e).addClass("lg-next-slide"), this.$slide.eq(d).addClass("lg-prev-slide")), setTimeout(function() {
                c.$slide.removeClass("lg-current"), c.$slide.eq(e).addClass("lg-current"), c.$outer.removeClass("lg-no-trans")
            }, 50)), c.lGalleryOn ? (setTimeout(function() {
                c.loadContent(e, !0, 0)
            }, this.s.speed + 50), setTimeout(function() {
                c.lgBusy = !1, c.$el.trigger("onAfterSlide.lg", [d, e, t, o])
            }, this.s.speed)) : (c.loadContent(e, !0, c.s.backdropDuration), c.lgBusy = !1, c.$el.trigger("onAfterSlide.lg", [d, e, t, o])), c.lGalleryOn = !0, this.s.counter && m("#lg-counter-current").text(e + 1)), c.index = e)
        }, t.prototype.goToNextSlide = function(e) {
            var t = this,
                o = t.s.loop;
            e && t.$slide.length < 3 && (o = !1), t.lgBusy || (t.index + 1 < t.$slide.length ? (t.index++, t.$el.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1, "next")) : o ? (t.index = 0, t.$el.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1, "next")) : t.s.slideEndAnimatoin && !e && (t.$outer.addClass("lg-right-end"), setTimeout(function() {
                t.$outer.removeClass("lg-right-end")
            }, 400)))
        }, t.prototype.goToPrevSlide = function(e) {
            var t = this,
                o = t.s.loop;
            e && t.$slide.length < 3 && (o = !1), t.lgBusy || (0 < t.index ? (t.index--, t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1, "prev")) : o ? (t.index = t.$items.length - 1, t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1, "prev")) : t.s.slideEndAnimatoin && !e && (t.$outer.addClass("lg-left-end"), setTimeout(function() {
                t.$outer.removeClass("lg-left-end")
            }, 400)))
        }, t.prototype.keyPress = function() {
            var t = this;
            1 < this.$items.length && m(window).on("keyup.lg", function(e) {
                1 < t.$items.length && (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()), 39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()))
            }), m(window).on("keydown.lg", function(e) {
                !0 === t.s.escKey && 27 === e.keyCode && (e.preventDefault(), t.$outer.hasClass("lg-thumb-open") ? t.$outer.removeClass("lg-thumb-open") : t.destroy())
            })
        }, t.prototype.arrow = function() {
            var e = this;
            this.$outer.find(".lg-prev").on("click.lg", function() {
                e.goToPrevSlide()
            }), this.$outer.find(".lg-next").on("click.lg", function() {
                e.goToNextSlide()
            })
        }, t.prototype.arrowDisable = function(e) {
            !this.s.loop && this.s.hideControlOnEnd && (e + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), 0 < e ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }, t.prototype.setTranslate = function(e, t, o) {
            this.s.useLeft ? e.css("left", t) : e.css({
                transform: "translate3d(" + t + "px, " + o + "px, 0px)"
            })
        }, t.prototype.touchMove = function(e, t) {
            e = t - e;
            15 < Math.abs(e) && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), e, 0), this.setTranslate(m(".lg-prev-slide"), -this.$slide.eq(this.index).width() + e, 0), this.setTranslate(m(".lg-next-slide"), this.$slide.eq(this.index).width() + e, 0))
        }, t.prototype.touchEnd = function(e) {
            var t = this;
            "lg-slide" !== t.s.mode && t.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                t.$outer.removeClass("lg-dragging"), e < 0 && Math.abs(e) > t.s.swipeThreshold ? t.goToNextSlide(!0) : 0 < e && Math.abs(e) > t.s.swipeThreshold ? t.goToPrevSlide(!0) : Math.abs(e) < 5 && t.$el.trigger("onSlideClick.lg"), t.$slide.removeAttr("style")
            }), setTimeout(function() {
                t.$outer.hasClass("lg-dragging") || "lg-slide" === t.s.mode || t.$outer.removeClass("lg-slide")
            }, t.s.speed + 100)
        }, t.prototype.enableSwipe = function() {
            var t = this,
                o = 0,
                i = 0,
                s = !1;
            t.s.enableSwipe && t.doCss() && (t.$slide.on("touchstart.lg", function(e) {
                t.$outer.hasClass("lg-zoomed") || t.lgBusy || (e.preventDefault(), t.manageSwipeClass(), o = e.originalEvent.targetTouches[0].pageX)
            }), t.$slide.on("touchmove.lg", function(e) {
                t.$outer.hasClass("lg-zoomed") || (e.preventDefault(), i = e.originalEvent.targetTouches[0].pageX, t.touchMove(o, i), s = !0)
            }), t.$slide.on("touchend.lg", function() {
                t.$outer.hasClass("lg-zoomed") || (s ? (s = !1, t.touchEnd(i - o)) : t.$el.trigger("onSlideClick.lg"))
            }))
        }, t.prototype.enableDrag = function() {
            var t = this,
                o = 0,
                i = 0,
                s = !1,
                r = !1;
            t.s.enableDrag && t.doCss() && (t.$slide.on("mousedown.lg", function(e) {
                t.$outer.hasClass("lg-zoomed") || t.lgBusy || m(e.target).text().trim() || (e.preventDefault(), t.manageSwipeClass(), o = e.pageX, s = !0, t.$outer.scrollLeft += 1, --t.$outer.scrollLeft, t.$outer.removeClass("lg-grab").addClass("lg-grabbing"), t.$el.trigger("onDragstart.lg"))
            }), m(window).on("mousemove.lg", function(e) {
                s && (r = !0, i = e.pageX, t.touchMove(o, i), t.$el.trigger("onDragmove.lg"))
            }), m(window).on("mouseup.lg", function(e) {
                r ? (r = !1, t.touchEnd(i - o), t.$el.trigger("onDragend.lg")) : (m(e.target).hasClass("lg-object") || m(e.target).hasClass("lg-video-play")) && t.$el.trigger("onSlideClick.lg"), s && (s = !1, t.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
            }))
        }, t.prototype.manageSwipeClass = function() {
            var e = this.index + 1,
                t = this.index - 1;
            this.s.loop && 2 < this.$slide.length && (0 === this.index ? t = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (e = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), -1 < t && this.$slide.eq(t).addClass("lg-prev-slide"), this.$slide.eq(e).addClass("lg-next-slide")
        }, t.prototype.mousewheel = function() {
            var t = this;
            t.$outer.on("mousewheel.lg", function(e) {
                e.deltaY && (0 < e.deltaY ? t.goToPrevSlide() : t.goToNextSlide(), e.preventDefault())
            })
        }, t.prototype.closeGallery = function() {
            var t = this,
                o = !1;
            this.$outer.find(".lg-close").on("click.lg", function() {
                t.destroy()
            }), t.s.closable && (t.$outer.on("mousedown.lg", function(e) {
                o = !!(m(e.target).is(".lg-outer") || m(e.target).is(".lg-item ") || m(e.target).is(".lg-img-wrap"))
            }), t.$outer.on("mousemove.lg", function() {
                o = !1
            }), t.$outer.on("mouseup.lg", function(e) {
                (m(e.target).is(".lg-outer") || m(e.target).is(".lg-item ") || m(e.target).is(".lg-img-wrap") && o) && (t.$outer.hasClass("lg-dragging") || t.destroy())
            }))
        }, t.prototype.destroy = function(e) {
            var t = this;
            e || (t.$el.trigger("onBeforeClose.lg"), m(window).scrollTop(t.prevScrollTop)), e && (t.s.dynamic || this.$items.off("click.lg click.lgcustom"), m.removeData(t.el, "lightGallery")), this.$el.off(".lg.tm"), m.each(m.fn.lightGallery.modules, function(e) {
                t.modules[e] && t.modules[e].destroy()
            }), this.lGalleryOn = !1, clearTimeout(t.hideBarTimeout), this.hideBarTimeout = !1, m(window).off(".lg"), m("body").removeClass("lg-on lg-from-hash"), t.$outer && t.$outer.removeClass("lg-visible"), m(".lg-backdrop").removeClass("in"), setTimeout(function() {
                t.$outer && t.$outer.remove(), m(".lg-backdrop").remove(), e || t.$el.trigger("onCloseAfter.lg"), t.$el.focus()
            }, t.s.backdropDuration + 50)
        }, m.fn.lightGallery = function(e) {
            return this.each(function() {
                if (m.data(this, "lightGallery")) try {
                    m(this).data("lightGallery").init()
                } catch (e) {
                    console.error("lightGallery has not initiated properly", e)
                } else m.data(this, "lightGallery", new t(this, e))
            })
        }, m.fn.lightGallery.modules = {}
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(o) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = o(e).data("lightGallery"), this.$el = o(e), !(this.core.$items.length < 2) && (this.core.s = o.extend({}, t, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
        }
        var t = {
            autoplay: !1,
            pause: 5e3,
            progressBar: !0,
            fourceAutoplay: !1,
            autoplayControls: !0,
            appendAutoplayControlsTo: ".lg-toolbar"
        };
        e.prototype.init = function() {
            var e = this;
            e.core.s.autoplayControls && e.controls(), e.core.s.progressBar && e.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), e.progress(), e.core.s.autoplay && e.$el.one("onSlideItemLoad.lg.tm", function() {
                e.startlAuto()
            }), e.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                e.interval && (e.cancelAuto(), e.canceledOnTouch = !0)
            }), e.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                !e.interval && e.canceledOnTouch && (e.startlAuto(), e.canceledOnTouch = !1)
            })
        }, e.prototype.progress = function() {
            var e, t, o = this;
            o.$el.on("onBeforeSlide.lg.tm", function() {
                o.core.s.progressBar && o.fromAuto && (e = o.core.$outer.find(".lg-progress-bar"), t = o.core.$outer.find(".lg-progress"), o.interval && (t.removeAttr("style"), e.removeClass("lg-start"), setTimeout(function() {
                    t.css("transition", "width " + (o.core.s.speed + o.core.s.pause) + "ms ease 0s"), e.addClass("lg-start")
                }, 20))), o.fromAuto || o.core.s.fourceAutoplay || o.cancelAuto(), o.fromAuto = !1
            })
        }, e.prototype.controls = function() {
            var e = this;
            o(this.core.s.appendAutoplayControlsTo).append('<button type="button" aria-label="Toggle autoplay" class="lg-autoplay-button lg-icon"></button>'), e.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                o(e.core.$outer).hasClass("lg-show-autoplay") ? (e.cancelAuto(), e.core.s.fourceAutoplay = !1) : e.interval || (e.startlAuto(), e.core.s.fourceAutoplay = e.fourceAutoplayTemp)
            })
        }, e.prototype.startlAuto = function() {
            var e = this;
            e.core.$outer.find(".lg-progress").css("transition", "width " + (e.core.s.speed + e.core.s.pause) + "ms ease 0s"), e.core.$outer.addClass("lg-show-autoplay"), e.core.$outer.find(".lg-progress-bar").addClass("lg-start"), e.interval = setInterval(function() {
                e.core.index + 1 < e.core.$items.length ? e.core.index++ : e.core.index = 0, e.fromAuto = !0, e.core.slide(e.core.index, !1, !1, "next")
            }, e.core.s.speed + e.core.s.pause)
        }, e.prototype.cancelAuto = function() {
            clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
        }, e.prototype.destroy = function() {
            this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
        }, o.fn.lightGallery.modules.autoplay = e
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(i) {
    ! function() {
        "use strict";
        var t = {
            fullScreen: !0
        };

        function o() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        }

        function e(e) {
            return this.core = i(e).data("lightGallery"), this.$el = i(e), this.core.s = i.extend({}, t, this.core.s), this.init(), this
        }
        e.prototype.init = function() {
            this.core.s.fullScreen && (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) && (this.core.$outer.find(".lg-toolbar").append('<button type="button" aria-label="Toggle fullscreen" class="lg-fullscreen lg-icon"></button>'), this.fullScreen())
        }, e.prototype.requestFullscreen = function() {
            var e = document.documentElement;
            e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen()
        }, e.prototype.exitFullscreen = function() {
            document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }, e.prototype.fullScreen = function() {
            var e = this;
            i(document).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                e.core.$outer.toggleClass("lg-fullscreen-on")
            }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                o() ? e.exitFullscreen() : e.requestFullscreen()
            })
        }, e.prototype.destroy = function() {
            o() && this.exitFullscreen(), i(document).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
        }, i.fn.lightGallery.modules.fullscreen = e
    }()
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(l) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = l(e).data("lightGallery"), this.$el = l(e), this.core.s = l.extend({}, t, this.core.s), this.core.s.pager && 1 < this.core.$items.length && this.init(), this
        }
        var t = {
            pager: !1
        };
        e.prototype.init = function() {
            var i, e, t, o = this,
                s = "";
            if (o.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), o.core.s.dynamic)
                for (var r = 0; r < o.core.s.dynamicEl.length; r++) s += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + o.core.s.dynamicEl[r].thumb + '" /></div></span>';
            else o.core.$items.each(function() {
                o.core.s.exThumbImage ? s += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + l(this).attr(o.core.s.exThumbImage) + '" /></div></span>' : s += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + l(this).find("img").attr("src") + '" /></div></span>'
            });
            (e = o.core.$outer.find(".lg-pager-outer")).html(s), (i = o.core.$outer.find(".lg-pager-cont")).on("click.lg touchend.lg", function() {
                var e = l(this);
                o.core.index = e.index(), o.core.slide(o.core.index, !1, !0, !1)
            }), e.on("mouseover.lg", function() {
                clearTimeout(t), e.addClass("lg-pager-hover")
            }), e.on("mouseout.lg", function() {
                t = setTimeout(function() {
                    e.removeClass("lg-pager-hover")
                })
            }), o.core.$el.on("onBeforeSlide.lg.tm", function(e, t, o) {
                i.removeClass("lg-pager-active"), i.eq(o).addClass("lg-pager-active")
            })
        }, e.prototype.destroy = function() {}, l.fn.lightGallery.modules.pager = e
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = a(e).data("lightGallery"), this.core.s = a.extend({}, t, this.core.s), this.$el = a(e), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this
        }
        var t = {
            thumbnail: !0,
            animateThumb: !0,
            currentPagerPosition: "middle",
            thumbWidth: 100,
            thumbHeight: "80px",
            thumbContHeight: 100,
            thumbMargin: 5,
            exThumbImage: !1,
            showThumbByDefault: !0,
            toogleThumb: !0,
            pullCaptionUp: !0,
            enableThumbDrag: !0,
            enableThumbSwipe: !0,
            swipeThreshold: 50,
            loadYoutubeThumbnail: !0,
            youtubeThumbSize: 1,
            loadVimeoThumbnail: !0,
            vimeoThumbSize: "thumbnail_small",
            loadDailymotionThumbnail: !0
        };
        e.prototype.init = function() {
            var e = this;
            this.core.s.thumbnail && 1 < this.core.$items.length && (this.core.s.showThumbByDefault && setTimeout(function() {
                e.core.$outer.addClass("lg-thumb-open")
            }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb && this.core.doCss() ? (this.core.s.enableThumbDrag && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
        }, e.prototype.build = function() {
            var e, s = this,
                r = "",
                l = "";
            switch (this.core.s.vimeoThumbSize) {
                case "thumbnail_large":
                    l = "640";
                    break;
                case "thumbnail_medium":
                    l = "200x150";
                    break;
                case "thumbnail_small":
                    l = "100x75"
            }

            function t(e, t, o) {
                var i, e = s.core.isVideo(e, o) || {},
                    o = "";
                e.youtube || e.vimeo || e.dailymotion ? e.youtube ? i = s.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + e.youtube[1] + "/" + s.core.s.youtubeThumbSize + ".jpg" : t : e.vimeo ? s.core.s.loadVimeoThumbnail ? (i = "//i.vimeocdn.com/video/error_" + l + ".jpg", o = e.vimeo[1]) : i = t : e.dailymotion && (i = s.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + e.dailymotion[1] : t) : i = t, r += '<div data-vimeo-id="' + o + '" class="lg-thumb-item" style="width:' + s.core.s.thumbWidth + "px; height: " + s.core.s.thumbHeight + "; margin-right: " + s.core.s.thumbMargin + 'px"><img src="' + i + '" /></div>', o = ""
            }
            if (s.core.$outer.addClass("lg-has-thumb"), s.core.$outer.find(".lg").append('<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>'), s.$thumbOuter = s.core.$outer.find(".lg-thumb-outer"), s.thumbOuterWidth = s.$thumbOuter.width(), s.core.s.animateThumb && s.core.$outer.find(".lg-thumb").css({
                    width: s.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && s.$thumbOuter.css("height", s.core.s.thumbContHeight + "px"), s.core.s.dynamic)
                for (var o = 0; o < s.core.s.dynamicEl.length; o++) t(s.core.s.dynamicEl[o].src, s.core.s.dynamicEl[o].thumb, o);
            else s.core.$items.each(function(e) {
                s.core.s.exThumbImage ? t(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(s.core.s.exThumbImage), e) : t(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), e)
            });
            s.core.$outer.find(".lg-thumb").html(r), (e = s.core.$outer.find(".lg-thumb-item")).each(function() {
                var t = a(this),
                    e = t.attr("data-vimeo-id");
                e && a.getJSON("//www.vimeo.com/api/v2/video/" + e + ".json?callback=?", {
                    format: "json"
                }, function(e) {
                    t.find("img").attr("src", e[0][s.core.s.vimeoThumbSize])
                })
            }), e.eq(s.core.index).addClass("active"), s.core.$el.on("onBeforeSlide.lg.tm", function() {
                e.removeClass("active"), e.eq(s.core.index).addClass("active")
            }), e.on("click.lg touchend.lg", function() {
                var e = a(this);
                setTimeout(function() {
                    (!s.thumbClickable || s.core.lgBusy) && s.core.doCss() || (s.core.index = e.index(), s.core.slide(s.core.index, !1, !0, !1))
                }, 50)
            }), s.core.$el.on("onBeforeSlide.lg.tm", function() {
                s.animateThumb(s.core.index)
            }), a(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                setTimeout(function() {
                    s.animateThumb(s.core.index), s.thumbOuterWidth = s.$thumbOuter.width()
                }, 200)
            })
        }, e.prototype.setTranslate = function(e) {
            this.core.$outer.find(".lg-thumb").css({
                transform: "translate3d(-" + e + "px, 0px, 0px)"
            })
        }, e.prototype.animateThumb = function(e) {
            var t, o = this.core.$outer.find(".lg-thumb");
            if (this.core.s.animateThumb) {
                switch (this.core.s.currentPagerPosition) {
                    case "left":
                        t = 0;
                        break;
                    case "middle":
                        t = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                        break;
                    case "right":
                        t = this.thumbOuterWidth - this.core.s.thumbWidth
                }
                this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * e - 1 - t, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (o.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || o.animate({
                    left: -this.left + "px"
                }, this.core.s.speed)) : this.core.doCss() || o.css("left", -this.left + "px"), this.setTranslate(this.left)
            }
        }, e.prototype.enableThumbDrag = function() {
            var t = this,
                o = 0,
                i = 0,
                s = !1,
                r = !1,
                l = 0;
            t.$thumbOuter.addClass("lg-grab"), t.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(e) {
                t.thumbTotalWidth > t.thumbOuterWidth && (e.preventDefault(), o = e.pageX, s = !0, t.core.$outer.scrollLeft += 1, --t.core.$outer.scrollLeft, t.thumbClickable = !1, t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.thumb", function(e) {
                s && (l = t.left, r = !0, i = e.pageX, t.$thumbOuter.addClass("lg-dragging"), (l -= i - o) > t.thumbTotalWidth - t.thumbOuterWidth && (l = t.thumbTotalWidth - t.thumbOuterWidth), l < 0 && (l = 0), t.setTranslate(l))
            }), a(window).on("mouseup.lg.thumb", function() {
                r ? (r = !1, t.$thumbOuter.removeClass("lg-dragging"), t.left = l, Math.abs(i - o) < t.core.s.swipeThreshold && (t.thumbClickable = !0)) : t.thumbClickable = !0, s && (s = !1, t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
            })
        }, e.prototype.enableThumbSwipe = function() {
            var t = this,
                o = 0,
                i = 0,
                s = !1,
                r = 0;
            t.core.$outer.find(".lg-thumb").on("touchstart.lg", function(e) {
                t.thumbTotalWidth > t.thumbOuterWidth && (e.preventDefault(), o = e.originalEvent.targetTouches[0].pageX, t.thumbClickable = !1)
            }), t.core.$outer.find(".lg-thumb").on("touchmove.lg", function(e) {
                t.thumbTotalWidth > t.thumbOuterWidth && (e.preventDefault(), i = e.originalEvent.targetTouches[0].pageX, s = !0, t.$thumbOuter.addClass("lg-dragging"), r = t.left, (r -= i - o) > t.thumbTotalWidth - t.thumbOuterWidth && (r = t.thumbTotalWidth - t.thumbOuterWidth), r < 0 && (r = 0), t.setTranslate(r))
            }), t.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                t.thumbTotalWidth > t.thumbOuterWidth && s ? (s = !1, t.$thumbOuter.removeClass("lg-dragging"), Math.abs(i - o) < t.core.s.swipeThreshold && (t.thumbClickable = !0), t.left = r) : t.thumbClickable = !0
            })
        }, e.prototype.toogle = function() {
            var e = this;
            e.core.s.toogleThumb && (e.core.$outer.addClass("lg-can-toggle"), e.$thumbOuter.append('<button type="button" aria-label="Toggle thumbnails" class="lg-toogle-thumb lg-icon"></button>'), e.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                e.core.$outer.toggleClass("lg-thumb-open")
            }))
        }, e.prototype.thumbkeyPress = function() {
            var t = this;
            a(window).on("keydown.lg.thumb", function(e) {
                38 === e.keyCode ? (e.preventDefault(), t.core.$outer.addClass("lg-thumb-open")) : 40 === e.keyCode && (e.preventDefault(), t.core.$outer.removeClass("lg-thumb-open"))
            })
        }, e.prototype.destroy = function() {
            this.core.s.thumbnail && 1 < this.core.$items.length && (a(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
        }, a.fn.lightGallery.modules.Thumbnail = e
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(d) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = d(e).data("lightGallery"), this.$el = d(e), this.core.s = d.extend({}, t, this.core.s), this.videoLoaded = !1, this.init(), this
        }
        var t = {
            videoMaxWidth: "855px",
            autoplayFirstVideo: !0,
            youtubePlayerParams: !1,
            vimeoPlayerParams: !1,
            dailymotionPlayerParams: !1,
            vkPlayerParams: !1,
            videojs: !1,
            videojsOptions: {}
        };
        e.prototype.init = function() {
            var i = this;
            i.core.$el.on("hasVideo.lg.tm", function(e, t, o, i) {
                var s = this;
                if (s.core.$slide.eq(t).find(".lg-video").append(s.loadVideo(o, "lg-object", !0, t, i)), i)
                    if (s.core.s.videojs) try {
                        videojs(s.core.$slide.eq(t).find(".lg-html5").get(0), s.core.s.videojsOptions, function() {
                            !s.videoLoaded && s.core.s.autoplayFirstVideo && this.play()
                        })
                    } catch (e) {
                        console.error("Make sure you have included videojs")
                    } else !s.videoLoaded && s.core.s.autoplayFirstVideo && s.core.$slide.eq(t).find(".lg-html5").get(0).play()
            }.bind(this)), i.core.$el.on("onAferAppendSlide.lg.tm", function(e, t) {
                t = this.core.$slide.eq(t).find(".lg-video-cont");
                t.hasClass("lg-has-iframe") || (t.css("max-width", this.core.s.videoMaxWidth), this.videoLoaded = !0)
            }.bind(this)), i.core.doCss() && 1 < i.core.$items.length && (i.core.s.enableSwipe || i.core.s.enableDrag) ? i.core.$el.on("onSlideClick.lg.tm", function() {
                var e = i.core.$slide.eq(i.core.index);
                i.loadVideoOnclick(e)
            }) : i.core.$slide.on("click.lg", function() {
                i.loadVideoOnclick(d(this))
            }), i.core.$el.on("onBeforeSlide.lg.tm", function(e, t, o) {
                var i = this,
                    s = i.core.$slide.eq(t),
                    r = s.find(".lg-youtube").get(0),
                    l = s.find(".lg-vimeo").get(0),
                    a = s.find(".lg-dailymotion").get(0),
                    t = s.find(".lg-vk").get(0),
                    n = s.find(".lg-html5").get(0);
                if (r) r.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                else if (l) try {
                        $f(l).api("pause")
                    } catch (e) {
                        console.error("Make sure you have included froogaloop2 js")
                    } else if (a) a.contentWindow.postMessage("pause", "*");
                    else if (n)
                    if (i.core.s.videojs) try {
                        videojs(n).pause()
                    } catch (e) {
                        console.error("Make sure you have included videojs")
                    } else n.pause();
                t && d(t).attr("src", d(t).attr("src").replace("&autoplay", "&noplay"));
                t = i.core.s.dynamic ? i.core.s.dynamicEl[o].src : i.core.$items.eq(o).attr("href") || i.core.$items.eq(o).attr("data-src");
                o = i.core.isVideo(t, o) || {};
                (o.youtube || o.vimeo || o.dailymotion || o.vk) && i.core.$outer.addClass("lg-hide-download")
            }.bind(this)), i.core.$el.on("onAfterSlide.lg.tm", function(e, t) {
                i.core.$slide.eq(t).removeClass("lg-video-playing")
            }), i.core.s.autoplayFirstVideo && i.core.$el.on("onAferAppendSlide.lg.tm", function(e, t) {
                var o;
                i.core.lGalleryOn || (o = i.core.$slide.eq(t), setTimeout(function() {
                    i.loadVideoOnclick(o)
                }, 100))
            })
        }, e.prototype.loadVideo = function(e, t, o, i, s) {
            var r = this,
                l = "",
                a = 1,
                n = "",
                i = this.core.isVideo(e, i) || {},
                r = r.core.s.dynamic ? r.core.s.dynamicEl[r.core.index].title : r.core.$items.eq(r.core.index).attr("title") || r.core.$items.eq(r.core.index).find("img").first().attr("alt");
            return r = r ? 'title="' + r + '"' : "", o && (a = !this.videoLoaded && this.core.s.autoplayFirstVideo ? 1 : 0), i.youtube ? (n = "?wmode=opaque&autoplay=" + a + "&enablejsapi=1", this.core.s.youtubePlayerParams && (n = n + "&" + d.param(this.core.s.youtubePlayerParams)), l = '<iframe class="lg-video-object lg-youtube ' + t + '" ' + r + ' width="560" height="315" src="//www.youtube.com/embed/' + i.youtube[1] + n + '" frameborder="0" allowfullscreen></iframe>') : i.vimeo ? (n = "?autoplay=" + a + "&api=1", this.core.s.vimeoPlayerParams && (n = n + "&" + d.param(this.core.s.vimeoPlayerParams)), l = '<iframe class="lg-video-object lg-vimeo ' + t + '" ' + r + ' width="560" height="315"  src="//player.vimeo.com/video/' + i.vimeo[1] + n + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>') : i.dailymotion ? (n = "?wmode=opaque&autoplay=" + a + "&api=postMessage", this.core.s.dailymotionPlayerParams && (n = n + "&" + d.param(this.core.s.dailymotionPlayerParams)), l = '<iframe class="lg-video-object lg-dailymotion ' + t + '" ' + r + ' width="560" height="315" src="//www.dailymotion.com/embed/video/' + i.dailymotion[1] + n + '" frameborder="0" allowfullscreen></iframe>') : i.html5 ? ("." !== (o = s.substring(0, 1)) && "#" !== o || (s = d(s).html()), l = s) : i.vk && (n = "&autoplay=" + a, this.core.s.vkPlayerParams && (n = n + "&" + d.param(this.core.s.vkPlayerParams)), l = '<iframe class="lg-video-object lg-vk ' + t + '" ' + r + ' width="560" height="315" src="//vk.com/video_ext.php?' + i.vk[1] + n + '" frameborder="0" allowfullscreen></iframe>'), l
        }, e.prototype.loadVideoOnclick = function(o) {
            var i = this;
            if (o.find(".lg-object").hasClass("lg-has-poster") && o.find(".lg-object").is(":visible"))
                if (o.hasClass("lg-has-video")) {
                    var e = o.find(".lg-youtube").get(0),
                        t = o.find(".lg-vimeo").get(0),
                        s = o.find(".lg-dailymotion").get(0),
                        r = o.find(".lg-html5").get(0);
                    if (e) e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (t) try {
                            $f(t).api("play")
                        } catch (e) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (s) s.contentWindow.postMessage("play", "*");
                        else if (r)
                        if (i.core.s.videojs) try {
                            videojs(r).play()
                        } catch (e) {
                            console.error("Make sure you have included videojs")
                        } else r.play();
                    o.addClass("lg-video-playing")
                } else {
                    o.addClass("lg-video-playing lg-has-video");
                    s = function(e, t) {
                        if (o.find(".lg-video").append(i.loadVideo(e, "", !1, i.core.index, t)), t)
                            if (i.core.s.videojs) try {
                                videojs(i.core.$slide.eq(i.core.index).find(".lg-html5").get(0), i.core.s.videojsOptions, function() {
                                    this.play()
                                })
                            } catch (e) {
                                console.error("Make sure you have included videojs")
                            } else i.core.$slide.eq(i.core.index).find(".lg-html5").get(0).play()
                    };
                    i.core.s.dynamic ? s(i.core.s.dynamicEl[i.core.index].src, i.core.s.dynamicEl[i.core.index].html) : s(i.core.$items.eq(i.core.index).attr("href") || i.core.$items.eq(i.core.index).attr("data-src"), i.core.$items.eq(i.core.index).attr("data-html"));
                    s = o.find(".lg-object");
                    o.find(".lg-video").append(s), o.find(".lg-video-object").hasClass("lg-html5") || (o.removeClass("lg-complete"), o.find(".lg-video-object").on("load.lg error.lg", function() {
                        o.addClass("lg-complete")
                    }))
                }
        }, e.prototype.destroy = function() {
            this.videoLoaded = !1
        }, d.fn.lightGallery.modules.video = e
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(h) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = h(e).data("lightGallery"), this.core.s = h.extend({}, i, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = h(window).width() / 2, this.pageY = h(window).height() / 2 + h(window).scrollTop()), this
        }
        var t, o, i = {
            scale: 1,
            zoom: !0,
            actualSize: !0,
            enableZoomAfter: 300,
            useLeftForZoom: (t = !1, (o = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)) && parseInt(o[2], 10) < 54 && (t = !0), t)
        };
        e.prototype.init = function() {
            var r = this,
                e = '<button type="button" aria-label="Zoom in" id="lg-zoom-in" class="lg-icon"></button><button type="button" aria-label="Zoom out" id="lg-zoom-out" class="lg-icon"></button>';
            r.core.s.actualSize && (e += '<button type="button" aria-label="Actual size" id="lg-actual-size" class="lg-icon"></button>'), r.core.s.useLeftForZoom ? r.core.$outer.addClass("lg-use-left-for-zoom") : r.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(e), r.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(e, t, o) {
                var i = r.core.s.enableZoomAfter + o;
                h("body").hasClass("lg-from-hash") && o ? i = 0 : h("body").removeClass("lg-from-hash"), r.zoomabletimeout = setTimeout(function() {
                    r.core.$slide.eq(t).addClass("lg-zoomable")
                }, i + 30)
            });

            function t(e) {
                var t = r.core.$outer.find(".lg-current .lg-image"),
                    o = (h(window).width() - t.prop("offsetWidth")) / 2,
                    i = (h(window).height() - t.prop("offsetHeight")) / 2 + h(window).scrollTop(),
                    o = (e - 1) * (r.pageX - o),
                    i = (e - 1) * (r.pageY - i);
                t.css("transform", "scale3d(" + e + ", " + e + ", 1)").attr("data-scale", e), (r.core.s.useLeftForZoom ? t.parent().css({
                    left: -o + "px",
                    top: -i + "px"
                }) : t.parent().css("transform", "translate3d(-" + o + "px, -" + i + "px, 0)")).attr("data-x", o).attr("data-y", i)
            }

            function l() {
                1 < a ? r.core.$outer.addClass("lg-zoomed") : r.resetZoom(), a < 1 && (a = 1), t(a)
            }

            function i(e, t, o, i) {
                var s = t.prop("offsetWidth"),
                    t = r.core.s.dynamic ? r.core.s.dynamicEl[o].width || t[0].naturalWidth || s : r.core.$items.eq(o).attr("data-width") || t[0].naturalWidth || s;
                r.core.$outer.hasClass("lg-zoomed") ? a = 1 : s < t && (a = t / s || 2), i ? (r.pageX = h(window).width() / 2, r.pageY = h(window).height() / 2 + h(window).scrollTop()) : (r.pageX = e.pageX || e.originalEvent.targetTouches[0].pageX, r.pageY = e.pageY || e.originalEvent.targetTouches[0].pageY), l(), setTimeout(function() {
                    r.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                }, 10)
            }
            var a = 1,
                s = !1;
            r.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(e, t) {
                var o = r.core.$slide.eq(t).find(".lg-image");
                o.on("dblclick", function(e) {
                    i(e, o, t)
                }), o.on("touchstart", function(e) {
                    s ? (clearTimeout(s), s = null, i(e, o, t)) : s = setTimeout(function() {
                        s = null
                    }, 300), e.preventDefault()
                })
            }), h(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                r.pageX = h(window).width() / 2, r.pageY = h(window).height() / 2 + h(window).scrollTop(), t(a)
            }), h("#lg-zoom-out").on("click.lg", function() {
                r.core.$outer.find(".lg-current .lg-image").length && (a -= r.core.s.scale, l())
            }), h("#lg-zoom-in").on("click.lg", function() {
                r.core.$outer.find(".lg-current .lg-image").length && (a += r.core.s.scale, l())
            }), h("#lg-actual-size").on("click.lg", function(e) {
                i(e, r.core.$slide.eq(r.core.index).find(".lg-image"), r.core.index, !0)
            }), r.core.$el.on("onBeforeSlide.lg.tm", function() {
                a = 1, r.resetZoom()
            }), r.zoomDrag(), r.zoomSwipe()
        }, e.prototype.getCurrentTransform = function(e) {
            if (!e) return 0;
            e = window.getComputedStyle(e, null), e = e.getPropertyValue("-webkit-transform") || e.getPropertyValue("-moz-transform") || e.getPropertyValue("-ms-transform") || e.getPropertyValue("-o-transform") || e.getPropertyValue("transform") || "none";
            return "none" !== e ? e.split("(")[1].split(")")[0].split(",") : 0
        }, e.prototype.getCurrentRotation = function(e) {
            if (!e) return 0;
            e = this.getCurrentTransform(e);
            return e ? Math.round(Math.atan2(e[1], e[0]) * (180 / Math.PI)) : 0
        }, e.prototype.getModifier = function(e, t, o) {
            var i = e;
            e = Math.abs(e);
            var s = this.getCurrentTransform(o);
            if (!s) return 1;
            var r, o = 1;
            return "X" === t ? (r = Math.sign(parseFloat(s[0])), 0 === e || 180 === e ? o = 1 : 90 === e && (o = -90 === i && 1 === r || 90 === i && -1 === r ? -1 : 1), o *= r) : (r = Math.sign(parseFloat(s[3])), 0 === e || 180 === e ? o = 1 : 90 === e && (e = parseFloat(s[1]), s = parseFloat(s[2]), o = Math.sign(e * s * i * r)), o *= r), o
        }, e.prototype.getImageSize = function(e, t, o) {
            return 90 === t && (o = "x" === o ? "y" : "x"), e.prop({
                y: "offsetHeight",
                x: "offsetWidth"
            }[o])
        }, e.prototype.getDragCords = function(e, t) {
            return 90 === t ? {
                x: e.pageY,
                y: e.pageX
            } : {
                x: e.pageX,
                y: e.pageY
            }
        }, e.prototype.getSwipeCords = function(e, t) {
            var o = e.originalEvent.targetTouches[0].pageX,
                e = e.originalEvent.targetTouches[0].pageY;
            return 90 === t ? {
                x: e,
                y: o
            } : {
                x: o,
                y: e
            }
        }, e.prototype.getPossibleDragCords = function(e, t) {
            var o = (this.core.$outer.find(".lg").height() - this.getImageSize(e, t, "y")) / 2,
                i = Math.abs(this.getImageSize(e, t, "y") * Math.abs(e.attr("data-scale")) - this.core.$outer.find(".lg").height() + o),
                s = (this.core.$outer.find(".lg").width() - this.getImageSize(e, t, "x")) / 2,
                e = Math.abs(this.getImageSize(e, t, "x") * Math.abs(e.attr("data-scale")) - this.core.$outer.find(".lg").width() + s);
            return 90 === t ? {
                minY: s,
                maxY: e,
                minX: o,
                maxX: i
            } : {
                minY: o,
                maxY: i,
                minX: s,
                maxX: e
            }
        }, e.prototype.getDragAllowedAxises = function(e, t) {
            var o = this.getImageSize(e, t, "y") * e.attr("data-scale") > this.core.$outer.find(".lg").height(),
                e = this.getImageSize(e, t, "x") * e.attr("data-scale") > this.core.$outer.find(".lg").width();
            return 90 === t ? {
                allowX: o,
                allowY: e
            } : {
                allowX: e,
                allowY: o
            }
        }, e.prototype.resetZoom = function() {
            this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = h(window).width() / 2, this.pageY = h(window).height() / 2 + h(window).scrollTop()
        }, e.prototype.zoomSwipe = function() {
            var i, s = this,
                r = {},
                l = {},
                a = !1,
                n = !1,
                d = !1,
                c = 0;
            s.core.$slide.on("touchstart.lg", function(e) {
                var t;
                s.core.$outer.hasClass("lg-zoomed") && (t = s.core.$slide.eq(s.core.index).find(".lg-object"), i = s.core.$slide.eq(s.core.index).find(".lg-img-rotate")[0], c = s.getCurrentRotation(i), t = s.getDragAllowedAxises(t, Math.abs(c)), d = t.allowY, ((n = t.allowX) || d) && (e.preventDefault(), r = s.getSwipeCords(e, Math.abs(c))))
            }), s.core.$slide.on("touchmove.lg", function(e) {
                var t, o;
                s.core.$outer.hasClass("lg-zoomed") && (t = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"), e.preventDefault(), a = !0, l = s.getSwipeCords(e, Math.abs(c)), s.core.$outer.addClass("lg-zoom-dragging"), o = d ? -Math.abs(t.attr("data-y")) + (l.y - r.y) * s.getModifier(c, "Y", i) : -Math.abs(t.attr("data-y")), e = n ? -Math.abs(t.attr("data-x")) + (l.x - r.x) * s.getModifier(c, "X", i) : -Math.abs(t.attr("data-x")), (15 < Math.abs(l.x - r.x) || 15 < Math.abs(l.y - r.y)) && (s.core.s.useLeftForZoom ? t.css({
                    left: e + "px",
                    top: o + "px"
                }) : t.css("transform", "translate3d(" + e + "px, " + o + "px, 0)")))
            }), s.core.$slide.on("touchend.lg", function() {
                s.core.$outer.hasClass("lg-zoomed") && a && (a = !1, s.core.$outer.removeClass("lg-zoom-dragging"), s.touchendZoom(r, l, n, d, c))
            })
        }, e.prototype.zoomDrag = function() {
            var i, s = this,
                r = {},
                l = {},
                a = !1,
                n = !1,
                d = !1,
                c = !1,
                u = 0;
            s.core.$slide.on("mousedown.lg.zoom", function(e) {
                i = s.core.$slide.eq(s.core.index).find(".lg-img-rotate")[0], u = s.getCurrentRotation(i);
                var t = s.core.$slide.eq(s.core.index).find(".lg-object"),
                    t = s.getDragAllowedAxises(t, Math.abs(u));
                c = t.allowY, d = t.allowX, s.core.$outer.hasClass("lg-zoomed") && h(e.target).hasClass("lg-object") && (d || c) && (e.preventDefault(), r = s.getDragCords(e, Math.abs(u)), a = !0, s.core.$outer.scrollLeft += 1, --s.core.$outer.scrollLeft, s.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
            }), h(window).on("mousemove.lg.zoom", function(e) {
                var t, o;
                a && (t = s.core.$slide.eq(s.core.index).find(".lg-img-wrap"), n = !0, l = s.getDragCords(e, Math.abs(u)), s.core.$outer.addClass("lg-zoom-dragging"), o = c ? -Math.abs(t.attr("data-y")) + (l.y - r.y) * s.getModifier(u, "Y", i) : -Math.abs(t.attr("data-y")), e = d ? -Math.abs(t.attr("data-x")) + (l.x - r.x) * s.getModifier(u, "X", i) : -Math.abs(t.attr("data-x")), s.core.s.useLeftForZoom ? t.css({
                    left: e + "px",
                    top: o + "px"
                }) : t.css("transform", "translate3d(" + e + "px, " + o + "px, 0)"))
            }), h(window).on("mouseup.lg.zoom", function(e) {
                a && (a = !1, s.core.$outer.removeClass("lg-zoom-dragging"), !n || r.x === l.x && r.y === l.y || (l = s.getDragCords(e, Math.abs(u)), s.touchendZoom(r, l, d, c, u)), n = !1), s.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
            })
        }, e.prototype.touchendZoom = function(e, t, o, i, s) {
            var r = this,
                l = r.core.$slide.eq(r.core.index).find(".lg-img-wrap"),
                a = r.core.$slide.eq(r.core.index).find(".lg-object"),
                n = r.core.$slide.eq(r.core.index).find(".lg-img-rotate")[0],
                d = -Math.abs(l.attr("data-x")) + (t.x - e.x) * r.getModifier(s, "X", n),
                n = -Math.abs(l.attr("data-y")) + (t.y - e.y) * r.getModifier(s, "Y", n),
                s = r.getPossibleDragCords(a, Math.abs(s));
            (15 < Math.abs(t.x - e.x) || 15 < Math.abs(t.y - e.y)) && (i && (n <= -s.maxY ? n = -s.maxY : n >= -s.minY && (n = -s.minY)), o && (d <= -s.maxX ? d = -s.maxX : d >= -s.minX && (d = -s.minX)), i ? l.attr("data-y", Math.abs(n)) : n = -Math.abs(l.attr("data-y")), o ? l.attr("data-x", Math.abs(d)) : d = -Math.abs(l.attr("data-x")), r.core.s.useLeftForZoom ? l.css({
                left: d + "px",
                top: n + "px"
            }) : l.css("transform", "translate3d(" + d + "px, " + n + "px, 0)"))
        }, e.prototype.destroy = function() {
            var e = this;
            e.core.$el.off(".lg.zoom"), h(window).off(".lg.zoom"), e.core.$slide.off(".lg.zoom"), e.core.$el.off(".lg.tm.zoom"), e.resetZoom(), clearTimeout(e.zoomabletimeout), e.zoomabletimeout = !1
        }, h.fn.lightGallery.modules.zoom = e
    }()
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(o) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = o(e).data("lightGallery"), this.core.s = o.extend({}, t, this.core.s), this.core.s.hash && (this.oldHash = window.location.hash, this.init()), this
        }
        var t = {
            hash: !0
        };
        e.prototype.init = function() {
            var t, i = this;
            i.core.$el.on("onAfterSlide.lg.tm", function(e, t, o) {
                history.replaceState ? history.replaceState(null, null, window.location.pathname + window.location.search + "#lg=" + i.core.s.galleryId + "&slide=" + o) : window.location.hash = "lg=" + i.core.s.galleryId + "&slide=" + o
            }), o(window).on("hashchange.lg.hash", function() {
                t = window.location.hash;
                var e = parseInt(t.split("&slide=")[1], 10); - 1 < t.indexOf("lg=" + i.core.s.galleryId) ? i.core.slide(e, !1, !1) : i.core.lGalleryOn && i.core.destroy()
            })
        }, e.prototype.destroy = function() {
            this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? history.replaceState ? history.replaceState(null, null, this.oldHash) : window.location.hash = this.oldHash : history.replaceState ? history.replaceState(null, document.title, window.location.pathname + window.location.search) : window.location.hash = "", this.core.$el.off(".lg.hash"))
        }, o.fn.lightGallery.modules.hash = e
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(s) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = s(e).data("lightGallery"), this.core.s = s.extend({}, t, this.core.s), this.core.s.share && this.init(), this
        }
        var t = {
            share: !0,
            facebook: !0,
            facebookDropdownText: "Facebook",
            twitter: !0,
            twitterDropdownText: "Twitter",
            pinterest: !0,
            pinterestDropdownText: "Pinterest"
        };
        e.prototype.init = function() {
            var i = this,
                e = '<button type="button" aria-label="Share" id="lg-share" class="lg-icon" aria-haspopup="true" aria-expanded="false"><ul class="lg-dropdown" style="position: absolute;">';
            e += i.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + "</span></a></li>" : "", e += i.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + "</span></a></li>" : "", e += i.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + "</span></a></li>" : "", e += "</ul></button>", this.core.$outer.find(".lg-toolbar").append(e), this.core.$outer.find(".lg").append('<div id="lg-dropdown-overlay"></div>'), s("#lg-share").on("click.lg", function() {
                i.core.$outer.toggleClass("lg-dropdown-active");
                var e = s("#lg-share").attr("aria-expanded");
                s("#lg-share").attr("aria-expanded", "true" !== e)
            }), s("#lg-dropdown-overlay").on("click.lg", function() {
                i.core.$outer.removeClass("lg-dropdown-active"), s("#lg-share").attr("aria-expanded", !1)
            }), i.core.$el.on("onAfterSlide.lg.tm", function(e, t, o) {
                setTimeout(function() {
                    s("#lg-share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(i.getSahreProps(o, "facebookShareUrl") || window.location.href)), s("#lg-share-twitter").attr("href", "https://twitter.com/intent/tweet?text=" + i.getSahreProps(o, "tweetText") + "&url=" + encodeURIComponent(i.getSahreProps(o, "twitterShareUrl") || window.location.href)), s("#lg-share-pinterest").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(i.getSahreProps(o, "pinterestShareUrl") || window.location.href) + "&media=" + encodeURIComponent(i.getSahreProps(o, "src")) + "&description=" + i.getSahreProps(o, "pinterestText"))
                }, 100)
            })
        }, e.prototype.getSahreProps = function(e, t) {
            var o;
            return this.core.s.dynamic ? this.core.s.dynamicEl[e][t] : (o = this.core.$items.eq(e).attr("href"), e = this.core.$items.eq(e).data(t), "src" === t && o || e)
        }, e.prototype.destroy = function() {}, s.fn.lightGallery.modules.share = e
    }()
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(o) {
    ! function() {
        "use strict";

        function e(e) {
            return this.core = o(e).data("lightGallery"), this.core.s = o.extend({}, t, this.core.s), this.core.s.rotate && this.core.doCss() && this.init(), this
        }
        var t = {
            rotate: !0,
            rotateLeft: !0,
            rotateRight: !0,
            flipHorizontal: !0,
            flipVertical: !0
        };
        e.prototype.buildTemplates = function() {
            var e = "";
            this.core.s.flipVertical && (e += '<button aria-label="Flip vertical" class="lg-flip-ver lg-icon"></button>'), this.core.s.flipHorizontal && (e += '<button aria-label="flip horizontal" class="lg-flip-hor lg-icon"></button>'), this.core.s.rotateLeft && (e += '<button aria-label="Rotate left" class="lg-rotate-left lg-icon"></button>'), this.core.s.rotateRight && (e += '<button aria-label="Rotate right" class="lg-rotate-right lg-icon"></button>'), this.core.$outer.find(".lg-toolbar").append(e)
        }, e.prototype.init = function() {
            var i = this;
            this.buildTemplates(), this.rotateValuesList = {}, this.core.$el.on("onAferAppendSlide.lg.tm.rotate", function(e, t) {
                i.core.$slide.eq(t).find(".lg-img-wrap").wrap('<div class="lg-img-rotate"></div>')
            }), this.core.$outer.find(".lg-rotate-left").on("click.lg", this.rotateLeft.bind(this)), this.core.$outer.find(".lg-rotate-right").on("click.lg", this.rotateRight.bind(this)), this.core.$outer.find(".lg-flip-hor").on("click.lg", this.flipHorizontal.bind(this)), this.core.$outer.find(".lg-flip-ver").on("click.lg", this.flipVertical.bind(this)), this.core.$el.on("onBeforeSlide.lg.tm.rotate", function(e, t, o) {
                i.rotateValuesList[o] || (i.rotateValuesList[o] = {
                    rotate: 0,
                    flipHorizontal: 1,
                    flipVertical: 1
                })
            })
        }, e.prototype.applyStyles = function() {
            this.core.$slide.eq(this.core.index).find(".lg-img-rotate").css("transform", "rotate(" + this.rotateValuesList[this.core.index].rotate + "deg) scale3d(" + this.rotateValuesList[this.core.index].flipHorizontal + ", " + this.rotateValuesList[this.core.index].flipVertical + ", 1)")
        }, e.prototype.getCurrentRotation = function(e) {
            if (!e) return 0;
            e = window.getComputedStyle(e, null), e = e.getPropertyValue("-webkit-transform") || e.getPropertyValue("-moz-transform") || e.getPropertyValue("-ms-transform") || e.getPropertyValue("-o-transform") || e.getPropertyValue("transform") || "none";
            if ("none" !== e) {
                e = e.split("(")[1].split(")")[0].split(",");
                if (e) {
                    e = Math.round(Math.atan2(e[1], e[0]) * (180 / Math.PI));
                    return e < 0 ? e + 360 : e
                }
            }
            return 0
        }, e.prototype.rotateLeft = function() {
            this.rotateValuesList[this.core.index].rotate -= 90, this.applyStyles()
        }, e.prototype.rotateRight = function() {
            this.rotateValuesList[this.core.index].rotate += 90, this.applyStyles()
        }, e.prototype.flipHorizontal = function() {
            var e = this.core.$slide.eq(this.core.index).find(".lg-img-rotate")[0],
                e = this.getCurrentRotation(e),
                e = 90 !== e && 270 !== e ? "flipHorizontal" : "flipVertical";
            this.rotateValuesList[this.core.index][e] *= -1, this.applyStyles()
        }, e.prototype.flipVertical = function() {
            var e = this.core.$slide.eq(this.core.index).find(".lg-img-rotate")[0],
                e = this.getCurrentRotation(e),
                e = 90 !== e && 270 !== e ? "flipVertical" : "flipHorizontal";
            this.rotateValuesList[this.core.index][e] *= -1, this.applyStyles()
        }, e.prototype.destroy = function() {
            this.core.$el.off(".lg.tm.rotate"), this.rotateValuesList = {}
        }, o.fn.lightGallery.modules.rotate = e
    }()
});