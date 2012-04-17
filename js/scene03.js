var _cubeCluster2 = [];
var cubeBounceHolder;

var BOUNCE_SPRITE_MAP = 'bounceSpriteMap';
var MAX_BOUNCE_SCALE = 2;
var bounceTex;
var bounceDir = 1;
var bounceDirLogo = 17;
var allScale = 1;
var texSwitchCount = 0;
var moveBounceTex = 1;

function initScene03() {
	
    var CUBE_DIAMETER = 4;
    
    var cubeMat = [];
    
						//left, right, top, bottom, front, back
	var CUBE_COLORS = [0xbf0026, 0x730017, 0xff5c7a , 0x270008, 0xff0d3d, 0xcccccc];
	
	var _cube;
	var startX = -85;
	var startY = 0;
	var startZ = 0;
	
	for ( var i = 0; i < 5; i ++ ) {

		cubeMat.push( [ new THREE.MeshBasicMaterial( { color: CUBE_COLORS[i] } ) ] );
	}
	
	var geometry = new Cube( CUBE_DIAMETER, CUBE_DIAMETER, CUBE_DIAMETER, 1, 1, 1, cubeMat );
	
	cubeBounceHolder = new THREE.Object3D();
	
	var padding = .5;
    for (var a = 0; a < 17; a++) {
		
    	_cubeCluster2[a] = [];
    	
        for (var b = 0; b < 17; b++) {

            _cube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial() );
            
            var pdng = 0;
            
            _cube.position.x = startX + (a * (CUBE_DIAMETER + pdng));
            _cube.position.y = startY + (b * (CUBE_DIAMETER + pdng));
            _cube.position.z = startZ;

            _cube.scale.z = 1;

            _cubeCluster2[a][b] = _cube;
            
            cubeBounceHolder.addChild( _cube );

            cubeCount++;
        }
    }

	cubeBounceHolder.rotation.x = -0.1;
	cubeBounceHolder.rotation.y = 1.9;
	cubeBounceHolder.rotation.z = -0.3;

	cubeBounceHolder.position.x = 35;
	cubeBounceHolder.position.y = -169;
	cubeBounceHolder.position.z = 55;
	
	scene.addObject(cubeBounceHolder);

    renderer.autoClear = false;
    
    initBounceHeightMap();
};

function cubeBounceBeat() {
	
	switch(MAX_BOUNCE_SCALE) {
		case 2:
			MAX_BOUNCE_SCALE = .2;
			break;
		case .2:
			MAX_BOUNCE_SCALE = 2;
			break;
	}
	
	texSwitchCount++;
}

var RIBBON_BOUNCE_SCALE = 1;
var ribBreakTimer = 0;
function ribbonBounceBeat() {
	
	if(ribBreakTimer++ >= 4) {
		
		switch(RIBBON_BOUNCE_SCALE) {
			case 1:
				RIBBON_BOUNCE_SCALE = 2;
				break;
			case 1:
				RIBBON_BOUNCE_SCALE = 2;
				break;
		}
		
		ribbon.scale.x = RIBBON_BOUNCE_SCALE;
		ribbon.scale.y = RIBBON_BOUNCE_SCALE;
		ribbon.scale.z = RIBBON_BOUNCE_SCALE;
		
		ribBreakTimer = 0;
	}
}

function updateCubeBounce() {
	
	var bounceTexStep = -4;
	var heightMap = getHeightMapData();
	
	for (var a = 0; a < 17; a++) {
		
        for (var b = 0; b < 17; b++) {
        	
        	bounceTexStep += 4;
        	
        	allScale = heightMap[bounceTexStep] / 255 * MAX_BOUNCE_SCALE;
        	
        	allScale = allScale > 0 ? allScale : 0;
        	
        	if(allScale > 0) {
        		
        		_cubeCluster2[a][b].visible = true;
        		_cubeCluster2[a][b].scale.z = allScale;
        		
        	} else {
        		
        		_cubeCluster2[a][b].visible = false;
        		
        	}
		}
    }
};

function getHeightMapData( ) {
	
	var trblLogo =  bounceTex.getImageData(0, 0, 17, 17).data;
	
	if(texSwitchCount <= 13) {
		
		if((moveBounceTex == 0) || (moveBounceTex == 51))
			bounceDir *= -1;
	
		moveBounceTex += bounceDir;
		
		return bounceTex.getImageData(moveBounceTex, 17, 17, 17).data;
		
	} else if ((texSwitchCount >= 13) && (texSwitchCount <= 19)) {
		
    	return trblLogo;
    	
    } else if (texSwitchCount > 19) {
    	
    	texSwitchCount = 0;
    	return trblLogo
    }
};

function initBounceHeightMap () {
	
    var canvas = document.createElement('canvas');
    
    canvas.width = 68;
    canvas.height = 34;

    bounceTex = canvas.getContext('2d');
	
    bounceTex.drawImage(document.getElementById(BOUNCE_SPRITE_MAP), 0, 0);
};

function renderScene03() {
	
	//renderer.clear();
	
    //renderer.render(scene, camera);
};

function clearScene03() {
	
	//OMGWTFBBQ!
	delete(scene);
	
	//document.body.removeChild(domRender);
	
	delete(camera);
	delete(scene);
	delete(renderer);
};