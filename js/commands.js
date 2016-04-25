$(function(){
  var main = new Main(),
      initializer = new Initializer();




  var _setupHelp = function(){
    //
    // Controls: h, j, k, l, w, e, b
    // Commands:
    // :s - start the game
    // :? - help
    //
    $('.main-container').fadeOut('slow', function(){
      $('.main-line').each(function(){
        initializer.initLine($(this), '');
      });
      initializer.initLine($('.line3'), 'Controls: h, j, k, l, w, e, b');
      initializer.initLine($('.line5'), 'Commands:');
      initializer.initLine($('.line6'), ':s - start the game');
      initializer.initLine($('.line7'), ':? - help');
      $('.main-container').fadeIn('slow');
    });
  }




  //
  // Command listeners
  //

  // Helper function to remove focus from .cmd-field
  $('.cmd-field').blur(function(){
    $(this).val('').prop('disabled', true);
  });


  $('.cmd-field').keydown(function(e){
    // Esc key
    if (e.which == 27){
      $(this).val('').blur();
      $('body').focus();
    }
    // Enter key
    else if (e.which == 13){
      var command = $(this).val();

      if (command == ':s' && !main.isStarted){
        main.start();

        $('body').on('keydown', Game.prototype.controls);
      }
      else if(command == ':?' && !main.isStarted){
        _setupHelp();
      }

      $(this).val('').blur();
      $('body').focus();
    }
  });


  // Detect entry to command mode
  $(window).keypress(function(e){
    // If semicolon button is pressed along with shift key and not currently in
    // command mode and not in-game
    if (e.which == 58 && e.shiftKey && $('.cmd-field').prop('disabled') &&
        !main.isStarted){
      $('.cmd-field').prop('disabled', false).focus();
    }
  });

  $(window).keyup(function(e){
    if (e.which == 59){
      $('.cmd-field').val(':');
    }
  });
});
