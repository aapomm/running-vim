$(function(){
  var main = new Main();

  $('.cmd-field').blur(function(){
    $(this).val('').prop('disabled', true);
  });


  $('.cmd-field').keydown(function(e){
    // Esc key
    if (e.keyCode == 27){
      $(this).val('').blur();
      $('body').focus();
    }
    // Enter key
    else if (e.keyCode == 13){
      var command = $(this).val();
      if (command == ':start' || command == ':replay'){
        $('body').keydown(Game.prototype.controls);
        main.start();
      }
      else if (command == ':pause'){
        main.stop();

        $('body').unbind('keydown');
      }

      $(this).val('').blur();
      $('body').focus();
    }
  });


  $('body').keypress(function(e){
    if (e.keyCode == 58 && e.shiftKey){
      $('.cmd-field').prop('disabled', false).focus();
    }
  });
});
