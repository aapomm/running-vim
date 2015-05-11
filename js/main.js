$(function(){
  // DOM objects
  var $lines = [
    $('.line1'),
    $('.line2'),
    $('.line3'),
    $('.line4'),
    $('.line5')
  ]

  // Instantiate Game class
  var game = new Game($lines);

  var timestamp = $.now();

  var gameInterval = false;





  var _showGameOver = function(){
    $('.main-line').fadeOut('slow', function(){
      $('.main-line').html('').css({'text-align':'center'});
      $('.line2').html('GAME OVER');
      $('.line3').html(game.score);
      $('.line5').html(':replay?');
      $('.main-line').fadeIn('slow');
    });
  }


  var _run = function(){
    // Check for game over
    if (game.checkGameOver()){
      // Remove controls
      $('body').unbind('keydown');

      clearInterval(gameInterval);
      gameInterval = false;

      _showGameOver();
    }

    var timenow = $.now();
    if (timenow > timestamp + game.updateFrequency) {
      game.update();
      game.draw();

      timestamp = $.now();
    }
  }





  // Game loop
  // Updates every 0.01 of a second
  gameInterval = setInterval(_run, 10);
});
