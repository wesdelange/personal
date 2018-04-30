
$(document).ready(function(){
  $('.cycling').slick({
    autoplay: true,
    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 20,
  });
  $('.camping').slick({
    autoplay: true,
    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 7,
  });  
  $('.fishing').slick({
    autoplay: true,
    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 11,
  });
});
