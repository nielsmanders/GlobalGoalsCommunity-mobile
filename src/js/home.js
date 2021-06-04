$(document).ready(function () {

    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      }
    })

    // Search input
    $("#search-form").on("submit", function(e) {
      e.preventDefault();
      
      var searchString = $("#search-input").val();
      location.href = "/search/?search=" + searchString + "&sort=&filter=&sdgs=";
    });

});