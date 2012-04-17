var ribMaterials = [];
var ribMaterialBase;
var ribParameters;
var ribGeometry = null;
var ribColor = [0xFFF5F7, 0xFFA9B8, 0xFF5C7A, 0xFF0D3D, 0xBF0026, 0x730017, 0x270008];
var ribbons = [];

function initScene02 () {
	ribGeometry = new THREE.Geometry();

	n = 90;
	n2 = 2 * n;

	for ( i = -n; i < n; i++ ) {

		i2 = i + n;

		x = ( i2 % 2 ) * 20; //thickness
		y = i * -40; //length
		z = 0;

		var ribWidth = x;

		var vector = new THREE.Vector3( x, y, z );
		ribGeometry.vertices.push( new THREE.Vertex( vector ) );

		var color = new THREE.Color( 0xffffff );
		ribGeometry.colors.push( color );
	}
	
	var ribMaterialBase = new THREE.MeshBasicMaterial( { color:0xffffff } );

	renderer.initMaterial( ribMaterialBase, scene.lights, scene.fog );

	xgrid = 1;
	ygrid = 7;
	nribbons = xgrid * ygrid;

	c = 0;
	
	var moep = 1;
	for ( i = 0; i < xgrid; i++ )
	for ( j = 0; j < ygrid; j++ ) {

		ribMaterials[c] = new THREE.MeshBasicMaterial( { color: ribColor[c], vertexColors:true } ); //faster without vertexColors

		ribbon = new THREE.Ribbon( ribGeometry, ribMaterials[c] );
		//ribbon.rotation.x = 0;
		//ribbon.rotation.y = 1.57;
		//ribbon.rotation.z = .2;

		x += ribWidth;
		y = 240 + (moep * 2); //240 - end of cube stream
		z = (moep * 2) + 45;
		ribbon.position.set( x, y, z );

		ribbon.doubleSided = true;

		ribbon.matrix.setPosition( ribbon.position );

		ribbon.matrix.scale( ribbon.scale );
		
		ribbon.boundRadiusScale = Math.max( ribbon.scale.x, Math.max( ribbon.scale.y, ribbon.scale.z ) );

		ribbons.push( ribbon );					
		
		scene.addObject( ribbon );
		
		c++;
	}
	
	scene.matrixAutoUpdate = false;

	renderer.autoClear = false;
	
	//camera.target = ribbons[6];
	camera.far = 10000;
};

function updateRibbons () {
	
};

function renderScene02() {
	
	var time = elapsed * 0.00005;
	
	if(ribGeometry != null) {
		
		for ( var i = -n; i < n; i++ ) {
	
			var i2 = i + n;
	
			var z  =  5 * Math.cos( i2 * 0.08 + time * 10 );
	
			ribGeometry.vertices[i2].position.z += z;
		}
	
		ribGeometry.__dirtyVertices = true;

		renderer.clear();
		renderer.render( scene, camera );
	}
	
	logoFadeIn();
};

function logoInit() {
	
};

function logoFadeIn() {
	
	var trblLogoOpacity = 1/5 * (elapsed - 33.5);
	
	if(trblLogoOpacity < 0)
		trblLogoOpacity = 0;
		
	if(trblLogoOpacity > 1)
		trblLogoOpacity = 1;
		
	document.getElementById('trbl').style.opacity = trblLogoOpacity;
};

function logoFadeOut() {
	
	var trblLogoOpacity = 1 - (.5 * (elapsed - 68));
	
	if(trblLogoOpacity < 0)
		trblLogoOpacity = 0;
		
	if(trblLogoOpacity > 1)
		trblLogoOpacity = 1;
		
	document.getElementById('trbl').style.opacity = trblLogoOpacity;
};