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


  var _getSiblingBy = function($el, isForward){
    return isForward ? $el.next() : $el.prev();
  };


  var _getAllSiblingsBy = function($el, isForward){
    return isForward ? $el.nextAll() : $el.prevAll();
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


  // Utility function for finding the last letter of the word or the next
  // Uses the _nextInteresting function to handle behavior between alphanumeric,
  // non-alphanumeric, and spaces.
  //
  // Contains complicated logic that probably needs 100 pages of documentation.
  // <Insert Blind Faith here>
  var _endInteresting = function($active, direction){
    var isForward = direction == 'forward';
    var $interesting =
          _nextInteresting($active, _getAllSiblingsBy($active, isForward));
    // Last letter in the line
    var $lastLetter = _getAllSiblingsBy($active, isForward).last();
    // Letter before the interesting letter
    var $beforeInteresting = _getSiblingBy($interesting, !isForward);
    // Find the next letter given the interesting letter
    var $nextLetter =
          $interesting.text().trim() ?
            $interesting :
              _getAllSiblingsBy($interesting, isForward).
                filter(_containsLetter).
                first();

    // If there is no interesting letter found
    // Just return the last letter of the line
    // (occurs if word/blank is at the end of line)
    if ($interesting.length == 0) return $lastLetter;

    // If the active letter is not directly before interesting
    //    and the active letter is a non space
    // Then the end letter is the letter directly before interesting
    // (occurs if cursor is in middle of word)
    if (!$active.is($beforeInteresting) && $active.text().trim()){
      return $beforeInteresting;
    }

    // Else if the next letter is not found
    // Then return the last letter of the line
    // (occurs when cursor is at end of word which has blank to the end of line)
    if ($nextLetter.length == 0) return $lastLetter;

    // Get next interesting for the next word
    var $nextInteresting =
      _nextInteresting($nextLetter, _getAllSiblingsBy($nextLetter, isForward));

    // If no interesting letter found for the next word
    // Then just return the last letter of the line
    // (occurs when the next word is at end of line)
    if ($nextInteresting.length == 0 && $nextLetter.text().trim()){
      return $lastLetter;
    }
    // If an interesting letter is found for the next word
    // Then return the letter before that interesting letter
    else return _getSiblingBy($nextInteresting, !isForward);
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

      // If no interesting found (word/space at end of line)
      if ($interesting.length == 0){
        // Switch active if space
        if (!$active.text().trim()){
          _switchActive($active, _getAllSiblingsBy($active, 'forward').last());
        }

        return;
      }

      var $nextLetter =
            // If the next interesting letter is a non space
            $interesting.text().trim() ?
              // Then the $nextLetter is $interesting
              $interesting :
              // Else the $nextLetter is the first encountered
              // non-space after $interesting
              $interesting.nextAll('.letter').filter(_containsLetter).first();

      // If the nextLetter does not exist (space at end of line),
      // Then the next $active should be the last character
      // Else nextLetter is the next $active
      if ($nextLetter.length == 0){
        _switchActive($active, _getAllSiblingsBy($active, 'forward').last());
      }
      else _switchActive($active, $nextLetter);
    }
    // E button
    // End of Next Word
    else if (e.which == 69){
      _switchActive($active, _endInteresting($active, 'forward'));
    }
    // B button
    // Previous Start of Word
    else if (e.which== 66){
      _switchActive($active, _endInteresting($active, 'backward'));
    }
  });
});
