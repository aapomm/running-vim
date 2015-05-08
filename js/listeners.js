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
  // current letter.
  //
  //  If $current is a space
  //  Then the next interesting letter is a non-space
  //
  //  If $current is an alphanumeric
  //  Then the next interesting letter is a non-alphanumeric letter
  //
  //  If $current is non-alphanumeric
  //  Then the next interesting letter is an alphanumeric letter or a space
  //
  //  Returns an empty object if no interesting letter is found. Usually occurs
  //  when at the end of line.
  var _nextInteresting = function($current, collection){
    for(var i=0; i < collection.length; i++){
      if (!$current.text().trim()){
        if (collection.eq(i).text().trim()) return collection.eq(i);
      }
      else if (alphaRegex.test($current.text())){
        if (!alphaRegex.test(collection.eq(i).text())) return collection.eq(i);
      }
      else if(!alphaRegex.test($current.text())){
        if (alphaRegex.test(collection.eq(i).text()) || !collection.eq(i).text().trim()){
          return collection.eq(i);
        }
      }
      else console.log('Error: Weird Letter Encountered');
    }

    return $();
  };


  var _endInteresting = function($active, $interesting){
    var $nextLetter = $();

    // If there is nothing insteresting
    if ($interesting.length == 0) return $active.nextAll().last();

    // If the interesting letter is a non-space
    if ($interesting.text().trim()){
      $nextLetter = $interesting;
    }
    // If the interesting letter is a space
    else {
      var $beforeInteresting = $interesting.prev();

      if ($active.is($beforeInteresting)){
        $nextLetter = $interesting.nextAll().filter(_containsLetter).first();

        if ($nextLetter.length == 0) return $active.nextAll().last();
      }
      else return $beforeInteresting;
    }

    // Next interesting for the next word
    var $nextInteresting =
      _nextInteresting($nextLetter, $nextLetter.nextAll());

    if ($nextInteresting.length == 0 && $nextLetter.text().trim()){
      return $nextLetter.nextAll().last();
    }
      // _switchActive($active, $nextInteresting.prev());
    else return $nextInteresting.prev();
  };





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
      var $interesting = _nextInteresting($active, $active.nextAll());

      if ($interesting.length == 0) return;

      var $nextLetter =
            // If the next interesting letter is a non space
            $interesting.text().trim() ?
              // Then the $nextLetter is $interesting
              $interesting :
              // Else the $nextLetter is the first encountered
              // non-space after $interesting
              $interesting.nextAll('.letter').filter(_containsLetter).first();

      _switchActive($active, $nextLetter);
    }
    // E button
    // End of Next Word
    else if (e.which == 69){
      var $interesting = _nextInteresting($active, $active.nextAll());

      _switchActive($active, _endInteresting($active, $interesting));
    }
    // B button
    // Previous Start of Word
    else if (e.which== 66){
    }
  });
});
