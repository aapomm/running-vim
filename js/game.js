function Game($lines){
  this.LINE_NUM = 5;
  this.MAX_CHARACTERS = 40;

  // In milliseconds
  this.updateFrequency = 500;

  this.$lines = $lines;
}

Game.prototype.limitLineLength = function(){
  for(var i=0; i < this.LINE_NUM; i++) {
    var line = this.$lines[i]
    if (line.find('.letter').length == this.MAX_CHARACTERS){
      line.find('.letter:first').remove();
    }
  }
}

Game.prototype.update = function(){

}

Game.prototype.draw = function(){
  this.limitLineLength();

  for(var i=0; i < this.LINE_NUM; i++) {
    this.$lines[i].append("<span class='letter'>&nbsp;</span>");
  }
}
