var steps = .1;
var stepsBigger = 1;

var frameDelta = lastTime =  fCount = fTimer = gTimer = fps = elapsed =  milli = 0;

function checkInput( e ) {
	
	var obj2mangle = cubeBounceHolder;
	
	//console.log(e.keyCode);
	
	switch(e.keyCode ) {
		case 27: /*ESC*/
			rubbelDieKatz = false;
			break;

		case 13: /*Enter*/
			startTimer();
			break;
			
		case 81: //q
			obj2mangle.rotation.x += steps;

			break;
		case 65: //a
			obj2mangle.rotation.x -= steps;
			break;
			
		case 87: //w
			obj2mangle.rotation.y += steps;
			break;
		case 83: //s
			obj2mangle.rotation.y -= steps;
			break;
			
		case 69: //e
			obj2mangle.rotation.z += steps;
			break;
		case 68: //d
			obj2mangle.rotation.z -= steps;
			break;
		
		//position
		case 73:
			obj2mangle.position.x += stepsBigger;
			break;
		
		case 75:
			obj2mangle.position.x -= stepsBigger;
			break;

		case 79:
			obj2mangle.position.y += stepsBigger;
			break;

		case 76:
			obj2mangle.position.y -= stepsBigger;
			break;

		case 80:
			obj2mangle.position.z += stepsBigger;
			break;
			
		case 192:
			obj2mangle.position.z -= stepsBigger;
			break;
					
		case 19: //pause
			console.log("rX:" + obj2mangle.rotation.x +" rY:"+ obj2mangle.rotation.y +" rZ:"+ obj2mangle.rotation.z +" \n"+
						"x:" + obj2mangle.position.x +" y:"+ obj2mangle.position.y +" z:"+ obj2mangle.position.z );
			break;
	}
};

function initKeyDown() {
	
	document.onkeydown = checkInput;
};

var mod = 0;
function calcFrameDelta () {

	var time = new Date();
	var timeInMs = time.getTime();
	//make sure it's not zero, as frameDelta will get huge otherwise
	if(lastTime == 0) {
		firstTime = lastTime = timeInMs;
	}

	if(lastTime - fTimer >= 350) {

		fTimer = lastTime;
		
		beat350Detected();
	}

	if(lastTime - gTimer >= 450) {

		gTimer = lastTime;
		
		beat450Detected();
	}

	frameDelta = timeInMs - lastTime;

	lastTime = timeInMs;
	elapsed = mod + (timeInMs - firstTime) / 1000;
	milli = elapsed - parseInt(elapsed);
};

function rand (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}