$(function() {
	"use strict";
	/*!
	function() {
		var t = {
			shareTitle: "天生一对，谕见爱情",
			descContent: "携手5年，一步一步谕见你",
			shareTimeTitle: "天生一对，谕见爱情",
			imgUrl: "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/share.png",
			lineLink: window.location.href
		},
			n = function() {
				YixinJSBridge.on("menu:share:appmessage", function() {
					YixinJSBridge.invoke("sendAppMessage", {
						img_width: "300",
						img_height: "300",
						img_url: t.imgUrl,
						link: t.lineLink,
						desc: t.descContent,
						title: t.shareTitle
					}, function() {
						i.closePop(), nie.config.stats.url.add("11231/index_0526.html?click=share", "天谕追女神")
					})
				}), YixinJSBridge.on("menu:share:timeline", function() {
					YixinJSBridge.invoke("shareTimeline", {
						img_width: "300",
						img_height: "300",
						img_url: t.imgUrl,
						link: t.lineLink,
						desc: t.shareTimeTitle,
						title: t.shareTimeTitle
					}, function() {
						i.closePop(), nie.config.stats.url.add("11231/index_0526.html?click=share", "天谕追女神")
					})
				})
			};
		document.addEventListener ? document.addEventListener("YixinJSBridgeReady", n, !1) : document.attachEvent && (document.attachEvent("YixinJSBridgeReady", n), document.attachEvent("onYixinJSBridgeReady", n)), wx.config(wx_conf), wx.ready(function() {
			wx.onMenuShareTimeline({
				title: t.shareTimeTitle,
				link: t.lineLink,
				imgUrl: t.imgUrl,
				success: function() {
					i.closePop(), nie.config.stats.url.add("11231/index_0526.html?click=share", "天谕追女神")
				},
				cancel: function() {}
			}), wx.onMenuShareAppMessage({
				title: t.shareTitle,
				desc: t.descContent,
				link: t.lineLink,
				imgUrl: t.imgUrl,
				success: function() {
					i.closePop(), nie.config.stats.url.add("11231/index_0526.html?click=share", "天谕追女神")
				},
				cancel: function() {}
			})
		})
	}();*/
	var t = {
		_fixMode: "auto",
		_contentWidth: 640,
		_contentHeight: 960,
		_resizeDelay: 200,
		_curRatio: 1,
		_docWidth: 0,
		_docHeight: 0,
		_els: [],
		_calcScaleRatio: function() {
			this._docWidth = document.documentElement.clientWidth, this._docHeight = document.documentElement.clientHeight;
			var t = {
				width: this._docWidth / this._contentWidth,
				height: this._docHeight / this._contentHeight
			};
			return this._curRatio = t[this._fixMode] ? t[this._fixMode] : t.width > t.height ? t.height : t.width, this
		},
		_fixEl: function() {
			for (var t = this._curRatio, n = this._els.length; n--;) this._els[n].attr("style", "-webkit-transform:scale(" + t + "," + t + ");-webkit-transition:all 0.5s;");
			return this
		},
		_bindResize: function() {
			var t = null,
				n = this;
			return $(window).bind("resize", function() {
				t && clearTimeout(t), t = setTimeout(function() {
					n._calcScaleRatio()._fixEl()
				}, n._resizeDelay)
			}), this
		},
		getScaleInfo: function() {
			return {
				ratio: this._curRatio,
				docWidth: this._docWidth,
				docHeight: this._docHeight,
				slideWidth: this._contentWidth,
				slideHeight: this._contentHeight
			}
		},
		addEl: function(t) {
			return this._els.push($(t)), this._fixEl()
		},
		init: function() {
			return this._calcScaleRatio()._bindResize()
		}
	},
		n = {
			_srcs: [],
			_onLoaded: null,
			_onLoading: null,
			load: function() {
				function t() {
					++a === s ? o._onLoaded && o._onLoaded() : o._onLoading && o._onLoading(Math.floor(a / s * 100))
				}
				var n, e, i = this._srcs,
					s = i.length,
					a = 0,
					o = this;
				if (!s) return o._onLoaded && o._onLoaded(), this;
				for (e = s; e--;) n = new Image, n.src = i[e], n.onload = t;
				return this
			},
			init: function(t, n, e) {
				return this._srcs = t.slice(0), this._onLoaded = n, this._onLoading = e, this
			}
		},
		e = {
			_POINTS_PER_INC_SELF: 100,
			_TOTAL_SECONDS: 20,
			_POINTS_PER_SCORE: 200,
			_TARGET_INITIAL_POS: .4,
			_POINTS_PER_INC_TARGET: 100,
			_TARGET_TIMES_PER_SEC: 5,
			_callback: null,
			_totalTimes: 0,
			_totalPoints: 0,
			_selfPoints: 0,
			_targetPoints: 0,
			_status: 0,
			_targetIntervalId: null,
			_distanceEl: null,
			_targetRingEl: null,
			_selfRingEl: null,
			_pageStateEl: null,
			_personAniIntervalId: null,
			_pointsToScore: function(t) {
				return Math.floor(t / this._POINTS_PER_SCORE)
			},
			_pointsToDeg: function(t) {
				return 360 * t / this._totalPoints
			},
			_renderDom: function() {
				return this._distanceEl.html(this._pointsToScore(this._targetPoints - this._selfPoints)), this._selfRingEl.attr("style", "-webkit-transform: rotate(" + this._pointsToDeg(this._selfPoints) + "deg)"), this._targetRingEl.attr("style", "-webkit-transform: rotate(" + this._pointsToDeg(this._targetPoints) + "deg)"), this
			},
			_renderDomStart: function() {
				var t = 0,
					n = this;
				return this._pageStateEl.addClass("active"), this._personAniIntervalId = setInterval(function() {
					0 === t && (t = -245) || (t = 0), n._personEl.css("backgroundPosition", "0px " + t + "px")
				}, 200), this
			},
			_renderDomStop: function() {
				return this._pageStateEl.removeClass("active"), clearInterval(this._personAniIntervalId), this
			},
			_inc: function() {
				return this._selfPoints += this._POINTS_PER_INC_SELF, this._selfPoints >= this._targetPoints && (this._stop(), this._callback && this._callback(!0)), this
			},
			_stop: function() {
				return this._renderDomStop(), clearInterval(this._targetIntervalId), this
			},
			reset: function() {
				return this._totalPoints = this._TARGET_TIMES_PER_SEC * this._TOTAL_SECONDS * this._POINTS_PER_INC_TARGET / (1 - this._TARGET_INITIAL_POS), this._totalTimes = this._TARGET_TIMES_PER_SEC * this._TOTAL_SECONDS, this._targetIntervalId = null, this._selfPoints = 0, this._targetPoints = this._totalPoints * this._TARGET_INITIAL_POS, this._renderDom(), this
			},
			start: function() {
				var t = this;
				return this._renderDomStart(), this._targetIntervalId = setInterval(function() {
					t._totalTimes-- <= 0 ? (t._stop(), t._callback && t._callback(!1)) : t._selfPoints >= t._targetPoints ? (t._stop(), t._callback && t._callback(!0)) : (t._targetPoints += t._POINTS_PER_INC_TARGET, t._renderDom())
				}, 1e3 / this._TARGET_TIMES_PER_SEC), this
			},
			init: function(t) {
				var n = this;
				return this._callback = t, this._distanceEl = $(".game-page .distance"), this._selfRingEl = $(".game-page .hand-self"), this._targetRingEl = $(".game-page .hand-target"), this._pageStateEl = $(".game-page .dirt"), this._personEl = $(".game-page .person"), $(".game-page .left-foot").bind("touchstart", function() {
					return 1 === n._status && (n._status = 0, n._inc()), !1
				}), $(".game-page .right-foot").bind("touchstart", function() {
					return 0 === n._status && (n._status = 1, n._inc()), !1
				}), this.reset(), this
			}
		},
		i = {
			switchTo: function(t) {
				return $(".wrapper").attr("class", "wrapper").addClass("s-" + t), this
			},
			openPop: function(t) {
				return $(".page-pop").attr("class", "page-pop").addClass("s-" + t).fadeIn(), this
			},
			closePop: function() {
				return $(".page-pop").fadeOut(function() {
					$(".page-pop").attr("class", "page-pop")
				}), this
			}
		},
		s = {
			init: function() {
				return $(".home-page .main-btn").bind("touchstart", function() {
					return i.switchTo("game"), e.reset().start(), !1
				}), this
			}
		},
		a = {
			init: function() {
				return e.init(function(t) {
					$("#page_cover").fadeIn(1500, function() {
						i.switchTo(t ? "guess" : "failed"), $("#page_cover").fadeOut(1500)
					})
				}), this
			}
		},
		o = {
			init: function() {
				return $(".guess-page").find(".bingbing-btn, .yuanyuan-btn, .tangwei-btn").bind("touchstart", function() {
					return i.switchTo("failed"), !1
				}), $(".guess-page .ab-btn").bind("touchstart", function() {
					return i.switchTo("success"), !1
				}), this
			}
		},
		r = {
			init: function() {
				return $(".success-page .info-btn").bind("touchstart", function() {
					return i.openPop("info"), !1
				}), $(".success-page .again-btn").bind("touchstart", function() {
					return i.switchTo("game"), e.reset().start(), !1
				}), $(".success-page .share-btn").bind("touchstart", function() {
					return i.openPop("share"), !1
				}), this
			}
		},
		h = {
			init: function() {
				return $(".failed-page .again-btn").bind("touchstart", function() {
					return i.switchTo("game"), e.reset().start(), !1
				}), $(".failed-page .share-btn").bind("touchstart", function() {
					return i.openPop("share"), !1
				}), this
			}
		},
		c = {
			init: function() {
				return $(".share-pop").bind("touchstart", function() {
					return i.closePop(), !1
				}), this
			}
		},
		u = {
			init: function() {
				return $(".info-pop .back-btn").bind("touchstart", function() {
					return i.closePop(), !1
				}), this
			}
		};
	t.init().addEl(".page-fg, .pop"), s.init(), a.init(), o.init(), r.init(), h.init(), c.init(), u.init(), i.switchTo("home"), n.init(["http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/bg-failed.jpg", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/bg-game.jpg", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/bg-guess.jpg", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/bg-home.jpg", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/bg-success.jpg", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/clock.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/count-down.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/dirt.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/distance-tip.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/failed-page.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/foot.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/game-page.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/guess-page.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/hand-tip.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/hand.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/home-page.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/info-pop.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/page-guess.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/page-home.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/person.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/share-pop.png", "http://res.tianyu.netease.com/qt/15/0525_zhuinvshen/data/success-page.png"], function() {
		$("#page_cover").fadeOut()
	}).load()
});