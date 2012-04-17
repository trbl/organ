var kTexWidth, kTexHeight, kBufWidth, kBufHeight;

function initScene06 () {
	
	kTexWidth = parseInt(window.innerWidth / 2);
	kTexHeight = parseInt(window.innerHeight / 2);

	kBufWidth = parseInt(window.innerWidth);
	kBufHeight = parseInt(window.innerHeight);
	
	wobbleCtxOff.canvas.width = kBufWidth;
	wobbleCtxOff.canvas.height = kBufHeight;
		
	wobbleCtxOff.drawImage(wobbleCtx.canvas, 0, 0, kBufWidth, kBufHeight);
	//wobbleCtxOff.drawImage(document.getElementById('3ln'), 0, 0, kBufWidth, kBufHeight);
};

function renderScene06 () {
	
	wobbleCtx.save();
	wobbleCtx.setTransform(1, 0, 0, -1, 0, kTexHeight *2);//bottomLeft
	wobbleCtx.drawImage(wobbleCtxOff.canvas, 0, 0, kTexWidth, kTexHeight);
	
	wobbleCtx.setTransform(-1, 0, 0, 1, kTexWidth*2, 0);//topRight
	wobbleCtx.drawImage(wobbleCtxOff.canvas, 0, 0, kTexWidth, kTexHeight);
	
	
	wobbleCtx.setTransform(-1, 0, 0, -1, kTexWidth*2, kTexHeight*2);//bottomRight
	wobbleCtx.drawImage(wobbleCtxOff.canvas, 0, 0, kTexWidth, kTexHeight);
	
	wobbleCtx.setTransform(1, 0, 0, 1, 0, 0); //topLeft
	wobbleCtx.drawImage(wobbleCtxOff.canvas, 0, 0, kTexWidth, kTexHeight);
	
	
	wobbleCtxOff.translate(-(kBufWidth / 2), -(kBufHeight / 2));
	wobbleCtxOff.drawImage(wobbleCtx.canvas, 0, 0, kBufWidth, kBufHeight);
	wobbleCtxOff.translate((kBufWidth / 2), (kBufHeight / 2));
	
	wobbleCtxOff.restore();
};

function clearScene06() {
	
};