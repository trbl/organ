var camera,
	scene,
	renderer,
	audio,
	stats;

var rubbelDieKatz = true;

var firstTime = 0;
var aniCount  = 0;

/*window.onload = */function initOrgan() {

	document.getElementById('meow').style.background ="#937f84";
	document.getElementById('goesLos').style.display="none";	

	//initDebug();

    initStage();

    initKeyDown();

    audio = document.getElementById('eargasm');

    animate();
};

var sceneInit = [];
sceneInit[0] = false;
sceneInit[1] = false;
sceneInit[2] = false;
sceneInit[3] = false;
sceneInit[4] = false;
sceneInit[5] = false;
sceneInit[6] = false;

var allow02 = true;
var allow03 = true;
var allow04 = true;
var allow05 = true;
var updateAnt = true;
var allowGreet = true;
function animate() {

    if (aniCount++ <= 3) {
        audio.play();
    }

	if(rubbelDieKatz)
    	requestAnimationFrame(animate);

    calcFrameDelta();

    if (elapsed <= 29.4) {

    	if(!sceneInit[0]) {

    		initScene01();

    		sceneInit[0] = true;
    	}

		updateCubeHeights();

    	renderScene01();
    }

	if((elapsed >= 29.4) && (elapsed <= 33.5)) {
		goodbyeWave01();
	}

    if (elapsed > 33.5) {
	
    	if(!sceneInit[1]) {
    		
    		if(sceneInit[0])
    			clearScene01();
    		
    		sceneInit[1] = true;

    		initScene02();
    	}

		if(allow02)
    		renderScene02();
    }
    
    if ((elapsed > 33.5) && (allow03)) {
	
    	if(!sceneInit[2]) {
    		
    		//clearScene02();
    		
    		sceneInit[2] = true;

    		initScene03();
    	}
		
		updateCubeBounce();
    	
		renderScene03();
    }
    
    if (elapsed > 64) {
    	
    	allow03 = false;
    }
    	
    if (elapsed > 62.5) {
	
    	if(!sceneInit[3]) {
    		
    		//clearScene03();
    		
    		sceneInit[3] = true;

    		initScene04();
    	}

    	renderScene04();
    }
    
    if (elapsed > 68) {
    	
    	clearScene03();
    	
    	logoFadeOut();
    }

    if ((elapsed > 105) && (allow05)) {
		
    	if(!sceneInit[4]) {
    		
    		//clearScene04();
    		
    		sceneInit[4] = true;

    		initScene05();
    		
    		drawAnt();
    	}
		
		allowGreet = false;
		
    	renderScene05();
    }
    
    if(elapsed > 106) {
    	
    	updateAnt = false;
    }
/*    
    if(elapsed > 110) {//117) {
    	
    	allow05 = false;
    }
*/    
    if (elapsed > 115) {
	
    	if(!sceneInit[5]) {
    		
    		//clearScene04();
    		
    		sceneInit[5] = true;

    		initScene06();
    	}

    	renderScene06();
    }
    
    if (elapsed > 151.5) {
    	
    	if(!sceneInit[6]) {
    		
    		initScene07();
		}
		
    	showLeBot();
    }
    
    if (elapsed > 158) {
    	showLeName('ko0x');
    }
    
    if (elapsed > 165) {
    	showLeName('mog');
    }
    
    if (elapsed > 172) {
    	showLeName('wzl');
    }
    
    if (elapsed > 179) {
    	showLeName('none');
    }
    
    if ((elapsed > 185) && (elapsed < 187)) {
    	fadeLeDemoOut();
    }
    
    if (elapsed >= 187) {
    	rubbelDieKatz = false;
    }
    
    //stats.update();
};

function beat350Detected() {

	if (elapsed <= 29.4) {
		
		changeWave01Color();
	}
};

function beat450Detected() {
	
	if((elapsed > 33.5) && (allow03)) {
	
		cubeBounceBeat();
		
	} else if ((elapsed > 70) && (allowGreet)) {
		
		HALLO();
	}
};

function initDebug () {
	
	stats = new Stats();
	
	stats.domElement.style.position = 'absolute';
	
	document.body.appendChild( stats.domElement );
};

var domRender;
function initStage () {
	
	scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    domRender = renderer.domElement;
    document.body.appendChild(renderer.domElement);
};