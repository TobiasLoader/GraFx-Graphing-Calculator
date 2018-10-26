
/* ZOOM into mouse coor:

1,2,3 Covered in RealRelS()

1- Take away rel mouse coor from every rel coor,
2- Scale with these new rel coors,
3- Add rel mouse coor back to every rel coor,

4- TODO: Keep record of the (change in coor) for (each coor) due to this effect
5- TODO: Add (coor specific value stored) to (calculation in RealRelS) for that coor

*/

function draw() {
  if (mouseX!==pmouseX || mouseY!==pmouseY || mouseIsPressed || isScrolling){
		drawINIT();
  }/*
 else {
	  if (!poppedExtra){
	  	popExtra();
	  }
  }
*/
}

function drawINIT(){
	setSizeVars();
	background(245,250,255);
	defineBorders();
  drawAxis();
  drawGuideLines();
  drawPoints();
  drawFuncs();
  selectFuncs();
  stroke(50);
  strokeWeight(1);
  linePix([W/2-10,H/2],[W/2+10,H/2]);
  linePix([W/2,H/2-10],[W/2,H/2+10]);
  isScrolling = false;
//   poppedExtra = false;
}
function popExtra(){
	var fPix;
	for (var f=0; f<F.length; f+=1){
		for (var side=0; side<2; side+=1){
			for (var i=0; i<F[f][side].length; i+=1){
				fPix = RealPixS(F[f][side][i][0],OxDrag,W);
				if (F[f][side].length>2){
					if (fPix<0 || fPix>W){
						lastX[f][side] = F[f][side][i][0];
						F[f][side].splice(i,1);
					}
				}
			}
		}
	}
	poppedExtra = true;
}
function removeEl(array, element) {
/*
    const index = array.indexOf(element);
    if (index !== -1) {
        return array.splice(index, 1);
    }
    return array;
*/
	for (var i=0; i<array.length; i+=1){
		if (element[0]===array[i][0] && element[1]===array[i][1]){
			return array.splice(i,1);
		}
	}
}
function precise(x,n) {
	if (!n){
		n = 4;
	}
  return float(Number.parseFloat(x).toPrecision(n));
}

function RealRelS(Coor,Drag,Dimension){
	var output = (s*(Drag+Coor)*unitPix*2)/(Dimension);
	/*
var relMouse;
	if (isScrolling){
		if (Dimension === W){
			relMouse = PixRelS(mouseX,W);
		} else {
			relMouse = PixRelS(mouseY,H);
		}
		output -= relMouse;
		output *= ScaleBy;
		output += relMouse;
	}
*/
	return output
}
function RelPixS(Coor,Dimension){
	if (Dimension === W){
		return (Dimension/2)+((Coor)*Dimension);
	} else {
		return (Dimension/2)+((Coor)*-Dimension);
	}
}
function RealPixS(Coor,Drag,Dimension){
	return RelPixS(RealRelS(Coor,Drag,Dimension),Dimension);
}

function RealRel(Coor){
	return [RealRelS(Coor[0],OxDrag,W),RealRelS(Coor[1],OyDrag,H)];
}
function RelPix(Coor){
	return [RelPixS(Coor[0],W),RelPixS(Coor[1],H)];
}
function RealPix(Coor){
	return RelPix(RealRel(Coor));
}

function PixRelS(Coor,Dimension){
	return (Coor/Dimension)-(1/2);
}
function RelRealS(Coor,Drag,Dimension){
	return ((Dimension*Coor)/(2*s*unitPix))-Drag;
}
function PixRealS(Coor,Drag,Dimension){
	return RelRealS(PixRelS(Coor,Dimension),Drag,Dimension);
}

function PixRel(Coor){
	return [PixRelS(Coor[0],W),PixRelS(Coor[1],H)];
}
function RelReal(Coor){
	return [RelRealS(Coor[0],OxDrag,W),RelRealS(Coor[1],OyDrag,H)];
}
function PixReal(Coor){
	return RelReal(PixRel(Coor));
}

function initFuncs(){
	F = [];
	for (var n=0; n<FuncList.length; n+=1){
		F.push([]);
		F[n].push([[0,FuncList[n](0)]]);
		F[n].push([[0,FuncList[n](0)]]);
		lastX.push([0,0]);
	}
}
function plotFuncs(){
	
	/*
for (var n=0; n<FuncList.length; n+=1){
		for (var x=xVals[n][0]-(PlotAccuracy/s); x>PixRealX0; x-=(PlotAccuracy/s)){
			if (F[n][0].slice(-1)[0] === x){
				break;
			} else {
				var value = FuncList[n](x);
				if (value<PixRealYH && value>PixRealY0){
					F[n][0].push([x,value]);
				} else {
					break;
				}
			}
			lastX[n][0]=x;
		}
		for (var x=xVals[n][1]+(PlotAccuracy/s); x<PixRealXW; x+=(PlotAccuracy/s)){
			if (F[n][1].slice(-1)[0] === x){
				break;
			} else {
				var value = FuncList[n](x);
				if (value<PixRealYH && value>PixRealY0){
					F[n][1].push([x,value]);
				} else {
					break;
				}
			}
			lastX[n][1]=x;
		}
	}
*/

	for (var n=0; n<FuncList.length; n+=1){
		for (var x=-PlotAccuracy/s; x>=PixRealX0; x-=(PlotAccuracy/(2*s))){
			var y = FuncList[n](x);
			if (y<PixRealYH && y>PixRealY0){
				F[n][0].push([x,y]);
			} else {
				F[n][0].push(false);
			}
// 			lastX[n][0]=x;
		}
// 		F[n][0].reverse();
	}
	for (var n=0; n<FuncList.length; n+=1){
		for (var x=PlotAccuracy/s; x<=PixRealXW; x+=(PlotAccuracy/(2*s))){
			var y = FuncList[n](x);
			if (y<PixRealYH && y>PixRealY0){
				F[n][1].push([x,y]);
			} else {
				F[n][1].push(false);
			}
// 			lastX[n][0]=x;
		}
	}
// 	print(F);
	
}
function selectFuncs(){
// 	print(graphClicked);
	var preciseTo = round(1/(20*realD));
	if (mouseIsPressed && dragging===false){
		for (var n=0; n<FuncList.length; n+=1){
			var X = precise(FuncList[n](PixRealS(mouseX,OxDrag,W)),preciseTo);
			var Y = precise(PixRealS(H-mouseY,OyDrag,H),preciseTo);
			
			if (X > Y-pow(2,-preciseTo) && X<Y+pow(2,-preciseTo)){
				graphClicked = FuncList[n];
			}
		}
	}
	if (graphClicked){
		strokeWeight(8);
		stroke(50);
		var realX = PixRealS(mouseX,OxDrag,W);
		var realY = graphClicked(realX);
		point(mouseX,RealPixS(realY,OyDrag,H));
		fill(50);
		noStroke();
		text("("+str(precise(realX))+", "+str(precise(realY))+")", mouseX, precise(RealPixS(realY,OyDrag,H))-15);
	}
}

function pointReal(Coor){
	var P = RealPix(Coor);
	point(P[0],P[1]);
}
function pointPix(Coor){
	point(Coor[0],Coor[1]);
}
function lineReal(Coor1,Coor2){
	if (Coor1 && Coor2){
		var P1 = RealPix(Coor1);
		var P2 = RealPix(Coor2);
		line(P1[0],P1[1],P2[0],P2[1]);
	}
}
function linePix(Coor1,Coor2){
	line(Coor1[0],Coor1[1],Coor2[0],Coor2[1]);
}

function drawAxis(){
	stroke(100, 120, 200);
	strokeWeight(1);
	O = RealPix([0,0]);
	linePix([O[0],0],[O[0],H]);
	linePix([0,O[1]],[W,O[1]]);
}
function drawLabels(Coor,denom,fraction,X,Y,dimension){
	if (round(denom*Coor)){
		var TXT = "";
		if (fraction || denom===1){
			TXT = str(round(Coor));
		} else {
			if (Number.isInteger(round(denom*Coor)/denom)){
				TXT = str(round(Coor));
			} else {
				TXT = str(round(denom*Coor))+"/"+str(denom);
			}
		}
		
		if (O[0]<20 && dimension===H){
			fill(30,40,50);
			text(TXT,20,Y);
		} else if (O[0]>W-20 && dimension===H){
			fill(30,40,50);
			text(TXT,W-20,Y);
		}  else if (O[1]<20 && dimension===W){
			fill(30,40,50);
			text(TXT,X,20);
		}  else if (O[1]>H-20 && dimension===W){
			fill(30,40,50);
			text(TXT,X,H-20);
		} else {
			fill(245,250,255);
			rect(X,Y,textWidth(TXT)+5,15);
			fill(30,40,50);
			text(TXT,X,Y);
		}
	}
	
}

function setSizeVars(){
	while (d<50){
		d*=2;
	} 
	while (d>100){
		d/=2;
	}
	realD = PixRealS(O[0]+d,OxDrag,W)-PixRealS(O[0],OxDrag,W);
}

function drawGuideLines(){
	textAlign(CENTER,CENTER);
	stroke(90, 171, 199);
	strokeWeight(1/2);
	var denom = realD;
	if (denom>=1){
		fraction=true;
		denom = round(denom);
	} else {
		fraction=false;
		denom = round(1/denom);
	}
	for (var X=O[0]; X<W; X+=d){
		linePix([X,0],[X,H]);
	}
	for (var X=O[0]; X>0;X-=d){
		linePix([X,0],[X,H]);
	}
	for (var Y=O[1]; Y<H;Y+=d){
		linePix([0,Y],[W,Y]);
	}
	for (var Y=O[1]; Y>0;Y-=d){
		linePix([0,Y],[W,Y]);
	}
	noStroke();
	for (var X=O[0]; X<W; X+=d){
		drawLabels(PixRealS(X,OxDrag,W),denom,fraction,X,O[1],W);
	}
	for (var X=O[0]; X>0;X-=d){
		drawLabels(PixRealS(X,OxDrag,W),denom,fraction,X,O[1],W);
	}
	for (var Y=O[1]; Y<H;Y+=d){
		drawLabels(PixRealS(H-Y,OyDrag,H),denom,fraction,O[0],Y,H);
	}
	for (var Y=O[1]; Y>0;Y-=d){
		drawLabels(PixRealS(H-Y,OyDrag,H),denom,fraction,O[0],Y,H);
	}
}
function drawPoints(){
	createPoints();
	strokeWeight(3);
	stroke(50,50,50);
	for (var p=0; p<P.length; p+=1){
		pointReal(P[p]);
	}
	for (var pC=0; pC<pointsClicked.length; pC+=1){
		strokeWeight(8);
		stroke(50);
		pointReal(pointsClicked[pC]);
		fill(50);
		noStroke();
		text("("+str(pointsClicked[pC][0])+", "+str(pointsClicked[pC][1])+")", RealPixS(pointsClicked[pC][0],OxDrag,W), RealPixS(pointsClicked[pC][1],OyDrag,H)-15);
	}
}
function drawFuncs(){
	for (var n=0; n<F.length; n+=1){
		if (FuncList[n]===graphClicked){
			strokeWeight(2);
		} else {
			strokeWeight(1);
		}
		if (ColourFunc.length>n){
			stroke(ColourFunc[n]);
		} else {
			stroke(50,50,50);
		}
		for (var f=1; f<F[n][0].length; f+=1){
			lineReal(F[n][0][f-1],F[n][0][f]);
		}
		for (var f=1; f<F[n][1].length; f+=1){
			lineReal(F[n][1][f-1],F[n][1][f]);
		}
	}
}

function keyPressed(){
	if (keyCode===80){
		print(lastX[0][0]);
	}
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight;
  drawINIT();
}
function mouseDragged(){
	if (!graphClicked){
		dragging = true;
		OxDrag += (mouseX-pmouseX)/(unitPix*s);
		OyDrag -= (mouseY-pmouseY)/(unitPix*s);
		initFuncs();
		plotFuncs();
	}
}
function mouseWheel(event){
/* 	print(lastX); */
	ScaleBy = pow(sConst,event.delta)
 	s*=ScaleBy;
 	isScrolling = true;
 	d = unitPix*s;
 	initFuncs();
 	plotFuncs();
/*
 	Mouse = PixRel([mouseX,mouseY]);
 	sXDiff -= ScaleBy*(Mouse[0]);
 	sYDiff -= ScaleBy*(Mouse[1]);
 	print(sXDiff);
*/
//  print(F);
}
function mouseClicked(){
	for (p=0; p<P.length; p+=1){
		if (dist(mouseX,mouseY,RealPixS(P[p][0],OxDrag,W),RealPixS(P[p][1],OyDrag,H))<5){
			var inPc = false;
			var theP = [precise(P[p][0]), precise(P[p][1])];
			for (var pC=0; pC<pointsClicked.length; pC+=1){
				if (theP[0] === precise(pointsClicked[pC][0]) && theP[1] === precise(pointsClicked[pC][1])){
					inPc = true;
					break;
				}
			}
			if (inPc){
				removeEl(pointsClicked,theP);
			} else {
				pointsClicked.push(theP);
			}
			print("");
			break;
		}
	}
// 	print(pointsClicked);
	drawINIT();
}
function mouseReleased(){
	if (graphClicked){
		graphClicked=false;
	}
	dragging = false;
}
