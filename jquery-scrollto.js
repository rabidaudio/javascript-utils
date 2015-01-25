(function($){
  $.fn.scrollTo = function(maxTime, callback){
    if(typeof maxTime === "function"){
      callback = maxTime;
      maxTime = 2000;
    }else if(!maxTime){
      maxTime = 2000;
    }
    if(!callback){
      callback = new Function();
    }
    
    var dest_pos = $(this).offset().top;
    var distance = dest_pos - $(document).scrollTop();//down is positive
    var done = false;
    $('body,html').animate({ scrollTop: dest_pos }, Math.min(maxTime, Math.abs(distance)), function(){
      if(!done){
        done = true;
        callback.call(this);
      }
    });
  };
})(jQuery);
