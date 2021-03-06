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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

$(document).ready(function () {

    $(".user-profile-image").on("click", function () {
        $(".user-profile-image-container").css("display", "flex");
    });

    $(".user-profile-image-container").on("click", function () {
        $(".user-profile-image-container").css("display", "none");
    });

    // Follow / unfollow user
    $(".follow-user").on("click", function () {
        var button = $(this);
        var user_id = button.data("user-id");
        var user_name = button.data("user-name");

        if (button.hasClass("followed")) {
            // Send ajax request to unfollow user
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "unfollowUser",
                    user_id: user_id
                }
            }).done(function (data, textStatus, jqXHR) {
                button.removeClass("followed").toggleClass("btn-orange btn-primary ").html("<i class='fas fa-user-plus mr-10'></i> Volg " + user_name);
                $('.follower-count').html(data);
            }).fail(function (data) {
                alert("Something went wrong...");
            });
        } else {
            // Send ajax request to follow user
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "followUser",
                    user_id: user_id
                }
            }).done(function (data, textStatus, jqXHR) {
                button.addClass("followed").toggleClass("btn-primary btn-orange").html("<i class='fas fa-user-check mr-10'></i> Ontvolg " + user_name);
                $('.follower-count').html(data);
            }).fail(function (data) {
                alert("Something went wrong...");
            });
        }
    });

    // Unfollow user from profile page
    $(".user-follow-check").on("click", function () {
        var button = $(this);
        var user_id = button.data("user-id");

        $.ajax({
            url: "includes/ajax.inc.php",
            method: "POST",
            async: false,
            dataType: "json",
            data: {
                action: "unfollowUserProfile",
                user_id: user_id
            }
        }).done(function (data, textStatus, jqXHR) {
            if (data == 1) {
                $(".follower-count").html(data + " persoon die ik volg");
            } else {
                $(".follower-count").html(data + " personen die ik volg");
            }
            button.closest(".user-item").remove();
        });
    });
});

/***/ })

/******/ });