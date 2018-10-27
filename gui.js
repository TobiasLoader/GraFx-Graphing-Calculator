
var sideX;
function sidebar(){
	if (windowWidth>600){
  	sideX = 5*windowWidth/6;
  } else {
	  sideX = windowWidth-100;
  }
  stroke(150);
  strokeWeight(2);
  line(sideX,0,sideX,H);
  noStroke();
  fill(254);
  rect((sideX+windowWidth)/2,H/2,windowWidth-sideX,H);
  fill(120);
  textSize(15+W/80);
  text("GraFx",(sideX+windowWidth)/2,50);
  colCircles();
}

function colCircles(){
	
	strokeWeight(1);
	for (var f=0; f<FuncList.length; f+=1){
		if (inputFunc[f]){
			fill(red(ColourFunc[f]),green(ColourFunc[f]),blue(ColourFunc[f]),100);
			stroke(ColourFunc[f]);
		} else {
			fill(red(ColourFunc[f]),green(ColourFunc[f]),blue(ColourFunc[f]),30);
			stroke(red(ColourFunc[f]),green(ColourFunc[f]),blue(ColourFunc[f]),100);
			line(((sideX+windowWidth)/2)-(H/40-5),80+(H/8)*(f+1),((sideX+windowWidth)/2)+(H/40-5),80+(H/8)*(f+1));
			line((sideX+windowWidth)/2,(80+(H/8)*(f+1))-(H/40-5),(sideX+windowWidth)/2,(80+(H/8)*(f+1))+(H/40-5));
			noStroke();
		}
		ellipse((sideX+windowWidth)/2,80+(H/8)*(f+1),10+H/20,10+H/20);
	}
}