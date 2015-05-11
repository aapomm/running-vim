$(function(){

  //
  // Initialize Screen State
  //

  //
  // Line 1
  //
  for(var i=0; i < 15; i++){
    $('.line1').append("<span class='letter'>&nbsp;</span>");
  }
  var line1txt = 'running-vim'
  for(var i=0; i < line1txt.length; i++){
    $('.line1').append("<span class='letter'>" + line1txt[i] + "</span>");
  }
  for(var i=0; i < 14; i++){
    $('.line1').append("<span class='letter'>&nbsp;</span>");
  }

  //
  // Line 2
  //
  for (var i=0; i < 9; i++){
    $('.line2').append("<span class='letter'>&nbsp;</span>");
  }
  $('.line2').append("<span class='letter'>m</span>");
  $('.line2').append("<span class='letter'>o</span>");
  $('.line2').append("<span class='letter'>v</span>");
  $('.line2').append("<span class='letter'>e</span>");
  $('.line2').append("<span class='letter'>m</span>");
  $('.line2').append("<span class='letter'>e</span>");
  $('.line2').append("<span class='letter'>n</span>");
  $('.line2').append("<span class='letter'>t</span>");
  $('.line2').append("<span class='letter'>:</span>");
  $('.line2').append("<span class='letter'>&nbsp;</span>");
  $('.line2').append("<span class='letter active'>h</span>");
  $('.line2').append("<span class='letter'>,</span>");
  $('.line2').append("<span class='letter'>j</span>");
  $('.line2').append("<span class='letter'>,</span>");
  $('.line2').append("<span class='letter'>k</span>");
  $('.line2').append("<span class='letter'>,</span>");
  $('.line2').append("<span class='letter'>l</span>");
  $('.line2').append("<span class='letter'>,</span>");
  $('.line2').append("<span class='letter'>w</span>");
  $('.line2').append("<span class='letter'>,</span>");
  $('.line2').append("<span class='letter'>e</span>");
  $('.line2').append("<span class='letter'>,</span>");
  $('.line2').append("<span class='letter'>b</span>");
  for (var i=0; i < 8; i++){
    $('.line2').append("<span class='letter'>&nbsp;</span>");
  }

  //
  // Line 3
  //
  for(var i=0; i < 40; i++){
    $('.line3').append("<span class='letter'>&nbsp;</span>");
  }

  //
  // Line 4
  //
  for(var i=0; i < 10; i++){
    $('.line4').append("<span class='letter'>&nbsp;</span>");
  }
  var line4txt = "type :start to begin";
  for(var i=0; i < line4txt.length; i++){
    var c = line4txt[i] == ' ' ? '&nbsp;' : line4txt[i];
    $('.line4').append("<span class='letter'>" + c + "</span>");
  }
  for(var i=0; i < 10; i++){
    $('.line4').append("<span class='letter'>&nbsp;</span>");
  }
  //
  // Line 5
  //
  for (var i=0; i < 40; i++){
    $('.line5').append("<span class='letter'>&nbsp;</span>");
  }


});
