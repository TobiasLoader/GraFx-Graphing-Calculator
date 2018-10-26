
/* ZOOM into mouse coor:

1,2,3 Covered in RealRelS()

1- Take away rel mouse coor from every rel coor,
2- Scale with these new rel coors,
3- Add rel mouse coor back to every rel coor,

4- TODO: Keep record of the (change in coor) for (each coor) due to this effect
5- TODO: Add (coor specific value stored) to (calculation in RealRelS) for that coor

*/

var W; // windowWidth
var H; // windowHeight
var OxDrag;
var OyDrag;
var O;
var s;
var sConst;
var unitPix;
var F;
var lastX;
var PlotAccuracy;
var isScrolling;
var ScaleBy;
var poppedExtra;
var PixRealX0;
var PixRealXW;
var PixRealY0;
var PixRealYH;
var d;
var realD;
var pointsClicked;
var graphClicked;
var dragging;
var ColourFunc;

var primEqu;

function setup() {
// 	graph(["4x^-2"],4);
	
	primEqu = prompt("Please provide the primary polynomial (between each term type + with spaces before and after. Leave no other spaces or plus symbols in the rest to the expression). Every term must be in the form: ax^b. Only integers are currently accepted. Do not include 'y = '.\nExample: '2x^3 + -4x^2 + -x + 7'").split(" + ");
	
	W = windowWidth;
	H = windowHeight;	
	textFont("Avenir Next");
	rectMode(CENTER);
	
	OxDrag = 0;
	OyDrag = 0;
	O = [W/2,H/2];
	s = 1;
	sConst = 1.01;
	unitPix = 10;
	F = [];
	lastX = [];
	PlotAccuracy = prompt("Plot Accuracy - eg: 10\n(Higher Num = Better Quality): ");
	if (!PlotAccuracy|| isNaN(PlotAccuracy)){
		PlotAccuracy = 10;
		alert("INPUT INVALID.\nPlot Accuracy has defaulted to 10.");
	}
	PlotAccuracy = 1/PlotAccuracy;
	isScrolling = false;  
	poppedExtra = false;
	defineBorders();
	d = unitPix*s;
	pointsClicked = [];
	graphClicked;
	dragging = false;
	
	ColourFunc = [color(232, 73, 48),color(55, 153, 26),color(55, 143, 173),color(255, 204, 0),color(184, 75, 198),color(252, 151, 0)];

	
  createCanvas(W, H);	
  initFuncs();
  plotFuncs(lastX);
  drawINIT();
}

function defineBorders(){
	PixRealX0 = PixRealS(0,OxDrag,W);
	PixRealXW = PixRealS(W,OxDrag,W);
	PixRealY0 = PixRealS(0,OyDrag,H);
	PixRealYH = PixRealS(H,OyDrag,H);
}
