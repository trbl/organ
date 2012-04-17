var endeBlendeCtx;
function initScene07 () {
	endeBlendeCtx = document.getElementById('endeBlende');
	endeBlendeCtx.width = window.innerWidth;
	endeBlendeCtx.height = window.innerHeight;
	
	endeBlendeCtx = endeBlendeCtx.getContext('2d');
}

function showLeName (who) {
	
	document.getElementById('ko0x').style.display = 'none';
	document.getElementById('mog').style.display = 'none';
	document.getElementById('wzl').style.display = 'none';
	
	if(who != 'none')
		document.getElementById(who).style.display = 'block';
}

function showLeBot() {
	document.getElementById('katze').style.display = 'block';
}

function showLeBot() {
	document.getElementById('katze').style.display = 'block';
}

function fadeLeDemoOut() {
	
	var opacity = 1 -(.5 * (elapsed - 185));
	
	if(opacity < 0)
		opacity = 0;
		
    endeBlendeCtx.fillStyle = 'rgba(0,0,0,'+ opacity +')';
	endeBlendeCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}