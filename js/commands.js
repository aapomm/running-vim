$(function(){
  var main = new Main(),
      initializer = new Initializer();




  var _setupHelp = function(){
    // text:
    //
    // Controls: h, j, k, l, w, e, b
    // Commands:
    // :s - start the game
    // :? - help
    $('.main-container').fadeOut('slow', function(){
      $('.main-line').html('');
      initializer.initLine($('.line1'), 'Controls: h, j, k, l, w, e, b');
      initializer.initLine($('.line2'), '');
      initializer.initLine($('.line3'), 'Commands:');
      initializer.initLine($('.line4'), ':s - start the game');
      initializer.initLine($('.line5'), ':? - help');
      $('.main-container').fadeIn('slow');
    });
  }




  //
  // Command listeners
  //
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


  $(window).keypress(function(e){
    if (e.which == 58 && e.shiftKey && $('.cmd-field').prop('disabled')){
      $('.cmd-field').prop('disabled', false).focus();
    }
  });

  $(window).keyup(function(e){
    if (e.which == 59){
      $('.cmd-field').val(':');
    }
  });
});
