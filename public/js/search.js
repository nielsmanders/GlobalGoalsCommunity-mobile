/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),

/***/ 17:
/***/ (function(module, exports) {

$(document).ready(function () {

    // Search
    $("#search-form").on("submit", function (e) {
        e.preventDefault();

        var searchString = $("#search-input").val();
        var url = location.href;

        if (location.href.toLowerCase().indexOf("?search=") < 0) {
            url += "?search=&sort=&filter=&sdgs=";
        }

        var oldSearch = url.substring(url.lastIndexOf('?search=') + 8, url.lastIndexOf('&sort='));

        if (searchString.length > 0) {
            if (oldSearch.length > 0) {
                location.href = url.replace(oldSearch, searchString);
            } else {
                location.href = url.replace('?search=', '?search=' + searchString);
            }
        }
    });

    // Delete search
    $('.delete-search').on("click", function () {
        var url = location.href;
        var oldSearch = url.substring(url.lastIndexOf('?search=') + 8, url.lastIndexOf('&sort='));

        location.href = url.replace(oldSearch, '');
    });

    // Sort
    $("#sort").on("change", function () {
        var sortString = $(this).val();
        var url = location.href;

        if (location.href.toLowerCase().indexOf("&sort=") < 0) {
            url += "?search=&sort=&filter=&sdgs=";
        }

        var oldSort = url.substring(url.lastIndexOf('&sort=') + 6, url.lastIndexOf('&filter='));

        if (oldSort !== sortString) {
            if (oldSort.length > 0) {
                location.href = url.replace(oldSort, sortString);
            } else {
                location.href = url.replace('&sort=', '&sort=' + sortString);
            }
        }
    });

    // Type Filter
    $(".type-filter").on("change", function (e) {
        if ($(this).prop("checked")) {
            // If filter is checked
            var filterString = $(this).val();
            var url = location.href;

            if (location.href.toLowerCase().indexOf("&filter=") < 0) {
                url += "?search=&sort=&filter=&sdgs=";
            }

            var oldFilter = url.substring(url.indexOf('&filter=') + 8, url.lastIndexOf('&sdgs='));

            if (oldFilter.length > 0) {
                if (oldFilter.indexOf(filterString) < 0) {
                    newFilter = oldFilter + "%2B" + filterString;
                    location.href = url.replace(oldFilter, newFilter);
                }
            } else {
                newFilter = oldFilter + filterString;
                location.href = url.replace('&filter=', '&filter=' + newFilter);
            }
        } else {
            $(this).prop("checked", true);
            e.preventDefault();
        }
    });

    // Sdg filter
    $(".sdg-filter-item").on("change", function (e) {
        if ($(this).prop("checked")) {
            // If filter is checked
            var sdgId = $(this).val();
            var url = location.href;

            if (location.href.toLowerCase().indexOf("&sdgs=") < 0) {
                url += "?search=&sort=&filter=&sdgs=";
            }

            var oldFilter = url.substring(url.indexOf('&sdgs=') + 6);

            if (oldFilter.length > 0) {
                if (oldFilter.indexOf(sdgId) < 0) {
                    newFilter = oldFilter + "%2B" + sdgId;
                    location.href = url.replace(oldFilter, newFilter);
                }
            } else {
                newFilter = oldFilter + sdgId;
                location.href = url.replace('&sdgs=', '&sdgs=' + newFilter);
            }
        } else {
            $(this).prop("checked", true);
            e.preventDefault();
        }
    });

    // Delete single filter
    $(".delete-filter").on("click", function () {
        var url = location.href;
        var type = $(this).data("filter-type");

        if (type == "type") {
            var filterString = $(this).data("filter");
            var oldFilter = url.substring(url.indexOf('&filter=') + 8, url.lastIndexOf('&sdgs='));

            if (oldFilter.endsWith(filterString)) {
                location.href = url.replace(filterString, "");
            } else {
                location.href = url.replace(filterString + "%2B", "");
            }
        } else if (type == "sdg") {
            var filterString = $(this).data("filter");
            var oldFilter = url.substring(url.indexOf('&sdgs=') + 6);

            if (oldFilter.endsWith(filterString)) {
                location.href = url.replace(filterString, "");
            } else {
                location.href = url.replace(filterString + "%2B", "");
            }
        }
    });

    // Delete all filters
    $(".delete-filters").on("click", function () {
        var url = location.href;
        var oldFilter = url.substring(url.indexOf('&filter='));
        location.href = url.replace(oldFilter, "&filter=&sdgs=");
    });
});

/***/ })

/******/ });