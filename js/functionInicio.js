function createSpriteSheet(){
	var infoSprite = {
		images: ["src/img/naveSS.png"],
		frames: {width:117, height:48, count:9, regX:0, regY:0},
		animations: {stand: [0,8]}
	};
	var spriteSheet = new createjs.SpriteSheet(infoSprite);
	return spriteSheet;
}

function createNave(spriteSheet, x, y){
	var nave = new createjs.Sprite(spriteSheet, "stand");
	nave.setBounds(0,0,117,48)
	nave.x = x-58;
	nave.y = y-24;

	return nave;
}

function createPlaneta(guias){
	var planeta = [];
	for (var i = 0; i < 5; i++) {
		var posicion = guias[Math.floor(Math.random()*guias.length)];

		var bitm = new createjs.Bitmap("src/img/planeta.png");
		bitm.setBounds(100,100,135,135);
		bitm.x = posicion.x;
		bitm.y = posicion.y+60;

		planeta[i] = bitm;	
	};
	return planeta;
}

/****************************************/

function createFondoBar(){
	var fondoBar = new createjs.Shape();
	fondoBar.graphics
		.setStrokeStyle(3)
		.beginStroke("#000080")
		.beginFill("#323a72")
		.drawRoundRectComplex(0,0,1100,60,15,15,0,0);
	return fondoBar;
}

function createIntentos(){
	var intentos = [];
	var x = 10;
	for (var i = 0; i < 3; i++) {
		var vida = new createjs.Bitmap("src/img/icon.png");
		vida.setBounds(x, 2, 34, 66);
		vida.x = x;
		vida.y = 2;
		intentos[i] = vida;
		x += 40;
	};
	return	intentos;
}

function createLetrasInfo(gameBar, game){
	var letrasInfo = [];
	var posX = 250;
	for (var i = 0; i < game.length; i++) {
		var info = new createjs.Text(game[i], "45px Arial", "white");
		if (game[i] == "N*") {var info = new createjs.Text("Ñ", "45px Arial", "white");}
		info.textBaseLine = "top";
		info.x = posX + 35;
		info.y = 15;
		letrasInfo[i] = info;

		posX = info.x;
	}
	return letrasInfo;
}

function createLetras(gameBar, game){
	var gameLetras = [];
	var posX = 250;
	for (var i = 0; i < game.length; i++) {
		/*var info = new createjs.Text(game[i], "45px Arial", "white");
		info.textBaseLine = "top";
		info.x = posX + 35;
		info.y = 15;
		gameBar.addChild(info);*/


		var info = new createjs.Text(game[i], "45px Arial", "gray");
		if (game[i] == "N*") {var info = new createjs.Text("Ñ", "45px Arial", "gray");}
		info.textBaseLine = "top";
		info.x = posX + 35;
		info.y = 15;
		gameLetras[i] = info;

		posX = info.x;
	};
	return gameLetras;
}

function createDañoLabel(){
	var daño = new createjs.Text("Fortaleza: ", "20px Arial", "white");
	daño.textBaseLine = "top";
	daño.x = 710;
	daño.y = 20;
	return daño;
}
function createDañoFondo(){
	var dañoFondo = new createjs.Shape();
	dañoFondo.graphics
		.beginFill("black")
		.drawRoundRect(810,23,225,18,8);
	return dañoFondo;
}
function createDañoNivel(){
	var dañoNivel = [];
	dañoNivel[0] = new createjs.Shape();
	dañoNivel[0].graphics
		.beginFill("red")
		.drawRoundRectComplex(811,25,73,14,7,0,0,7);
	dañoNivel[1] = new createjs.Shape();
	dañoNivel[1].graphics
		.beginFill("red")
		.drawRect(886,25,73,14);
	dañoNivel[2] = new createjs.Shape();
	dañoNivel[2].graphics
		.beginFill("red")
		.drawRoundRectComplex(961,25,73,14,0,7,7,0);
	return dañoNivel;
}

function posicionar(planeta, letras){
	var aux = null;
	var posicion = null;
	do{
		aux = false;
		posicion = guias[Math.floor(Math.random()*guias.length)];
		for(var j = 0; j < planeta.length; j++){
			if(planeta[j].x == posicion.x && planeta[j].y-60 == posicion.y){
				aux = true;
				break;
			};
		};
		for(var j = 0; j < letras.length; j++){
			if(letras[j].x == posicion.x && letras[j].y-60 == posicion.y){
				aux = true;
				break;
			};
		};
	}while(aux == true);
	return posicion;
}

function createLetrasGame(game, planeta, letras){
	var letras = [];
	for(var i = 0; i < game.length; i++){
		var posicion = posicionar(planeta, letras);
		var letra = new createjs.Bitmap("src/letras/"+game[i]+".png");
		letra.x = posicion.x;
		letra.y = posicion.y+60;
		letras[i] = letra;
	};
	return letras;
}
