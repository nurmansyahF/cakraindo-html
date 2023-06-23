(function () {
  // 'use strict';

  function init() {
    // HEADER
    function mainHeader() {
      var header = jQuery('.header'),
        pos = header.outerHeight();

      var lastScroll = 0;
      jQuery(window).scroll(function () {
        var scroll = jQuery(window).scrollTop();
        if (scroll > 5) {
          header.addClass('fixedtop');
        } else {
          header.removeClass('fixedtop');
        }
        if (scroll > lastScroll) {
          header.removeClass('show-top');
        } else {
          header.addClass('show-top');
        }
        lastScroll = scroll;
      });

      jQuery('.mobile-menu').click(function () {
        var t = $(this);
        jQuery('body').toggleClass('menu-open');
      });


      $(document).on('click', function(event) {
        var target = $(event.target);
        // Menutup sub menu jika mengklik di area kosong
        if (!target.closest('.menu-item.has-sub').length) {
          $('.menu-item.has-sub').removeClass('sub-menu-open');
        }
      });
      $('.menu-item.has-sub').each(function() {
        var w = $(window).width();
        $(this).click(function() {
          var isOpen = $(this).hasClass('sub-menu-open');
          // Menutup sub menu lain sebelum membuka sub menu baru
          $('.menu-item.has-sub').removeClass('sub-menu-open');
          if (!isOpen) {
            $(this).addClass('sub-menu-open');
          }
        });
      });


      $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('.panel-title a')
        .not('.nav-link')
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
              $('html, body').animate({
                scrollTop: target.offset().top - 80
              }, 800, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                  return false;
                } else {
                  // $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                };
              });
            }
          }
        });


    }
    if (jQuery('.header').length > 0) {
      mainHeader();
      jQuery(window).resize(function () {
        setTimeout(function () {
          mainHeader();
        }, 500);
      });
    };
    // end of header


    $('.header .nav .has-sub').hover(function() {
      // Menghapus kelas 'hovered' dari semua elemen header sebelumnya
      $('body').addClass('hovered-submenu');

      // Menambahkan kelas 'hovered' pada header saat mengarahkan kursor pada menu yang memiliki submenu
      $(this).closest('.header').addClass('hovered');
    }, function() {

      $('body').removeClass('hovered-submenu');
      // Menghapus kelas 'hovered' dari header saat kursor tidak lagi mengarah pada menu yang memiliki submenu
      $(this).closest('.header').removeClass('hovered');
    });

    $('.select').each(function () {
      var select = $(this),
        size = (select.data('size') !== undefined) ? select.data('size') : 4;
        select.selectpicker();
      // select.selectpicker({
      //   style: 'select-control',
      //   size: size,
      //   liveSearchPlaceholder: 'Search here..',
      //   width: "100%",
      // });
    });

    func();

  }
  init(); // end of init()


  function func() {
    $('.swiper').each(function(){
      const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    })


    // Countdown
    function startCountdown() {
      var targets = $('.value .value-item .val');
      targets.each(function() {
        var targetValue = $(this).text().trim();
        var originalValue = targetValue;
        if (targetValue.endsWith('+')) {
          targetValue = targetValue.substring(0, targetValue.length - 1);
          $(this).text('0+');
        } else {
          $(this).text('0');
        }
        $(this).prop('Counter', 0).animate({
          Counter: targetValue
        }, {
          duration: 2000,
          easing: 'swing',
          step: function(now) {
            var formattedValue = (originalValue.endsWith('+') && now >= targetValue) ? originalValue : Math.ceil(now).toLocaleString();
            $(this).text(formattedValue);
          }
        });
      });
    }

    // Menjalankan Countdown
    $(window).scroll(function() {
      if($('.value').length > 0){
        var windowHeight = $(window).height();
        var scrollPos = $(window).scrollTop();
        var offsetTop = $('.value').offset().top;

        if (scrollPos + windowHeight > offsetTop && !$('.value .value-item').hasClass('section-visible')) {
          $('.value .value-item').addClass('section-visible');
          // Panggil fungsi yang ingin dijalankan ketika section pertama kali tampil
          startCountdown();
        }
      }
    });

    $('.chatbox').each(function(){
      var t = $(this),
          bc = t.find('.btn-chat');
          wc1 = t.find('.windowchat1'),
          wc1btn = wc1.find('a');
      bc.on('click', function(e){
        wc1.toggleClass('show');
        e.preventDefault;
      });
      wc1btn.each(function(){
        var th = $(this);
        th.on('click', function(){
          $('.windowchat1').toggleClass('show');
          th.parent().siblings().addClass('show');
        });
      })
      $('.windowchat2').each(function(){
        var back = $(this).find('.back');
        back.on('click', function(){
          $(this).parent().removeClass('show');
          $(this).parent().siblings().addClass('show');
        });
      })
    })


  }; // end of func

})(); // end of function()