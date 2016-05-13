// Start Music
var audio = document.getElementById('sound');
var sw = true;
audio.play();

function Main(){
  // DOM objects
  this.$lines = [
    $('.line1'),
    $('.line2'),
    $('.line3'),
    $('.line4'),
    $('.line5'),
    $('.line6'),
    $('.line7'),
    $('.line8')
  ]

  // Instantiate Game class
  this.game = new Game(this.$lines);

  this.timestamp = $.now();

  this.gameInterval = false;

  this.isStarted = false;
}

//Function for stopping and starting audio playback -Z
function MusicSwitch(){
if(sw){
  audio.pause()
  sw = false;
}
else if(sw === false){
  audio.play();
  sw = true;
}
}
document.getElementById('mute').addEventListener('click', MusicSwitch);
//restarts music once track has ended
document.getElementById('sound').addEventListener('onended', audio.play());

Main.prototype._showGameOver = function(){
  var _this = this,
      initializer = new Initializer();

  $('.main-container').fadeOut('slow', function(){
    $('.main-line').each(function(){
      initializer.initLine($(this), '');
    });
    initializer.initLine($('.line3'), 'game over');
    initializer.initLine($('.line5'), _this.game.score.toString());
    initializer.initLine($('.line7'), 'type :s to replay');
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
