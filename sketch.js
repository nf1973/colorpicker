
//Colorpicker v0.6
//20th November 2022
//By Neil

var mainCol, complCol
var elem, w,h;
var cnv;

function setup() {
  getSize();  
  console.log(w,h);
  cnv = createCanvas(w, h);
  cnv.parent ("canvas");
  
  currentColor = new ColrCombo();
  currentColor.pickColor();

  redSlider = createSlider(0, 255, currentColor.mainRed);
  redSlider.style('width', '256px');
  greenSlider = createSlider(0, 255, currentColor.mainGreen);
  greenSlider.style('width', '256px');
  blueSlider = createSlider(0, 255, currentColor.mainBlue);
  blueSlider.style('width', '256px');

  redSlider.input(sliderChanged);
  greenSlider.input(sliderChanged);
  blueSlider.input(sliderChanged);

  cnv.mouseClicked(pickNewColor);
}

function draw() {
  
  background(currentColor.mainRed,currentColor.mainGreen,currentColor.mainBlue);    
  noStroke();
  fill(currentColor.complRed,currentColor.complGreen, currentColor.complBlue);
  ellipse(w,h,(h*2)-80,(h*2)-80);

  document.getElementById('mainColr').innerHTML = colrText(currentColor.mainHex);
  document.getElementById('complColr').innerHTML = colrText(currentColor.complHex);
  
  fill(44,72,230);
  textSize(16);
  text("R: "+currentColor.mainRed, 15, 48);
  text("G: "+currentColor.mainGreen, 15, 48+50);
  text("B: "+currentColor.mainBlue, 15, 48+100);
  text("R: "+currentColor.complRed, cnv.canvas.offsetWidth-65, cnv.canvas.offsetHeight-20-100);
  text("G: "+currentColor.complGreen, cnv.canvas.offsetWidth-65, cnv.canvas.offsetHeight-20-50);
  text("B: "+currentColor.complBlue, cnv.canvas.offsetWidth-65, cnv.canvas.offsetHeight-20);
 
  redSlider.position(cnv.canvas.offsetLeft+ 70, cnv.canvas.offsetTop+32);
  greenSlider.position(cnv.canvas.offsetLeft+70, cnv.canvas.offsetTop+32+50);
  blueSlider.position(cnv.canvas.offsetLeft+70, cnv.canvas.offsetTop+32+100);

  redSlider.value(currentColor.mainRed);
  greenSlider.value(currentColor.mainGreen);
  blueSlider.value(currentColor.mainBlue);
}

class ColrCombo {
  constructor() {
  }

  pickColor = function () {
      this.mainRed = randomColorPicker();
      this.mainGreen = randomColorPicker();
      this.mainBlue = randomColorPicker();
      this.calcMainHexes();
      this.calculateComplColor(this.mainHex);
  }

  updateColor = function (red,green,blue) {
    this.mainRed = red;
    this.mainGreen = green;
    this.mainBlue = blue;
    this.calcMainHexes();
    this.calculateComplColor(this.mainHex);
  }

  calcMainHexes = function () {
    this.mainRedHex = decToHex(this.mainRed);
    this.mainGreenHex = decToHex(this.mainGreen);
    this.mainBlueHex = decToHex(this.mainBlue);
    this.mainHex = '#' + this.mainRedHex + this.mainGreenHex + this.mainBlueHex;
  }
  
  calculateComplColor = function (mainHex) {
      let h=mainHex.substring(1);
      let d=parseInt(h, 16);
      let c=16777215-d;
      let ret=c.toString(16);

      while (ret.length < 6) {
        ret="0"+ret};

      this.complRed = parseInt(ret.substring(0,2),16);
      this.complGreen = parseInt(ret.substring(2,4),16);
      this.complBlue = parseInt(ret.substring(4),16);
      this.complRedHex = decToHex(this.complRed);
      this.complGreenHex = decToHex(this.complGreen);
      this.complBlueHex = decToHex(this.complBlue);
      this.complHex = "#"+this.complRedHex + this.complGreenHex + this.complBlueHex;
  }
}

function windowResized() {
  getSize();
  resizeCanvas(w, h);
}

function getSize() {
  elem = document.getElementById("canvas");
  console.log(elem);
  w = elem.offsetWidth;
  h = elem.offsetHeight;
}

function randomColorPicker() {
  //Pick a random color 
  return(floor(random(255)));    
}

function decToHex(dec) {
  val = dec.toString(16);
  while (val.length < 2) {
      val = "0"+val;
  }
  return val.toUpperCase();
}

function colrText(colr) {
  return ("<p style= \'color:" + colr + ";\'>" + 
  colr + 
  "</p>"
   );
}

function sliderChanged() {
  currentColor.updateColor(redSlider.value(),greenSlider.value(),blueSlider.value());  
}

function pickNewColor() {
  currentColor.pickColor();
}
