// /********************* Smoth scrolling ************************/
// (function ($) {
//   "use strict";
//   $(function () {
//     $('a[href*="#"]:not([href="#"])').click(function () {
//       if (
//         location.pathname.replace(/^\//, "") ==
//           this.pathname.replace(/^\//, "") &&
//         location.hostname == this.hostname
//       ) {
//         var target = $(this.hash);
//         target = target.length
//           ? target
//           : $("[name=" + this.hash.slice(1) + "]");
//         if (target.length) {
//           $("html, body").animate(
//             {
//               scrollTop: target.offset().top
//             },
//             1000
//           );
//           return false;
//         }
//       }
//     });
//   });
// })(jQuery);


$(document).ready(function() {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    margin: 10,
    nav: true,
    dots : false,
    loop: true,
    rewind : true,
    responsive: {
      0: {
        items: 2
      },
      
      600: {
        items: 4
      },
      900:{
        items: 4
      },
      1000: {
        items: 6
      }
    },
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>"
  ], 
  });

});

/******************* specialists ***********************/

$('#specialists').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplayTimeout:2500,
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        900:{
          items:3
        },
        1000:{
            items:4
        }
    },
     navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ], 
});


/******************* Top Doctor ***********************/

$('#doctor').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplayTimeout:2500,
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        900:{
          items:3
        },
        1000:{
            items:4
        }
    },
     navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ], 
});

/******************* Testimonial ***********************/

$('#testomonial').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    autoplayTimeout:2500,
    autoplay:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:2
        }
    },
     navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ], 
});

/************* Back to Top Button***************/

$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});

/************* Show More Show Less***************/

$(function () {
    function trimText(selector, limit) {    
        var text = selector.text(),
            trim;

        selector.each(function() {
            if ($(this).text().length > limit) {
                trim = $(this).text().substr(0, limit);

                $(this).text(trim);
                $(this).append('<span class="expand">Read More');
            };
        });

        $(selector).on("click",".expand", function() { //future element
            $(this).parent().text(text).append('<span class="collapse">Read Less');
        });

        $(selector).on("click", ".collapse",function() { //future element
            $(this).parent().text(trim).append('<span class="expand">Read More');
        });

    };


    trimText($(".one"),   300);

})


/************* logn Sign Slide Page ***************/


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const outer = document.getElementById('outer');

signUpButton.addEventListener('click', () => {
	outer.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	outer.classList.remove("right-panel-active");
});

