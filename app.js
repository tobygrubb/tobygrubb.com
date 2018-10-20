var bgImageArray = ["TobyGrubb_DCB75003.jpg", "TobyGrubb_BonAffair02b.jpg", "TobyGrubb_NikeNews04.jpg", "TobyGrubb_NikeSurf04.jpg", "TobyGrubb_ShaunWhite07.jpg", "TobyGrubb_ThisShoot.jpg", "TobyGrubb_BurtonCatalogs02b.jpg"],
  base = "http://www.tobygrubb.com/test/images/projects/",
  secs = 4;
  bgImageArray.forEach(function(img){
  new Image().src = base + img;
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < bgImageArray.length; i++) {
		setTimeout(function(){
			document.documentElement.style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center fixed";
			document.documentElement.style.backgroundSize ="cover";
		if ((k + 1) === bgImageArray.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }
		}, (secs * 1000) * i)
	}
}

backgroundSequence();

function toggleCodes(on) {
  var obj = document.getElementById('icons');
    if (on) {
      obj.className += ' codesOn';
    } else {
      obj.className = obj.className.replace(' codesOn', '');}
}
