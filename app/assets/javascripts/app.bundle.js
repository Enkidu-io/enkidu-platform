"use strict";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	/* globals jQuery */
	(function ($) {
	  'use strict';
	  // Selector to select only not already processed elements
	
	  $.expr[":"].notmdproc = function (obj) {
	    if ($(obj).data("mdproc")) {
	      return false;
	    } else {
	      return true;
	    }
	  };
	
	  function _isChar(evt) {
	    if (typeof evt.which == "undefined") {
	      return true;
	    } else if (typeof evt.which == "number" && evt.which > 0) {
	      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 // backspace
	      && evt.which != 9 // tab
	      && evt.which != 13 // enter
	      && evt.which != 16 // shift
	      && evt.which != 17 // ctrl
	      && evt.which != 20 // caps lock
	      && evt.which != 27 // escape
	      ;
	    }
	    return false;
	  }
	
	  function _addFormGroupFocus(element) {
	    var $element = $(element);
	    if (!$element.prop('disabled')) {
	      // this is showing as undefined on chrome but works fine on firefox??
	      $element.closest(".form-group").addClass("is-focused");
	    }
	  }
	
	  function _toggleDisabledState($element, state) {
	    var $target;
	    if ($element.hasClass('checkbox-inline') || $element.hasClass('radio-inline')) {
	      $target = $element;
	    } else {
	      $target = $element.closest('.checkbox').length ? $element.closest('.checkbox') : $element.closest('.radio');
	    }
	    return $target.toggleClass('disabled', state);
	  }
	
	  function _toggleTypeFocus($input) {
	    var disabledToggleType = false;
	    if ($input.is($.material.options.checkboxElements) || $input.is($.material.options.radioElements)) {
	      disabledToggleType = true;
	    }
	    $input.closest('label').hover(function () {
	      var $i = $(this).find('input');
	      var isDisabled = $i.prop('disabled'); // hack because the _addFormGroupFocus() wasn't identifying the property on chrome
	      if (disabledToggleType) {
	        _toggleDisabledState($(this), isDisabled);
	      }
	      if (!isDisabled) {
	        _addFormGroupFocus($i); // need to find the input so we can check disablement
	      }
	    }, function () {
	      _removeFormGroupFocus($(this).find('input'));
	    });
	  }
	
	  function _removeFormGroupFocus(element) {
	    $(element).closest(".form-group").removeClass("is-focused"); // remove class from form-group
	  }
	
	  $.material = {
	    "options": {
	      // These options set what will be started by $.material.init()
	      "validate": true,
	      "input": true,
	      "ripples": true,
	      "checkbox": true,
	      "togglebutton": true,
	      "radio": true,
	      "arrive": true,
	      "autofill": false,
	
	      "withRipples": [".btn:not(.withoutripple)", '.submenu li', '.fc-button', ".dropdown-alt .list-group", "#leftnav .list-group .list-group-item ", ".navbar a:not(.withoutripple)", ".dropdown-menu li a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","),
	      "inputElements": "input.form-control, textarea.form-control, select.form-control",
	      "checkboxElements": ".checkbox > label > input[type=checkbox], label.checkbox-inline > input[type=checkbox]",
	      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
	      "radioElements": ".radio > label > input[type=radio], label.radio-inline > input[type=radio]"
	    },
	    "checkbox": function checkbox(selector) {
	      // Add fake-checkbox to material checkboxes
	      var $input = $(selector ? selector : this.options.checkboxElements).filter(":notmdproc").data("mdproc", true).after("<span class='checkbox-material'><span class='check'></span></span>");
	
	      _toggleTypeFocus($input);
	    },
	    "togglebutton": function togglebutton(selector) {
	      // Add fake-checkbox to material checkboxes
	      var $input = $(selector ? selector : this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", true).after("<span class='toggle'></span>");
	
	      _toggleTypeFocus($input);
	    },
	    "radio": function radio(selector) {
	      // Add fake-radio to material radios
	      var $input = $(selector ? selector : this.options.radioElements).filter(":notmdproc").data("mdproc", true).after("<span class='circle'></span><span class='check'></span>");
	
	      _toggleTypeFocus($input);
	    },
	    "input": function input(selector) {
	      $(selector ? selector : this.options.inputElements).filter(":notmdproc").data("mdproc", true).each(function () {
	        var $input = $(this);
	
	        // Requires form-group standard markup (will add it if necessary)
	        var $formGroup = $input.closest(".form-group"); // note that form-group may be grandparent in the case of an input-group
	        if ($formGroup.length === 0 && $input.attr('type') !== "hidden" && !$input.attr('hidden')) {
	          $input.wrap("<div class='form-group'></div>");
	          $formGroup = $input.closest(".form-group"); // find node after attached (otherwise additional attachments don't work)
	        }
	
	        // Legacy - Add hint label if using the old shorthand data-hint attribute on the input
	        if ($input.attr("data-hint")) {
	          $input.after("<p class='help-block'>" + $input.attr("data-hint") + "</p>");
	          $input.removeAttr("data-hint");
	        }
	
	        // Legacy - Change input-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
	        var legacySizes = {
	          "input-lg": "form-group-lg",
	          "input-sm": "form-group-sm"
	        };
	        $.each(legacySizes, function (legacySize, standardSize) {
	          if ($input.hasClass(legacySize)) {
	            $input.removeClass(legacySize);
	            $formGroup.addClass(standardSize);
	          }
	        });
	
	        // Legacy - Add label-floating if using old shorthand <input class="floating-label" placeholder="foo">
	        if ($input.hasClass("floating-label")) {
	          var placeholder = $input.attr("placeholder");
	          $input.attr("placeholder", null).removeClass("floating-label");
	          var id = $input.attr("id");
	          var forAttribute = "";
	          if (id) {
	            forAttribute = "for='" + id + "'";
	          }
	          $formGroup.addClass("label-floating");
	          $input.after("<label " + forAttribute + "class='control-label'>" + placeholder + "</label>");
	        }
	
	        // Set as empty if is empty (damn I must improve this...)
	        if ($input.val() === null || $input.val() == "undefined" || $input.val() === "") {
	          $formGroup.addClass("is-empty");
	        }
	
	        // Support for file input
	        if ($formGroup.find("input[type=file]").length > 0) {
	          $formGroup.addClass("is-fileinput");
	        }
	      });
	    },
	    "attachInputEventHandlers": function attachInputEventHandlers() {
	      var validate = this.options.validate;
	
	      $(document).on("keydown paste", ".form-control", function (e) {
	        if (_isChar(e)) {
	          $(this).closest(".form-group").removeClass("is-empty");
	        }
	      }).on("keyup change", ".form-control", function () {
	        var $input = $(this);
	        var $formGroup = $input.closest(".form-group");
	        var isValid = typeof $input[0].checkValidity === "undefined" || $input[0].checkValidity();
	
	        if ($input.val() === "") {
	          $formGroup.addClass("is-empty");
	        } else {
	          $formGroup.removeClass("is-empty");
	        }
	
	        // Validation events do not bubble, so they must be attached directly to the input: http://jsfiddle.net/PEpRM/1/
	        //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
	        //  the form-group on change.
	        //
	        // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
	        //        BUT, I've left it here for backwards compatibility.
	        if (validate) {
	          if (isValid) {
	            $formGroup.removeClass("has-error");
	          } else {
	            $formGroup.addClass("has-error");
	          }
	        }
	      }).on("focus", ".form-control, .form-group.is-fileinput", function () {
	        _addFormGroupFocus(this);
	      }).on("blur", ".form-control, .form-group.is-fileinput", function () {
	        _removeFormGroupFocus(this);
	      })
	      // make sure empty is added back when there is a programmatic value change.
	      //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
	      .on("change", ".form-group input", function () {
	        var $input = $(this);
	        if ($input.attr("type") == "file") {
	          return;
	        }
	
	        var $formGroup = $input.closest(".form-group");
	        var value = $input.val();
	        if (value) {
	          $formGroup.removeClass("is-empty");
	        } else {
	          $formGroup.addClass("is-empty");
	        }
	      })
	      // set the fileinput readonly field with the name of the file
	      .on("change", ".form-group.is-fileinput input[type='file']", function () {
	        var $input = $(this);
	        var $formGroup = $input.closest(".form-group");
	        var value = "";
	        $.each(this.files, function (i, file) {
	          value += file.name + ", ";
	        });
	        value = value.substring(0, value.length - 2);
	        if (value) {
	          $formGroup.removeClass("is-empty");
	        } else {
	          $formGroup.addClass("is-empty");
	        }
	        $formGroup.find("input.form-control[readonly]").val(value);
	      });
	    },
	    "ripples": function ripples(selector) {
	      $(selector ? selector : this.options.withRipples).ripples();
	    },
	    "autofill": function autofill() {
	      // This part of code will detect autofill when the page is loading (username and password inputs for example)
	      var loading = setInterval(function () {
	        $("input[type!=checkbox]").each(function () {
	          var $this = $(this);
	          if ($this.val() && $this.val() !== $this.attr("value")) {
	            $this.trigger("change");
	          }
	        });
	      }, 100);
	
	      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
	      setTimeout(function () {
	        clearInterval(loading);
	      }, 10000);
	    },
	    "attachAutofillEventHandlers": function attachAutofillEventHandlers() {
	      // Listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
	      var focused;
	      $(document).on("focus", "input", function () {
	        var $inputs = $(this).parents("form").find("input").not("[type=file]");
	        focused = setInterval(function () {
	          $inputs.each(function () {
	            var $this = $(this);
	            if ($this.val() !== $this.attr("value")) {
	              $this.trigger("change");
	            }
	          });
	        }, 100);
	      }).on("blur", ".form-group input", function () {
	        clearInterval(focused);
	      });
	    },
	    "init": function init(options) {
	      this.options = $.extend({}, this.options, options);
	      var $document = $(document);
	
	      if ($.fn.ripples && this.options.ripples) {
	        this.ripples();
	      }
	      if (this.options.input) {
	        this.input();
	        this.attachInputEventHandlers();
	      }
	      if (this.options.checkbox) {
	        this.checkbox();
	      }
	      if (this.options.togglebutton) {
	        this.togglebutton();
	      }
	      if (this.options.radio) {
	        this.radio();
	      }
	      if (this.options.autofill) {
	        this.autofill();
	        this.attachAutofillEventHandlers();
	      }
	
	      if (document.arrive && this.options.arrive) {
	        if ($.fn.ripples && this.options.ripples) {
	          $document.arrive(this.options.withRipples, function () {
	            $.material.ripples($(this));
	          });
	        }
	        if (this.options.input) {
	          $document.arrive(this.options.inputElements, function () {
	            $.material.input($(this));
	          });
	        }
	        if (this.options.checkbox) {
	          $document.arrive(this.options.checkboxElements, function () {
	            $.material.checkbox($(this));
	          });
	        }
	        if (this.options.radio) {
	          $document.arrive(this.options.radioElements, function () {
	            $.material.radio($(this));
	          });
	        }
	        if (this.options.togglebutton) {
	          $document.arrive(this.options.togglebuttonElements, function () {
	            $.material.togglebutton($(this));
	          });
	        }
	      }
	    }
	  };
	})(jQuery);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	!function (a, b, c, d) {
	  "use strict";
	  function e(b, c) {
	    g = this, this.element = a(b), this.options = a.extend({}, h, c), this._defaults = h, this._name = f, this.init();
	  }var f = "ripples",
	      g = null,
	      h = {};e.prototype.init = function () {
	    var c = this.element;c.on("mousedown touchstart", function (d) {
	      if (!g.isTouch() || "mousedown" !== d.type) {
	        c.find(".ripple-container").length || c.append('<div class="ripple-container"></div>');var e = c.children(".ripple-container"),
	            f = g.getRelY(e, d),
	            h = g.getRelX(e, d);if (f || h) {
	          var i = g.getRipplesColor(c),
	              j = a("<div></div>");j.addClass("ripple").css({ left: h, top: f, "background-color": i }), e.append(j), function () {
	            return b.getComputedStyle(j[0]).opacity;
	          }(), g.rippleOn(c, j), setTimeout(function () {
	            g.rippleEnd(j);
	          }, 500), c.on("mouseup mouseleave touchend", function () {
	            j.data("mousedown", "off"), "off" === j.data("animating") && g.rippleOut(j);
	          });
	        }
	      }
	    });
	  }, e.prototype.getNewSize = function (a, b) {
	    return Math.max(a.outerWidth(), a.outerHeight()) / b.outerWidth() * 2.5;
	  }, e.prototype.getRelX = function (a, b) {
	    var c = a.offset();return g.isTouch() ? (b = b.originalEvent, 1 === b.touches.length ? b.touches[0].pageX - c.left : !1) : b.pageX - c.left;
	  }, e.prototype.getRelY = function (a, b) {
	    var c = a.offset();return g.isTouch() ? (b = b.originalEvent, 1 === b.touches.length ? b.touches[0].pageY - c.top : !1) : b.pageY - c.top;
	  }, e.prototype.getRipplesColor = function (a) {
	    var c = a.data("ripple-color") ? a.data("ripple-color") : b.getComputedStyle(a[0]).color;return c;
	  }, e.prototype.hasTransitionSupport = function () {
	    var a = c.body || c.documentElement,
	        b = a.style,
	        e = b.transition !== d || b.WebkitTransition !== d || b.MozTransition !== d || b.MsTransition !== d || b.OTransition !== d;return e;
	  }, e.prototype.isTouch = function () {
	    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	    );
	  }, e.prototype.rippleEnd = function (a) {
	    a.data("animating", "off"), "off" === a.data("mousedown") && g.rippleOut(a);
	  }, e.prototype.rippleOut = function (a) {
	    a.off(), g.hasTransitionSupport() ? a.addClass("ripple-out") : a.animate({ opacity: 0 }, 100, function () {
	      a.trigger("transitionend");
	    }), a.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
	      a.remove();
	    });
	  }, e.prototype.rippleOn = function (a, b) {
	    var c = g.getNewSize(a, b);g.hasTransitionSupport() ? b.css({ "-ms-transform": "scale(" + c + ")", "-moz-transform": "scale(" + c + ")", "-webkit-transform": "scale(" + c + ")", transform: "scale(" + c + ")" }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : b.animate({ width: 2 * Math.max(a.outerWidth(), a.outerHeight()), height: 2 * Math.max(a.outerWidth(), a.outerHeight()), "margin-left": -1 * Math.max(a.outerWidth(), a.outerHeight()), "margin-top": -1 * Math.max(a.outerWidth(), a.outerHeight()), opacity: .2 }, 500, function () {
	      b.trigger("transitionend");
	    });
	  }, a.fn.ripples = function (b) {
	    return this.each(function () {
	      a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b));
	    });
	  };
	}(jQuery, window, document);
	//# sourceMappingURL=ripples.min.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	// GLOBAL CONSTANTS
	// -----------------------------------
	(function (window, document, $, undefined) {
	  "use strict";
	
	  var MaterialWrap = window.MaterialWrap || (window.MaterialWrap = {});
	  if (Modernizr.touchevents) {
	    MaterialWrap.APP_TOUCH = true;
	  } else {
	    MaterialWrap.APP_TOUCH = false;
	  }
	  MaterialWrap.APP_MEDIAQUERY = {
	    'desktopLG': 1280,
	    'desktop': 992,
	    'tablet': 768,
	    'mobile': 480
	  };
	  MaterialWrap.APP_COLORS = {
	    'primary': '#ec407a',
	    'success': '#28bebd',
	    'info': '#42a5f5',
	    'warning': '#fdf39e',
	    'danger': '#ef5350',
	    'mw_purple': '#6B79C4',
	    'mw_turquoise': '#00c5dc',
	    'mw_peach': '#feb38d',
	    'mw_salmon': '#EE6E73',
	    'mw_lightGray': '#EEF5F9',
	    'mw_gray': '#8f9eb5',
	    'mw_darkGray': '#707C94',
	    'mw_grayBlue': '#59779B'
	  };
	})(window, document, window.jQuery);
	// Initialize App configurations
	// --------------------------------------------------
	(function (window, document, $, undefined) {
	  //Option to persist settings:
	  var persistSettings = true;
	  var $html = $('html'),
	      $body = $('body'),
	      $appWrapper = $('#app_wrapper'),
	      $sidebarLeft = $('#app_sidebar-left'),
	      $sidebarRight = $('#app_sidebar-right');
	  if (persistSettings) {
	    //Setup some default layout options on app start.
	    //Let's check if localStorage is available and persist our settings,
	    if (typeof localStorage !== 'undefined') {
	      //Global namespace for sessionStorage,localStorage, and cookieStorage
	      window.appConfig = Storages.initNamespaceStorage('appConfig');
	      // If no appConfig key exsist then setup our default settings
	      if (appConfig.localStorage.isEmpty()) {
	        appConfig.localStorage.set({ 'leftSideBar': '', 'contentExpand': '' });
	      };
	      $body.addClass(appConfig.localStorage.get('leftSideBar'));
	      $appWrapper.addClass(appConfig.localStorage.get('contentExpand'));
	    };
	  };
	  window.app = {
	    persist: persistSettings,
	    config: {
	      isTouch: function isTouch() {
	        return $html.hasClass('touch');
	      },
	      isLeftSideBarCollapsed: function isLeftSideBarCollapsed() {
	        return $body.hasClass('app_sidebar-menu-collapsed');
	      },
	      isContentExpand: function isContentExpand() {
	        return $appWrapper.hasClass('content-expanded');
	      }
	    }
	  };
	})(window, document, window.jQuery);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _appState = __webpack_require__(5);
	
	var _drawers = __webpack_require__(8);
	
	var _animations = __webpack_require__(10);
	
	var _search = __webpack_require__(11);
	
	var _cards = __webpack_require__(12);
	
	var _dashboardCharts = __webpack_require__(13);
	
	var _chartsC3Demos = __webpack_require__(14);
	
	var _chartsChartjs = __webpack_require__(15);
	
	var _chartsChartistDemos = __webpack_require__(16);
	
	var _chartsMorrisjs = __webpack_require__(17);
	
	var _sidebars = __webpack_require__(6);
	
	var _listItems = __webpack_require__(18);
	
	var _photoSwipe = __webpack_require__(19);
	
	var _mail = __webpack_require__(20);
	
	var _chips = __webpack_require__(21);
	
	var _stepper = __webpack_require__(22);
	
	var _panelExpand = __webpack_require__(23);
	
	var _auth = __webpack_require__(24);
	
	var _alerts = __webpack_require__(25);
	
	var _notes = __webpack_require__(26);
	
	var _initPlugins = __webpack_require__(9);
	
	var _dateTime = __webpack_require__(27);
	
	var _transitions = __webpack_require__(28);
	
	var _matchElementHeight = __webpack_require__(29);
	
	var _demo = __webpack_require__(30);
	
	var _contextMenu = __webpack_require__(31);
	
	var _autocomplete = __webpack_require__(32);
	
	var _dataTables = __webpack_require__(33);
	
	var _wizard = __webpack_require__(34);
	
	var _gmap = __webpack_require__(35);
	
	var _sidebarChat = __webpack_require__(36);
	
	var _task = __webpack_require__(37);
	
	var _ecom = __webpack_require__(39);
	
	var _fileManager = __webpack_require__(40);
	
	//App View Modules
	/*
	*
	* MaterialWrap
	* Version: 1.0
	* Author: http://authenticgoods.co
	*
	*/
	//import the JavaScript modules to run
	var MaterialWrap = window.MaterialWrap || (window.MaterialWrap = {});
	MaterialWrap.dashboardWebStats = _dashboardCharts.dashboardWebStats;
	(function (window) {
	  if (window.Package) {
	    Materialize = {};
	  } else {
	    window.Materialize = {};
	  }
	})(window);
	// Unique ID
	Materialize.guid = function () {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return function () {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	  };
	}();
	$(function () {
	  $.material.init();
	  (0, _initPlugins.selectDropdowns)();
	  (0, _initPlugins.scrollBar)();
	  (0, _initPlugins.keepDropdownOpen)();
	  (0, _initPlugins.slickCarousel)();
	  (0, _initPlugins.videoPlayer)();
	  (0, _initPlugins.initToolbarjs)();
	  (0, _initPlugins.materialAvatar)();
	  (0, _sidebars.initSubMenu)();
	  (0, _appState.toggleState)();
	  (0, _appState.toggleExpand)();
	  (0, _search.navBarSearch)();
	  (0, _cards.cardRefresh)();
	  (0, _cards.cardToggleHighlighter)();
	  (0, _sidebars.switchMenuState)();
	  (0, _sidebars.openProfileMenu)();
	  (0, _sidebars.openThemeSettingPanel)();
	  (0, _dashboardCharts.dashboardWebStats)();
	  (0, _dashboardCharts.chartistPathAnimationDashboard)();
	  (0, _dashboardCharts.chartistBarsDashboard)();
	  (0, _dashboardCharts.chartistLineDashboard)();
	  (0, _dashboardCharts.chartistBiPolarChartDashboard)();
	  (0, _dataTables.mwDataTables)();
	  (0, _cards.cardStacks)();
	  (0, _cards.cardOffCanvas)();
	  (0, _drawers.toggleDrawer)();
	  (0, _dashboardCharts.sparklineDashboard)();
	  (0, _dateTime.currentDateTimeSidebar)();
	  (0, _dateTime.todaysDate)();
	  (0, _dateTime.timlineInput)();
	  (0, _dateTime.nextThreeDays)();
	  (0, _cards.cardCollapse)();
	  (0, _sidebars.closeOpenState)();
	  (0, _initPlugins.initTooltips)();
	  (0, _initPlugins.initPopovers)();
	  (0, _initPlugins.countTo)();
	  (0, _initPlugins.otherScrollbarOptions)();
	  (0, _transitions.fullscreenTransition)();
	  (0, _demo.css3AnimationDemos)();
	  (0, _demo.iconModal)();
	  (0, _auth.loginV3)();
	  (0, _auth.registerForm)();
	  (0, _alerts.sweetAlerts)();
	  (0, _alerts.alertifyjs)();
	  (0, _cards.cardSearch)();
	  (0, _panelExpand.expansionPanel)();
	  (0, _stepper.simpleStepper)();
	  (0, _chips.chips)();
	  (0, _sidebarChat.sidebarChatCompose)();
	  (0, _chips.initChips)();
	  (0, _listItems.dismissListItem)();
	  (0, _initPlugins.initSliders)();
	  (0, _cards.cardReveal)();
	  (0, _cards.cardTask)();
	  (0, _contextMenu.contextMenu)();
	  (0, _initPlugins.materialDatePicker)();
	  (0, _initPlugins.pikaday)();
	  (0, _autocomplete.countryAutocomplete)();
	  (0, _autocomplete.autocompleteBasic)();
	  (0, _autocomplete.autocompleteClear)();
	  (0, _initPlugins.triggerFormValidation)();
	  (0, _wizard.wizardDemo)();
	  (0, _animations.fabMenu)();
	  (0, _initPlugins.masonryInit)();
	  (0, _animations.toggleCard)();
	  (0, _animations.toggleSearch)();
	  (0, _photoSwipe.initPhotoSwipeFromDOM)();
	  (0, _demo.cardCarousel)();
	  (0, _demo.cardDemoMorrisChart)();
	  (0, _demo.loadThemes)();
	  (0, _demo.swapLayoutMode)();
	  //Chart C3 Demos
	  (0, _chartsC3Demos.c3_pie)();
	  (0, _chartsC3Demos.c3_donut)();
	  (0, _chartsC3Demos.c3_gauges)();
	  (0, _chartsC3Demos.c3_areaChart)();
	  (0, _chartsC3Demos.c3_combination)();
	  (0, _chartsC3Demos.c3_zoom)();
	  (0, _chartsC3Demos.c3_stacked_bars_chart)();
	  (0, _chartsC3Demos.c3_areaSpline)();
	  (0, _chartsC3Demos.c3_scatter)();
	  //Chart chartist demos,
	  (0, _chartsChartistDemos.chartist_simplePie)();
	  (0, _chartsChartistDemos.chartist_pieCustomLabels)();
	  (0, _chartsChartistDemos.chartist_animatingDonut)();
	  (0, _chartsChartistDemos.chartist_biPolarBar)();
	  (0, _chartsChartistDemos.chartist_peakCircles)();
	  (0, _chartsChartistDemos.chartist_stackedBar)();
	  (0, _chartsChartistDemos.chartist_horizontalBar)();
	  (0, _chartsChartistDemos.chartist_lineChart)();
	  (0, _chartsChartistDemos.chartist_holesInData)();
	  (0, _chartsChartistDemos.chartist_filledHolesInData)();
	  (0, _chartsChartistDemos.chartist_onlyWholeNumbers)();
	  (0, _chartsChartistDemos.chartist_lineScatter)();
	  (0, _chartsChartistDemos.chartist_lineChartWithArea)();
	  (0, _chartsChartistDemos.chartist_biPolar)();
	  //Chart.js
	  (0, _chartsChartjs.chartjs_lineChart)();
	  (0, _chartsChartjs.chartjs_barChart)();
	  (0, _chartsChartjs.chartjs_radarChart)();
	  (0, _chartsChartjs.chartjs_polarChart)();
	  (0, _chartsChartjs.chartjs_pieChart)();
	  (0, _chartsChartjs.chartjs_doughnutChart)();
	  //Morris.js Charts
	  (0, _chartsMorrisjs.morrisjs_demo)();
	  //app views
	  (0, _fileManager.selectedItem)();
	  (0, _dataTables.checkAll)();
	  (0, _dataTables.deleteItem)();
	  (0, _dataTables.pagination)();
	  (0, _ecom.triggerSummerNoteEcom)();
	  (0, _ecom.triggerDropzoneEcom)();
	  (0, _ecom.addProductTags)();
	  (0, _ecom.editProductImg)();
	  (0, _ecom.orderTable)();
	  (0, _ecom.customerTable)();
	  (0, _notes.allNotes)();
	  (0, _notes.notesAdd)();
	  (0, _notes.noteSelected)();
	  (0, _notes.noteImgUpload)();
	  (0, _notes.noteAddList)();
	  (0, _notes.updateNote)();
	  (0, _mail.mailList)();
	  (0, _mail.mailCompose)();
	  (0, _mail.mailSelected)();
	  (0, _task.loadTaskId)();
	  (0, _task.getTaskCardInfo)();
	  (0, _task.addNewTask)();
	  (0, _task.addNewTaskList)();
	  (0, _task.deleteTask)();
	  (0, _task.editTask)();
	  (0, _task.filterTaskMembers)();
	  (0, _task.dragDropTask)();
	  //Pages
	  (0, _gmap.loadGmaps)();
	  if (Modernizr.mq("screen and (min-width:768px)")) {
	    (0, _matchElementHeight.matchElementHeight)('.match-height .card');
	  }
	});
	window.onload = function () {
	  (0, _ecom.salesStats)();
	  (0, _ecom.conversionStats)();
	  (0, _ecom.todaysSales)();
	  (0, _ecom.newUsers)();
	};
	$(document).on('resize', function () {
	  _.debounce(_sidebars.switchMenuState, 300, false)();
	  _.debounce(_dashboardCharts.drawSparkline, 300, false)();
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toggleExpand = exports.toggleState = undefined;
	
	var _sidebars = __webpack_require__(6);
	
	var _backdrops = __webpack_require__(7);
	
	//
	// Module to toggle state
	// ----------------------------------
	var toggleState = function toggleState() {
	    var $toggleElement = $('[data-toggle-state]');
	    $('[data-toggle-state]').on('click', function (e) {
	        e.stopPropagation();
	        var $body = $('body'),
	            element = $(this),
	            className = element.data('toggleState'),
	            key = element.data('key'),
	            $target = $body;
	        if (className) {
	            if ($target.hasClass(className)) {
	                $target.removeClass(className);
	                if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(min-width: 1280px)')) {
	                    appConfig.localStorage.set(key, '');
	                };
	            } else {
	                $target.addClass(className);
	                if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(min-width: 1280px)')) {
	                    appConfig.localStorage.set(key, className);
	                };
	            }
	        }
	        (0, _sidebars.menuIconState)(element);
	        if (typeof localStorage !== 'undefined' && window.app.persist && Modernizr.mq('(max-width: 1280px)') || typeof localStorage !== 'undefined' && window.app.persist && className === 'sidebar-overlay-open') {
	            (0, _backdrops.backDrops)(className, element, $target);
	            appConfig.localStorage.set(key, '');
	        }
	    });
	};
	var toggleExpand = function toggleExpand() {
	    var $toggleExpanded = $('[data-toggle-expand]');
	    $toggleExpanded.on('click', function (e) {
	        e.stopPropagation();
	        var $appWrapper = $('#app_wrapper'),
	            element = $(this),
	            elementIcon = element.children('i'),
	            className = element.data('toggleExpand'),
	            key = element.data('key'),
	            $target = $appWrapper;
	        if (className) {
	            if ($target.hasClass(className)) {
	                $target.removeClass(className);
	                if (typeof localStorage !== 'undefined' && window.app.persist) {
	                    appConfig.localStorage.set(key, '');
	                    elementIcon.toggleClass('zmdi-fullscreen-exit zmdi-fullscreen');
	                };
	            } else {
	                $target.addClass(className);
	                if (typeof localStorage !== 'undefined' && window.app.persist) {
	                    appConfig.localStorage.set(key, className);
	                    elementIcon.toggleClass('zmdi-fullscreen zmdi-fullscreen-exit');
	                };
	            }
	        }
	    });
	};
	exports.toggleState = toggleState;
	exports.toggleExpand = toggleExpand;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initSubMenu = function initSubMenu() {
	  var subMenu = $('#app_main-menu-wrapper .nav');
	  $(subMenu).navgoco({ caretHtml: false, accordion: true });
	};
	var closeOpenState = function closeOpenState() {
	  $('#app_sidebar-left').on('mouseleave', function () {
	    if ($('body.app_sidebar-menu-collapsed').length > 0) {
	      $('.nav-dropdown').each(function () {
	        if ($(this).hasClass('open') && !$(this).hasClass('active')) {
	          $(this).removeClass('open');
	          $(this).children('.nav-sub').removeAttr("style");
	        }
	      });
	    }
	  });
	};
	var switchMenuState = function switchMenuState() {
	  var $body = $('body');
	  var $html = $('html');
	  if ($(window).width() < 992 && !$html.hasClass('backdrop-open')) {
	    $body.removeClass('app_sidebar-menu-collapsed');
	    $('#content_wrapper').removeClass('toggle-left toggle-right');
	  } else if (!$html.hasClass('backdrop-open')) {
	    $body.removeClass('app_sidebar-left-open');
	  }
	};
	var menuIconState = function menuIconState(element) {
	  //Left Menu
	  if (element.context.dataset.toggleState === 'app_sidebar-menu-collapsed') {
	    if ($('body.app_sidebar-menu-collapsed').length > 0) {
	      $('#logo_wrapper .menu-icon a').addClass('is-active');
	    } else {
	      $('#logo_wrapper .menu-icon a').removeClass('is-active');
	    };
	  };
	  //Right Menu
	  if (element.context.dataset.toggleState === 'sidebar-overlay-open') {
	    if ($('body.sidebar-overlay-open').length > 0) {
	      $('[data-toggle-state="sidebar-overlay-open"] i').toggleClass('mdi-playlist-plus mdi-playlist-minus');
	    } else {
	      $('[data-toggle-state="sidebar-overlay-open"] i').toggleClass('mdi-playlist-minus mdi-playlist-plus');
	    };
	  }
	};
	var openProfileMenu = function openProfileMenu() {
	  $('[data-profile="open-menu"]').on('click', function () {
	    $(this).parents('.profile-menu').toggleClass('open').find('.accounts').slideToggle();
	    $('.switch').materialAvatar({ shape: 'circle' });
	  });
	};
	var openThemeSettingPanel = function openThemeSettingPanel() {
	  $('[data-trigger="sidebar-overlay-open"]').on('click', function (e) {
	    e.stopPropagation();
	    $('[data-toggle-state="sidebar-overlay-open"]').trigger('click');
	    $('a[href="#sidebar_settings"]').trigger('click');
	  });
	};
	exports.initSubMenu = initSubMenu;
	exports.closeOpenState = closeOpenState;
	exports.switchMenuState = switchMenuState;
	exports.menuIconState = menuIconState;
	exports.openProfileMenu = openProfileMenu;
	exports.openThemeSettingPanel = openThemeSettingPanel;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var backDrops = exports.backDrops = function backDrops(className, element, $target) {
	  var $body = $('body');
	  var $html = $('html');
	  if ($target.hasClass(className)) {
	    if (className === 'expand' || className === 'app_sidebar-left-open') {
	      $body.append('<div class="backdrop ' + className + ' top"></div>');
	    } else {
	      $body.append('<div class="backdrop ' + className + '"></div>');
	    }
	    if (MaterialWrap.APP_TOUCH === true) {
	      $('.' + className + '.backdrop').hammer().bind('tap', function (e) {
	        e.stopPropagation();
	        element.trigger('click');
	      });
	    } else {
	      $('.' + className + '.backdrop').on('click', function (e) {
	        e.stopPropagation();
	        element.trigger('click');
	      });
	    };
	    if ($('.backdrop').length > 0 && !$html.hasClass('backdrop-open')) {
	      $html.addClass('backdrop-open');
	    }
	  } else {
	    if (className === 'sidebar-overlay-open') {
	      $('#chat_compose_wrapper').removeClass('open');
	    }
	    $('.' + className + '.backdrop').fadeOut(250, function () {
	      $(this).remove();
	      if ($('.backdrop').length === 0) {
	        $html.removeClass('backdrop-open');
	      }
	    });
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleDrawer = undefined;
	
	var _backdrops = __webpack_require__(7);
	
	var _initPlugins = __webpack_require__(9);
	
	//
	// Module to toggle drawers
	// ----------------------------------
	var toggleDrawer = function toggleDrawer() {
	  var $toggleElement = $('[data-drawer]');
	  $toggleElement.off('click');
	  $toggleElement.on('click', function (e) {
	    e.stopPropagation();
	    var $body = $('body'),
	        element = $(this),
	        className = element.data('drawer'),
	        $target = $('#content_wrapper');
	    if (className) {
	      if ($target.hasClass(className)) {
	        $target.removeClass(className);
	      } else {
	        $target.addClass(className);
	      }
	    }
	    if (className === 'open-left' || className === 'open-right' || className === 'open-left-lg' || className === 'open-right-lg') {
	      (0, _backdrops.backDrops)(className, element, $target);
	    } else if (className === 'toggle-left' && Modernizr.mq('(max-width: 992px)') || className === 'toggle-right' && Modernizr.mq('(max-width: 992px)')) {
	      (0, _backdrops.backDrops)(className, element, $target);
	    }
	    //Redraw Masonary Layout for Notes App
	    setTimeout(function () {
	      (0, _initPlugins.masonryInit)();
	    }, 200);
	    setTimeout(function () {
	      if ($('#storeLocations').length > 0) {
	        var storeLocations = window.storeLocations || (window.storeLocations = {});
	        google.maps.event.trigger(storeLocations, 'resize');
	      }
	    }, 200);
	  });
	  var $dismissElement = $('[data-dismiss=drawer]');
	  $dismissElement.on('click', function (e) {
	    e.stopPropagation();
	    $('.backdrop').trigger('click');
	  });
	};
	exports.toggleDrawer = toggleDrawer;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var scrollBar = function scrollBar() {
	  if ($('.scrollbar').length > 0) {
	    $('.scrollbar').mCustomScrollbar({
	      theme: "minimal-dark",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	  $("#app_main-menu-wrapper.scrollbar").mCustomScrollbar("scrollTo", ".nav-dropdown.active", { scrollInertia: 0 });
	};
	var otherScrollbarOptions = function otherScrollbarOptions() {
	  if ($('.scrollbar-minimal-light').length > 0) {
	    $('.scrollbar-minimal-light').mCustomScrollbar({
	      theme: "minimal",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	  if ($('.scrollbar-light').length > 0) {
	    $('.scrollbar-light').mCustomScrollbar({
	      theme: "light",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	  if ($('.scrollbar-dark').length > 0) {
	    $('.scrollbar-dark').mCustomScrollbar({
	      theme: "dark",
	      scrollInertia: 1000,
	      mouseWheel: {
	        preventDefault: true
	      }
	    });
	  }
	};
	var selectDropdowns = function selectDropdowns() {
	  $(".select.country").dropdown({ "optionClass": "withripple", "dropdownClass": "country-icons" });
	  $('.country-icons ul li').each(function () {
	    var countryOptions = $(this).text();
	    if ($.trim(countryOptions) === 'English') {
	      $(this).prepend('<img src="assets/img/icons/flags/US.png" class="max-w-20 m-r-10" alt="" />');
	    } else if ($.trim(countryOptions) === 'Español') {
	      $(this).prepend('<img src="assets/img/icons/flags/ES.png" class="max-w-20 m-r-10" alt="" />');
	    } else if ($.trim(countryOptions) === 'Français') {
	      $(this).prepend('<img src="assets/img/icons/flags/FR.png" class="max-w-20 m-r-10" alt="" />');
	    } else if ($.trim(countryOptions) === 'Italiano') {
	      $(this).prepend('<img src="assets/img/icons/flags/IT.png" class="max-w-20 m-r-10" alt="" />');
	    }
	  });
	  $(".select").dropdown({ "optionClass": "withripple" });
	};
	var countTo = function countTo() {
	  $('.timer').countTo();
	};
	var initTooltips = function initTooltips() {
	  $('[data-toggle="tooltip"]').tooltip();
	  $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
	    $('.tooltip').addClass('scale').css('opacity', 1);
	  });
	};
	//Ref: https://github.com/hellsan631/material-avatar
	var materialAvatar = function materialAvatar() {
	  var $mdCircleAvatar = $('.circle-profile-photo'),
	      $mdSquareAvatar = $('.square-profile-photo');
	  $mdCircleAvatar.materialAvatar({ shape: 'circle' });
	  $mdSquareAvatar.materialAvatar();
	};
	var initSliders = function initSliders() {
	  if ($('#slider-danger').length) {
	    var sliderDanger = document.getElementById('slider-danger');
	    noUiSlider.create(sliderDanger, {
	      start: 10,
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-warning').length) {
	    var sliderWarning = document.getElementById('slider-warning');
	    noUiSlider.create(sliderWarning, {
	      start: 20,
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-info').length) {
	    var sliderInfo = document.getElementById('slider-info');
	    noUiSlider.create(sliderInfo, {
	      start: 40,
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-success').length) {
	    var sliderSuccess = document.getElementById('slider-success');
	    noUiSlider.create(sliderSuccess, {
	      start: 10,
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-primary').length) {
	    var sliderPrimary = document.getElementById('slider-primary');
	    noUiSlider.create(sliderPrimary, {
	      start: 60,
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-danger-vert').length) {
	    var sliderDangerVert = document.getElementById('slider-danger-vert');
	    noUiSlider.create(sliderDangerVert, {
	      start: 10,
	      orientation: 'vertical',
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-warning-vert').length) {
	    var sliderWarningVert = document.getElementById('slider-warning-vert');
	    noUiSlider.create(sliderWarningVert, {
	      start: 20,
	      orientation: 'vertical',
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-info-vert').length) {
	    var sliderInfoVert = document.getElementById('slider-info-vert');
	    noUiSlider.create(sliderInfoVert, {
	      start: 40,
	      orientation: 'vertical',
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-success-vert').length) {
	    var sliderSuccessVert = document.getElementById('slider-success-vert');
	    noUiSlider.create(sliderSuccessVert, {
	      start: 10,
	      orientation: 'vertical',
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-primary-vert').length) {
	    var sliderPrimaryVert = document.getElementById('slider-primary-vert');
	    noUiSlider.create(sliderPrimaryVert, {
	      start: 60,
	      orientation: 'vertical',
	      connect: [true, false],
	      range: {
	        'min': 0,
	        'max': 100
	      }
	    });
	  };
	  if ($('#slider-range').length) {
	    // Initialize slider:
	    var rangeSlider = document.getElementById('slider-range');
	    var moneyFormat = wNumb({ decimals: 0, thousand: ',', prefix: '$' });
	    noUiSlider.create(rangeSlider, {
	      start: [162091, 676818],
	      step: 1,
	      range: {
	        'min': [100000],
	        'max': [1000000]
	      },
	      connect: true,
	      format: moneyFormat
	    });
	    rangeSlider.noUiSlider.on('update', function (values, handle) {
	      document.getElementById('slider-range-value1').innerHTML = values[0];
	      document.getElementById('slider-range-value2').innerHTML = values[1];
	      document.getElementsByName('min-value').value = moneyFormat.from(values[0]);
	      document.getElementsByName('max-value').value = moneyFormat.from(values[1]);
	    });
	  };
	};
	var materialDatePicker = function materialDatePicker() {
	  $('#md_input_date').bootstrapMaterialDatePicker({ weekStart: 0, time: false });
	  $('#md_input_time').bootstrapMaterialDatePicker({ date: false, format: 'HH:mm' });
	  $('#md_input_date_time').bootstrapMaterialDatePicker({ format: 'dddd DD MMMM YYYY - HH:mm' });
	};
	var pikaday = function pikaday() {
	  var picker = new Pikaday({
	    field: document.getElementById('datepicker'),
	    firstDay: 1,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    yearRange: [2000, 2020]
	  });
	  var pickerTheme = new Pikaday({ field: document.getElementById('datepicker-theme'), theme: 'dark-theme' });
	  var startDate,
	      endDate,
	      updateStartDate = function updateStartDate() {
	    startPicker.setStartRange(startDate);
	    endPicker.setStartRange(startDate);
	    endPicker.setMinDate(startDate);
	  },
	      updateEndDate = function updateEndDate() {
	    startPicker.setEndRange(endDate);
	    startPicker.setMaxDate(endDate);
	    endPicker.setEndRange(endDate);
	  },
	      startPicker = new Pikaday({
	    field: document.getElementById('start_date'),
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    onSelect: function onSelect() {
	      startDate = this.getDate();
	      updateStartDate();
	    }
	  }),
	      endPicker = new Pikaday({
	    field: document.getElementById('end_date'),
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    onSelect: function onSelect() {
	      endDate = this.getDate();
	      updateEndDate();
	    }
	  }),
	      _startDate = startPicker.getDate(),
	      _endDate = endPicker.getDate();
	  if (_startDate) {
	    startDate = _startDate;
	    updateStartDate();
	  }
	  if (_endDate) {
	    endDate = _endDate;
	    updateEndDate();
	  }
	};
	//Form validation
	var triggerFormValidation = function triggerFormValidation() {
	  $("#form-horizontal").validate({
	    highlight: function highlight(element) {
	      $(element).closest(".form-group").addClass("has-error");
	    },
	    unhighlight: function unhighlight(element) {
	      $(element).closest(".form-group").removeClass("has-error");
	    },
	    errorElement: "span",
	    errorClass: "help-block",
	    errorPlacement: function errorPlacement(element, e) {
	      e.parent(".input-group").length ? element.insertAfter(e.parent()) : e.parent("label").length ? element.insertBefore(e.parent()) : element.insertAfter(e);
	    }
	  });
	};
	var masonryInit = function masonryInit() {
	  $('#masonry').masonry({ itemSelector: '.masonry-item' });
	};
	var keepDropdownOpen = function keepDropdownOpen() {
	  $(document).on('click', '.dropdown-menu', function (e) {
	    e.stopPropagation();
	  });
	};
	var slickCarousel = function slickCarousel() {
	  $('#new_arrivals_img').slick({ dots: true, infinite: true, speed: 500, cssEase: 'linear' });
	};
	var videoPlayer = function videoPlayer() {
	  if ($('audio, video')[0]) {
	    $('video,audio').mediaelementplayer();
	  }
	};
	var initPopovers = function initPopovers() {
	  $("[data-toggle=popover]").popover();
	};
	var initToolbarjs = function initToolbarjs() {
	  // Define any icon actions before calling the toolbar
	  $('.toolbar-icons a').on('click', function (event) {
	    event.preventDefault();
	  });
	  $('button[data-toolbar="user-options"]').toolbar({
	    content: '#user-options',
	    position: 'top',
	    event: 'hover'
	  });
	  $('button[data-toolbar="transport-options"]').toolbar({
	    content: '#transport-options',
	    position: 'top',
	    event: 'hover'
	  });
	  $('button[data-toolbar="transport-options-o"]').toolbar({
	    content: '#transport-options-o',
	    position: 'bottom',
	    event: 'hover'
	  });
	  $('button[data-toolbar="content-option"]').toolbar({
	    content: '#transport-options',
	    event: 'hover'
	  });
	  $('button[data-toolbar="position-option"]').toolbar({
	    content: '#transport-options',
	    position: 'bottom',
	    event: 'hover'
	  });
	  $('button[data-toolbar="style-option"]').toolbar({
	    content: '#transport-options',
	    position: 'bottom',
	    style: 'primary',
	    event: 'hover'
	  });
	  $('button[data-toolbar="animation-option"]').toolbar({
	    content: '#transport-options',
	    position: 'bottom',
	    style: 'primary',
	    animation: 'flyin',
	    event: 'hover'
	  });
	  $('button[data-toolbar="event-option"]').toolbar({
	    content: '#transport-options',
	    position: 'bottom',
	    style: 'primary',
	    event: 'hover'
	  });
	  $('button[data-toolbar="hide-option"]').toolbar({
	    content: '#transport-options',
	    position: 'bottom',
	    style: 'primary',
	    event: 'hover',
	    hideOnClick: true
	  });
	  $('#link-toolbar').toolbar({
	    content: '#user-options',
	    position: 'top',
	    event: 'hover',
	    adjustment: 35
	  });
	  $('button[data-toolbar="set-01"]').toolbar({
	    content: '#set-01-options',
	    position: 'top',
	    event: 'hover'
	  });
	  $('button[data-toolbar="set-02"]').toolbar({
	    content: '#set-02-options',
	    position: 'left',
	    event: 'hover'
	  });
	  $('button[data-toolbar="set-03"]').toolbar({
	    content: '#set-03-options',
	    position: 'bottom',
	    event: 'hover'
	  });
	  $('button[data-toolbar="set-04"]').toolbar({
	    content: '#set-04-options',
	    position: 'right',
	    event: 'hover'
	  });
	  $(".download").on('click', function () {
	    mixpanel.track("Toolbar.Download");
	  });
	  $("#transport-options-2").find('a').on('hover', function () {
	    $this = $(this);
	    $button = $('button[data-toolbar="transport-options-2"]');
	    $newClass = $this.find('i').attr('class').substring(3);
	    $oldClass = $button.find('i').attr('class').substring(3);
	    if ($newClass != $oldClass) {
	      $button.find('i').animate({
	        top: "+=50",
	        opacity: 0
	      }, 200, function () {
	        $(this).removeClass($oldClass).addClass($newClass).css({ top: "-=100", opacity: 1 }).animate({
	          top: "+=50"
	        });
	      });
	    }
	  });
	  $('button[data-toolbar="transport-options-2"]').toolbar({
	    content: '#transport-options-2',
	    position: 'top'
	  });
	};
	exports.scrollBar = scrollBar;
	exports.selectDropdowns = selectDropdowns;
	exports.materialAvatar = materialAvatar;
	exports.initTooltips = initTooltips;
	exports.initPopovers = initPopovers;
	exports.countTo = countTo;
	exports.otherScrollbarOptions = otherScrollbarOptions;
	exports.initSliders = initSliders;
	exports.materialDatePicker = materialDatePicker;
	exports.pikaday = pikaday;
	exports.triggerFormValidation = triggerFormValidation;
	exports.masonryInit = masonryInit;
	exports.keepDropdownOpen = keepDropdownOpen;
	exports.slickCarousel = slickCarousel;
	exports.videoPlayer = videoPlayer;
	exports.initToolbarjs = initToolbarjs;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//Fab MENU
	var fabMenu = function fabMenu() {
	  $('.fab-menu').on('click', function (e) {
	    e.stopPropagation();
	    var $this = $(this),
	        $menuGroup = $this.parent(),
	        $subMenu = $this.next().children(),
	        fabDir = '';
	    if ($this.data("fab") == 'right') {
	      fabDir = 'translateX(';
	    } else if ($this.data("fab") == 'left') {
	      fabDir = 'translateX(-';
	    } else if ($this.data("fab") == 'up') {
	      fabDir = 'translateY(-';
	    } else {
	      //fallback is down
	      fabDir = 'translateY(';
	    };
	    $this.parent().toggleClass('open');
	    if ($menuGroup.hasClass('open')) {
	      (function () {
	        var num = 0;
	        $subMenu.each(function (index, value) {
	          num += 48;
	          $(this).css({ 'transform': '' + fabDir + num + 'px)' });
	        });
	      })();
	    } else {
	      $(this).removeAttr('style');
	    }
	  });
	  $(document).on('click', function (e) {
	    $('.btn-fab-group').removeClass('open');
	  });
	};
	var toggleCard = function toggleCard() {
	  $('input#toggle-price:checkbox').on('change', function () {
	    if ($(this).is(":checked")) {
	      $('.pricing-wrapper .card-container').addClass("flipped");
	    } else {
	      $('.pricing-wrapper .card-container').removeClass("flipped");
	    }
	  });
	};
	var toggleSearch = function toggleSearch() {
	  if ($('.search-target')[0]) {
	    var toggleSearchIcon = '[data-search-trigger]',
	        $body = $('body');
	    $body.on('focus', toggleSearchIcon, function (e) {
	      var element = $(this),
	          className = element.data('searchTrigger'),
	          $target = element.parents('.search-target');
	      $target.addClass('open');
	    });
	    $body.on('blur', toggleSearchIcon, function (e) {
	      var element = $(this),
	          className = element.data('searchTrigger'),
	          $target = element.parents('.search-target');
	      $target.removeClass('open');
	    });
	  };
	};
	exports.fabMenu = fabMenu;
	exports.toggleCard = toggleCard;
	exports.toggleSearch = toggleSearch;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var navBarSearch = function navBarSearch() {
	    var $openSearch = $('[data-navsearch-open]'),
	        $closeSearch = $('[data-navsearch-close]'),
	        $navbarForm = $('#navbar_form'),
	        $navbarSearch = $('#navbar_search'),
	        $document = $(document);
	    $openSearch.on('click', function (e) {
	        e.stopPropagation();
	        $navbarForm.addClass('open');
	        $navbarSearch.focus();
	    });
	    $closeSearch.on('click', function (e) {
	        e.stopPropagation();
	        $navbarForm.removeClass('open');
	        $navbarSearch.val('');
	    });
	    $document.on('click', function (e) {
	        e.stopPropagation();
	        if (e.target !== $('#navbar_search')) {
	            $navbarForm.removeClass('open');
	            $navbarSearch.val('');
	        }
	    });
	    $navbarSearch.on('click', function (e) {
	        e.stopPropagation();
	    });
	};
	var widgetSearch = function widgetSearch() {
	    var $openSearch = $('[data-widget-search-open]'),
	        $closeSearch = $('[data-widget-search-close]');
	    $openSearch.on('click', function (e) {
	        e.stopPropagation();
	        $navbarForm.addClass('open');
	        $navbarSearch.focus();
	    });
	};
	exports.navBarSearch = navBarSearch;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cardReveal = exports.cardSearch = exports.cardToggleHighlighter = exports.cardTask = exports.cardStacks = exports.cardOffCanvas = exports.cardCollapse = exports.cardRefresh = undefined;
	
	var _dashboardCharts = __webpack_require__(13);
	
	//
	// Module for cards
	// ----------------------------------
	var card = {
	  cardClass: ".card",
	  cardHeadingClass: ".card .card-heading",
	  cardBodyClass: ".card .card-body",
	  cardFooterClass: ".card .card-footer",
	  cardRevealClass: ".card .card-reveal",
	  cardRefresh: '.card a[data-toggle="refresh"]',
	  cardClose: '.card a[data-toggle="close"]',
	  cardCollapse: '.card a[data-toggle="collapse"]',
	  cardToggleHighlighter: 'a[data-toggle-view="code"]',
	  cardSearchOpen: 'a[data-card-search="open"]',
	  cardSearchClose: '[data-card-search="close"]',
	  cardRevealToggle: '[data-toggle="reveal"]'
	};
	var cardRefresh = function cardRefresh() {
	  $(document).on("click", card.cardRefresh, function (e) {
	    e.preventDefault();
	    var $card = $(this).closest(card.cardClass);
	    $card.append("<div class=\"load\"></div>");
	    var $loader = $card.find('.load');
	    $loader.load('assets/partials/_preloader.html', function () {
	      setTimeout(function () {
	        $loader.fadeOut('1500', function () {
	          $loader.remove();
	        });
	      }, 1700);
	    });
	  });
	};
	// Card collapse
	var cardCollapse = function cardCollapse() {
	  $(document).on("click", card.cardCollapse, function (e) {
	    e.preventDefault();
	    $(this).children('i').toggleClass('zmdi-chevron-up zmdi-chevron-down');
	    var $cardBody = $(this).closest(".card").children('.card-body');
	    $cardBody.slideToggle();
	  });
	};
	// Toggle Syntax Highlighter
	var cardToggleHighlighter = function cardToggleHighlighter() {
	  $(document).on("click", card.cardToggleHighlighter, function (e) {
	    e.preventDefault();
	    var $cardContianer = $(this).closest(".card").find('.syntax-highlighter');
	    $cardContianer.slideToggle();
	  });
	};
	// Menu off-canvas
	var cardOffCanvas = function cardOffCanvas() {
	  $('[data-card-off-canvas]').on('click', function () {
	    var $this = $(this),
	        cardClass = $this.data('card-off-canvas');
	    $this.toggleClass(cardClass);
	    $this.closest('.card').find('.card-body').toggleClass(cardClass);
	    $this.parents('.card').find('.card-off-canvas').toggleClass(cardClass);
	    if ($('.card-off-canvas.is-active').length > 0) {
	      $this.closest('.card.drawer ').prepend('<div class="card-backdrop"></div>');
	    } else {
	      $this.parents('.drawer').find('.card-backdrop').remove();
	    }
	  });
	  $(document.body).on('click', '.card .card-backdrop', function () {
	    $('[data-card-off-canvas]').trigger('click');
	  });
	};
	// Card stacks
	var cardStacks = function cardStacks() {
	  $(".card-stack-wrapper > li").on("click", function (e) {
	    e.preventDefault();
	    var a = $(this).parents(".card-stack-wrapper");
	    $(this).appendTo(a);
	    if (a.is('#chartistBarsDashboard')) {
	      setTimeout(function () {
	        (0, _dashboardCharts.chartistBarsDashboard)();
	      }, 200);
	    } else if (a.is('#chartistLineDashboard')) {
	      setTimeout(function () {
	        (0, _dashboardCharts.chartistLineDashboard)();
	      }, 200);
	    } else if (a.is('#chartistBiPolarChartDashboard')) {
	      setTimeout(function () {
	        (0, _dashboardCharts.chartistBiPolarChartDashboard)();
	      }, 200);
	    } else if (a.is('#chartistPathAnimationDashboard')) {
	      setTimeout(function () {
	        (0, _dashboardCharts.chartistPathAnimationDashboard)();
	      }, 200);
	    }
	  });
	};
	// Card task
	var cardTask = function cardTask() {
	  $('[data-toggle="input"]').on('click', function () {
	    $(this).toggleClass('open');
	    var $taskForm = $(this).parents('.card-task').find('form');
	    $taskForm.toggleClass('open');
	    $taskForm.find('input').focus();
	  });
	  if ($('.checklist input[type=checkbox]').length > 0) {
	    var i = 1,
	        $taskList = $('.checklist input[type=checkbox]');
	    $taskList.each(function (i) {
	      $(this).attr('id', 'task_' + i);
	    });
	    $taskList.change(function () {
	      if (this.checked) {
	        $(this).closest('label').css({
	          'text-decoration': 'line-through'
	        });
	      } else {
	        $(this).closest('label').css({
	          'text-decoration': 'none'
	        });
	      }
	    });
	  };
	};
	// Card Search
	var cardSearch = function cardSearch() {
	  $(document).on("click", card.cardSearchOpen, function (e) {
	    e.preventDefault();
	    var $this = $(this),
	        $card = $this.closest(card.cardClass),
	        $cardSearch = $card.find('.card-search'),
	        cardClass = $this.data('cardSearch');
	    $cardSearch.addClass(cardClass);
	    $cardSearch.find('.form-control').focus();
	  });
	  $(document).on("click", card.cardSearchClose, function (e) {
	    e.preventDefault();
	    var $this = $(this),
	        $card = $this.closest('.card'),
	        $cardSearch = $card.find('.card-search'),
	        cardClass = $this.data('cardSearch');
	    $cardSearch.removeClass('open');
	    $cardSearch.find('.form-control').val('');
	    if ($card.hasClass('card-data-tables')) {
	      var oTable = $('.dataTable').DataTable();
	      oTable.search($(this).val()).draw();
	    }
	  });
	};
	// Toggle Card Reveal
	var cardReveal = function cardReveal() {
	  $(document).on("click", card.cardRevealToggle, function (e) {
	    e.preventDefault();
	    var $cardRevealContianer = $(this).closest(".card.reveal");
	    $cardRevealContianer.toggleClass('open');
	    $('.email-form input,.email-form textarea').val('');
	    if ($cardRevealContianer.hasClass('open')) {
	      setTimeout(function () {
	        $('#email-to').focus();
	      }, 100);
	    }
	  });
	};
	exports.cardRefresh = cardRefresh;
	exports.cardCollapse = cardCollapse;
	exports.cardOffCanvas = cardOffCanvas;
	exports.cardStacks = cardStacks;
	exports.cardTask = cardTask;
	exports.cardToggleHighlighter = cardToggleHighlighter;
	exports.cardSearch = cardSearch;
	exports.cardReveal = cardReveal;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	 * Chart Demos for the dashboard views
	 */
	var createGraph = function createGraph(selector, data1, data2, labels, colors, borderColor, bgColor) {
	    $("<div id='tooltip'></div>").css({
	        position: "absolute",
	        display: "none",
	        border: "1px solid #fdd",
	        padding: "2px",
	        "background-color": "#fee",
	        opacity: 0.80
	    }).appendTo("body");
	    $.plot($(selector), [{
	        data: data1,
	        label: labels[0],
	        color: colors[0]
	    }, {
	        data: data2,
	        label: labels[1],
	        color: colors[1]
	    }], {
	        series: {
	            lines: {
	                show: true,
	                fill: true,
	                lineWidth: 1,
	                fillColor: {
	                    colors: [{
	                        opacity: 0.2
	                    }, {
	                        opacity: 0.9
	                    }]
	                }
	            },
	            points: {
	                show: true
	            },
	            shadowSize: 0
	        },
	        legend: {
	            position: 'nw'
	        },
	        grid: {
	            hoverable: true,
	            clickable: true,
	            borderColor: '#fff',
	            borderWidth: 0,
	            labelMargin: 10,
	            backgroundColor: '#fff'
	        },
	        yaxis: {
	            min: 0,
	            max: 15,
	            color: 'rgba(0,0,0,0)'
	        },
	        xaxis: {
	            color: 'rgba(0,0,0,0)'
	        },
	        tooltip: true,
	        tooltipOpts: {
	            content: '%s: Value of %x is %y',
	            shifts: {
	                x: -60,
	                y: 25
	            },
	            defaultTheme: false
	        }
	    });
	};
	var dashboardWebStats = function dashboardWebStats() {
	    var uploads = [];
	    for (var i = 0; i <= 10; i += 1) {
	        uploads.push([i, Math.random() * 13]);
	    }
	    var downloads = [];
	    for (var i = 0; i <= 10; i += 1) {
	        downloads.push([i, Math.random() * 13]);
	    }
	    var plabels = ["Referral", "Direct"];
	    var pcolors = ['#28bebd', '#1C86BF'];
	    var borderColor = '#fff';
	    var bgColor = '#fff';
	    if ($('#website-stats').length > 0) {
	        createGraph("#website-stats", uploads, downloads, plabels, pcolors, borderColor, bgColor);
	    }
	};
	//
	// Sparkline demo
	//
	var sparklineDashboard = function sparklineDashboard() {
	    $('#sparkline1').sparkline([5, 7, 4, 8, 6, 9, 4, 7, 6, 5, 9, 5], {
	        type: 'bar',
	        height: '100',
	        barWidth: '10',
	        resize: true,
	        barSpacing: '5',
	        barColor: '#28bebd'
	    });
	    $('#sparkline2').sparkline([6, 4, 5, 3, 8, 5, 6, 4, 8, 6, 9, 5], {
	        type: 'bar',
	        height: '100',
	        barWidth: '10',
	        resize: true,
	        barSpacing: '5',
	        barColor: '#1c86bf'
	    });
	    $('#sparkline3').sparkline([4, 3, 6, 2, 7, 4, 8, 4, 9, 4, 6, 3], {
	        type: 'bar',
	        height: '100',
	        barWidth: '10',
	        resize: true,
	        barSpacing: '5',
	        barColor: '#5867c3'
	    });
	    $('#sparkline4').sparkline([4, 6, 4, 8, 5, 1, 5, 9, 5, 3, 5, 6], {
	        type: 'bar',
	        height: '100',
	        barWidth: '10',
	        resize: true,
	        barSpacing: '5',
	        barColor: '#fcc04d'
	    });
	};
	//
	// Chartist
	//
	var chartistPathAnimationDashboard = function chartistPathAnimationDashboard() {
	    if ($('#ct-PathAnimation1 ').length > 0) {
	        var chart = new Chartist.Line('#ct-PathAnimation1 .ct-chart', {
	            labels: ['Jan', 'Feb', 'March '],
	            series: [[1, 5, 2], [2, 3, 4], [5, 4, 3]]
	        }, {
	            low: 0,
	            showArea: true,
	            showPoint: false,
	            fullWidth: true
	        });
	        chart.on('draw', function (data) {
	            if (data.type === 'line' || data.type === 'area') {
	                data.element.animate({
	                    d: {
	                        begin: 2000 * data.index,
	                        dur: 2000,
	                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
	                        to: data.path.clone().stringify(),
	                        easing: Chartist.Svg.Easing.easeOutQuint
	                    }
	                });
	            }
	        });
	    }
	    if ($('#ct-PathAnimation2 ').length > 0) {
	        var chart = new Chartist.Line('#ct-PathAnimation2 .ct-chart', {
	            labels: ['April', 'May', 'June'],
	            series: [[3, 2, 2], [2, 3, 4], [1, 4, 0.5]]
	        }, {
	            low: 0,
	            showArea: true,
	            showPoint: false,
	            fullWidth: true
	        });
	        chart.on('draw', function (data) {
	            if (data.type === 'line' || data.type === 'area') {
	                data.element.animate({
	                    d: {
	                        begin: 2000 * data.index,
	                        dur: 2000,
	                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
	                        to: data.path.clone().stringify(),
	                        easing: Chartist.Svg.Easing.easeOutQuint
	                    }
	                });
	            }
	        });
	    }
	    if ($('#ct-PathAnimation3 ').length > 0) {
	        var chart = new Chartist.Line('#ct-PathAnimation3 .ct-chart', {
	            labels: ['July', 'Aug', 'Sept'],
	            series: [[2, 4, 3], [1, 5, 0.5], [2, 3, 2]]
	        }, {
	            low: 0,
	            showArea: true,
	            showPoint: false,
	            fullWidth: true
	        });
	        chart.on('draw', function (data) {
	            if (data.type === 'line' || data.type === 'area') {
	                data.element.animate({
	                    d: {
	                        begin: 2000 * data.index,
	                        dur: 2000,
	                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
	                        to: data.path.clone().stringify(),
	                        easing: Chartist.Svg.Easing.easeOutQuint
	                    }
	                });
	            }
	        });
	    }
	    if ($('#ct-PathAnimation4').length > 0) {
	        var chart = new Chartist.Line('#ct-PathAnimation4 .ct-chart', {
	            labels: ['Oct', 'Nov', 'Dec'],
	            series: [[0.5, 5, 2], [6, 3, 4], [5, 8, 6]]
	        }, {
	            low: 0,
	            showArea: true,
	            showPoint: false,
	            fullWidth: true
	        });
	        chart.on('draw', function (data) {
	            if (data.type === 'line' || data.type === 'area') {
	                data.element.animate({
	                    d: {
	                        begin: 2000 * data.index,
	                        dur: 2000,
	                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
	                        to: data.path.clone().stringify(),
	                        easing: Chartist.Svg.Easing.easeOutQuint
	                    }
	                });
	            }
	        });
	    }
	};
	var chartistLineDashboard = function chartistLineDashboard() {
	    if ($('#ct-LineChart1').length > 0) {
	        new Chartist.Line('#ct-LineChart1 .ct-chart', {
	            labels: [10, 20, 30, 40, 50, 60],
	            series: [[5, 3, 7, 5, 2, 7, 9]]
	        }, {
	            low: 0,
	            showArea: true
	        });
	    }
	    if ($('#ct-LineChart2').length > 0) {
	        new Chartist.Line('#ct-LineChart2 .ct-chart', {
	            labels: [10, 20, 30, 40, 50, 60],
	            series: [[2, 3, 6, 8, 7, 5, 2]]
	        }, {
	            low: 0,
	            showArea: true
	        });
	    }
	    if ($('#ct-LineChart3').length > 0) {
	        new Chartist.Line('#ct-LineChart3 .ct-chart', {
	            labels: [10, 20, 30, 40, 50, 60],
	            series: [[5, 3, 7, 5, 2, 4, 9]]
	        }, {
	            low: 0,
	            showArea: true
	        });
	    }
	    if ($('#ct-LineChart4').length > 0) {
	        new Chartist.Line('#ct-LineChart4 .ct-chart', {
	            labels: [10, 20, 30, 40, 50, 60],
	            series: [[3, 4, 7, 8, 5, 3, 5]]
	        }, {
	            low: 0,
	            showArea: true
	        });
	    }
	};
	var chartistBarsDashboard = function chartistBarsDashboard() {
	    if ($('#ct-BarChart1').length > 0) {
	        new Chartist.Bar('#ct-BarChart1 .ct-chart', {
	            labels: ['JAN', 'FEB', 'MARCH', 'APRIL'],
	            series: [[800000, 1200000, 1400000, 1300000], [200000, 400000, 500000, 300000], [100000, 200000, 400000, 600000]]
	        }, {
	            stackBars: true,
	            axisY: {
	                labelInterpolationFnc: function labelInterpolationFnc(value) {
	                    return value / 1000 + 'k';
	                }
	            }
	        }).on('draw', function (data) {
	            if (data.type === 'bar') {
	                data.element.attr({
	                    style: 'stroke-width: 30px'
	                });
	            }
	        });
	    }
	    if ($('#ct-BarChart2').length > 0) {
	        new Chartist.Bar('#ct-BarChart2 .ct-chart', {
	            labels: ['MAY', 'JUNE', 'JULY', 'AUG'],
	            series: [[200000, 800000, 900000, 1300000], [205000, 505000, 305000, 805000], [505000, 700000, 1000000, 1100000]]
	        }, {
	            stackBars: true,
	            axisY: {
	                labelInterpolationFnc: function labelInterpolationFnc(value) {
	                    return value / 1000 + 'k';
	                }
	            }
	        }).on('draw', function (data) {
	            if (data.type === 'bar') {
	                data.element.attr({
	                    style: 'stroke-width: 30px'
	                });
	            }
	        });
	    }
	    if ($('#ct-BarChart3').length > 0) {
	        new Chartist.Bar('#ct-BarChart3 .ct-chart', {
	            labels: ['Sept', 'OCT', 'NOV', 'DEC'],
	            series: [[1000000, 1200000, 1400000, 1800000], [600000, 700000, 1000000, 1200000], [110000, 140000, 1600000, 1800000]]
	        }, {
	            stackBars: true,
	            axisY: {
	                labelInterpolationFnc: function labelInterpolationFnc(value) {
	                    return value / 1000 + 'k';
	                }
	            }
	        }).on('draw', function (data) {
	            if (data.type === 'bar') {
	                data.element.attr({
	                    style: 'stroke-width: 30px'
	                });
	            }
	        });
	    }
	    if ($('#ct-BarChart4').length > 0) {
	        new Chartist.Bar('#ct-BarChart4 .ct-chart', {
	            series: [[100000, 1200000, 1700000, 2000000], [200000, 500000, 900000, 3000000], [130000, 1600000, 1800000, 2000000]]
	        }, {
	            stackBars: true,
	            axisY: {
	                labelInterpolationFnc: function labelInterpolationFnc(value) {
	                    return value / 1000 + 'k';
	                }
	            }
	        }).on('draw', function (data) {
	            if (data.type === 'bar') {
	                data.element.attr({
	                    style: 'stroke-width: 30px'
	                });
	            }
	        });
	    }
	};
	var chartistBiPolarChartDashboard = function chartistBiPolarChartDashboard() {
	    if ($('#ct-BiPolarChart1').length > 0) {
	        new Chartist.Line('#ct-BiPolarChart1 .ct-chart', {
	            labels: [1, 2, 3, 4, 5, 6, 7, 8],
	            series: [[1, 2, 3, 1, -2, 0, 1, 0], [-2, -1, -2, -1, -2.5, -1, -2, -1], [0, 0, 0, 1, 2, 2.5, 2, 1], [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]]
	        }, {
	            high: 3,
	            low: -3,
	            showArea: true,
	            showLine: false,
	            showPoint: false,
	            fullWidth: true,
	            axisX: {
	                showLabel: false,
	                showGrid: false
	            }
	        });
	    }
	    if ($('#ct-BiPolarChart2').length > 0) {
	        new Chartist.Line('#ct-BiPolarChart2 .ct-chart', {
	            labels: [1, 2, 3, 4, 5, 6, 7, 8],
	            series: [[2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5], [1, 2, 3, -1, -2, 0, 1, 4], [-2, 1, -2, -1, -2.5, -1.5, -2, -1], [0, 3, 0, 1, 2, 2.5, 2, 1]]
	        }, {
	            high: 3,
	            low: -3,
	            showArea: true,
	            showLine: false,
	            showPoint: false,
	            fullWidth: true,
	            axisX: {
	                showLabel: false,
	                showGrid: false
	            }
	        });
	    }
	    if ($('#ct-BiPolarChart3').length > 0) {
	        new Chartist.Line('#ct-BiPolarChart3 .ct-chart', {
	            labels: [1, 2, 3, 4, 5, 6, 7, 8],
	            series: [[1, 2, 1, 1, -2, 0.5, 1, 0], [-2, -1, -2, -1, 2.5, -1, -2, -1], [0, 0, 0, 1.5, 2, 2.5, 2, 1], [2.5, 2, 1.5, 0.5, 1, 5, -1, 2.5]]
	        }, {
	            high: 3,
	            low: -3,
	            showArea: true,
	            showLine: false,
	            showPoint: false,
	            fullWidth: true,
	            axisX: {
	                showLabel: false,
	                showGrid: false
	            }
	        });
	    }
	    if ($('#ct-BiPolarChart4').length > 0) {
	        new Chartist.Line('#ct-BiPolarChart4 .ct-chart', {
	            labels: [1, 2, 3, 4, 5, 6, 7, 8],
	            series: [[1, 2, -3, 1, 2, 0, 1, 0], [-2, -1, -2, 4, -2.5, -1, 2, -1], [3, 0, 0, 1, 2.5, 2.5, 2, 1], [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]]
	        }, {
	            high: 3,
	            low: -3,
	            showArea: true,
	            showLine: false,
	            showPoint: false,
	            fullWidth: true,
	            axisX: {
	                showLabel: false,
	                showGrid: false
	            }
	        });
	    }
	};
	var drawSparkline = function drawSparkline() {
	    var linePoints = [0, 1, 3, 2, 1, 1, 4, 1, 2, 0, 3, 1, 3, 4, 1, 0, 2, 3, 6, 3, 4, 2, 7, 5, 2, 4, 1, 2, 6, 13, 4, 2];
	    $('#sparkline-line').sparkline(linePoints, {
	        type: 'line',
	        width: 'calc(100% + 4px)',
	        height: '45',
	        chartRangeMax: 13,
	        lineColor: 'rgba(30, 145, 191,0.5)',
	        fillColor: 'rgba(30, 145, 191,0.4)',
	        highlightLineColor: 'rgba(0,0,0,0)',
	        highlightSpotColor: 'rgba(0,0,0,.2)',
	        tooltip: false
	    });
	    var barParent = $('#sparkline-bar').parents('.card');
	    var barPoints = [0, 1, 3, 2, 1, 1, 4, 1, 2, 0, 3, 1, 3, 4, 1, 0, 2, 3, 6, 3, 4, 2, 7, 5, 2, 4, 1, 2, 6, 13, 4, 2];
	    var barWidth = 6;
	    $('#sparkline-bar').sparkline(barPoints, {
	        type: 'bar',
	        height: $('#sparkline-bar').height() + 'px',
	        width: '100%',
	        barWidth: barWidth,
	        barSpacing: (barParent.width() - barPoints.length * barWidth) / barPoints.length,
	        barColor: 'rgba(30, 145, 191,.6)',
	        tooltipFormat: ' <span style="color: #ccc">&#9679;</span> {{value}}</span>'
	    });
	};
	exports.dashboardWebStats = dashboardWebStats;
	exports.sparklineDashboard = sparklineDashboard;
	exports.chartistLineDashboard = chartistLineDashboard;
	exports.chartistBarsDashboard = chartistBarsDashboard;
	exports.chartistBiPolarChartDashboard = chartistBiPolarChartDashboard;
	exports.chartistPathAnimationDashboard = chartistPathAnimationDashboard;
	exports.drawSparkline = drawSparkline;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//C3 Chart Demos
	var c3_gauges = function c3_gauges() {
	  if ($('#c3_gauge').length) {
	    var chart = c3.generate({
	      bindto: '#c3_gauge',
	      data: {
	        columns: [['data', 91.4]],
	        type: 'gauge',
	        onclick: function onclick(d, i) {
	          //console.log("onclick", d, i);
	        },
	        onmouseover: function onmouseover(d, i) {
	          //console.log("onmouseover", d, i);
	        },
	        onmouseout: function onmouseout(d, i) {
	          //console.log("onmouseout", d, i);
	        }
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.warning, MaterialWrap.APP_COLORS.primary], // the three color levels for the percentage values.
	        threshold: {
	          //            unit: 'value', // percentage is default
	          //            max: 200, // 100 is default
	          values: [30, 60, 90, 100]
	        }
	      },
	      size: {
	        height: 180
	      }
	    });
	    setTimeout(function () {
	      chart.load({
	        columns: [['data', 10]]
	      });
	    }, 1000);
	    setTimeout(function () {
	      chart.load({
	        columns: [['data', 50]]
	      });
	    }, 2000);
	    setTimeout(function () {
	      chart.load({
	        columns: [['data', 70]]
	      });
	    }, 3000);
	    setTimeout(function () {
	      chart.load({
	        columns: [['data', 0]]
	      });
	    }, 4000);
	    setTimeout(function () {
	      chart.load({
	        columns: [['data', 100]]
	      });
	    }, 5000);
	  }
	};
	var c3_pie = function c3_pie() {
	  if ($('#c3_pie').length) {
	    var chart = c3.generate({
	      bindto: '#c3_pie',
	      data: {
	        // iris data from R
	        columns: [['data1', 30], ['data2', 120]],
	        type: 'pie',
	        onclick: function onclick(d, i) {
	          //  console.log("onclick", d, i);
	        },
	        onmouseover: function onmouseover(d, i) {
	          //  console.log("onmouseover", d, i);
	        },
	        onmouseout: function onmouseout(d, i) {
	          //  console.log("onmouseout", d, i);
	        }
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.primary, MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.success]
	      }
	    });
	    setTimeout(function () {
	      chart.load({
	        columns: [["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2], ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3], ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]]
	      });
	    }, 1500);
	    setTimeout(function () {
	      chart.unload({
	        ids: 'data1'
	      });
	      chart.unload({
	        ids: 'data2'
	      });
	    }, 2500);
	  }
	};
	var c3_scatter = function c3_scatter() {
	  if ($('#c3_scatter').length) {
	    var chart = c3.generate({
	      bindto: '#c3_scatter',
	      data: {
	        xs: {
	          setosa: 'setosa_x',
	          versicolor: 'versicolor_x'
	        },
	        // iris data from R
	        columns: [["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3], ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8], ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2], ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3]],
	        type: 'scatter'
	      },
	      axis: {
	        x: {
	          label: 'Sepal.Width',
	          tick: {
	            fit: false
	          }
	        },
	        y: {
	          label: 'Petal.Width'
	        }
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.primary]
	      }
	    });
	    setTimeout(function () {
	      chart.load({
	        xs: {
	          virginica: 'virginica_x'
	        },
	        columns: [["virginica_x", 3.3, 2.7, 3.0, 2.9, 3.0, 3.0, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3.0, 2.5, 2.8, 3.2, 3.0, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3.0, 2.8, 3.0, 2.8, 3.8, 2.8, 2.8, 2.6, 3.0, 3.4, 3.1, 3.0, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3.0, 2.5, 3.0, 3.4, 3.0], ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]]
	      });
	    }, 1000);
	    setTimeout(function () {
	      chart.unload({
	        ids: 'setosa'
	      });
	    }, 2000);
	    setTimeout(function () {
	      chart.load({
	        columns: [["virginica", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2]]
	      });
	    }, 3000);
	  }
	};
	var c3_donut = function c3_donut() {
	  if ($('#c3_donut').length) {
	    var chart = c3.generate({
	      bindto: '#c3_donut',
	      data: {
	        columns: [['data1', 30], ['data2', 120]],
	        type: 'donut',
	        onclick: function onclick(d, i) {
	          //console.log("onclick", d, i);
	        },
	        onmouseover: function onmouseover(d, i) {
	          //console.log("onmouseover", d, i);
	        },
	        onmouseout: function onmouseout(d, i) {
	          //console.log("onmouseout", d, i);
	        }
	      },
	      donut: {
	        title: "Iris Petal Width"
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.primary, MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.success]
	      }
	    });
	    setTimeout(function () {
	      chart.load({
	        columns: [["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2], ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3], ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]]
	      });
	    }, 1500);
	    setTimeout(function () {
	      chart.unload({
	        ids: 'data1'
	      });
	      chart.unload({
	        ids: 'data2'
	      });
	    }, 2500);
	  }
	};
	var c3_areaChart = function c3_areaChart() {
	  if ($('#c3_area-chart').length) {
	    var chart = c3.generate({
	      bindto: '#c3_area-chart',
	      data: {
	        columns: [['data1', 300, 350, 300, 0, 0, 0], ['data2', 130, 100, 140, 200, 150, 50]],
	        types: {
	          data1: 'area',
	          data2: 'area-spline'
	        }
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.primary]
	      }
	    });
	  }
	};
	var c3_areaSpline = function c3_areaSpline() {
	  if ($('#c3_spline-chart').length) {
	    var chart = c3.generate({
	      bindto: '#c3_spline-chart',
	      data: {
	        columns: [['data1', 30, 200, 100, 400, 150, 250], ['data2', 130, 100, 140, 200, 150, 50]],
	        type: 'spline'
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.primary]
	      }
	    });
	  }
	};
	var c3_combination = function c3_combination() {
	  if ($('#c3_combination-chart').length) {
	    var chart = c3.generate({
	      bindto: '#c3_combination-chart',
	      data: {
	        columns: [['data1', 30, 20, 50, 40, 60, 50], ['data2', 200, 130, 90, 240, 130, 220], ['data3', 300, 200, 160, 400, 250, 250], ['data4', 200, 130, 90, 240, 130, 220], ['data5', 130, 120, 150, 140, 160, 150], ['data6', 90, 70, 20, 50, 60, 120]],
	        type: 'bar',
	        types: {
	          data3: 'spline',
	          data4: 'line',
	          data6: 'area'
	        },
	        groups: [['data1', 'data2']]
	      },
	      axis: {
	        x: {
	          type: 'categorized'
	        }
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.primary, MaterialWrap.APP_COLORS.warning, MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.mw_peach]
	      }
	    });
	  }
	};
	var c3_zoom = function c3_zoom() {
	  if ($('#c3_zoom').length) {
	    var chart = c3.generate({
	      bindto: '#c3_zoom',
	      data: {
	        columns: [['sample', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]]
	      },
	      zoom: {
	        enabled: true
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.primary, MaterialWrap.APP_COLORS.warning, MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.mw_peach]
	      }
	    });
	  }
	};
	var c3_stacked_bars_chart = function c3_stacked_bars_chart() {
	  if ($('#c3_stacked-bars-chart').length) {
	    var chart = c3.generate({
	      bindto: '#c3_stacked-bars-chart',
	      data: {
	        columns: [['data1', -30, 200, 200, 400, -150, 250], ['data2', 130, 100, -100, 200, -150, 50], ['data3', -230, 200, 200, -300, 250, 250]],
	        type: 'bar',
	        groups: [['data1', 'data2']]
	      },
	      grid: {
	        y: {
	          lines: [{
	            value: 0
	          }]
	        }
	      },
	      color: {
	        pattern: [MaterialWrap.APP_COLORS.info, MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.primary, MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.mw_peach]
	      }
	    });
	    setTimeout(function () {
	      chart.groups([['data1', 'data2', 'data3']]);
	    }, 1000);
	    setTimeout(function () {
	      chart.load({
	        columns: [['data4', 100, -50, 150, 200, -300, -100]]
	      });
	    }, 1500);
	    setTimeout(function () {
	      chart.groups([['data1', 'data2', 'data3', 'data4']]);
	    }, 2000);
	  }
	};
	exports.c3_gauges = c3_gauges;
	exports.c3_pie = c3_pie;
	exports.c3_donut = c3_donut;
	exports.c3_areaChart = c3_areaChart;
	exports.c3_combination = c3_combination;
	exports.c3_zoom = c3_zoom;
	exports.c3_stacked_bars_chart = c3_stacked_bars_chart;
	exports.c3_areaSpline = c3_areaSpline;
	exports.c3_scatter = c3_scatter;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var chartjs_lineChart = function chartjs_lineChart() {
	    if ($('#chartjs_lineChart').length) {
	        var ctx = document.getElementById('chartjs_lineChart').getContext('2d');
	        var myChart = new Chart(ctx, {
	            type: 'line',
	            data: {
	                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
	                datasets: [{
	                    label: 'apples',
	                    data: [12, 19, 3, 17, 6, 3, 7],
	                    backgroundColor: "rgba(88, 103, 195,0.4)",
	                    borderColor: "rgba(88, 103, 195,0.7)",
	                    borderWidth: .6
	                }, {
	                    label: 'oranges',
	                    data: [2, 29, 5, 5, 2, 3, 10],
	                    backgroundColor: "rgba(28, 134, 191,0.4)",
	                    borderColor: "rgba(28, 134, 191,0.7)",
	                    borderWidth: .6
	                }]
	            }
	        });
	    }
	};
	var chartjs_barChart = function chartjs_barChart() {
	    if ($('#chartjs_barChart').length) {
	        var ctx = document.getElementById("chartjs_barChart").getContext('2d');
	        var myChart = new Chart(ctx, {
	            type: 'bar',
	            data: {
	                labels: ["M", "T", "W", "R", "F", "S", "S"],
	                datasets: [{
	                    label: 'apples',
	                    data: [12, 19, 3, 17, 28, 24, 7],
	                    backgroundColor: "rgba(88, 103, 195,0.4)"
	                }, {
	                    label: 'oranges',
	                    data: [30, 29, 5, 5, 20, 3, 10],
	                    backgroundColor: "rgba(28, 134, 191,0.4)"
	                }]
	            }
	        });
	    }
	};
	var chartjs_radarChart = function chartjs_radarChart() {
	    if ($('#chartjs_radarChart').length) {
	        var ctx = document.getElementById("chartjs_radarChart");
	        var myChart = new Chart(ctx, {
	            type: 'radar',
	            data: {
	                labels: ["M", "T", "W", "T", "F", "S", "S"],
	                datasets: [{
	                    label: 'apples',
	                    backgroundColor: "rgba(88, 103, 195,0.4)",
	                    borderColor: "rgba(88, 103, 195,0.7)",
	                    data: [12, 19, 3, 17, 28, 24, 7]
	                }, {
	                    label: 'oranges',
	                    backgroundColor: "rgba(28, 134, 191,0.4)",
	                    borderColor: "rgba(28, 134, 191,0.7)",
	                    data: [30, 29, 5, 5, 20, 3, 10]
	                }]
	            }
	        });
	    }
	};
	var chartjs_polarChart = function chartjs_polarChart() {
	    if ($('#chartjs_polarChart').length) {
	        var ctx = document.getElementById("chartjs_polarChart").getContext('2d');
	        var myChart = new Chart(ctx, {
	            type: 'polarArea',
	            data: {
	                labels: ["M", "T", "W", "T", "F", "S", "S"],
	                datasets: [{
	                    backgroundColor: ["#5867C3", "#1C86BF", "#28BEBD", "#FEB38D", "#EE6E73", "#EC407A", "#F8C200"],
	                    data: [12, 19, 3, 17, 28, 24, 7]
	                }]
	            }
	        });
	    }
	};
	var chartjs_pieChart = function chartjs_pieChart() {
	    if ($('#chartjs_pieChart').length) {
	        var ctx = document.getElementById("chartjs_pieChart").getContext('2d');
	        var myChart = new Chart(ctx, {
	            type: 'pie',
	            data: {
	                labels: ["M", "T", "W", "T", "F", "S", "S"],
	                datasets: [{
	                    backgroundColor: ["#5867C3", "#1C86BF", "#28BEBD", "#FEB38D", "#EE6E73", "#EC407A", "#F8C200"],
	                    data: [12, 19, 3, 17, 28, 24, 7]
	                }]
	            }
	        });
	    }
	};
	var chartjs_doughnutChart = function chartjs_doughnutChart() {
	    if ($('#chartjs_doughnutChart').length) {
	        var ctx = document.getElementById("chartjs_doughnutChart").getContext('2d');
	        var myChart = new Chart(ctx, {
	            type: 'doughnut',
	            data: {
	                labels: ["M", "T", "W", "T", "F", "S", "S"],
	                datasets: [{
	                    backgroundColor: ["#5867C3", "#1C86BF", "#28BEBD", "#FEB38D", "#EE6E73", "#EC407A", "#F8C200"],
	                    data: [12, 19, 3, 17, 28, 24, 7]
	                }]
	            }
	        });
	    }
	};
	exports.chartjs_lineChart = chartjs_lineChart;
	exports.chartjs_barChart = chartjs_barChart;
	exports.chartjs_radarChart = chartjs_radarChart;
	exports.chartjs_polarChart = chartjs_polarChart;
	exports.chartjs_pieChart = chartjs_pieChart;
	exports.chartjs_doughnutChart = chartjs_doughnutChart;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//Chartist Demos
	//Pie Charts
	var chartist_simplePie = function chartist_simplePie() {
	  if ($('#chartist_simplePie').length) {
	    var data = {
	      series: [5, 3, 4]
	    };
	    var sum = function sum(a, b) {
	      return a + b;
	    };
	    new Chartist.Pie('#chartist_simplePie', data, {
	      labelInterpolationFnc: function labelInterpolationFnc(value) {
	        return Math.round(value / data.series.reduce(sum) * 100) + '%';
	      }
	    });
	  }
	};
	var chartist_pieCustomLabels = function chartist_pieCustomLabels() {
	  if ($('#chartist_pieCustomLabels').length) {
	    var data = {
	      labels: ['Bananas', 'Apples', 'Grapes'],
	      series: [20, 15, 40]
	    };
	    var options = {
	      labelInterpolationFnc: function labelInterpolationFnc(value) {
	        return value[0];
	      }
	    };
	    var responsiveOptions = [['screen and (min-width: 640px)', {
	      chartPadding: 30,
	      labelOffset: 100,
	      labelDirection: 'explode',
	      labelInterpolationFnc: function labelInterpolationFnc(value) {
	        return value;
	      }
	    }], ['screen and (min-width: 1024px)', {
	      labelOffset: 80,
	      chartPadding: 20
	    }]];
	    new Chartist.Pie('#chartist_pieCustomLabels', data, options, responsiveOptions);
	  }
	};
	var chartist_animatingDonut = function chartist_animatingDonut() {
	  if ($('#chartist_animatingDonut').length) {
	    var chart = new Chartist.Pie('#chartist_animatingDonut', {
	      series: [10, 20, 50, 20, 5, 50, 15],
	      labels: [1, 2, 3, 4, 5, 6, 7]
	    }, {
	      donut: true,
	      showLabel: false
	    });
	    chart.on('draw', function (data) {
	      if (data.type === 'slice') {
	        // Get the total path length in order to use for dash array animation
	        var pathLength = data.element._node.getTotalLength();
	        // Set a dasharray that matches the path length as prerequisite to animate dashoffset
	        data.element.attr({
	          'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
	        });
	        // Create animation definition while also assigning an ID to the animation for later sync usage
	        var animationDefinition = {
	          'stroke-dashoffset': {
	            id: 'anim' + data.index,
	            dur: 1000,
	            from: -pathLength + 'px',
	            to: '0px',
	            easing: Chartist.Svg.Easing.easeOutQuint,
	            // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
	            fill: 'freeze'
	          }
	        };
	        // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
	        if (data.index !== 0) {
	          animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
	        }
	        // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
	        data.element.attr({
	          'stroke-dashoffset': -pathLength + 'px'
	        });
	        // We can't use guided mode as the animations need to rely on setting begin manually
	        // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
	        data.element.animate(animationDefinition, false);
	      }
	    });
	    // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
	    chart.on('created', function () {
	      if (window.__anim21278907124) {
	        clearTimeout(window.__anim21278907124);
	        window.__anim21278907124 = null;
	      }
	      window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
	    });
	  }
	};
	//Bars
	var chartist_biPolarBar = function chartist_biPolarBar() {
	  if ($('#chartist_biPolarBar').length) {
	    var data = {
	      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
	      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]]
	    };
	    var options = {
	      high: 10,
	      low: -10,
	      axisX: {
	        labelInterpolationFnc: function labelInterpolationFnc(value, index) {
	          return index % 2 === 0 ? value : null;
	        }
	      }
	    };
	    new Chartist.Bar('#chartist_biPolarBar', data, options);
	  }
	};
	var chartist_peakCircles = function chartist_peakCircles() {
	  if ($('#chartist_peakCircles').length) {
	    // Create a simple bi-polar bar chart
	    var chart = new Chartist.Bar('#chartist_peakCircles', {
	      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
	      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]]
	    }, {
	      high: 10,
	      low: -10,
	      axisX: {
	        labelInterpolationFnc: function labelInterpolationFnc(value, index) {
	          return index % 2 === 0 ? value : null;
	        }
	      }
	    });
	    // Listen for draw events on the bar chart
	    chart.on('draw', function (data) {
	      // If this draw event is of type bar we can use the data to create additional content
	      if (data.type === 'bar') {
	        // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
	        data.group.append(new Chartist.Svg('circle', {
	          cx: data.x2,
	          cy: data.y2,
	          r: Math.abs(Chartist.getMultiValue(data.value)) * 2 + 5
	        }, 'ct-slice-pie'));
	      }
	    });
	  }
	};
	var chartist_stackedBar = function chartist_stackedBar() {
	  if ($('#chartist_stackedBar').length) {
	    new Chartist.Bar('#chartist_stackedBar', {
	      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
	      series: [[800000, 1200000, 1400000, 1300000], [200000, 400000, 500000, 300000], [100000, 200000, 400000, 600000]]
	    }, {
	      stackBars: true,
	      axisY: {
	        labelInterpolationFnc: function labelInterpolationFnc(value) {
	          return value / 1000 + 'k';
	        }
	      }
	    }).on('draw', function (data) {
	      if (data.type === 'bar') {
	        data.element.attr({
	          style: 'stroke-width: 30px'
	        });
	      }
	    });
	  }
	};
	var chartist_horizontalBar = function chartist_horizontalBar() {
	  if ($('#chartist_horizontalBar').length) {
	    new Chartist.Bar('#chartist_horizontalBar', {
	      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	      series: [[5, 4, 3, 7, 5, 10, 3], [3, 2, 9, 5, 4, 6, 4]]
	    }, {
	      seriesBarDistance: 10,
	      reverseData: true,
	      horizontalBars: true,
	      axisY: {
	        offset: 70
	      }
	    });
	  }
	};
	var chartist_lineChart = function chartist_lineChart() {
	  if ($('#chartist_lineChart').length) {
	    new Chartist.Line('#chartist_lineChart', {
	      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	      series: [[12, 9, 7, 8, 5], [2, 1, 3.5, 7, 3], [1, 3, 4, 5, 6]]
	    }, {
	      fullWidth: true,
	      chartPadding: {
	        right: 40
	      }
	    });
	  }
	};
	var chartist_holesInData = function chartist_holesInData() {
	  if ($('#chartist_holesInData').length) {
	    var chart = new Chartist.Line('#chartist_holesInData', {
	      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	      series: [[5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9], [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null], [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null], [{
	        x: 3,
	        y: 3
	      }, {
	        x: 4,
	        y: 3
	      }, {
	        x: 5,
	        y: undefined
	      }, {
	        x: 6,
	        y: 4
	      }, {
	        x: 7,
	        y: null
	      }, {
	        x: 8,
	        y: 4
	      }, {
	        x: 9,
	        y: 4
	      }]]
	    }, {
	      fullWidth: true,
	      chartPadding: {
	        right: 10
	      },
	      low: 0
	    });
	  }
	};
	var chartist_filledHolesInData = function chartist_filledHolesInData() {
	  if ($('#chartist_filledHolesInData').length) {
	    var chart = new Chartist.Line('#chartist_filledHolesInData', {
	      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	      series: [[5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9], [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null], [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null], [{
	        x: 3,
	        y: 3
	      }, {
	        x: 4,
	        y: 3
	      }, {
	        x: 5,
	        y: undefined
	      }, {
	        x: 6,
	        y: 4
	      }, {
	        x: 7,
	        y: null
	      }, {
	        x: 8,
	        y: 4
	      }, {
	        x: 9,
	        y: 4
	      }]]
	    }, {
	      fullWidth: true,
	      chartPadding: {
	        right: 10
	      },
	      lineSmooth: Chartist.Interpolation.cardinal({
	        fillHoles: true
	      }),
	      low: 0
	    });
	  }
	};
	var chartist_onlyWholeNumbers = function chartist_onlyWholeNumbers() {
	  if ($('#chartist_onlyWholeNumbers').length) {
	    new Chartist.Line('#chartist_onlyWholeNumbers', {
	      labels: [1, 2, 3, 4, 5, 6, 7, 8],
	      series: [[1, 2, 3, 1, -2, 0, 1, 0], [-2, -1, -2, -1, -3, -1, -2, -1], [0, 0, 0, 1, 2, 3, 2, 1], [3, 2, 1, 0.5, 1, 0, -1, -3]]
	    }, {
	      high: 3,
	      low: -3,
	      fullWidth: true,
	      // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
	      axisY: {
	        onlyInteger: true,
	        offset: 20
	      }
	    });
	  }
	};
	var chartist_lineScatter = function chartist_lineScatter() {
	  if ($('#chartist_lineScatter').length) {
	    var times = function times(n) {
	      return Array.apply(null, new Array(n));
	    };
	    var data = times(52).map(Math.random).reduce(function (data, rnd, index) {
	      data.labels.push(index + 1);
	      data.series.forEach(function (series) {
	        series.push(Math.random() * 100);
	      });
	      return data;
	    }, {
	      labels: [],
	      series: times(4).map(function () {
	        return new Array();
	      })
	    });
	    var options = {
	      showLine: false,
	      axisX: {
	        labelInterpolationFnc: function labelInterpolationFnc(value, index) {
	          return index % 13 === 0 ? 'W' + value : null;
	        }
	      }
	    };
	    var responsiveOptions = [['screen and (min-width: 640px)', {
	      axisX: {
	        labelInterpolationFnc: function labelInterpolationFnc(value, index) {
	          return index % 4 === 0 ? 'W' + value : null;
	        }
	      }
	    }]];
	    new Chartist.Line('#chartist_lineScatter', data, options, responsiveOptions);
	  }
	};
	var chartist_lineChartWithArea = function chartist_lineChartWithArea() {
	  if ($('#chartist_lineChartWithArea').length) {
	    new Chartist.Line('#chartist_lineChartWithArea', {
	      labels: [1, 2, 3, 4, 5, 6, 7, 8],
	      series: [[5, 9, 7, 8, 5, 3, 5, 4]]
	    }, {
	      low: 0,
	      showArea: true
	    });
	  }
	};
	var chartist_biPolar = function chartist_biPolar() {
	  if ($('#chartist_biPolar').length) {
	    new Chartist.Line('#chartist_biPolar', {
	      labels: [1, 2, 3, 4, 5, 6, 7, 8],
	      series: [[1, 2, 3, 1, -2, 0, 1, 0], [-2, -1, -2, -1, -2.5, -1, -2, -1], [0, 0, 0, 1, 2, 2.5, 2, 1], [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]]
	    }, {
	      high: 3,
	      low: -3,
	      showArea: true,
	      showLine: false,
	      showPoint: false,
	      fullWidth: true,
	      axisX: {
	        showLabel: false,
	        showGrid: false
	      }
	    });
	  }
	  if ($('#chartist_megaMenu').length) {
	    new Chartist.Line('#chartist_megaMenu', {
	      labels: [1, 2, 3, 4, 5, 6, 7, 8],
	      series: [[1, 2, 3, 1, -2, 0, 1, 0], [-2, -1, -2, -1, -2.5, -1, -2, -1], [0, 0, 0, 1, 2, 2.5, 2, 1], [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]]
	    }, {
	      high: 3,
	      low: -3,
	      showArea: true,
	      showLine: false,
	      showPoint: false,
	      fullWidth: true,
	      axisX: {
	        showLabel: false,
	        showGrid: false
	      }
	    });
	  }
	};
	exports.chartist_simplePie = chartist_simplePie;
	exports.chartist_pieCustomLabels = chartist_pieCustomLabels;
	exports.chartist_animatingDonut = chartist_animatingDonut;
	exports.chartist_biPolarBar = chartist_biPolarBar;
	exports.chartist_peakCircles = chartist_peakCircles;
	exports.chartist_stackedBar = chartist_stackedBar;
	exports.chartist_horizontalBar = chartist_horizontalBar;
	exports.chartist_lineChart = chartist_lineChart;
	exports.chartist_holesInData = chartist_holesInData;
	exports.chartist_filledHolesInData = chartist_filledHolesInData;
	exports.chartist_onlyWholeNumbers = chartist_onlyWholeNumbers;
	exports.chartist_lineScatter = chartist_lineScatter;
	exports.chartist_lineChartWithArea = chartist_lineChartWithArea;
	exports.chartist_biPolar = chartist_biPolar;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var morrisjs_demo = exports.morrisjs_demo = function morrisjs_demo() {
	    if ($('#morris_area_chart').length) {
	        var data = [{
	            y: '2016',
	            a: 35,
	            b: 90
	        }, {
	            y: '2017',
	            a: 45,
	            b: 75
	        }, {
	            y: '2018',
	            a: 55,
	            b: 50
	        }, {
	            y: '2019',
	            a: 65,
	            b: 60
	        }, {
	            y: '2020',
	            a: 75,
	            b: 65
	        }, {
	            y: '2021',
	            a: 90,
	            b: 70
	        }, {
	            y: '2022',
	            a: 95,
	            b: 75
	        }, {
	            y: '2023',
	            a: 105,
	            b: 75
	        }, {
	            y: '2024',
	            a: 115,
	            b: 85
	        }, {
	            y: '2025',
	            a: 125,
	            b: 85
	        }, {
	            y: '2026',
	            a: 145,
	            b: 95
	        }],
	            config = {
	            data: data,
	            xkey: 'y',
	            ykeys: ['a', 'b'],
	            labels: ['Total Income', 'Total Outcome'],
	            fillOpacity: 0.6,
	            hideHover: 'auto',
	            behaveLikeLine: true,
	            resize: true,
	            pointFillColors: ['#ffffff'],
	            pointStrokeColors: ['black'],
	            lineColors: [MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.success],
	            barColors: [MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.success]
	        };
	        config.element = 'morris_area_chart';
	        Morris.Area(config);
	        config.element = 'morris_line_chart';
	        Morris.Line(config);
	        config.element = 'morris_bar_chart';
	        Morris.Bar(config);
	        config.element = 'morris_stacked';
	        config.stacked = true;
	        Morris.Bar(config);
	        Morris.Donut({
	            element: 'morris_pie_chart',
	            data: [{
	                label: "Study",
	                value: 30
	            }, {
	                label: "Sleep",
	                value: 15
	            }, {
	                label: "Work",
	                value: 45
	            }, {
	                label: "Eat",
	                value: 10
	            }],
	            colors: [MaterialWrap.APP_COLORS.success, MaterialWrap.APP_COLORS.mw_grayBlue, MaterialWrap.APP_COLORS.mw_purple, MaterialWrap.APP_COLORS.mw_gray]
	        });
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var dismissListItem = function dismissListItem() {
	    $('.dismissable').on('click', function () {
	        var listItem = $(this).parents('.list-group-item'),
	            nextHR = listItem.next('.list-group-separator');
	        listItem.addClass('animated slideOutRight');
	        nextHR.addClass('animated slideOutRight');
	        setTimeout(function () {
	            $(listItem).remove();
	            $(nextHR).remove();
	            if (!$.trim($('#dismissable-group').html()).length) {
	                $('#dismissable-group').append('<div class="alert alert-success" role="alert"> <strong > Well done! </strong> You successfully cleared all items from your list.</div>');
	            }
	        }, 250);
	    });
	};
	exports.dismissListItem = dismissListItem;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initPhotoSwipeFromDOM = exports.initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM() {
	  // Init empty gallery array
	  var container = [];
	  // Loop over gallery items and push it to the array
	  $('#photo-gallery').find('figure').each(function () {
	    var $link = $(this).find('a'),
	        item = {
	      src: $link.attr('href'),
	      w: $link.data('width'),
	      h: $link.data('height'),
	      title: $link.data('caption')
	    };
	    container.push(item);
	  });
	  // Define click event on gallery item
	  $('#photo-gallery figure a').on('click', function (event) {
	    // Prevent location change
	    event.preventDefault();
	    // Define object and gallery options
	    var $pswp = $('.pswp')[0],
	        options = {
	      index: $(this).parent('figure').index(),
	      bgOpacity: 0.85,
	      showHideOpacity: true
	    };
	    // Initialize PhotoSwipe
	    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
	    gallery.init();
	  });
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mailSelected = exports.mailCompose = exports.mailList = undefined;
	
	var _backdrops = __webpack_require__(7);
	
	var mailList = function mailList() {
	  var $eachPanel = $('#mail-wrapper .panel-group .panel'),
	      count = 0;
	  $eachPanel.each(function () {
	    $(this).find('#expansionHeading_').attr('id', 'expansionHeading_' + count);
	    $(this).find('div[aria-labelledby="expansionHeading_"]').attr('aria-labelledby', 'expansionHeading_' + count);
	    $(this).find('a[href="#expansion_"]').attr('href', '#expansion_' + count);
	    $(this).find('a[aria-controls="expansion_"]').attr('aria-controls', 'expansion_' + count);
	    $(this).find('#expansion_').attr('id', 'expansion_' + count);
	    $(this).find('#expansionCheckbox_').attr('id', 'expansionCheckbox_' + count);
	    count++;
	  });
	  $('#mail-wrapper .action, #mail-wrapper .checkbox-material .ckeck').on('click', function (e) {
	    e.stopPropagation();
	  });
	};
	var mailCompose = function mailCompose() {
	  var $toggleElement = $('[data-compose]');
	  $toggleElement.on('click', function (e) {
	    e.stopPropagation();
	    var $body = $('body'),
	        element = $(this),
	        className = element.data('compose'),
	        $target = $('#mail_compose_wrapper');
	    if (className == 'open') {
	      if ($target.hasClass(className)) {
	        $target.removeClass(className);
	        $('.backdrop').fadeOut(250, function () {
	          $(this).remove();
	        });
	      } else {
	        $target.addClass(className);
	      }
	    }
	    if (className == 'close') {
	      $target.removeAttr('class');
	      if ($('#mail_compose_wrapper .zmdi-window-maximize').length) {
	        $('#mail_compose_wrapper [data-compose="min"] i').remove('zmdi-window-maximize');
	        $('#mail_compose_wrapper [data-compose="min"] i').addClass('zmdi-window-minimize');
	      }
	      if ($('#mail_compose_wrapper .mdi-arrow-compress').length) {
	        $('#mail_compose_wrapper [data-compose="expand"] i').remove('mdi-arrow-compress');
	        $('#mail_compose_wrapper [data-compose="expand"] i').addClass('mdi-arrow-expand');
	      }
	      $('#mail_compose_wrapper input[type=text],#mail_compose_wrapper textarea').val('');
	      if ($('.backdrop').length) {
	        $('.backdrop').fadeOut(250, function () {
	          $(this).remove();
	        });
	      }
	    }
	    if (className == 'expand') {
	      if ($target.hasClass(className)) {
	        $target.removeClass(className);
	        element.children('i').removeClass('mdi-arrow-compress');
	        element.children('i').addClass('mdi-arrow-expand');
	        if ($('.backdrop').length) {
	          $('.backdrop').fadeOut(250, function () {
	            $(this).remove();
	          });
	        }
	      } else {
	        element.children('i').removeClass('mdi-arrow-expand');
	        element.children('i').addClass('mdi-arrow-compress');
	        $target.addClass(className);
	        (0, _backdrops.backDrops)(className, element, $target);
	      }
	    }
	    if (className == 'min') {
	      if ($target.hasClass(className)) {
	        element.children('i').removeClass('zmdi-window-maximize');
	        element.children('i').addClass('zmdi-window-minimize');
	        $target.removeClass(className);
	        $target.addClass('open');
	      } else {
	        $target.removeAttr('class');
	        element.children('i').removeClass('zmdi-window-minimize');
	        element.children('i').addClass('zmdi-window-maximize');
	        $target.addClass(className);
	        if ($('.backdrop').length) {
	          $('.backdrop').fadeOut(250, function () {
	            $(this).remove();
	          });
	        }
	      }
	    }
	  });
	};
	var mailSelected = function mailSelected() {
	  $("#mail-wrapper [id*=expansionCheckbox_").change(function (e) {
	    e.stopPropagation();
	    var $this = $(this);
	    if ($('#mail-wrapper input[id*=expansionCheckbox_][type=checkbox]:checked').length) {
	      $('#header_action_bar').addClass('open');
	    } else {
	      $('#header_action_bar').removeClass('open');
	    }
	    if ($this.is(":checked")) {
	      $this.closest(".panel-heading").addClass("highlight");
	    } else {
	      $this.closest(".panel-heading").removeClass("highlight");
	    }
	    var initCheckCount = $('#mail-wrapper input[id*=expansionCheckbox_][type=checkbox]:checked').length;
	    $('#selected_items span').text(initCheckCount + ' selected');
	  });
	  $('#header_action_bar [data-mail-actionbar="closed"]').on('click', function (e) {
	    e.stopPropagation();
	    $('#header_action_bar').removeClass('open');
	    $('#mail-wrapper input[id*=expansionCheckbox_][type=checkbox]:checked').each(function () {
	      $(this).prop('checked', false);
	      $(this).closest(".panel-heading").removeClass("highlight");
	    });
	  });
	};
	exports.mailList = mailList;
	exports.mailCompose = mailCompose;
	exports.mailSelected = mailSelected;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var chips = function chips() {
	  var chipsHandleEvents = false;
	  var materialChipsDefaults = {
	    data: [],
	    placeholder: '',
	    secondaryPlaceholder: ''
	  };
	  // Handle removal of static chips.
	  $(document).on('click', '.chip .close', function (e) {
	    var $chips = $(this).closest('.chips');
	    if ($chips.attr('data-initialized')) {
	      return;
	    }
	    $(this).closest('.chip').remove();
	  });
	  $.fn.material_chip = function (options) {
	    var self = this;
	    this.$el = $(this);
	    this.$document = $(document);
	    this.SELS = {
	      CHIPS: '.chips',
	      CHIP: '.chip',
	      INPUT: 'input',
	      DELETE: '.close.zmdi.zmdi-close',
	      SELECTED_CHIP: '.selected'
	    };
	    if ('data' === options) {
	      return this.$el.data('chips');
	    }
	    var curr_options = $.extend({}, materialChipsDefaults, options);
	    // Initialize
	    this.init = function () {
	      var i = 0;
	      var chips;
	      self.$el.each(function () {
	        var $chips = $(this);
	        var chipId = Materialize.guid();
	        if (!curr_options.data || !(curr_options.data instanceof Array)) {
	          curr_options.data = [];
	        }
	        $chips.data('chips', curr_options.data);
	        $chips.attr('data-index', i);
	        $chips.attr('data-initialized', true);
	        if (!$chips.hasClass(self.SELS.CHIPS)) {
	          $chips.addClass('chips');
	        }
	        self.chips($chips, chipId);
	        i++;
	      });
	    };
	    this.handleEvents = function () {
	      var SELS = self.SELS;
	      self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, function (e) {
	        $(e.target).find(SELS.INPUT).focus();
	      });
	      self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, function (e) {
	        $(SELS.CHIP).removeClass('selected');
	        $(this).toggleClass('selected');
	      });
	      self.$document.off('keydown.chips').on('keydown.chips', function (e) {
	        if ($(e.target).is('input, textarea')) {
	          return;
	        }
	        // delete
	        var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
	        var $chips = $chip.closest(SELS.CHIPS);
	        var length = $chip.siblings(SELS.CHIP).length;
	        var index;
	        if (!$chip.length) {
	          return;
	        }
	        if (e.which === 8 || e.which === 46) {
	          e.preventDefault();
	          index = $chip.index();
	          self.deleteChip(index, $chips);
	          var selectIndex = null;
	          if (index + 1 < length) {
	            selectIndex = index;
	          } else if (index === length || index + 1 === length) {
	            selectIndex = length - 1;
	          }
	          if (selectIndex < 0) selectIndex = null;
	          if (null !== selectIndex) {
	            self.selectChip(selectIndex, $chips);
	          }
	          if (!length) $chips.find('input').focus();
	          // left
	        } else if (e.which === 37) {
	          index = $chip.index() - 1;
	          if (index < 0) {
	            return;
	          }
	          $(SELS.CHIP).removeClass('selected');
	          self.selectChip(index, $chips);
	          // right
	        } else if (e.which === 39) {
	          index = $chip.index() + 1;
	          $(SELS.CHIP).removeClass('selected');
	          if (index > length) {
	            $chips.find('input').focus();
	            return;
	          }
	          self.selectChip(index, $chips);
	        }
	      });
	      self.$document.off('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
	        var $currChips = $(e.target).closest(SELS.CHIPS);
	        $currChips.addClass('focus');
	        $currChips.siblings('label, .prefix').addClass('active');
	        $(SELS.CHIP).removeClass('selected');
	      });
	      self.$document.off('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
	        var $currChips = $(e.target).closest(SELS.CHIPS);
	        $currChips.removeClass('focus');
	        // Remove active if empty
	        if (!$currChips.data('chips').length) {
	          $currChips.siblings('label').removeClass('active');
	        }
	        $currChips.siblings('.prefix').removeClass('active');
	      });
	      self.$document.off('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT).on('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
	        var $target = $(e.target);
	        var $chips = $target.closest(SELS.CHIPS);
	        var chipsLength = $chips.children(SELS.CHIP).length;
	        // enter
	        if (13 === e.which) {
	          e.preventDefault();
	          self.addChip({ tag: $target.val() }, $chips);
	          $target.val('');
	          return;
	        }
	        // delete or left
	        if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
	          self.selectChip(chipsLength - 1, $chips);
	          $target.blur();
	          return;
	        }
	      });
	      // Click on delete icon in chip.
	      self.$document.off('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE).on('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE, function (e) {
	        var $target = $(e.target);
	        var $chips = $target.closest(SELS.CHIPS);
	        var $chip = $target.closest(SELS.CHIP);
	        e.stopPropagation();
	        self.deleteChip($chip.index(), $chips);
	        $chips.find('input').focus();
	      });
	    };
	    this.chips = function ($chips, chipId) {
	      var html = '';
	      $chips.data('chips').forEach(function (elem) {
	        html += self.renderChip(elem);
	      });
	      html += '<input id="' + chipId + '" class="input" placeholder="">';
	      $chips.html(html);
	      self.setPlaceholder($chips);
	      // Set for attribute for label
	      var label = $chips.next('label');
	      if (label.length) {
	        label.attr('for', chipId);
	        if ($chips.data('chips').length) {
	          label.addClass('active');
	        }
	      }
	    };
	    this.renderChip = function (elem) {
	      if (!elem.tag) return;
	      var html = '<div class="chip">' + elem.tag;
	      if (elem.image) {
	        html += ' <img src="' + elem.image + '"> ';
	      }
	      html += '<i class="zmdi zmdi-close close"></i>';
	      html += '</div>';
	      return html;
	    };
	    this.setPlaceholder = function ($chips) {
	      if ($chips.data('chips').length && curr_options.placeholder) {
	        $chips.find('input').prop('placeholder', curr_options.placeholder);
	      } else if (!$chips.data('chips').length && curr_options.secondaryPlaceholder) {
	        $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
	      }
	    };
	    this.isValid = function ($chips, elem) {
	      var chips = $chips.data('chips');
	      var exists = false;
	      for (var i = 0; i < chips.length; i++) {
	        if (chips[i].tag === elem.tag) {
	          exists = true;
	          return;
	        }
	      }
	      return '' !== elem.tag && !exists;
	    };
	    this.addChip = function (elem, $chips) {
	      if (!self.isValid($chips, elem)) {
	        return;
	      }
	      var chipHtml = self.renderChip(elem);
	      var newData = [];
	      var oldData = $chips.data('chips');
	      for (var i = 0; i < oldData.length; i++) {
	        newData.push(oldData[i]);
	      }
	      newData.push(elem);
	      $chips.data('chips', newData);
	      $(chipHtml).insertBefore($chips.find('input'));
	      $chips.trigger('chip.add', elem);
	      self.setPlaceholder($chips);
	    };
	    this.deleteChip = function (chipIndex, $chips) {
	      var chip = $chips.data('chips')[chipIndex];
	      $chips.find('.chip').eq(chipIndex).remove();
	      var newData = [];
	      var oldData = $chips.data('chips');
	      for (var i = 0; i < oldData.length; i++) {
	        if (i !== chipIndex) {
	          newData.push(oldData[i]);
	        }
	      }
	      $chips.data('chips', newData);
	      $chips.trigger('chip.delete', chip);
	      self.setPlaceholder($chips);
	    };
	    this.selectChip = function (chipIndex, $chips) {
	      var $chip = $chips.find('.chip').eq(chipIndex);
	      if ($chip && false === $chip.hasClass('selected')) {
	        $chip.addClass('selected');
	        $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
	      }
	    };
	    this.getChipsElement = function (index, $chips) {
	      return $chips.eq(index);
	    };
	    // init
	    this.init();
	    if (!chipsHandleEvents) {
	      this.handleEvents();
	      chipsHandleEvents = true;
	    }
	  };
	};
	var initChips = function initChips() {
	  $('.chips').material_chip();
	  $('.chips-initial').material_chip({
	    data: [{
	      tag: 'Apple'
	    }, {
	      tag: 'Microsoft'
	    }, {
	      tag: 'Google'
	    }]
	  });
	  $('.chips-placeholder').material_chip({
	    placeholder: 'Enter a tag',
	    secondaryPlaceholder: '+Tag'
	  });
	};
	exports.chips = chips;
	exports.initChips = initChips;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var simpleStepper = function simpleStepper(elem) {
	    function triggerClick(elem) {
	        $(elem).click();
	    }
	    var $progressWizard = $('.modal-stepper .stepper'),
	        $tab_active,
	        $tab_prev,
	        $tab_next,
	        $btn_prev = $progressWizard.find('.prev-step'),
	        $btn_next = $progressWizard.find('.next-step'),
	        $tab_toggle = $progressWizard.find('[data-toggle="tab"]'),
	        $tooltips = $progressWizard.find('[data-toggle="tab"][title]'),
	        $btn_cancel = $('.cancel-stepper'),
	        $stepper_item = $('.stepper li');
	    //Initialize tooltips
	    $tooltips.tooltip();
	    //Stepper
	    $tab_toggle.on('show.bs.tab', function (e) {
	        var $target = $(e.target);
	        if (!$target.parent().hasClass('active, disabled')) {
	            $target.parent().prev().addClass('completed');
	        }
	        if ($target.parent().hasClass('disabled')) {
	            return false;
	        }
	    });
	    $btn_next.on('click', function () {
	        $tab_active = $progressWizard.find('.active');
	        $tab_active.next().removeClass('disabled');
	        $tab_next = $tab_active.next().find('a[data-toggle="tab"]');
	        triggerClick($tab_next);
	    });
	    $btn_prev.on('click', function () {
	        $tab_active = $progressWizard.find('.active');
	        $tab_prev = $tab_active.prev().find('a[data-toggle="tab"]');
	        triggerClick($tab_prev);
	    });
	    $btn_cancel.on('click', function () {
	        $stepper_item.attr('class', '');
	        $stepper_item.each(function (index, value) {
	            if (index === 0) {
	                $(this).addClass('active');
	            } else {
	                $(this).addClass('disabled');
	            }
	        });
	    });
	};
	exports.simpleStepper = simpleStepper;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var expansionPanel = function expansionPanel() {
	    var $panelWrapper = $('.panel-group.expansion'),
	        $panel = $('.panel-group.expansion .panel'),
	        $clickTarget = $('.panel-group.expansion .panel .panel-title > a'),
	        $panelCollapse = $('.panel-group.expansion .panel-collapse');
	    $clickTarget.on('click', function () {
	        $panel.removeClass('active');
	        if ($(this).hasClass('collapsed')) {
	            $(this).parents('.panel').addClass('active');
	        } else {
	            $(this).parents('.panel').removeClass('active');
	        }
	    });
	};
	exports.expansionPanel = expansionPanel;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var registerForm = function registerForm() {
	    $('[data-toggle="register"]').on('click', function (e) {
	        e.stopPropagation();
	        $(this).parents('#login_content').toggleClass('open');
	    });
	};
	var loginV3 = function loginV3() {
	    $('#login-wrapper .btn-fab').on('click', function (e) {
	        e.stopPropagation();
	        $(this).parents('.card').toggleClass('active');
	    });
	};
	exports.loginV3 = loginV3;
	exports.registerForm = registerForm;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var sweetAlerts = function sweetAlerts() {
		$('#sweet_alerts_card').on('click.sweet-error', '.sweet-error', function (e) {
			e.stopPropagation();
			swal("Oops...", "Something went wrong!", "error");
		});
		$('#sweet_alerts_card').on('click.sweet-message', '.sweet-message', function (e) {
			e.stopPropagation();
			swal("Here's simple message!");
		});
		$('#sweet_alerts_card').on('click.sweet-success', '.sweet-success', function (e) {
			e.stopPropagation();
			swal("Good job!", "You clicked the button!", "success");
		});
		$('#sweet_alerts_card').on('click.sweet-warning', '.sweet-warning', function (e) {
			e.stopPropagation();
			swal({
				title: "Are you sure?",
				text: "You will not be able to recover this imaginary file!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			}, function () {
				swal("Deleted!", "Your imaginary file has been deleted.", "success");
			});
		});
		$('#sweet_alerts_card').on('click.sweet-warning-cancel', '.sweet-warning-cancel', function (e) {
			e.stopPropagation();
			swal({
				title: "Are you sure?",
				text: "You will not be able to recover this imaginary file!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: '#DD6B55',
				confirmButtonText: 'Yes, delete it!',
				cancelButtonText: "No, cancel plx!",
				closeOnConfirm: false,
				closeOnCancel: false
			}, function (isConfirm) {
				if (isConfirm) {
					swal("Deleted!", "Your imaginary file has been deleted!", "success");
				} else {
					swal("Cancelled", "Your imaginary file is safe :)", "error");
				}
			});
		});
	};
	var alertifyjs = function alertifyjs() {
		$('#alertify_card').on('click.alertifyAlert', '#alert', function (e) {
			e.stopPropagation();
			alertify.alert("Message");
		});
		$('#alertify_card').on('click.alertifyConfirm', '#confirm', function (e) {
			e.stopPropagation();
			// confirm dialog
			alertify.confirm("Message", function () {
				// user clicked "ok"
				alertify.success("You've clicked OK");
			}, function () {
				alertify.success("You've clicked CANCEL");
			});
		});
		$('#alertify_card').on('click.alertifyPrompt', '#prompt', function () {
			alertify.defaultValue("Default Value").prompt("This is a prompt dialog", function (val, ev) {
				// The click event is in the event variable, so you can use it here.
				ev.preventDefault();
				// The value entered is availble in the val variable.
				alertify.success("You've clicked OK and typed: " + val);
			}, function (ev) {
				// The click event is in the event variable, so you can use it here.
				ev.preventDefault();
				alertify.error("You've clicked Cancel");
			});
		});
		$('#alertify_card').on('click.alertifyCustomLabel', '#custom-label', function (e) {
			e.stopPropagation();
			alertify.okBtn("Accept").cancelBtn("Deny").confirm("Confirm dialog with custom button labels", function (ev) {
				// The click event is in the
				// event variable, so you can use
				// it here.
				ev.preventDefault();
				alertify.success("You've clicked OK");
			}, function (ev) {
				// The click event is in the
				// event variable, so you can use
				// it here.
				ev.preventDefault();
				alertify.error("You've clicked Cancel");
			});
		});
	};
	exports.sweetAlerts = sweetAlerts;
	exports.alertifyjs = alertifyjs;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var notes = {
	  triggerInput: '.card-add-note',
	  noteForm: '#note_form .card-body',
	  noteTitle: '#noteTitle',
	  noteHeading: '.card-heading',
	  selected: '[data-note="selected"]'
	};
	var allNotes = function allNotes() {
	  var $eachNote = $('.card-notes div[id*=note_id_]'),
	      count = 0;
	  $eachNote.each(function () {
	    $(this).attr('id', 'note_id_' + count);
	    count++;
	  });
	  $('.card-note').each(function () {
	    if ($(this).find('.card-body p').text().length <= 20) {
	      $(this).find('.card-body p').css({
	        'font-size': '48px',
	        'line-height': '1.2em'
	      });
	    } else if ($(this).find('.card-body p').text().length <= 45) {
	      $(this).find('.card-body p').css({
	        'font-size': '32px',
	        'line-height': '1.5em'
	      });
	    } else if ($(this).find('.card-body p').text().length <= 75) {
	      $(this).find('.card-body p').css({
	        'font-size': '22px',
	        'line-height': '1.6em'
	      });
	    }
	  });
	  $('#masonry').masonry({
	    itemSelector: '.masonry-item'
	  });
	};
	var notesAdd = function notesAdd() {
	  $(notes.triggerInput).on("click", function (e) {
	    $(this).addClass('open');
	    e.stopPropagation();
	  });
	  if ($(notes.noteForm).is(':visible')) {
	    $(notes.triggerInput).on('click', function (e) {
	      e.stopPropagation();
	      $('#note_form .card-actions li.dropdown').removeClass('open');
	    });
	  }
	  $('#note_form .card-actions li.dropdown').on('click', function (e) {
	    $(this).toggleClass('open');
	    e.stopPropagation();
	  });
	  $('body').on('click', function (e) {
	    $(notes.triggerInput).removeClass('open');
	    $('#note_form .card-actions li.dropdown').removeClass('open');
	    $('#note-color-wrapper').attr('class', '');
	  });
	};
	var noteSelected = function noteSelected() {
	  $('a[data-note="selected"]').on('click', function (e) {
	    e.stopPropagation();
	    $(this).closest('.card-note').toggleClass('selected');
	    checkSlected();
	  });
	  $('.card-note .card-heading,.card-note .card-body,#header_action_bar').on('click', function (e) {
	    e.stopPropagation();
	  });
	  $('#header_action_bar .dropdown').on('click', function (e) {
	    e.stopPropagation();
	    $(this).toggleClass('open');
	  });
	  $('body').on('click', function (e) {
	    $('.card-note').removeClass('selected');
	    checkSlected();
	  });
	};
	var checkSlected = function checkSlected() {
	  var $eachNote = $('.notes-app .card-notes .card-note.selected'),
	      noteLength = $('.notes-app .card-notes .card-note.selected').length;
	  if ($eachNote.length > 0) {
	    $('.notes-app #header_action_bar').addClass('open');
	    $('.notes-app #selected_items span').text(noteLength + ' selected');
	  } else {
	    $('.notes-app #header_action_bar').removeClass('open');
	  }
	};
	var noteImgUpload = function noteImgUpload() {
	  $(function () {
	    $(":file").change(function () {
	      if (this.files && this.files[0]) {
	        var reader = new FileReader();
	        reader.onload = imageIsLoaded;
	        reader.readAsDataURL(this.files[0]);
	      }
	    });
	  });
	  function imageIsLoaded(e) {
	    $('#notesTempImg').attr('src', e.target.result);
	    $('.notesTempImgWrapper').fadeIn();
	  };
	};
	var noteAddList = function noteAddList() {
	  var $add_textarea_wrapper = $('#add_textarea_wrapper'),
	      $add_list_wrapper = $('#add_list_wrapper');
	  $('a[data-note="list"]').on('click', function (e) {
	    if ($add_textarea_wrapper.is(':visible')) {
	      $add_textarea_wrapper.hide();
	      $add_list_wrapper.show();
	    } else {
	      $add_textarea_wrapper.show();
	      $add_list_wrapper.hide();
	    };
	  });
	  $('#add_list_item_btn').on('click', function () {
	    var listItem = $(this).closest('#add_list_wrapper').find('#add_list_item');
	    if (listItem.length > 0) {
	      $('#add_list_wrapper #add_list').append('<li><div class="checkbox"><label><input type="checkbox" value="">' + listItem.val() + '</label></div></li>');
	      $.material.init();
	    } else {}
	  });
	  $('#note_form .swatches input').on('click', function () {
	    var $noteColorWrapper = $(this).parents('#note-color-wrapper'),
	        noteColorSwatch = $(this).val();
	    $noteColorWrapper.attr('class', '');
	    $noteColorWrapper.addClass(noteColorSwatch);
	  });
	};
	var updateNote = function updateNote() {
	  $('.card-note .swatches input').on('click', function () {
	    var $noteColorWrapper = $(this).parents('div[id*=note_id_]'),
	        noteColorSwatch = $(this).val();
	    $noteColorWrapper.attr('class', '');
	    $noteColorWrapper.addClass(noteColorSwatch);
	  });
	};
	exports.allNotes = allNotes;
	exports.notesAdd = notesAdd;
	exports.noteSelected = noteSelected;
	exports.noteImgUpload = noteImgUpload;
	exports.noteAddList = noteAddList;
	exports.updateNote = updateNote;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var currentDateTimeSidebar = function currentDateTimeSidebar() {
	  moment.updateLocale('en', {
	    ordinal: function ordinal(number, token) {
	      var b = number % 10;
	      var output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	      return number + '<sup>' + output + '</sup>';
	    }
	  });
	  $('.curr-dd').html(moment().format('dddd') + ',');
	  $('.curr-mmmm-dd').html(moment().format("MMMM Do"));
	};
	var nextThreeDays = function nextThreeDays() {
	  moment.updateLocale('en', {
	    calendar: {
	      'lastDay': 'D MMMM',
	      'sameDay': 'h:mmA',
	      'nextDay': 'dddd',
	      'lastWeek': 'dddd',
	      'nextWeek': 'dddd',
	      'sameElse': 'dddd'
	    }
	  });
	  if ($('.forcast').length > 0) {
	    $('.forcast-one').html(moment().add(1, 'days').calendar());
	    $('.forcast-two').html(moment().add(2, 'days').calendar());
	    $('.forcast-three').html(moment().add(3, 'days').calendar());
	  }
	};
	var todaysDate = function todaysDate() {
	  var today = moment().format('MM/DD/YYYY');
	  var year = moment().format('YYYY');
	  $('.today').text(today);
	  $('.year').text(year);
	};
	var timlineInput = function timlineInput() {
	  var date = new Date().toISOString().substring(0, 10);
	  $('#timeline-date').val(date);
	  var picker = new Pikaday({
	    field: document.getElementById('timeline-date'),
	    firstDay: 1,
	    minDate: new Date(),
	    maxDate: new Date(2020, 12, 31),
	    yearRange: [2000, 2020]
	  });
	};
	exports.currentDateTimeSidebar = currentDateTimeSidebar;
	exports.nextThreeDays = nextThreeDays;
	exports.todaysDate = todaysDate;
	exports.timlineInput = timlineInput;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var fullscreenTransition = exports.fullscreenTransition = function fullscreenTransition() {
	    $('[data-transition]').on('click', function (e) {
	        var $body = $('body'),
	            element = $(this),
	            className = element.data('transition');
	        if (!element.hasClass(className)) {
	            element.addClass(className);
	            $body.addClass(className);
	        }
	        return false;
	    });
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var matchElementHeight = exports.matchElementHeight = function matchElementHeight(elements) {
	    var windowWidth = window.innerWidth,
	        elementsToSize = $(elements),
	        elementsHeights = [];
	    if (elementsToSize.length > 1) {
	        $.each(elementsToSize, function () {
	            $(this).css('height', '');
	            elementsHeights.push($(this).outerHeight());
	        });
	        $(elements).css('height', Math.max.apply(Math, elementsHeights));
	    };
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//These javascript modules are for demo purposes.
	var iconModal = function iconModal() {
	  var icons = $('.icon');
	  var name = 'bus';
	  icons.on('click', function (e) {
	    e.preventDefault();
	    var oldName = name;
	    name = $(this).data('name');
	    var code = $(this).data('code');
	    var category = $(this).parent().parent().find('.page-header').html();
	    $('#icon-sizes i').removeClass('zmdi-' + oldName).addClass('zmdi-' + name);
	    $('#iconModal .source').html('&lt;i class="zmdi zmdi-' + name + '"&gt;&lt;/i&gt;');
	    $('#icon-code .zmdi').html('&#x' + code);
	    $('#icon-code .unicode').html('Unicode: ' + code);
	    $('#icon-code .category').html('Category: ' + category);
	    $('#iconModalLabel').html('zmdi-' + name);
	  });
	};
	var css3AnimationDemos = function css3AnimationDemos() {
	  $('.animation-demo .btn').on('click', function () {
	    var className = $(this).text();
	    var cardImg = $(this).closest('.card').find('img');
	    $(this).closest('img').addClass(className);
	    cardImg.removeAttr('class');
	    cardImg.addClass('img-circle animated ' + className);
	    setTimeout(function () {
	      cardImg.removeClass(className);
	    }, 1500);
	  });
	};
	var cardCarousel = function cardCarousel() {
	  $('#card-carousel').slick({ dots: true, infinite: true, speed: 300, slidesToShow: 1, adaptiveHeight: true });
	};
	var cardDemoMorrisChart = function cardDemoMorrisChart() {
	  if ($('#morris_card_demo').length) {
	    var data = [{
	      y: '2014',
	      a: 50,
	      b: 90
	    }, {
	      y: '2015',
	      a: 65,
	      b: 75
	    }, {
	      y: '2016',
	      a: 50,
	      b: 50
	    }, {
	      y: '2017',
	      a: 75,
	      b: 60
	    }, {
	      y: '2018',
	      a: 80,
	      b: 65
	    }, {
	      y: '2019',
	      a: 90,
	      b: 70
	    }, {
	      y: '2020',
	      a: 100,
	      b: 75
	    }, {
	      y: '2021',
	      a: 115,
	      b: 75
	    }, {
	      y: '2022',
	      a: 120,
	      b: 85
	    }, {
	      y: '2023',
	      a: 145,
	      b: 85
	    }, {
	      y: '2024',
	      a: 160,
	      b: 95
	    }],
	        config = {
	      data: data,
	      xkey: 'y',
	      ykeys: ['a', 'b'],
	      labels: ['Total Income', 'Total Outcome'],
	      fillOpacity: 0.6,
	      hideHover: 'auto',
	      behaveLikeLine: true,
	      resize: true,
	      pointFillColors: ['#ffffff'],
	      pointStrokeColors: ['black'],
	      barColors: ['#db5c60', '#f4b0b2']
	    };
	    config.element = 'morris_card_demo';
	    config.stacked = true;
	    Morris.Bar(config);
	  };
	};
	var loadThemes = function loadThemes() {
	  $('[data-load-css]').on('click', function (e) {
	    var element = $(this);
	    if (element.is('a')) e.preventDefault();
	    var uri = element.data('loadCss'),
	        link;
	    if (uri) {
	      link = swapStyleSheet(uri);
	      if (!link) {
	        $.error('Error creating stylesheet link element.');
	      }
	    } else {
	      $.error('No stylesheet location defined.');
	    }
	  });
	};
	var swapStyleSheet = function swapStyleSheet(uri) {
	  var linkId = 'autoloaded-stylesheet',
	      oldLink = $('#' + linkId).attr('id', linkId + '-old');
	  $('head').append($('<link/>').attr({ 'id': linkId, 'rel': 'stylesheet', 'href': uri }));
	  if (oldLink.length) {
	    oldLink.remove();
	  }
	  return $('#' + linkId);
	};
	var swapLayoutMode = function swapLayoutMode() {
	  $('input[name=layoutMode]').click(function () {
	    if ($('body').hasClass('boxed-layout')) {
	      $('body').removeClass('boxed-layout');
	    }
	    var getVal = $(this).val();
	    $('body').addClass(getVal);
	  });
	};
	exports.iconModal = iconModal;
	exports.css3AnimationDemos = css3AnimationDemos;
	exports.cardCarousel = cardCarousel;
	exports.cardDemoMorrisChart = cardDemoMorrisChart;
	exports.loadThemes = loadThemes;
	exports.swapLayoutMode = swapLayoutMode;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var contextMenu = exports.contextMenu = function contextMenu() {
	    if ($('#context-menu').length) {
	        var contextMenuClassName;
	        var contextMenuItemClassName;
	        var contextMenuLinkClassName;
	        var contextMenuActive;
	        var taskItemClassName;
	        var taskItemInContext;
	        var clickCoords;
	        var clickCoordsX;
	        var clickCoordsY;
	        var menu;
	        var menuItems;
	        var menuState;
	        var menuWidth;
	        var menuHeight;
	        var menuPosition;
	        var menuPositionX;
	        var menuPositionY;
	        var windowWidth;
	        var windowHeight;
	
	        (function () {
	            /**
	             * Function to check if we clicked inside an element with a particular class
	             * name.
	             *
	             * @param {Object} e The event
	             * @param {String} className The class name to check against
	             * @return {Boolean}
	             */
	            var clickInsideElement = function clickInsideElement(e, className) {
	                var el = e.srcElement || e.target;
	
	                if (el.classList.contains(className)) {
	                    return el;
	                } else {
	                    while (el = el.parentNode) {
	                        if (el.classList && el.classList.contains(className)) {
	                            return el;
	                        }
	                    }
	                }
	
	                return false;
	            };
	
	            /**
	             * Get's exact position of event.
	             *
	             * @param {Object} e The event passed in
	             * @return {Object} Returns the x and y position
	             */
	
	
	            var getPosition = function getPosition(e) {
	                var posx = 0;
	                var posy = 0;
	
	                if (!e) var e = window.event;
	
	                if (e.pageX || e.pageY) {
	                    posx = e.pageX;
	                    posy = e.pageY;
	                } else if (e.clientX || e.clientY) {
	                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	                    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	                }
	
	                return {
	                    x: posx,
	                    y: posy
	                };
	            };
	
	            /**
	             * Variables.
	             */
	
	
	            /**
	             * Initialise our application's code.
	             */
	            var init = function init() {
	                contextListener();
	                clickListener();
	                keyupListener();
	                resizeListener();
	            };
	
	            /**
	             * Listens for contextmenu events.
	             */
	
	
	            var contextListener = function contextListener() {
	                document.addEventListener("contextmenu", function (e) {
	                    taskItemInContext = clickInsideElement(e, taskItemClassName);
	
	                    if (taskItemInContext) {
	                        e.preventDefault();
	                        toggleMenuOn();
	                        positionMenu(e);
	                    } else {
	                        taskItemInContext = null;
	                        toggleMenuOff();
	                    }
	                });
	            };
	
	            /**
	             * Listens for click events.
	             */
	
	
	            var clickListener = function clickListener() {
	                document.addEventListener("click", function (e) {
	                    var clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);
	
	                    if (clickeElIsLink) {
	                        e.preventDefault();
	                        menuItemListener(clickeElIsLink);
	                    } else {
	                        var button = e.which || e.button;
	                        if (button === 1) {
	                            toggleMenuOff();
	                        }
	                    }
	                });
	            };
	
	            /**
	             * Listens for keyup events.
	             */
	
	
	            var keyupListener = function keyupListener() {
	                window.onkeyup = function (e) {
	                    if (e.keyCode === 27) {
	                        toggleMenuOff();
	                    }
	                };
	            };
	
	            /**
	             * Window resize event listener
	             */
	
	
	            var resizeListener = function resizeListener() {
	                window.onresize = function (e) {
	                    toggleMenuOff();
	                };
	            };
	
	            /**
	             * Turns the custom context menu on.
	             */
	
	
	            var toggleMenuOn = function toggleMenuOn() {
	                if (menuState !== 1) {
	                    menuState = 1;
	                    menu.classList.add(contextMenuActive);
	                }
	            };
	
	            /**
	             * Turns the custom context menu off.
	             */
	
	
	            var toggleMenuOff = function toggleMenuOff() {
	                if (menuState !== 0) {
	                    menuState = 0;
	                    menu.classList.remove(contextMenuActive);
	                }
	            };
	
	            /**
	             * Positions the menu properly.
	             *
	             * @param {Object} e The event
	             */
	
	
	            var positionMenu = function positionMenu(e) {
	                clickCoords = getPosition(e);
	                clickCoordsX = clickCoords.x;
	                clickCoordsY = clickCoords.y;
	
	                menuWidth = menu.offsetWidth + 4;
	                menuHeight = menu.offsetHeight + 4;
	
	                windowWidth = window.innerWidth;
	                windowHeight = window.innerHeight;
	
	                if (windowWidth - clickCoordsX < menuWidth) {
	                    menu.style.left = windowWidth - menuWidth + "px";
	                } else {
	                    menu.style.left = clickCoordsX + "px";
	                }
	
	                if (windowHeight - clickCoordsY < menuHeight) {
	                    menu.style.top = windowHeight - menuHeight + "px";
	                } else {
	                    menu.style.top = clickCoordsY + "px";
	                }
	            };
	
	            /**
	             * Dummy action function that logs an action when a menu item link is clicked
	             *
	             * @param {HTMLElement} link The link that was clicked
	             */
	
	
	            var menuItemListener = function menuItemListener(link) {
	                console.log("Task ID - " + taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
	                toggleMenuOff();
	            };
	
	            /**
	             * Run the app.
	             */
	
	            contextMenuClassName = "context-menu";
	            contextMenuItemClassName = "context-menu__item";
	            contextMenuLinkClassName = "context-menu__link";
	            contextMenuActive = "context-menu--active";
	            taskItemClassName = "enable-context-menu";
	            menu = document.querySelector("#context-menu");
	            menuItems = menu.querySelectorAll(".context-menu__item");
	            menuState = 0;
	            init();
	        })();
	    }
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var autocompleteBasic = function autocompleteBasic() {
	    var statesArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	    $('#autocomplete_states').typeahead({
	        source: statesArray
	    });
	};
	var autocompleteClear = function autocompleteClear() {
	    var statesArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	    $('#autocomplete_clear').typeahead({
	        source: statesArray
	    });
	    $(document.body).on('click', '.autocomplete_clear .zmdi-close', function () {
	        $('#autocomplete_clear').val('');
	        $('.autocomplete_clear .zmdi-close').remove();
	    });
	    $("#autocomplete_clear").on('change keyup copy paste cut', function (e) {
	        if (e.which == 8 && this.value.length == 0) {
	            $(this).parent().find('.zmdi-close').remove();
	        } else if ($('.autocomplete_clear .zmdi-close').length == 0) {
	            $(this).parent().append('<i class="zmdi zmdi-close"></i>');
	        }
	    });
	};
	var countryAutocomplete = function countryAutocomplete() {
	    var countryObjs = {};
	    var countryNames = [];
	    var throttledRequest = _.debounce(function (query, process) {
	        $.ajax({
	            url: '/assets/data/autocomplete_countries.json',
	            cache: false,
	            success: function success(data) {
	                countryObjs = {};
	                countryNames = [];
	                _.each(data, function (item, ix, list) {
	                    countryNames.push(item.countryName);
	                    countryObjs[item.countryName] = item;
	                });
	                process(countryNames);
	            }
	        });
	    }, 300);
	    $("#autocomplete_countries").typeahead({
	        source: function source(query, process) {
	            throttledRequest(query, process);
	        },
	        highlighter: function highlighter(item) {
	            var country = countryObjs[item];
	            return '<div class="country"><img style="max-width:45px;margin:10px;" src="assets/img/icons/flags/' + country.countryCode + '.png"/><strong>' + country.countryName + '</strong></div>';
	        },
	        updater: function updater(selectedName) {
	            $(".country").val(countryObjs[selectedName].id);
	            return selectedName;
	        }
	    });
	};
	exports.autocompleteBasic = autocompleteBasic;
	exports.autocompleteClear = autocompleteClear;
	exports.countryAutocomplete = countryAutocomplete;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mwDataTables = function mwDataTables() {
	  $('.card-data-tables table tbody .checkbox-cell .checkbox input[type=checkbox]').each(function (i) {
	    $(this).attr('id', "CheckboxId_" + (i + 1));
	  });
	  //Initialize and UI setup
	  $('.product-table-wrapper table').DataTable({
	    "aaSorting": [[2, 'asc']]
	  });
	  var oTable = $('.dataTable').DataTable();
	  $('.filter-input').keyup(function () {
	    oTable.search($(this).val()).draw();
	  });
	  var $lengthSelect = $(".card.card-data-tables select.form-control.input-sm");
	  var tableLength = $lengthSelect.detach();
	  $('#dataTablesLength').append(tableLength);
	  $(".card.card-data-tables .card-actions select.form-control.input-sm").dropdown({
	    "optionClass": "withripple"
	  });
	  $('#dataTablesLength .dropdownjs .fakeinput').hide();
	  $('#dataTablesLength .dropdownjs ul').addClass('dropdown-menu dropdown-menu-right');
	};
	var checkAll = function checkAll() {
	  //See if any checkboxes are checked on page load
	  if ($(' .checkbox-cell input[id*=CheckboxId_][type=checkbox]:checked').length == 0) {
	    $('#deleteItems').hide();
	  } else {
	    $('#deleteItems').show();
	    //get a record count
	    var initCheckCount = $('.checkbox-cell input[id*=CheckboxId_][type=checkbox]:checked').length;
	    if (initCheckCount === 1) {
	      var countGrammer = 'item';
	    } else if (initCheckCount > 0) {
	      var countGrammer = 'items';
	    }
	    $('#deleteItems span').text(initCheckCount + ' ' + countGrammer + ' selected');
	  }
	  $('#checkAll').on('click', function () {
	    $('.checkbox-cell input:checkbox').not(this).prop('checked', this.checked);
	  });
	  //On change of individual checkbox
	  $(".checkbox-cell [id*=CheckboxId_]").change(function () {
	    var $this = $(this);
	    if ($('.checkbox-cell input[id*=CheckboxId_][type=checkbox]:checked').length == $('.checkbox-cell input[id*=CheckboxId_][type=checkbox]').length) {
	      $('#checkAll').prop('checked', true);
	    } else {
	      $('#checkAll').prop('checked', false);
	    }
	    if ($this.is(":checked")) {
	      $this.closest("tr").addClass("highlight");
	    } else {
	      $this.closest("tr").removeClass("highlight");
	    }
	    if ($('.checkbox-cell input[id*=CheckboxId_][type=checkbox]:checked').length == 0) {
	      $('#deleteItems').hide();
	    } else {
	      $('#deleteItems').show();
	    }
	    var initCheckCount = $('.checkbox-cell input[id*=CheckboxId_]:visible[type=checkbox]:checked').length;
	    if (initCheckCount === 1) {
	      var countGrammer = 'item';
	    } else if (initCheckCount > 0) {
	      var countGrammer = 'items';
	    }
	    $('#deleteItems span').text(initCheckCount + ' ' + countGrammer + ' selected');
	  });
	  //On change of the CheckAll checkbox
	  $("#checkAll").change(function () {
	    var $this = $(this);
	    if ($this.is(":checked")) {
	      $('.card-data-tables table tbody .checkbox-cell .checkbox input[type=checkbox]').each(function () {
	        $(this).closest("tr").addClass("highlight");
	      });
	    } else {
	      $('.card-data-tables table tbody .checkbox-cell .checkbox input[type=checkbox]').each(function () {
	        $(this).closest("tr").removeClass("highlight");
	      });
	    }
	    if ($('.checkbox-cell input[id*=CheckboxId_][type=checkbox]:checked').length == 0) {
	      $('#deleteItems').hide();
	    } else {
	      $('#deleteItems').show();
	    }
	    var initCheckCount = $('.checkbox-cell input[id*=CheckboxId_]:visible[type=checkbox]:checked').length;
	    if (initCheckCount === 1) {
	      var countGrammer = 'item';
	    } else if (initCheckCount > 0) {
	      var countGrammer = 'items';
	    }
	    $('#deleteItems span').text(initCheckCount + ' ' + countGrammer + ' selected');
	  });
	};
	//Confirm delete
	var deleteItem = function deleteItem() {
	  $('#confirmDelete').on('click', function (e) {
	    e.stopPropagation();
	    swal({
	      title: "Are you sure?",
	      text: "You will not be able to recover this data.",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonColor: '#DD6B55',
	      confirmButtonText: 'Delete',
	      cancelButtonText: "Cancel",
	      closeOnConfirm: false,
	      closeOnCancel: false
	    }, function (isConfirm) {
	      if (isConfirm) {
	        swal("Deleted!", "Your data has been deleted.", "success");
	        setTimeout(function () {
	          $('.checkbox-cell input[id*=CheckboxId_][type=checkbox]:checked').each(function () {
	            $(this).prop('checked', false);
	            $(this).closest("tr").fadeOut();
	            $('#deleteItems').fadeOut();
	          });
	          if ($('#checkAll').is(":checked")) {
	            $('#checkAll').prop('checked', false);
	          };
	          $('#deleteItems span').text('');
	        }, 600);
	        setTimeout(function () {
	          $('.card-data-tables table tbody tr').attr('style', '').removeClass('highlight');
	        }, 2000);
	      } else {
	        swal("Cancelled", "Your action has been cancelled.", "error");
	      };
	    });
	  });
	};
	//Re-init on pagination
	var pagination = function pagination() {
	  $('.card-data-tables table').on('page.dt', function () {
	    $('.card-data-tables table tbody .checkbox-cell .checkbox input[type=checkbox]').each(function (i) {
	      $(this).prop('checked', false);
	      $(this).closest("tr").removeClass("highlight");
	    });
	    setTimeout(function () {
	      checkAll();
	      deleteItem();
	    }, 600);
	  });
	};
	exports.mwDataTables = mwDataTables;
	exports.checkAll = checkAll;
	exports.deleteItem = deleteItem;
	exports.pagination = pagination;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var wizardDemo = function wizardDemo() {
	  $('#rootwizard').bootstrapWizard({
	    onTabShow: function onTabShow(tab, navigation, index) {
	      var total = navigation.find('li').length;
	      var current = index + 0;
	      var percent = current / (total - 1) * 100;
	      var percentWidth = 100 - 100 / total + '%';
	      navigation.find('li').removeClass('done');
	      navigation.find('li.active').prevAll().addClass('done');
	      $('#rootwizard').find('.progress-bar').css({
	        width: percent + '%'
	      });
	      $('.form-wizard-horizontal').find('.progress').css({
	        'width': percentWidth
	      });
	    }
	  });
	  $('#rootwizard .finish').on('click', function (e) {
	    e.stopPropagation();
	    swal({ title: "Order Complete", text: "Thank you for your purchase!", type: "success", timer: 2000,
	      showConfirmButton: false });
	    $('#rootwizard').find("a[href*='tab1']").trigger('click');
	  });
	};
	exports.wizardDemo = wizardDemo;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var loadGmaps = exports.loadGmaps = function loadGmaps() {
	  if ($('#storeLocations').length > 0) {
	    var stationList;
	    var infoWnd, mapCanvas;
	
	    (function () {
	      var initialize = function initialize() {
	        var mapOptions = {
	          zoom: 10,
	          center: new google.maps.LatLng(47.604981, -122.334249),
	          styles: [{
	            "featureType": "landscape.natural",
	            "elementType": "geometry.fill",
	            "stylers": [{
	              "visibility": "on"
	            }, {
	              "color": "#e0efef"
	            }]
	          }, {
	            "featureType": "poi",
	            "elementType": "geometry.fill",
	            "stylers": [{
	              "visibility": "on"
	            }, {
	              "hue": "#1900ff"
	            }, {
	              "color": "#c0e8e8"
	            }]
	          }, {
	            "featureType": "road",
	            "elementType": "geometry",
	            "stylers": [{
	              "lightness": 100
	            }, {
	              "visibility": "simplified"
	            }]
	          }, {
	            "featureType": "road",
	            "elementType": "labels",
	            "stylers": [{
	              "visibility": "off"
	            }]
	          }, {
	            "featureType": "transit.line",
	            "elementType": "geometry",
	            "stylers": [{
	              "visibility": "on"
	            }, {
	              "lightness": 700
	            }]
	          }, {
	            "featureType": "water",
	            "elementType": "all",
	            "stylers": [{
	              "color": "#8bdadb"
	            }]
	          }]
	        };
	        var mapDiv = document.getElementById("storeLocations");
	        mapCanvas = new google.maps.Map(mapDiv, mapOptions);
	        mapCanvas.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	        infoWnd = new google.maps.InfoWindow();
	        var bounds = new google.maps.LatLngBounds();
	        var station, i, latlng;
	        for (i in stationList) {
	          station = stationList[i];
	          latlng = new google.maps.LatLng(station.latlng[0], station.latlng[1]);
	          bounds.extend(latlng);
	          var marker = createMarker(mapCanvas, latlng, station.name);
	          createMarkerButton(marker);
	        }
	        mapCanvas.fitBounds(bounds);
	      };
	
	      var createMarker = function createMarker(map, latlng, title) {
	        var image = new google.maps.MarkerImage("assets/img/icons/misc/coffee-icon.png", null, null, null, new google.maps.Size(64, 64));
	        var marker = new google.maps.Marker({ position: latlng, map: map, title: title, icon: image });
	        google.maps.event.addListener(marker, "click", function () {
	          infoWnd.setContent("<strong>" + title + "</title>");
	          infoWnd.open(map, marker);
	        });
	        return marker;
	      };
	
	      var createMarkerButton = function createMarkerButton(marker) {
	        var ul = document.getElementById("marker_list");
	        var li = document.createElement("li");
	        var title = marker.getTitle();
	        li.innerHTML = title;
	        ul.appendChild(li);
	        $('#marker_list li').addClass('list-group-item');
	        google.maps.event.addDomListener(li, "click", function () {
	          google.maps.event.trigger(marker, "click");
	        });
	      };
	
	      stationList = [{
	        "latlng": [47.604981, -122.334249],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_1.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">999 Third Avenue, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.605666, -122.335108],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_2.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">1000 Second Avenue, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.603710, -122.335673],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_3.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">823 First Ave, Seattle, WA </span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.606006, -122.336716],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_4.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">1191 2nd Avenue, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.607285, -122.334292],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_5.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">1125 4th Avenue, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.607058, -122.336067],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_6.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">1201 3rd Ave, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.607058, -122.336067],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_7.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">621 2nd Ave, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.604505, -122.330604],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_8.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">701 5th Avenue, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.605708, -122.330206],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_9.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">800 5th Ave Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }, {
	        "latlng": [47.607636, -122.338118],
	        name: "\n        <span class=\"list-group-item-body\"><img src=\"assets/img/locations/shop_10.jpg\" alt=\"\" class=\"img-rounded max-w-75 m-r-10\"></span>\n        <div class=\"list-group-item-body\">\n        <span class=\"list-group-item-heading\">Big House Coffee</span>\n        <span class=\"list-group-item-text block\">1301 2nd Ave, Seattle, WA</span>\n        <span class=\"list-group-item-text block\">Open until 9:00 PM</span>\n        </div>\n        "
	      }];
	
	      google.maps.event.addDomListener(window, "load", initialize);
	    })();
	  }
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sidebarChatCompose = exports.sidebarChatCompose = function sidebarChatCompose() {
	  $('[data-chat]').on('click', function (e) {
	    var $body = $('body'),
	        element = $(this),
	        className = element.data('chat'),
	        $target = $('#chat_compose_wrapper');
	    if (className == 'open') {
	      if ($target.hasClass(className)) {
	        $target.removeClass(className);
	      } else {
	        $target.addClass(className);
	      }
	    }
	    if (className == 'close') {
	      $target.removeAttr('class');
	    }
	  });
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dragDropTask = exports.filterTaskMembers = exports.editTask = exports.deleteTask = exports.addNewTaskList = exports.addNewTask = exports.loadTaskId = exports.getTaskCardInfo = undefined;
	
	var _drawers = __webpack_require__(8);
	
	var _filterList = __webpack_require__(38);
	
	var getTaskCardInfo = function getTaskCardInfo() {
	  $('.card-task-item').on('click.taskInfo', function (e) {
	    var $this = $(this);
	    $('#editTaskTitle,#editTaskNotes').editable("destroy");
	    $('#task-info-wrapper .card-active .filter_members_list li:not(.filter)').removeClass('active');
	    var taskCard = {
	      taskCardId: $this.find('[data-task-id]').data('taskId'),
	      taskListTitle: $this.parents('.card-lane-wrapper').find('[data-task-title]').data('taskTitle'),
	      taskCardColor: $this.parents('.card-lane-wrapper').find('[data-task-color]').data('taskColor'),
	      taskCardTitle: $this.find('[data-task="title"]').text(),
	      taskCardUsers: $this.find('[data-task="users"] li.list-group-item').clone(),
	      taskCardNotes: $this.find('[data-task="notes"]').text().trim(),
	      taskCardMetaData: $this.find('[data-task="metadata"]')
	    };
	    console.log(taskCard.taskListTitle);
	    //Remove data
	    $('#task-info-wrapper .card-heading .card-number').text('');
	    $('#task-info-wrapper .card-body #editTaskTitle').text('');
	    $('#task-info-wrapper .card [data-task-color]').removeAttr('class');
	    $('#task-info-wrapper .card-body #editTaskNotes').text('');
	    $('#task-info-wrapper .editable-inline textarea').val('');
	    $('#task-info-wrapper .card-body .user-group > li.list-group-item').remove();
	    //Add new data
	    $('#task-info-wrapper [data-active-id]').data('activeId', taskCard.taskCardId);
	    $('#task-info-wrapper .card-heading .card-number').text('#' + taskCard.taskCardId);
	    $('#task-info-wrapper .card-heading #taskListTitle').text(taskCard.taskListTitle);
	    $('#task-info-wrapper .card [data-task-color]').addClass(taskCard.taskCardColor);
	    $('#task-info-wrapper .card-body #editTaskTitle').text(taskCard.taskCardTitle);
	    $('#task-info-wrapper .card-body #editTaskNotes').text(taskCard.taskCardNotes);
	    $('#task-info-wrapper .card-body .user-group').prepend(taskCard.taskCardUsers);
	    editInPlace();
	    $('#task-info-wrapper .card-active .user-group > li.list-group-item').each(function () {
	      var $this = $(this),
	          matchImgSrc = $this.find('img').attr('src');
	      $('#task-info-wrapper .card-active .filter_members_list li:not(.filter)').each(function () {
	        var imgSrc = $(this).find('img').attr('src');
	        if (imgSrc == matchImgSrc) {
	          $(this).addClass('active');
	        }
	      });
	    });
	  });
	  $(document).on('click', '.editable-submit', function (e) {
	    var $this = $(this),
	        updateTitle = $this.parents('form').find('input.form-control').val(),
	        updateNotes = $this.parents('form').find('textarea.form-control').val(),
	        activeId = $('#task-info-wrapper').find('[data-active-id]').data('activeId');
	    $('.card-task-item [data-task-id="' + activeId + '"]').find('.card-title').text(updateTitle);
	    $('.card-task-item [data-task-id="' + activeId + '"]').find('[data-task="notes"]').text(updateNotes);
	  });
	};
	var editInPlace = function editInPlace() {
	  $.fn.editable.defaults.mode = 'inline';
	  $('#editTaskTitle,#editTaskNotes').editable();
	  $.fn.editableform.buttons = '<button type="submit" class="btn btn-primary btn-fab btn-fab-xs m-5 editable-submit">' + '<i class="mdi mdi-check"></i>' + '</button>' + '<button type="button" class="btn btn-default btn-fab btn-fab-xs m-5 editable-cancel">' + '<i class="mdi mdi-close"></i>' + '</button>';
	};
	var uniqId = function uniqId() {
	  return Math.floor(Math.random() * 90000) + 10000;
	};
	var loadTaskId = function loadTaskId() {
	  if ($('.card-task-item.active').length > 0) {
	    var getId = uniqId();
	    $('.card-task-item.active').find('[data-task-id]').data('taskId', getId);
	    $('.card-task-item.active').removeClass('active');
	  } else {
	    $('div[data-task-id]').each(function () {
	      var $cardItem = $(this).parents('.card.card-task-item'),
	          getId = uniqId();
	      $(this).attr('data-task-id', getId);
	      $cardItem.find('.task-number').text('#' + getId);
	      getTaskCount();
	    });
	  }
	};
	var getTaskCount = function getTaskCount() {
	  $('.card-lane-wrapper .card-lane').each(function () {
	    var recordCount = $(this).find('.card-task-item').length;
	    $(this).parents('.card-lane-wrapper').find('.count').text(recordCount);
	    return recordCount;
	  });
	};
	var addNewTask = function addNewTask() {
	  $('[data-task="add-task"]').on('click', function () {
	    var $this = $(this);
	    if ($('#addTaskForm').length > 0) {
	      $this.attr('disabled', true);
	    } else {
	      $.get("assets/partials/task/_task-add.html", function (getMarkup) {
	        $this.parents('.card-lane-wrapper').find('.card-lane').append(getMarkup).find('.form-control').focus();
	        $this.attr('disabled', true);
	        cancelTask();
	        saveTask();
	      });
	    }
	  });
	};
	var addNewTaskList = function addNewTaskList() {
	  //Open "Add a list..."
	  $('.card-task.empty').on('click.addNewTaskList', function () {
	    var $this = $(this);
	    $this.find('.card-body').slideDown();
	    $this.removeClass('empty');
	  });
	  $('.card-task.empty .card-body').on('click.addNewTaskList', function (e) {
	    //e.stopPropagation();
	  });
	  //Cancel & Reset "Add a list..."
	  $('[data-task="cancel-list"]').on('click', function (e) {
	    e.stopPropagation();
	    var $cardTask = $(this).parents('.card-task');
	    $cardTask.find('.card-body').slideUp();
	    $cardTask.addClass('empty');
	    $cardTask.find('.swatches [name=swatches][value="bg-white"]').prop('checked', true);
	    $cardTask.find('[data-task-color]').data('taskColor', '').attr('class', '');
	  });
	  //Select a color for "Add a list..."
	  $('.card-task .swatches input').on('click', function () {
	    var $cardTask = $(this).parents('.card-task'),
	        $dataTaskColor = $cardTask.find('[data-task-color]'),
	        colorSwatch = $(this).val();
	    $dataTaskColor.attr('class', '');
	    $dataTaskColor.addClass(colorSwatch);
	  });
	  $('[data-task="save-task-list"]').on('click', function (e) {
	    var $cardTask = $(this).parents('.card-task'),
	        $cardLaneWrapper = $(this).parents('.card-lane-wrapper'),
	        $titleInput = $cardTask.find('#newTaskListInput'),
	        $cardTitle = $cardTask.find('.card-title'),
	        colorSwatch = $cardTask.find('.swatches input:checked').val(),
	        $dataTaskColor = $cardTask.find('[data-task-color]');
	    if ($.trim($titleInput.val()) === '') {
	      $(this).parents('.form-group').addClass('has-error');
	    } else {
	      $cardTitle.text($titleInput.val());
	      $dataTaskColor.data('taskColor', colorSwatch);
	      $cardTask.find('.badge.count').addClass(colorSwatch);
	      $cardTask.find('.card-body').remove();
	      $cardLaneWrapper.find('.hidden').removeClass('hidden');
	    }
	  });
	};
	var saveTask = function saveTask() {
	  $('[data-task="save-task"]').on('click', function (e) {
	    var $cardItem = $(this).parents('.card.card-task-item'),
	        title = $cardItem.find('.form-control'),
	        addTaskBtn = $cardItem.find('[data-task="add-task"]');
	    if ($.trim(title.val()) === '') {
	      $(this).parents('.form-group').addClass('has-error');
	    } else {
	      $cardItem.addClass('active');
	      $cardItem.find('.card-title').removeClass('hide').text(title.val());
	      $cardItem.find('.card-actions li').removeClass('hide');
	      $cardItem.find('#addTaskForm').remove();
	      $cardItem.find('[data-task="cancel"]').remove();
	      $cardItem.find('[data-drawer="open-right-lg"]').unbind();
	      loadTaskId();
	      var getElmId = $cardItem.find('[data-task-id]');
	      $cardItem.find('.task-number').text('#' + getElmId.data('taskId'));
	      $cardItem.find('[data-task-id]').attr('data-task-id', getElmId.data('taskId'));
	      (0, _drawers.toggleDrawer)();
	      $(title).removeClass('has-error');
	      $('[data-task="add-task"]').removeAttr('disabled');
	      getTaskCardInfo();
	      getTaskCount();
	    }
	    return false;
	  });
	};
	var deleteTask = function deleteTask() {
	  $('[data-task="delete"]').on('click', function (e) {
	    e.stopPropagation();
	    var $this = $(this);
	    setTimeout(function () {
	      swal({
	        title: 'Are you sure?',
	        text: "You won't be able to revert this!",
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#3085d6',
	        cancelButtonColor: '#d33',
	        confirmButtonText: 'Yes, delete it!'
	      }).then(function () {
	        $this.parents('.card-task-item').remove();
	        $('[data-task="add-task"]').removeAttr('disabled');
	        swal('Deleted!', 'Your task has been removed.', 'success');
	      });
	    }, 250);
	  });
	};
	var cancelTask = function cancelTask() {
	  $('[data-task="cancel"]').on('click', function () {
	    $(this).parents('.card.card-task-item').remove();
	    $('[data-task="add-task"]').removeAttr('disabled');
	  });
	};
	var editTask = function editTask() {
	  $('[data-task="edit-task"]').on('click', function (e) {
	    var $this = $(this);
	    var cardTitle = $this.parents('.card-task-item').find('.card-title'),
	        getTitleText = cardTitle.text();
	    $.get("assets/partials/task/_task-edit.html", function (getMarkup) {
	      if (!$('#addTaskForm').length > 0) {
	        $this.closest('ul').children('li').addClass('hide');
	        $(getMarkup).insertAfter(cardTitle);
	        var editInput = $this.parents('.card-task-item').find('#addTaskForm #editTaskInput');
	        editInput.val(getTitleText);
	        cancelTask();
	        deleteTask();
	        saveTask();
	      }
	    });
	    return false;
	  });
	};
	var filterTaskMembers = function filterTaskMembers() {
	  var filterTaskMembersInput = $('#task-info-wrapper #filter_members_input'),
	      filterTaskMembersList = $('#task-info-wrapper .filter_members_list li:not(.filter)');
	  (0, _filterList.filterList)(filterTaskMembersInput, filterTaskMembersList);
	  //Add users from list
	  $('#task-info-wrapper .filter_members_list li:not(.filter)').on('click', function (e) {
	    var $this = $(this);
	    if (!$this.hasClass('active')) {
	      $this.toggleClass('active');
	      var $img = $this.clone().html();
	      $this.parents('.user-group').prepend('<li class="list-group-item">' + $img + '<a class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></a></li>');
	    }
	    //Remove users
	    $('#task-info-wrapper .remove-guests').on('click', function () {
	      var $this = $(this),
	          imgSrc = $this.parent('.list-group-item').find('img').attr('src');
	      $('#task-info-wrapper .filter_members_list li:not(.filter)').each(function () {
	        var matchImgSrc = $(this).children('img').attr('src');
	        if ($(this).hasClass('active') && imgSrc === matchImgSrc) {
	          $this.parent('.list-group-item').fadeOut();
	          $(this).removeClass('active');
	        }
	      });
	    });
	  });
	};
	var dragDropTask = function dragDropTask() {
	  var drake = dragula({});
	  $('.card-lane').each(function () {
	    drake.containers.push($(this).get(0));
	    drake.on('drag', function (el) {
	      el.classList.add('is-moving');
	    }).on('dragend', function (el) {
	      el.classList.remove('is-moving');
	      window.setTimeout(function () {
	        el.classList.add('is-moved');
	        faded();
	      }, 100);
	    });
	  });
	  var faded = function faded() {
	    $('#fadedColor').remove();
	    var getColor = $('.is-moved').parents('.card-lane-wrapper').find('[data-task-color]').data('taskColor');
	    $('.is-moved').prepend('<div id="fadedColor" class="' + getColor + '"></div>');
	    window.setTimeout(function () {
	      $('#fadedColor').remove();
	      $('.card-task-item').removeClass('is-moved');
	      getTaskCount();
	    }, 350);
	  };
	};
	exports.getTaskCardInfo = getTaskCardInfo;
	exports.loadTaskId = loadTaskId;
	exports.addNewTask = addNewTask;
	exports.addNewTaskList = addNewTaskList;
	exports.deleteTask = deleteTask;
	exports.editTask = editTask;
	exports.filterTaskMembers = filterTaskMembers;
	exports.dragDropTask = dragDropTask;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var filterList = function filterList($inputTarget, $listTarget) {
	  $($inputTarget).keyup(function () {
	    var filter = $(this).val().replace(/\s/g, '');
	    $listTarget.each(function () {
	      if ($(this).text().replace(/\s/g, '').search(new RegExp(filter, "i")) < 0) {
	        $(this).fadeOut();
	        noResultsFound($inputTarget, $listTarget);
	      } else {
	        $(this).show();
	      };
	    });
	  });
	};
	var noResultsFound = function noResultsFound($inputTarget, $listTarget) {
	  if ($listTarget.not('li.filter').is(':visible') === false) {
	    if ($listTarget.closest('ul').find('li.no-results').length === 0) {
	      $listTarget.parent().append('<li class="no-results"><div class="alert alert-danger" role="alert">No Match Found</div></li>');
	    }
	  } else {
	    $listTarget.closest('ul').find('.no-results').remove();
	  }
	};
	exports.filterList = filterList;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.customerTable = exports.orderTable = exports.editProductImg = exports.addProductTags = exports.triggerDropzoneEcom = exports.triggerSummerNoteEcom = exports.newUsers = exports.todaysSales = exports.conversionStats = exports.salesStats = undefined;
	
	var _chips = __webpack_require__(21);
	
	var conversionStats = function conversionStats() {
	  if ($('#conversionStats').length) {
	    var ctx = document.getElementById("conversionStats").getContext("2d");
	    var datasets = {
	      labels: ["Added to Cart", "Reached Checkout", "Purchased", "Cancelled"],
	      datasets: [{
	        label: "Conversion Funnel",
	        backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
	        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255,99,132,1)'],
	        borderWidth: 1,
	        data: [38, 32, 17, 3]
	      }]
	    };
	    var barChartData = new Chart(ctx, {
	      type: "bar",
	      data: datasets,
	      responsive: true
	    });
	  };
	};
	var salesStats = function salesStats() {
	  if ($('#salesStats').length) {
	    var ctx = document.getElementById("salesStats").getContext("2d");
	    var randomScalingFactor = function randomScalingFactor() {
	      return Math.round(Math.random() * 100);
	    };
	    var datasets = {
	      labels: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
	      datasets: [{
	        label: "Credit Card",
	        backgroundColor: "rgba(75,192,192,0.4)",
	        borderColor: "rgba(75,192,192,1)",
	        pointBorderColor: "rgba(75,192,192,1)",
	        pointBackgroundColor: "#fff",
	        pointHoverBackgroundColor: "rgba(75,192,192,1)",
	        pointHoverBorderColor: "rgba(220,220,220,1)",
	        bezierCurve: true,
	        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
	      }, {
	        label: "PayPal",
	        backgroundColor: "rgba(66, 165, 245,0.4)",
	        borderColor: "rgba(66, 165, 245,1)",
	        pointBorderColor: "rgba(66, 165, 245,1)",
	        pointBackgroundColor: "#fff",
	        pointHoverBackgroundColor: "rgba(66, 165, 245,1)",
	        pointHoverBorderColor: "rgba(220,220,220,1)",
	        bezierCurve: true,
	        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
	      }]
	    };
	    var lineChartData = new Chart(ctx, {
	      type: "line",
	      data: datasets,
	      responsive: true
	    });
	  }
	};
	var todaysSales = function todaysSales() {
	  if ($('#totalSales').length) {
	    var newSales = new ProgressBar.Circle('#totalSales', {
	      color: '#fb4869',
	      strokeWidth: 3,
	      trailWidth: 3,
	      duration: 1500,
	      text: {
	        value: '0%'
	      },
	      step: function step(state, bar) {
	        bar.setText((bar.value() * 100).toFixed(0) + "%");
	      }
	    });
	    newSales.animate(0.8);
	  }
	};
	var newUsers = function newUsers() {
	  if ($('#newSignups').length) {
	    var newSignUps = new ProgressBar.Circle('#newSignups', {
	      color: '#42a5f5',
	      strokeWidth: 3,
	      trailWidth: 3,
	      duration: 1500,
	      text: {
	        value: '0%'
	      },
	      step: function step(state, bar) {
	        bar.setText((bar.value() * 100).toFixed(0) + "%");
	      }
	    });
	    newSignUps.animate(0.64);
	  }
	};
	//http://summernote.org/getting-started/#run-summernote
	var triggerSummerNoteEcom = function triggerSummerNoteEcom() {
	  $('#add_product_desc, #edit_product_desc').summernote();
	};
	var triggerDropzoneEcom = function triggerDropzoneEcom() {
	  if (!Dropzone || !Dropzone.length) {
	    Dropzone.autoDiscover = false;
	    $('#product_add_images_form').dropzone({
	      url: "/assets/file/upload",
	      addRemoveLinks: true
	    });
	  }
	};
	var addProductTags = function addProductTags() {
	  $('.chips-placeholder').material_chip({
	    placeholder: '+Tag',
	    secondaryPlaceholder: '+Tag',
	    data: [{
	      tag: 'Geometric'
	    }, {
	      tag: 'Nature'
	    }]
	  });
	};
	var editProductImg = function editProductImg() {
	  $('.edit_product_img').slick({
	    dots: true,
	    infinite: true,
	    speed: 500,
	    cssEase: 'linear'
	  });
	};
	var orderTable = function orderTable() {
	  //Initialize and UI setup
	  $('.order-table-wrapper table').DataTable({
	    "aaSorting": [[2, 'asc']]
	  });
	};
	var customerTable = function customerTable() {
	  //Initialize and UI setup
	  $('.customer-table-wrapper table').DataTable({
	    "aaSorting": [[2, 'asc']]
	  });
	};
	exports.salesStats = salesStats;
	exports.conversionStats = conversionStats;
	exports.todaysSales = todaysSales;
	exports.newUsers = newUsers;
	exports.triggerSummerNoteEcom = triggerSummerNoteEcom;
	exports.triggerDropzoneEcom = triggerDropzoneEcom;
	exports.addProductTags = addProductTags;
	exports.editProductImg = editProductImg;
	exports.orderTable = orderTable;
	exports.customerTable = customerTable;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var selectedItem = function selectedItem() {
	  var card = {
	    $item: $('.file-manager .card-item'),
	    dataItemSelected: 'item-selected',
	    dataItemType: 'item-type',
	    dataItemSize: 'item-size',
	    dataItemLocation: 'item-location',
	    dataItemModified: 'item-modified',
	    dataItemOpened: 'item-opened',
	    dataItemCreated: 'item-created',
	    dataItemOffline: 'item-offline',
	    dataItemImage: 'item-image'
	  };
	  var itemPanel = {
	    $itemImage: $('.item-panel #current-img'),
	    $toggleOffline: $('.item-panel #toggle-offline'),
	    $itemHeaderTitle: $('.item-panel #item-title .title'),
	    $itemHeaderIcon: $('.item-panel #item-title i'),
	    $itemType_titleInfo: $('.item-panel #item-details #type .info'),
	    $itemLocation_titleInfo: $('.item-panel #item-details #location .info'),
	    $itemModified_titleInfo: $('.item-panel #item-details #modified .info'),
	    $itemOpened_titleInfo: $('.item-panel #item-details #opened .info'),
	    $itemCreated_titleInfo: $('.item-panel #item-details #created .info'),
	    $showAllFiles: $('[data-files="show-all"]')
	  };
	  //Get Initial Selected Data Attributes
	  card.$item.each(function () {
	    if ($(this).data(card.dataItemSelected) == true) {
	      itemPanel.$itemType_titleInfo.text($(this).data(card.dataItemType));
	      itemPanel.$itemLocation_titleInfo.text($(this).data(card.dataItemLocation));
	      itemPanel.$itemModified_titleInfo.text($(this).data(card.dataItemModified));
	      itemPanel.$itemOpened_titleInfo.text($(this).data(card.dataItemOpened));
	      itemPanel.$itemCreated_titleInfo.text($(this).data(card.dataItemCreated));
	      if ($(this).data(card.dataItemType) == 'Folder') {
	        var folderName = card.$item.find('.title').text();
	        itemPanel.$itemHeaderTitle.text(folderName);
	        itemPanel.$itemHeaderIcon.removeAttr('class');
	        itemPanel.$itemHeaderIcon.addClass('zmdi zmdi-folder md-text-amber');
	      } else if ($(this).data(card.dataItemType) == 'Image') {
	        var currImage = $(this).data(card.dataItemImage);
	        var fileNameIndex = currImage.lastIndexOf("/") + 1;
	        var filename = currImage.substr(fileNameIndex);
	        itemPanel.$itemHeaderIcon.removeAttr('class');
	        itemPanel.$itemHeaderIcon.addClass('zmdi zmdi-image mw-blue-text ');
	        itemPanel.$itemHeaderTitle.text(filename);
	        itemPanel.$itemImage.append('<img src="' + currImage + '" />');
	      }
	      if ($(this).data(card.dataItemOffline) == true) {
	        itemPanel.$toggleOffline.attr('Checked', 'Checked');
	      } else {
	        itemPanel.$toggleOffline.removeAttr('Checked');
	      }
	    }
	  });
	  card.$item.on('click', function (event) {
	    event.stopPropagation();
	    //Remove Selected
	    card.$item.data('itemSelected', 'false');
	    card.$item.removeClass('selected');
	    //Add Selected
	    $(this).data('itemSelected', 'true');
	    $(this).addClass('selected');
	    //Selected Data Attributes
	    itemPanel.$itemType_titleInfo.text($(this).data(card.dataItemType));
	    itemPanel.$itemLocation_titleInfo.text($(this).data(card.dataItemLocation));
	    itemPanel.$itemModified_titleInfo.text($(this).data(card.dataItemModified));
	    itemPanel.$itemOpened_titleInfo.text($(this).data(card.dataItemOpened));
	    itemPanel.$itemCreated_titleInfo.text($(this).data(card.dataItemCreated));
	    if ($(this).data(card.dataItemType) == 'Folder') {
	      var currImage = $(this).data(card.dataItemImage);
	      var folderName = $(this).find('.title').text();
	      itemPanel.$itemHeaderIcon.removeAttr('class');
	      itemPanel.$itemHeaderIcon.addClass('zmdi zmdi-folder md-text-amber');
	      itemPanel.$itemHeaderTitle.text(folderName);
	      itemPanel.$itemImage.empty();
	      itemPanel.$itemImage.append('<i class="zmdi zmdi-folder md-text-amber"></i>');
	    } else if ($(this).data(card.dataItemType) == 'Image') {
	      var _currImage = $(this).data(card.dataItemImage);
	      var fileNameIndex = _currImage.lastIndexOf("/") + 1;
	      var filename = _currImage.substr(fileNameIndex);
	      itemPanel.$itemHeaderIcon.removeAttr('class');
	      itemPanel.$itemHeaderIcon.addClass('zmdi zmdi-image mw-blue-text ');
	      itemPanel.$itemHeaderTitle.text(filename);
	      itemPanel.$itemImage.empty();
	      itemPanel.$itemImage.append('<img src="' + _currImage + '" />');
	    }
	    if ($(this).data(card.dataItemOffline) == true) {
	      itemPanel.$toggleOffline.attr('Checked', 'Checked');
	    } else {
	      itemPanel.$toggleOffline.removeAttr('Checked');
	    };
	  });
	  itemPanel.$showAllFiles.on('click', function (event) {
	    event.stopPropagation();
	    var $card = $(this).parents('.card'),
	        $fileActivity = $card.find('.file-activity');
	    $fileActivity.toggleClass('show-all');
	  });
	};
	exports.selectedItem = selectedItem;

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map