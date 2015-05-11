function Main(){
  // DOM objects
  this.$lines = [
    $('.line1'),
    $('.line2'),
    $('.line3'),
    $('.line4'),
    $('.line5')
  ]

  // Instantiate Game class
  this.game = new Game(this.$lines);

  this.timestamp = $.now();

  this.gameInterval = false;

  this.isStarted = true;
}


Main.prototype._showGameOver = function(){
  var _this = this;

  $('.main-line').fadeOut('slow', function(){
    $('.main-line').html('').css({'text-align':'center'});
    $('.line2').html('GAME OVER');
    $('.line3').html(_this.game.score);
    $('.line5').html('type :start / :s');
    $('.main-line').fadeIn('slow');
  });
}

Main.prototype._initialize = function(){
  $('.main-line').each(function(){
    $(this).html('');
    for (var i=0; i < 40; i++){
      $(this).append("<span class='letter'>&nbsp;</span>");
    }
  });
  $('.line3').find('span').eq(20).addClass('active');
}





Main.prototype.run = function(){
  // Check for game over
  if (this.game.checkGameOver()){
    // Remove controls
    $('body').unbind('keydown');

    this.stop();

    this._showGameOver();

    this.isStarted = false;
  }

  var timenow = $.now();
  if (timenow > this.timestamp + this.game.updateFrequency) {
    this.game.update();
    this.game.draw();

    this.timestamp = $.now();
  }
}


Main.prototype.start = function(){
  var _this = this;

  if (!_this.isStarted) _this._initialize();

  _this.isStarted = true;

  // Game loop
  // Runs every 0.01 of a second
  this.gameInterval = setInterval(function(){ _this.run(); }, 10);
}


Main.prototype.stop = function(){
  clearInterval(this.gameInterval);
  this.gameInterval = false;
}
