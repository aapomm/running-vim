function Game($lines){
  this.MAX_CHARACTERS = 40;

  this.WORDS = [
    [
      "apples",
      "oranges",
      "def",
      "asdf",
      "struct",
      "testVariable",
      "include",
      "var",
      "ggpush",
      "Gstatus",
      "random",
      "def foo",
      "end",
      "CONSTANT",
      "Philippines"
    ],
    [
      "function()",
      "_method",
      "ActiveRecord::Base",
      ":datetime",
      "count++",
      "this.game",
      "<Leader>",
      "setInterval()",
      "main()",
      "$lines",
      "x = 1",
      "var that;",
      "self.stop",
      "sum :party_size",
      "patch :cancel"
    ],
    [
      "$('body')",
      "if(@x.nil?)",
      ":on_steroids",
      "$.now();",
      "vundle#end()",
      "<C-n>",
      "#wtf?!?",
      "x = 1;",
      "this.length;",
      ":attr => nil",
      "map{ |n| n }",
      "count++ < ++max",
      "https://",
      "sum     ",
      "arr[0][123]"
    ]
  ];

  this.$lines = $lines;
  this.lineBuffers = []

  this.initialize = function(){
    // In milliseconds
    this.updateFrequency = 180;

    // Instantiate line buffers
    for(var i=0; i < this.$lines.length; i++) this.lineBuffers[i] = "";

    this.score = 0;
    this.prevScore = 0;
    this.level = 1;
  }
}


Game.prototype._limitLineLength = function(){
  for(var i=0; i < this.$lines.length; i++) {
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
  for(var i=0; i < this.$lines.length; i++){
    var lineBuffer = this.lineBuffers[i],
        levelIndex = this.level > 4 ? 2 : (this.level > 2 ? 1 : 0),
        wordIndex = Math.floor(Math.random() * 15);

    // 7% chance
    var printLine = Math.floor(Math.random() * 100) < 7;

    // Check if line buffer is empty
    if (!lineBuffer && printLine){
      this.lineBuffers[i] = this.WORDS[levelIndex][wordIndex];
    }
  }

  if (this.score++ == this.prevScore + (this.level)*50 ){
    if (this.updateFrequency > 103){
      this.updateFrequency *= 0.80;
    }
    this.level++;
    this.prevScore = this.score;
  }
}


Game.prototype.draw = function(){
  this._limitLineLength();

  for(var i=0; i < this.$lines.length; i++) {
    var lineBuffer = this.lineBuffers[i],
        nextLetter = "&nbsp;",
        cssClass = 'letter';

    if (lineBuffer){
      // Use the first letter
      if (lineBuffer[0] != ' ') nextLetter = lineBuffer[0];

      // Remove from buffer
      this.lineBuffers[i] = this.lineBuffers[i].substring(1);
    }

    // TODO: Add danger level progression
    if (this.level > 1){
      var chance = this.level > 9 ? 30 : this.level * 3;
      if (Math.floor(Math.random() * 100) < chance){
        cssClass += ' danger';
      }
    }

    this.$lines[i].
      append("<span class='" + cssClass + "'>" + nextLetter + "</span>");
  }

  // Show Score
  $('.score').html(this.score);

  // Show level if changed
  if (parseInt($('.level').html()) != this.level) $('.level').html(this.level);
}
