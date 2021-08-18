(function () {
  "use strict"; // Start of use strict

  // AOS.init();
  const splash = document.querySelector(".splash");
  document.addEventListener("DOMContentLoaded", (e) => {
    setTimeout(() => {
      console.log("kjhvgk")
      splash.classList.add("hide")
    }, 5000);
  })

  let labels = ['Home', 'About', 'Projects', 'Contact'];
  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination-1',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (labels[index]) + '</span>';
      },
    },


  });
  let swiper2 = new Swiper(".mySwiper2", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
    },
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
})(); // End of use strict

function csrf(){
  // using jQuery
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });
}

// CONTACT PAGE
$("#contactForm").submit((e) => {
  e.preventDefault()
  var data = $("#contactForm").serialize()
  // if (data) {
  //     console.log(data.normalize())
  // }
  $("#contactBtn").text("Loading...")
  csrf();
  $.ajax({
    type: "POST",
    url: "/contact/",
    data: data,
    dataType: "json",
    success: (response) => {
      // alert(response.message)
      swal("Great!", response.message, "success");
      $("input, textarea").val("")
      $("#contactBtn").text("Submit")
    },
    error: e => {
      // alert("Oops something went wrong, please make sure you fill the form correctly")
      swal({
        title: "Oops!",
        text: "Something went wrong, please ensure you filled the form correctly.",
        icon: "error",
        // button: "Ok",
      });
      $("#contactBtn").text("Submit")
    }
  });
})