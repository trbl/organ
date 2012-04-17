var wobbleCtx = null;
var wobbleCtxOff = null;
var BLOB_COUNT = 6;
var COL_BRUSH_SHADOW = '#d92b00';
var COL_BG = '#937f84';
var blob = [];

function initScene05() {
	
	wobbleCtx = document.getElementById('wobbleCanvas');
	wobbleCtx.width = window.innerWidth;
	wobbleCtx.height = window.innerHeight;
	wobbleCtx = wobbleCtx.getContext('2d');

	wobbleCtxOff = document.getElementById('wobbleCanvasOff');
	wobbleCtxOff = wobbleCtxOff.getContext('2d');

	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	drawBlobToOffscreen(20);
	
	for(var i = 0; i < BLOB_COUNT; i++) {
		blob[i] = [];
		
		blob[i]['rotation']	= rand(0, 180);
		
		blob[i]['width']	= rand(3, 200);
		
		blob[i]['x']		= rand(blob[i]['width'], (SCREEN_WIDTH / 4) - blob[i]['width']);
		blob[i]['y']		= rand(blob[i]['width'], (SCREEN_HEIGHT / 4) - blob[i]['width']);
		
		blob[i]['deltaX']	= rand(0.5, 5);
		blob[i]['deltaY']	= rand(0.5, 5);
	}
};

function renderScene05() {
	
	clearScreenWithColor();
	
	//wobbleCtx.globalCompositeOperation = "lighter";
	
	setNewPosition();
	
	for(var i = 0; i < BLOB_COUNT; i++) {
		
		drawBlob(blob[i]['x'], blob[i]['y'], blob[i]['rotation']+=20, blob[i]['width']);
	}
	
	wobbleCtx.globalCompositeOperation = "source-over";
	
	wobbleCtx.save();
	wobbleCtx.translate(-1.5, -1.5);
	wobbleCtx.scale(1.01, 1.01);
	wobbleCtx.drawImage(wobbleCtx.canvas, 0, 0);
	
	wobbleCtx.restore();
};

function clearScene05() {

};

function setNewPosition () {
	
	for(var i = 0; i < BLOB_COUNT; i++) {

		if (blob[i]['x'] < blob[i]['width'] || blob[i]['x'] > SCREEN_WIDTH - blob[i]['width']) {
			blob[i]['deltaX'] = -blob[i]['deltaX'];
		}
	
		if (blob[i]['y'] < blob[i]['width'] || blob[i]['y'] > SCREEN_HEIGHT - blob[i]['width']) {
			blob[i]['deltaY'] = -blob[i]['deltaY'];
		}
	
		blob[i]['x'] = blob[i]['x'] + blob[i]['deltaX'];
		blob[i]['y'] = blob[i]['y'] + blob[i]['deltaY'];
	}
};

function drawBlobToOffscreen (dmtr) {
	
	wobbleCtxOff.fillStyle = COL_BRUSH_SHADOW;
	
	//4 circles
	//main
	wobbleCtxOff.beginPath();
	var middle = .5 * ((dmtr*2) - dmtr);
	var radius = dmtr * .15;
	var halfRadius = radius * .5;
	
	wobbleCtxOff.arc(middle , middle, radius, 0, 6.28, false);
	//tl
	wobbleCtxOff.arc(middle - radius , middle - radius, halfRadius, 0, 6.28, false);
	//tr
	wobbleCtxOff.arc(middle + radius , middle - radius, halfRadius, 0, 6.28, false);
	//bl
	wobbleCtxOff.arc(middle - radius , middle + radius, halfRadius, 0, 6.28, false);
	//br
	wobbleCtxOff.arc(middle + radius , middle + radius, halfRadius, 0, 6.28, false);

	wobbleCtxOff.closePath();

	wobbleCtxOff.fill();
};

function drawBlob (xPos, yPos, rotation, dmtr) {
	
	wobbleCtxOff.canvas.width = wobbleCtxOff.canvas.height = (dmtr*2);
	
	wobbleCtxOff.translate(dmtr, dmtr);
	wobbleCtxOff.rotate(rotation * 0.0174);
	wobbleCtxOff.translate(-dmtr, -dmtr);
	drawBlobToOffscreen(dmtr);
	
	wobbleCtx.drawImage(wobbleCtxOff.canvas, xPos, yPos);
};

function clearScreenWithColor () {
	
    wobbleCtx.fillStyle = 0x000000;
    wobbleCtx.globalAlpha = 0.01;
	wobbleCtx.fillRect (0, 0, window.innerWidth, window.innerHeight);
	wobbleCtx.globalAlpha = 1;
	
	/*
	wobbleCtx.globalAlpha = 0.1;
	wobbleCtx.drawImage(antCtx.canvas, 0, 0);
	wobbleCtx.globalAlpha = 1;
	*/
};