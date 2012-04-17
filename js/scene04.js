var dirs = new Array(4);
dirs[0] = new Array(-1,0);
dirs[1] = new Array(0,1);
dirs[2] = new Array(1,0);
dirs[3] = new Array(0,-1);

var cellSize = 32;
var numCells = 128;
var background = '#937f84';
var antwalk = '#ff5c7a';
var antant = '#bf0026';

var antx = anty = 1;
var antdir = 0;

var antCtx = null;
var board;

var switchGreeter = 0;
var greetIndex = 0;

var antCount = 0;
var antRot = 1;

var greetPic = [];
greetPic[0]  = "alpha_c";
greetPic[1]  = "asd";
greetPic[2]  = "evoflash";
greetPic[3]  = "fairlight";
greetPic[4]  = "farbrausch";
greetPic[5]  = "gasman";
greetPic[6]  = "haujobb";
greetPic[7]  = "kakiarts";
greetPic[8]  = "kewlers";
greetPic[9]  = "m0d";
greetPic[10] = "malodix";
greetPic[11] = "mercury";
greetPic[12] = "mrdoob";
greetPic[13] = "nuance";
greetPic[14] = "p01";
greetPic[15] = "saga_musix";
greetPic[16] = "topy44";
greetPic[17] = "xplsv";
greetPic[18] = "3ln";

function initScene04 () {
	
	antCtx = document.getElementById('antCanvas');
	antCtx.width = window.innerWidth;
	antCtx.height = window.innerHeight;
	
	antCtx = antCtx.getContext('2d');
	
	board = new Array(numCells);
	for(var c = 0; c < numCells; c++)
	{
		board[c] = new Array(numCells);
		
		for(var i = 0; i < numCells; i++)
		{
			board[c][i] = false;
		}
	}
	
	antCtx.globalAlpha = 0.1;
};


function antBackground () {
	
	var leWidth = window.innerWidth;
	var leHeight = window.innerHeight;

    antCtx.drawImage(antCtx.canvas, 0, 0, leWidth * 2, leHeight * 2);
    antCtx.restore();
};

function renderScene04 () {
	
	if(updateAnt)
		drawAnt();
};

function HALLO () {

	greet(greetIndex);
		
	if(switchGreeter++ >= 3) {
		switchGreeter = 0;
		greetIndex++;
	}
};

function drawAnt () {
	
	if (board[antx][anty] === true)	{
		board[antx][anty] = false; // See rule 3
		drawGradCircle(antx * cellSize, anty * cellSize, background);

		antdir = (antdir + 1) % dirs.length; // See rule 1
	} else {
		board[antx][anty] = true; // See rule 3
		
		drawGradCircle(antx * cellSize, anty * cellSize, antwalk);

		antdir = (antdir + 3) % dirs.length; // See rule 2
	}
	
	antx = (antx + dirs[antdir][0]) % numCells;
	anty = (anty + dirs[antdir][1]) % numCells;
	
	antx = antx < 0 ? (numCells-1) : antx; //so it wraps around, as -1 isn't in the board array
	
	drawGradCircle(antx * cellSize, anty * cellSize, antant);

	antBackground();
};

function drawGradCircle (xPos, yPos, color) {
	
	var width = height = 120;
	var gradient = antCtx.createRadialGradient(xPos+3, yPos+3, 4, xPos+8, yPos+8,50);
	gradient.addColorStop(0, color);
	gradient.addColorStop(1, 'rgba(0,0,0,1)');
	
	antCtx.fillStyle = gradient;
	
	antCtx.fillRect (xPos, yPos, width, height);
};

function greet(index) {
	
	if(index < greetPic.length) {
		
		antCtx.globalAlpha = 1;
		antCtx.globalCompositeOperation = "xor";
		antCtx.drawImage(document.getElementById(greetPic[index]), window.innerWidth / 4, window.innerHeight / 3);
		
		antCtx.globalAlpha = .5;
		antCtx.globalCompositeOperation = "lighter";
		antCtx.drawImage(document.getElementById(greetPic[index]), window.innerWidth / 4, window.innerHeight / 3);
		
		antCtx.globalCompositeOperation = "source-over";
		antCtx.globalAlpha = 0.1;
	}
};