$(function() {

new WOW().init();

//---
  var breakpoint = window.matchMedia( '(min-width: 767px)' );
  var partnerSlider;

  var breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( partnerSlider !== undefined ) {
          $('.magazine').removeClass('swiper-container');
          $('.magazine-card').unwrap('.swiper-wrapper');
          $('.magazine-card').removeClass('swiper-slide');
          $('.magazine .swiper-pagination').remove();
          partnerSlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  var enableSwiper = function() {

    $('.magazine').addClass('swiper-container');
    if (! $('.magazine .swiper-wrapper').length ) {
      $('.magazine-card').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.magazine-card').addClass('swiper-slide');
    $('.magazine').append('<div class="swiper-pagination"></div>');

    partnerSlider = new Swiper ('.magazine', {
      slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 35,
      
      // slidesPerColumn: 5
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
      width: 340,
      // slidesPerColumn: 5
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 15,
      width: 500,
      // slidesPerColumn: 5
    },
   
  },

      
    });
  }

 
  breakpoint.addListener(breakpointChecker);

  breakpointChecker();





//---///slider logo





  var id, top;
    $(window).scroll(function() {
        id = $(".gallery-wrap");

        if ( id.length != 0 ) {

            top = id.offset().top;

            if ( $(this).scrollTop() >= (top - 400) ) {

                function e(i, e) {
                    for (var t, a = e - i + 1, n = [], s = []; a--;)
                        n.push(a + i);
                    for (; n.length;)
                        t = Math.round(Math.random() * (n.length - 1)),
                            s.push(n[t]),
                            n.splice(t, 1);
                    return s;
                }

                var items = $(".gallery-wrap div").length,
                    a = 0, n = e(0, items),
                    s = setInterval(function () {
                         var i = $(".gallery-wrap div").eq(n[a]);
                        i.find("img").css({visibility: "visible", opacity: 1}),
                            a++, a > items && clearInterval(s)
                    }, 80);
            }

        }

    });

    function randomCardEffect() {
       function e(i, e) {
          for (var t, a = e - i + 1, n = [], s = []; a--;)
              n.push(a + i);
          for (; n.length;)
              t = Math.round(Math.random() * (n.length - 1)),
                  s.push(n[t]),
                  n.splice(t, 1);
          return s;
      }
      var items = $(".gallery-wrap div").length,
        a = 0, n = e(0, items);
        // s = setInterval(function () {
            var i = $(".gallery-wrap div").eq(n[a]);
            i.find("img").css({transform: "rotateY(360deg)"}),
                a++;// a > items && clearInterval(s)
        // }, 70);

    }

    setInterval(function(){
      randomCardEffect();
    }, 2000);


//------------------------------гамбургер-----------------------------
$('.hamburger').click(function() {
  $(this).toggleClass('hamburger-active');
  $('nav').toggleClass('nav-active');
  $('header').toggleClass('header-menu');
});

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------

  $('input[type=tel]').focus(function(){
      if( $(this).val() == '' ) {
        $(this).val('+7 (');
      }
    });

    $('input[type=tel]').focusout(function(){
      if( $(this).val() == '+7 (' ) {
        $(this).val('');
      }
  });
    
	$('input[type="tel"]').mask('+0 (000) 000-00-00');

	jQuery.validator.addMethod("phoneno", function(phone_number, element) {
	   return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
	}, "Введите Ваш телефон");

  jQuery.validator.addMethod("emailno", function(email_number, element) {
     return this.optional(element) || email_number.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }, "Неправильный формат E-mail");


  $(".order-two-form").validate({
    messages: {
      name: "Введите ФИО",
      phone: "Введите Телефон",
      email: "Введите ваш email",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      },
      "email": {
        required: true,
        emailno: true
      }
    },

    submitHandler: function(form) {
      var t = {
        name: jQuery(".order-two-form").find("input[name=name]").val(),
        phone: jQuery(".order-two-form").find("input[name=phone]").val(),
        email: jQuery(".order-two-form").find("input[name=email]").val(),
        selector: jQuery(".order-two-form").find("select[name=selector]").val(),
        сompany: jQuery(".order-two-form").find("input[name=сompany]").val(),
        organisetion: jQuery(".order-two-form").find("input[name=organisetion]").val(),
        position: jQuery(".order-two-form").find("input[name=position]").val(),
        question: jQuery(".order-two-form").find("textarea[name=question]").val(),
        subject: jQuery(".order-two-form").find("input[name=subject]").val()
      };
      ajaxSend('.order-two-form', t);
    }
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "wp-content/themes/moonberry/sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
 // var height = $('.header').innerHeight();
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
         // $('body').css('padding-top', height);
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
      //    $('body').css('padding-top', 0);
          $('.header').removeClass('header-active');
      }
  });

});




//----------------------------------------preloader----------------------------------

$(window).on('load', function(){
  $('.preloader').delay(1000).fadeOut('slow');
});




var docsSwiper = new Swiper('.bottle', {
    slidesPerView: 1,
    effect: 'vertical',
    navigation: {
      nextEl: '.bottle-next',
      prevEl: '.bottle-prev',
  },
  });


var docsSwiper = new Swiper('.phone-slider', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


$('.services__card').hide();
$('.services__card:first').show();
$('.tabs ul a:first').addClass('active');

$('.tabs ul a').click(function(event){
  event.preventDefault();
  $('.tabs ul a').removeClass('active');
  $(this).addClass('active');
  $('.services__card').hide();

  var selectTab = $(this).attr('href');
  $(selectTab).fadeIn();
});



///-------------- close hamburger and  yakor speed
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $(".hamburger").removeClass("hamburger-active");
        $(".nav").removeClass("nav-active");
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 1000, function() {
        });
      }
    }
  });




