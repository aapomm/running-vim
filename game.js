(function(game){
  var $lines = [
    $('.line1'),
    $('.line2'),
    $('.line3'),
    $('.line4'),
    $('.line5')
  ]

  game.run = function(){

    return function(){
      for(var i=0; i<5; i++) {
        $lines[i].append('a');
      }
    }
  }

})(window.Game = {});
