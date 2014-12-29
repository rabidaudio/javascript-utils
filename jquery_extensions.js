(function($){
    $.fn.setCheck = function(bool){$(this).prop('checked', bool);};
    $.fn.check = function(){$(this).setCheck(true);};
    $.fn.uncheck = function(){$(this).setCheck(false);};
    $.fn.toggleCheck = function(){$(this).setCheck(!$(this).is(':checked'));};
    $.fn.reverse = [].reverse;
    //http://www.west-wind.com/WestwindWebToolkit/samples/Ajax/html5andCss3/keycodechecker.aspx
    // also this: https://github.com/danheberden/jquery-key
    $.fn.extend({
        onKeyEnter: function(callback){
            var cb = (typeof callback == 'function') ? callback : new Function(callback);
            this.keypress(function(e){ if( e.keyCode == 13 ) setTimeout(cb,0,e); });
        },
        onKey: function(key, callback){ //TODO normalize keydown/keyup and keypress, so detection of correct method is automatic
            var cb = (typeof callback == 'function') ? callback : new Function(callback);
            this.keypress(function(e){ if( e.keyCode == key ) setTimeout(cb,0,e); });
        },
    });
    
    $.fn.onSwipe = function(start_callback, stop_callback){//TODO also support mousedown/up
    //TODO use touchmove to figure out inital direction before calling start_callback
      $(document)
        .on('touchstart', function(edown){
          var touchstart = edown.originalEvent.touches[0];
          $(document).on('touchend', function(eup){
            $(this).off('touchend');
            var touchend = eup.originalEvent.changedTouches[0];
            var dx = (touchend.pageX - touchstart.pageX)/(eup.originalEvent.timeStamp - edown.originalEvent.timeStamp);
            var dy = (touchend.pageY - touchstart.pageY)/(eup.originalEvent.timeStamp - edown.originalEvent.timeStamp);
            stop_callback(dx, dy, edown, eup);
          });
        });
        start_callback(touchstart, edown);
    };
})(jQuery);
