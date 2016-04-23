function Initializer(){

  // TODO: this constant should be shared with Game
  this.MAX_CHARACTERS = 40;

  this.initLine = function($line, str){
    if (str.length > this.MAX_CHARACTERS){
      console.log('String too long!');
      return;
    }
    var spaceLength = (this.MAX_CHARACTERS - str.length)/2;

    // Clean line
    $line.html('');

    for(var i=0; i < Math.floor(spaceLength); i++){
      $line.append("<span class='letter'>&nbsp;</span>");
    }
    for(var i=0; i < str.length; i++){
      var c = str[i] == ' ' ? '&nbsp;' : str[i];
      $line.append("<span class='letter'>" + c + "</span>");
    }
    for(var i=0; i < spaceLength; i++){
      $line.append("<span class='letter'>&nbsp;</span>");
    }
  }
}


$(function(){
  var initializer = new Initializer();

  //
  // Initialize Screen State
  //
  $('.main-line').each(function(){
    initializer.initLine($(this), '');
  });

  // Line 3
  initializer.initLine($('.line3'), 'running-vim');

  // Line 4
  initializer.initLine($('.line4'), 'movement: h,j,k,l,w,e,b');

  // Line 6
  initializer.initLine($('.line6'), 'type :s to begin');

  // Line 7
  initializer.initLine($('.line7'), 'type :? for help');
});
