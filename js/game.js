function Game($lines){
  this.LINE_NUM = 5;
  this.MAX_CHARACTERS = 40;

  this.WORDS = [
    "apples",
    "oranges",
    "pineapple",
    "asdf"
  ];

  this.$lines = $lines;
  this.lineBuffers = []

  this.initialize = function(){
    // In milliseconds
    this.updateFrequency = 200;

    // Instantiate line buffers
    for(var i=0; i < this.LINE_NUM; i++) this.lineBuffers[i] = "";

    this.score = 0;
    this.prevScore = 0;
    this.level = 1;
  }
}


Game.prototype._limitLineLength = function(){
  for(var i=0; i < this.LINE_NUM; i++) {
    var line = this.$lines[i]
    if (line.find('.letter').length == this.MAX_CHARACTERS){
      line.find('.letter:first').remove();
    }
  }
}





Game.prototype.checkGameOver = function(){
  return (($('.active').length == 0) || ($('.active.danger').length == 1));
}


Game.prototype.update = function(){
  for(var i=0; i < this.LINE_NUM; i++){
    var lineBuffer = this.lineBuffers[i],
        randWordIndex = Math.floor(Math.random() * 4);

    // 10% chance
    var printLine = Math.floor(Math.random() * 10) == 1;

    // Check if line buffer is empty
    if (!lineBuffer && printLine){
      this.lineBuffers[i] = this.WORDS[randWordIndex];
    }
  }

  if (this.score++ == this.prevScore + (this.level)*50 ){
    this.updateFrequency *= 0.80;
    this.level++;
    this.prevScore = this.score;
  }
}


Game.prototype.draw = function(){
  this._limitLineLength();

  for(var i=0; i < this.LINE_NUM; i++) {
    var lineBuffer = this.lineBuffers[i],
        nextLetter = lineBuffer ? lineBuffer[0] : "&nbsp;",
        cssClass = 'letter';

    // 10% chance
    if (Math.floor(Math.random() * 10) == 1) cssClass += ' danger';

    this.$lines[i].
      append("<span class='" + cssClass + "'>" + nextLetter + "</span>");

    // Remove the inserted letter from the buffer
    this.lineBuffers[i] = this.lineBuffers[i].substring(1);
  }

  // Show Score
  $('.score').html(this.score);

  // Show level if changed
  if (parseInt($('.level').html()) != this.level) $('.level').html(this.level);
}
