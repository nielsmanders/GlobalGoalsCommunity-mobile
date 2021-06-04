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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

$(document).ready(function () {

    $("#send-email-btn").on("click", function () {
        var creation = $(this).data("id");

        $.fancyConfirm({
            title: "What do you want to say to creator?",
            message: "Please type your message in the textarea below. This email will be sent with a standard template, you can contact the administrator for more information.",
            form: "<form class='form'><div class='input-wrapper'><textarea id='message' name='message' placeholder='Please fill in your message...'></textarea></div></form>",
            okButton: "Check mail",
            noButton: "Cancel",
            callback: function callback(value, e) {
                if (value) {
                    var message = $(e.target).closest('.fc-content').find('#message').val();

                    if (message !== '') {
                        $.ajax({
                            url: "includes/ajax.inc.php",
                            method: "POST",
                            dataType: "json",
                            data: {
                                action: 'reports-email',
                                creation: creation,
                                message: message
                            }
                        }).done(function (response) {
                            $.fancyConfirm({
                                title: "Is this message ok?",
                                message: response["email"],
                                okButton: "Send email",
                                noButton: "Cancel",
                                callback: function callback(value) {
                                    $.ajax({
                                        url: "includes/ajax.inc.php",
                                        method: "POST",
                                        dataType: "json",
                                        data: {
                                            action: 'reports-send-email',
                                            creation: creation,
                                            message: message
                                        }
                                    }).done(function (response) {
                                        setTimeout(function () {
                                            error("Email has been sent!");
                                        }, 500);
                                    }).catch(function (er) {
                                        setTimeout(function () {
                                            error("Something went wrong sending your email, please try again later!");
                                            // error(er.responseText);
                                        }, 500);
                                    });
                                }
                            });
                        }).catch(function (er) {
                            setTimeout(function () {
                                // error("Something went wrong sending your email, please try again later!");
                                error(er.responseText);
                            }, 500);
                        });
                    } else {
                        setTimeout(function () {
                            error("Please fill in a message!");
                        }, 500);
                    }
                }
            }
        });
    });

    function error(message) {
        $.fancyConfirm({
            title: "Something went wrong...",
            message: message,
            okButton: "Ok!",
            noButton: ""
        });
    }
});

/***/ })

/******/ });