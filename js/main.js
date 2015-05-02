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





  var _initialState = function(){
    //
    // Line 1
    //
    for(var i=0; i < 24; i++){
      $('.line1').append("<span class='letter'>&nbsp;</span>");
    }
    $('.line1').append("<span class='letter'>a</span>");
    $('.line1').append("<span class='letter'>p</span>");
    $('.line1').append("<span class='letter'>p</span>");
    $('.line1').append("<span class='letter'>l</span>");
    $('.line1').append("<span class='letter'>e</span>");
    $('.line1').append("<span class='letter'>s</span>");
    for(var i=0; i < 10; i++){
      $('.line1').append("<span class='letter'>&nbsp;</span>");
    }

    //
    // Line 2
    //
    for (var i=0; i < 40; i++){
      $('.line2').append("<span class='letter'>&nbsp;</span>");
    }

    //
    // Line 3
    //
    for(var i=0; i < 18; i++){
      $('.line3').append("<span class='letter'>&nbsp;</span>");
    }
    $('.line3').append("<span class='letter active'>s</span>");
    $('.line3').append("<span class='letter'>t</span>");
    $('.line3').append("<span class='letter'>a</span>");
    $('.line3').append("<span class='letter'>r</span>");
    $('.line3').append("<span class='letter'>t</span>");
    for(var i=0; i < 17; i++){
      $('.line3').append("<span class='letter'>&nbsp;</span>");
    }

    //
    // Line 4
    //
    for(var i=0; i < 34; i++){
      $('.line4').append("<span class='letter'>&nbsp;</span>");
    }
    $('.line4').append("<span class='letter'>o</span>");
    $('.line4').append("<span class='letter'>r</span>");
    $('.line4').append("<span class='letter'>a</span>");
    $('.line4').append("<span class='letter'>n</span>");
    $('.line4').append("<span class='letter'>g</span>");
    $('.line4').append("<span class='letter'>e</span>");

    //
    // Line 5
    //
    for (var i=0; i < 40; i++){
      $('.line5').append("<span class='letter'>&nbsp;</span>");
    }
  };


  var _run = function(){
    var timenow = $.now();
    if (timenow > timestamp + game.updateFrequency) {
      game.update();
      game.draw();

      timestamp = $.now();
    }
  }





  _initialState();

  // Game loop
  // Updates every 0.01 of a second
  var gameInterval = setInterval(_run, 10);
});
