jQuery(document).ready(function ($) {
  if (!$('body').hasClass('homepage')) {
    $('link.homepage-only').remove();
  }
  //smooth scroll
  $("a.page-scroll").bind("click", function (event) {
    var $anchor = $(this);
    var topSpacer = 60;

    if ($(".menu-cat-tab").length === 1) {
      if ($(window).width() < 1201) {
        var headerHeight = $(".header").height();
        var menuBarHeight = $(".menu-cat-tab-list").height();
        if (menuBarHeight == null) {
          menuBarHeight = 0;
        }
        topSpacer = headerHeight + menuBarHeight;
        console.log(headerHeight);
        console.log(menuBarHeight);
      }
    }

    if ($(".order").length === 1) {
      topSpacer = 90;
    }

    $("html, body")
      .stop()
      .animate({
          scrollTop: $($anchor.attr("href")).offset().top - topSpacer,
        },
        1500,
        "easeInOutExpo"
      );

    event.preventDefault();
  });

  //carousel init
  $("#carousel1").carousel({
    interval: 12000,
    pause: "false",
  });

  //limit characters
  $("p").each(function () {
    "use strict";
    var maxLength = parseInt($(this).attr("data-maxlength"));
    var txt = $(this).text();
    if (txt.length > maxLength)
      $(this).text(txt.substring(0, maxLength) + ".....");
  });

  sideMenuManage();

  $(window).on("resize", function () {
    sideMenuManage();
  });

  $(window).scroll(function () {
    sideMenuManage();
  });

  window.setInterval(function () {
    sideMenuManage();
  }, 2000);

  // padding to body according to header height
  // bodyPaddingForHeader();

  // $(window).on('resize', function () {
  //   bodyPaddingForHeader();
  // });

  // $(window).scroll(function () {
  //   bodyPaddingForHeader();
  // });

  // $("#modalCourse").on("show", function () {
  //   console.log('rararar')
  // }).on("hidden", function () {
  //   console.log('tatatat')
  // });

  $('.select-js-trigger').select2({
    minimumResultsForSearch: -1
  });

  $('#shortlistDate').datepicker({
    dateFormat: "d MM, yy",
    changeMonth: true,
    changeYear: true,
    minDate: 1,
    setDate: new Date(),
    showButtonPanel: true
  });
  $('#checkinDate,#checkoutDate').datepicker({
    // dateFormat: "d MM, yy",
    changeMonth: true,
    changeYear: true,
    minDate: 1,
    setDate: new Date(),
    showButtonPanel: true
  });

  $("#shortlistBtn").click(function (event) {
    event.preventDefault();
    var location = $('#shortlistLoc').val();
    var date = $('#shortlistDate').val();
    var number = $('#shortlistPeople').val();

    if (!location || !date || !number) {
      return;
    }

    $('.shortlist-form-summary').addClass('active');
    $('.shortlist-form-summary-data-text').html(`${location}, ${date}, ${number}`)
  });

  $('.homeenq-form-box-location-btn').click(function () {
    var locationBox = $(this).prev('.homeenq-form-box-location-item').clone();
    locationBox.find('.select2').remove();
    locationBox.find('.select2-hidden-accessible').removeClass('select2-hidden-accessible');

    $(this).parent().prepend(locationBox);
    $('.select-js-trigger').select2({
      minimumResultsForSearch: -1
    });
  });

  if ($('.primary-guest-box')[0]) {
    var boxDiv = $('.primary-guest-box');
    boxDiv.remove();

    $('#primaryGuestToggle').prop('checked', false);

    $('#primaryGuestToggle').click(function () {
      if ($(this).is(':checked')) {
        $(this).parent().after(boxDiv);
      } else {
        boxDiv.remove();
      }
    })

  }

  $(".locationchoice-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ],
    infinite: true,
    arrows: true,
    dots: true,
    customPaging: function (slider, i) {
      var thumb = jQuery(slider.$slides[i]).data();
      return '<a>' + (i + 1) + '</a>';
    },
    autoplay: true,
    autoplaySpeed: 7000,
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"> <g id="Group_962" data-name="Group 962" transform="translate(1211 3413) rotate(180)"> <g id="Path_789" data-name="Path 789" transform="translate(1167 3369)" fill="none"> <path d="M22,0A22,22,0,1,1,0,22,22,22,0,0,1,22,0Z" stroke="none"/> <path d="M 22 1.5 C 19.23185920715332 1.5 16.54730987548828 2.04180908203125 14.02092933654785 3.110378265380859 C 11.57999038696289 4.142810821533203 9.387481689453125 5.621139526367188 7.504310607910156 7.504310607910156 C 5.621139526367188 9.387481689453125 4.142810821533203 11.57999038696289 3.110378265380859 14.02092933654785 C 2.04180908203125 16.54730987548828 1.5 19.23185920715332 1.5 22 C 1.5 24.76814079284668 2.04180908203125 27.45269012451172 3.110378265380859 29.97906112670898 C 4.142810821533203 32.42000961303711 5.621139526367188 34.61251831054688 7.504310607910156 36.49568939208984 C 9.387481689453125 38.37886047363281 11.57999038696289 39.8571891784668 14.02092933654785 40.88962173461914 C 16.54730987548828 41.95819091796875 19.23185920715332 42.5 22 42.5 C 24.76814079284668 42.5 27.45269012451172 41.95819091796875 29.97906112670898 40.88962173461914 C 32.42000961303711 39.8571891784668 34.61251831054688 38.37886047363281 36.49568939208984 36.49568939208984 C 38.37886047363281 34.61251831054688 39.8571891784668 32.42000961303711 40.88962173461914 29.97906112670898 C 41.95819091796875 27.45269012451172 42.5 24.76814079284668 42.5 22 C 42.5 19.23185920715332 41.95819091796875 16.54730987548828 40.88962173461914 14.02092933654785 C 39.8571891784668 11.57999038696289 38.37886047363281 9.387481689453125 36.49568939208984 7.504310607910156 C 34.61251831054688 5.621139526367188 32.42000961303711 4.142810821533203 29.97906112670898 3.110378265380859 C 27.45269012451172 2.04180908203125 24.76814079284668 1.5 22 1.5 M 22 0 C 34.15026092529297 0 44 9.8497314453125 44 22 C 44 34.15026092529297 34.15026092529297 44 22 44 C 9.8497314453125 44 0 34.15026092529297 0 22 C 0 9.8497314453125 9.8497314453125 0 22 0 Z" stroke="none" fill="#fd4f31"/> </g> <path id="Path_788" data-name="Path 788" d="M472.608,676l-8.117,8.308L456.375,676" transform="translate(509.878 3854.643) rotate(-90)" fill="none" stroke="#fd4f31" stroke-width="1.5"/> </g></svg></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"> <g id="Group_961" data-name="Group 961" transform="translate(-1167 -3369)"> <g id="Path_789" data-name="Path 789" transform="translate(1167 3369)" fill="none"> <path d="M22,0A22,22,0,1,1,0,22,22,22,0,0,1,22,0Z" stroke="none"/> <path d="M 22 1.5 C 19.23185920715332 1.5 16.54730987548828 2.04180908203125 14.02092933654785 3.110378265380859 C 11.57999038696289 4.142810821533203 9.387481689453125 5.621139526367188 7.504310607910156 7.504310607910156 C 5.621139526367188 9.387481689453125 4.142810821533203 11.57999038696289 3.110378265380859 14.02092933654785 C 2.04180908203125 16.54730987548828 1.5 19.23185920715332 1.5 22 C 1.5 24.76814079284668 2.04180908203125 27.45269012451172 3.110378265380859 29.97906112670898 C 4.142810821533203 32.42000961303711 5.621139526367188 34.61251831054688 7.504310607910156 36.49568939208984 C 9.387481689453125 38.37886047363281 11.57999038696289 39.8571891784668 14.02092933654785 40.88962173461914 C 16.54730987548828 41.95819091796875 19.23185920715332 42.5 22 42.5 C 24.76814079284668 42.5 27.45269012451172 41.95819091796875 29.97906112670898 40.88962173461914 C 32.42000961303711 39.8571891784668 34.61251831054688 38.37886047363281 36.49568939208984 36.49568939208984 C 38.37886047363281 34.61251831054688 39.8571891784668 32.42000961303711 40.88962173461914 29.97906112670898 C 41.95819091796875 27.45269012451172 42.5 24.76814079284668 42.5 22 C 42.5 19.23185920715332 41.95819091796875 16.54730987548828 40.88962173461914 14.02092933654785 C 39.8571891784668 11.57999038696289 38.37886047363281 9.387481689453125 36.49568939208984 7.504310607910156 C 34.61251831054688 5.621139526367188 32.42000961303711 4.142810821533203 29.97906112670898 3.110378265380859 C 27.45269012451172 2.04180908203125 24.76814079284668 1.5 22 1.5 M 22 0 C 34.15026092529297 0 44 9.8497314453125 44 22 C 44 34.15026092529297 34.15026092529297 44 22 44 C 9.8497314453125 44 0 34.15026092529297 0 22 C 0 9.8497314453125 9.8497314453125 0 22 0 Z" stroke="none" fill="#fd4f31"/> </g> <path id="Path_788" data-name="Path 788" d="M472.608,676l-8.117,8.308L456.375,676" transform="translate(509.878 3854.643) rotate(-90)" fill="none" stroke="#fd4f31" stroke-width="1.5"/> </g></svg></button>',

  });

  $('.aptlisting-card-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="31.609" height="31.609" viewBox="0 0 31.609 31.609"> <g id="Group_228" data-name="Group 228" transform="translate(0.5 0.5)"> <circle id="Ellipse_27" data-name="Ellipse 27" cx="15.305" cy="15.305" r="15.305" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="1"/> <path id="Path_160" data-name="Path 160" d="M67.983,489.392,61.9,483.306l6.086-6.086" transform="translate(-50.678 -468.001)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="1"/> </g></svg></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="31.609" height="31.609" viewBox="0 0 31.609 31.609"> <g id="Group_227" data-name="Group 227" transform="translate(0.5 0.5)"> <circle id="Ellipse_26" data-name="Ellipse 26" cx="15.305" cy="15.305" r="15.305" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="1"/> <path id="Path_159" data-name="Path 159" d="M565.777,477.22l6.086,6.086-6.086,6.086" transform="translate(-552.473 -468.001)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="1"/> </g></svg></button>',
  })

  // sticky init
  $(".sticky-div").stick_in_parent({
    // offset_top: 100,
    // offset_bottom: 100
  });

  $('.locationchoice').each(function () {
    var sliderDiv = $(this).find('.locationchoice-slider');
    var maximumSlides = $(this).find('.slick-dots').children('li').length;
    $(this).find('.locationchoice-slider-num').html('1 / ' + maximumSlides);

    console.log(maximumSlides);
    console.log(sliderDiv);
  })


  $('.locationchoice-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    $('.locationchoice').each(function () {
      var maximumSlides = $(this).find('.slick-dots').children('li').length;
      var presentSlide = $(this).find('.slick-dots li.slick-active').html();
      $(this).find('.slick-dots').hide();

      $(this).find('.locationchoice-slider-num').html(presentSlide + ' / ' + maximumSlides);
    });
  });

  $(".side-menu-toggle,.side-menu-bg").click(function () {
    $(".nav-toggle").toggleClass("open");
    $("#menu").toggleClass("active");

    if ($("#menu").hasClass("active")) {
      $("html").addClass("overflowYStop");
      $(".side-menu-bg").addClass("active").animate({
          opacity: 1,
        },
        400
      );
    } else {
      $("html").removeClass("overflowYStop");
      $("#menu").removeClass("active");
    }
  });

  //dropdown toggle
  $(".has-submenu").click(function () {
    "use strict";
    var $this = $(this);
    var menu = $(this).children("ul");

    $this.toggleClass("open");
  });

  $(".carousel-overlay-title .heading-fancy").addClass(
    "animate__animated animate__fadeInDown"
  );
  $(".carousel-overlay-cont>*").addClass("animate__animated animate__fadeInUp");

  //changing img to wrapped div's background
  imgToBg();

  //if clicked outside container remove said class
  containerOutClock(".has-submenu", "open");

  function sideMenuManage() {
    if ($(window).width() < 577) {
      var headerHeight = $(".header").height();
      var windowHeight = $(window).innerHeight();
      var sideMenuHeight = windowHeight - headerHeight;

      $(".side-menu").css({
        top: headerHeight,
        height: sideMenuHeight,
      });
    } else {
      $(".side-menu").css({
        top: "inherit",
        height: "100vh",
      });
    }
  }

  function bodyPaddingForHeader() {
    var headerHeight = $(".header").outerHeight();

    if ($(window).width() < 992) {
      $("body").css({
        "padding-top": headerHeight,
      });
    } else {
      $("body").css({
        "padding-top": "inherit",
      });
    }
  }

  // if the target of the click isn't the container nor a descendant of the container
  function containerOutClock(target, toAddClass) {
    $(document).mouseup(function (e) {
      var container = $(target);

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(target).removeClass(toAddClass);
      }
    });
  }

  //setting overlay outer height
  $(document).ready(overlayHeight);
  $(window).resize(overlayHeight);

  function overlayHeight() {
    $(".square").each(function () {
      "use strict";
      var $this = $(this);
      var widthValue = $this.width();
      $this.css("height", widthValue);
    });
  }

  //copy img to background
  function imgToBg() {
    "use strict";
    var $classForBg = $(".imgtobg-img");
    $classForBg.addClass("imgtobg");
    $(".imgtobg").each(function () {
      "use strict";
      var $this = $(this);
      var thissrc = $(this).attr("src");
      $this.wrap(
        '<div class="imgtobg-o" style="background-image:url(' +
        thissrc +
        ')"></div>'
      );
      $this.hide();
    });

    var $classForBgSm = $(".imgtobg-img-sm");
    $classForBgSm.addClass("imgtobg-sm");
    $(".imgtobg-sm").each(function () {
      "use strict";
      var $this = $(this);
      var thissrc = $(this).attr("src");
      $this.wrap(
        '<div class="imgtobg-o-sm app-xs" style="background-image:url(' +
        thissrc +
        ')"></div>'
      );
      $this.hide();
    });
  }

  function equalHeightFixer(targetClass) {
    // Select and loop the container element of the elements you want to equalise
    var highestBox = 0;

    $(targetClass).each(function () {
      if ($(this).height() > highestBox) {
        highestBox = $(this).outerHeight();
      }
    });
    console.log(highestBox);
    $(targetClass).css({
      "min-height": highestBox,
    });
  }

  function scrollDestination() {
    var $section = $("#counter");
    $(document).bind("scroll", function () {
      var scrollOffset = $(document).scrollTop();
      var containerOffset = $section.offset().top - window.innerHeight;
      if (scrollOffset > containerOffset) {
        console.log("reached counter div");
        setTimeout(function () {
          move1();
        }, 500);
        // unbind event not to load scrolsl again
        $(document).unbind("scroll");
      }
    });
  }

  $('.scroll-line').each(function () {
    var $section = $(this);
    $(document).bind("scroll", function () {
      var scrollOffset = $(document).scrollTop();
      var containerOffset = $section.offset().top - window.innerHeight;
      if (scrollOffset > containerOffset) {
        setTimeout(function () {
          $section.addClass('scrolled');
        }, 300);
        // $(document).unbind("scroll");
      }
    });
  });

  $('#shortlistPeople').focusin(function () {
    var fieldVal = parseInt($(this).val().replace(/[^0-9\.]+/g, ""));
    if (!fieldVal || isNaN(fieldVal)) {
      $(this).val('');
    } else {
      $(this).val(fieldVal);
    }
  });

  $('#shortlistPeople').focusout(function () {
    var maxVal = parseInt($(this).attr('max'));
    var fieldVal = parseInt($(this).val().replace(/[^0-9\.]+/g, ""));

    if (!maxVal) {
      maxVal = 100;
    }

    if (!fieldVal || isNaN(fieldVal)) {
      console.log('Field Value ' + fieldVal);
      $(this).val('1 Person');
      return;
    }

    if (fieldVal === 1) {
      $(this).val('1 Person');
    } else if (fieldVal > maxVal) {
      $(this).val(maxVal + ' People');
      alert('Max Value for number of people is ' + maxVal);
    } else {
      $(this).val(fieldVal + ' People');
    }

  });

  $('.fav-btn').click(function () {
    $(this).toggleClass('active')
  })

  $('.scroll-down').click(function () {
    var destination = $(this).parents('.section').next('.section');

    $("html, body").stop().animate({
      scrollTop: destination.offset().top,
    }, 500);

    event.preventDefault();
  });

});