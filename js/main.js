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

  this.isStarted = false;
}


Main.prototype._showGameOver = function(){
  var _this = this,
      initializer = new Initializer();

  $('.main-container').fadeOut('slow', function(){
    $('.main-line').html('');
    initializer.initLine($('.line1'), '');
    initializer.initLine($('.line2'), 'GAME OVER');
    initializer.initLine($('.line3'), _this.game.score.toString());
    initializer.initLine($('.line4'), '');
    initializer.initLine($('.line5'), 'type :s to replay');
    $('.main-container').fadeIn('slow');
  });
}

Main.prototype._initialize = function(){
  if ($('.active').length == 0){
    $('.line3').find('span').eq(20).addClass('active');
  }
}





Main.prototype.run = function(){
  // Check for game over
  if (this.game.checkGameOver()){
    // Remove controls
    $('body').unbind('keydown');

    this.stop();

    this._showGameOver();
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

  this.game.initialize();

  // Game loop
  // Runs every 0.01 of a second
  this.gameInterval = setInterval(function(){ _this.run(); }, 10);
}


Main.prototype.stop = function(){
  clearInterval(this.gameInterval);
  this.gameInterval = false;

  this.isStarted = false;
}
