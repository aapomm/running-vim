$(function(){

  var alphaRegex = new RegExp('^[a-z0-9]+$');

  //
  // Utility Functions
  //

  var _findSiblingIndex = function($el){
    var siblings = $el.closest('div').find('.letter');

    for(var i=0; i < siblings.length; i++) if (siblings.eq(i).is($el)) return i;

    // Error
    return -1;
  };


  var _switchActive = function($active, $newActive){
    if ($newActive.length == 0) return;

    $active.removeClass('active');
    $newActive.addClass('active');
  };

  // Utility function to determine the next interesting letter, depending on the
  // current active letter.
  //
  //  If $active is a space
  //  Then the next interesting letter is a non-space
  //
  //  If $active is an alphanumeric
  //  Then the next interesting letter is a non-alphanumeric letter
  //
  //  If $active is non-alphanumeric
  //  Then the next interesting letter is an alphanumeric letter
  var _nextInteresting = function($active){
    var allNext = $active.nextAll();

    for(var i=0; i < allNext.length; i++){
      if (!$active.text().trim()){
        if (allNext.eq(i).text().trim()) return allNext.eq(i);
      }
      else if (alphaRegex.test($active.text())){
        if (!alphaRegex.test(allNext.eq(i).text())) return allNext.eq(i);
      }
      else if(!alphaRegex.test($active.text())){
        if (alphaRegex.test(allNext.eq(i).text())) return allNext.eq(i);
      }
      else{
        console.log('Error: Weird Letter Encountered');
      }
    }
  }





  //
  // Filters
  //
  var _containsLetter = function(){
    return $(this).text().trim();
  };





  //
  // Listeners
  //

  $('body').keydown(function(e){
    var $active = $('.letter.active');

    // L button
    // Right
    if (e.which == 76){
      var $next = $active.next();

      _switchActive($active, $next);
    }
    // H button
    // Left
    else if (e.which == 72){
      var $prev = $active.prev();

      _switchActive($active, $prev);
    }
    // K button
    // Up
    else if (e.which == 75){
      var $prevLine = $active.parents('div:first').prev(),
          activeIndex = _findSiblingIndex($active);

      if ($prevLine.length > 0){
        var $newActive = $prevLine.find('.letter:eq(' + activeIndex + ')');

        _switchActive($active, $newActive)
      }
    }
    // J button
    // Down
    else if (e.which == 74){
      var $nextLine = $active.parents('div:first').next(':not(.cmd-line)'),
          activeIndex = _findSiblingIndex($active);

      if ($nextLine.length > 0){
        var $newActive = $nextLine.find('.letter:eq(' + activeIndex + ')');

        _switchActive($active, $newActive);
      }
    }
    // W button
    // Next Word
    else if (e.which == 87){
      // Get the next interesting letter
      var $interesting = _nextInteresting($active);

      var $nextLetter =
            // If the next interesting letter is a non space
            $interesting.text().trim() ?
              // Then the $nextLetter is $interesting
              $nextLetter = $interesting :
              // Else the $nextLetter is the first encountered
              // non-space after $interesting
              $interesting.nextAll('.letter').filter(_containsLetter).first();

      _switchActive($active, $nextLetter);
    }
    // E button
    // End of Next Word
    else if (e.which == 69){
    }
    // B button
    // Previous Start of Word
    else if (e.which== 66){
    }
  });
});
