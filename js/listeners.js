$(function(){
  var _findSiblingIndex = function($el){
    var siblings = $el.closest('div').find('.letter');

    for(var i=0; i < siblings.length; i++) if (siblings.eq(i).is($el)) return i;

    // Error
    return -1;
  };


  var _switchActive = function($newActive){
    $('.letter.active').removeClass('active');
    $newActive.addClass('active');
  };


  $('body').keydown(function(e){
    console.log(e);
    var $active = $('.letter.active');

    // L button
    // Right
    if (e.which == 76){
      var $next = $active.next();

      if ($next.length > 0) _switchActive($next);
    }
    // H button
    // Left
    else if (e.which == 72){
      var $prev = $active.prev();

      if ($prev.length > 0) _switchActive($prev);
    }
    // K button
    // Up
    else if (e.which == 75) {
      var $prevLine = $active.parents('div:first').prev(),
          activeIndex = _findSiblingIndex($active);

      if ($prevLine.length > 0){
        var $newActive = $prevLine.find('.letter:eq(' + activeIndex + ')');

        _switchActive($newActive)
      }
    }
    // J button
    // Down
    else if (e.which == 74) {
      var $nextLine = $active.parents('div:first').next(':not(.cmd-line)'),
          activeIndex = _findSiblingIndex($active);

      if ($nextLine.length > 0){
        var $newActive = $nextLine.find('.letter:eq(' + activeIndex + ')');

        _switchActive($newActive);
      }
    }
  });
});
