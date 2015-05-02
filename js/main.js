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

  // Game loop
  // Updates every 0.01 of a second

  setInterval(function(){
    var timenow = $.now();
    if (timenow > timestamp + game.updateFrequency) {
      game.update();
      game.draw();

      timestamp = $.now();
    }
  }, 10);
});
