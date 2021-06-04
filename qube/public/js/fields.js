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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

$(document).ready(function () {

    // Remove errors
    $("#create-field :input, #edit-field :input").on("keydown", function () {
        $(this).removeClass("error");

        if ($(this).closest("form").find(".error").length === 0) {
            $(".error-msg").fadeOut();
        }
    });

    // Remove error from select
    $("#type").on("change", function () {
        $(this).removeClass("error");

        if ($(this).closest("form").find(".error").length === 0) {
            $(".error-msg").fadeOut();
        }
    });

    // Create a new field
    $("#create-field-btn").on("click", function () {
        var form = $("#create-field");

        var values = form.serializeArray();
        var emptyValues = [];

        var formData = new FormData($(form)[0]);
        formData.append("action", "create-field");

        // Check if type is filled in else add to emptyValues
        if (!values.some(function (value) {
            return value.name === "type";
        })) {
            emptyValues.push("type");
        }

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if ($("#" + el.name).hasClass("required")) {
                if (!el.value) {
                    emptyValues.push(el.name);
                }
            }
        });

        // If empty values show error
        if (emptyValues.length > 0) {
            $(".error-msg").html("Please fill in the required fields").fadeIn(1000);

            $.each(emptyValues, function (index, el) {
                $("#" + el).addClass("error");
            });
        } else {
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false
            }).done(function (response) {
                if (!response["success"]) {
                    $(".error-msg").html(response["message"]).fadeIn(1000);
                } else {
                    location.href = "fields/";
                }
            }).catch(function (error) {
                $(".error-msg").html(error.statusText).fadeIn(1000);
            });
        }
    });

    // Edit existing field
    $("#edit-field-btn").on("click", function () {
        var form = $("#edit-field");

        var values = form.serializeArray();
        var emptyValues = [];

        var formData = new FormData($(form)[0]);
        formData.append("action", "edit-field");

        // Check if type is filled in else add to emptyValues
        if (!values.some(function (value) {
            return value.name === "type";
        })) {
            emptyValues.push("type");
        }

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if ($("#" + el.name).hasClass("required")) {
                if (!el.value) {
                    emptyValues.push(el.name);
                }
            }
        });

        // If empty values show error
        if (emptyValues.length > 0) {
            $(".error-msg").html("Please fill in the required fields").fadeIn(1000);

            $.each(emptyValues, function (index, el) {
                $("#" + el).addClass("error");
            });
        } else {
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false
            }).done(function (response) {
                if (!response["success"]) {
                    $(".error-msg").html(response["message"]).fadeIn(1000);
                } else {
                    location.href = "fields/";
                }
            }).catch(function (error) {
                $(".error-msg").html(error.statusText).fadeIn(1000);
            });
        }
    });

    // Delete field
    $(document).on("click", ".delete-field", function () {
        var field_id = $(this).data("id");

        $.fancyConfirm({
            title: "Are you sure you want to delete this field?",
            message: "This action will be executed immediately and can't be reversed!<br>By deleting this field, it will also be deleted from all templates that use this field!",
            okButton: "Delete",
            noButton: "Cancel",
            callback: function callback(value) {
                if (value) {
                    $.ajax({
                        url: "includes/ajax.inc.php",
                        method: "POST",
                        dataType: "json",
                        data: {
                            action: 'delete-field',
                            field_id: field_id
                        }
                    }).done(function () {
                        location.reload();
                    }).catch(function (error) {
                        console.error(error.responseText);
                    });
                }
            }
        });
    });
});

/***/ })

/******/ });