$(function() {

  
    // Anchor links
    //
  
    $('body').on('click', '.anchor-link', function(e) {
      e.preventDefault();
      $("html, body").stop().animate({
        scrollTop: Math.round($(this.getAttribute('href')).offset().top) + 'px'
      }, 500);
    });
  
   
  
  });
  