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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ }),

/***/ 21:
/***/ (function(module, exports) {

$(document).ready(function () {

    // Remove error class on keydown
    $("#register-form :input").on("keydown", function () {
        if ($(this).attr('name') !== "passwordRepeat") {
            $(this).removeClass("error");
        }
    });

    // Remove error class on terms checkbox
    $("#acceptTerms").on("change", function () {
        if (this.checked) {
            $(this).parent().removeClass("error");
        }
    });

    // Check password and repeated password
    $("#passwordRepeat").on("keyup", function () {
        var password = $("#password").val();
        var passwordRepeat = $("#passwordRepeat").val();

        if (password) {
            if (password !== passwordRepeat) {
                if (!$(this).hasClass("error")) {
                    $(this).addClass("error");
                }
            } else {
                if ($(this).hasClass("error")) {
                    $(this).removeClass("error");
                }
            }
        }
    });

    // Check register form
    $('#register-form').on("submit", function (e) {
        e.preventDefault();

        var values = $(this).serializeArray();
        var emptyValues = [];

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if (!el.value) {
                emptyValues.push(el.name);
            }
        });

        // If empty values show error
        if (emptyValues.length > 0) {
            $.each(emptyValues, function (index, el) {
                $("#" + el).addClass("error");
            });
        } else {
            var password = values.find(function (x) {
                return x.name === "password";
            }).value;
            var passwordRepeat = values.find(function (x) {
                return x.name === "passwordRepeat";
            }).value;

            // Check if password is the same as repeated password
            if (password !== passwordRepeat) {
                $("#passwordRepeat").addClass("error");
            } else {
                // Check if terms are accepted
                var acceptTerms = values.find(function (x) {
                    return x.name === "acceptTerms";
                });

                if (acceptTerms) {
                    // Check if user wants to receive a newsletter
                    var newsletter = values.find(function (x) {
                        return x.name === "newsletter";
                    });
                    if (newsletter) {
                        newsletter = 1;
                    } else {
                        newsletter = 0;
                    }

                    // Send ajax request to create a new user
                    $.ajax({
                        url: "includes/ajax.inc.php",
                        method: "POST",
                        async: false,
                        dataType: "json",
                        data: {
                            action: "register",
                            firstname: values.find(function (x) {
                                return x.name === "firstname";
                            }).value,
                            lastname: values.find(function (x) {
                                return x.name === "lastname";
                            }).value,
                            email: values.find(function (x) {
                                return x.name === "email";
                            }).value,
                            password: values.find(function (x) {
                                return x.name === "password";
                            }).value,
                            newsletter: newsletter
                        }
                    }).done(function (data, textStatus, jqXHR) {
                        if (data === 1) {
                            location.href = "/register/success/";
                        } else {
                            console.log(data);
                        }
                    }).fail(function (data) {
                        console.log(data);
                    });
                } else {
                    $("#acceptTerms").parent().addClass("error");
                }
            }
        }
    });
});

/***/ })

/******/ });