(function(){
	var	stage = null;
	var keyManager = null;
	var guias = null;
	var palabras = null;

	var game = null;
	var gameBar = null;
	var gameArea = null;
	var gameLetras = [];
	var gameLetrasInfo = [];

	var spriteSheet = null;
	var nave = null;
	var	planeta = [];
	var asteroides = [];
	var letras = [];

	var intentos = [];
	var contIntentos = null;
	var dañoNivel = [];
	var contDaño = null;

	var contLetras = null;

	function Create(canvas, guia, palabra){
		stage = new createjs.Stage(canvas);
		keyManager = new KeyboardManager();
		guias = guia;
		palabras = palabra;
		contIntentos = 2;
		contLetras = 0;
		init();
	}

	function init(){
		game = palabras[Math.floor(Math.random()*palabras.length)];
		contDaño = 0;

		initGraphics();

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", refresh);
	}

	function initGraphics(){
		spriteSheet = createSpriteSheet();
		nave = createNave(spriteSheet, stage.canvas.height/2);
		stage.addChild(nave);
		planeta = createPlaneta(guias);
		for (var i = 0; i < planeta.length; i++) {
			stage.addChild(planeta[i]);
		};
		letras = createLetrasGame(game, planeta, letras);
		for(var i = 0; i < letras.length; i++){
			stage.addChild(letras[i]);
		};
		createGameArea();
		for (var i = 0; i < 10; i++) {
			createAsteroide(i);
		};
	
		createGameBar();
	}

	function refresh(){
		updateNave();
		stage.update();
		for (var i = 0; i < planeta.length; i++) {
			if (ndgmr.checkRectCollision(nave, planeta[i]) )
				aparecer();
		};
		for (var i = 0; i < asteroides.length; i++) {
			if (ndgmr.checkRectCollision(nave, asteroides[i]) ){
				createjs.Tween.removeTweens(asteroides[i]);
				asteroides[i].visible = false;
				createAsteroide(i);
				//
				dañoNivel[contDaño].visible = true;
				contDaño++;
				if(contDaño == 3)
					setTimeout(function(){aparecer(); }, 500);
			};
		};
		for (var i = 0; i < letras.length; i++){
			if(ndgmr.checkRectCollision(nave, letras[i]) ){
				if(contLetras == i){
					contLetras++;
					gameLetras[i].visible = false;
					stage.removeChild(letras[i]);
				}else{
					var pos = posicionar(planeta, letras);
					letras[i].x = pos.x;
					letras[i].y = pos.y+60;
				};
				if (contLetras == game.length) {
					newGame();
				};
			};
		};
	}

	function updateNave(){
		if (keyManager.isKeyPressed(KeyboardManager.LEFT_KEY)) {
			nave.x -= 10;
			if (nave.x < 0) {nave.x = 0};
		};
		if (keyManager.isKeyPressed(KeyboardManager.RIGHT_KEY)) {
			nave.x += 10;
			if (nave.x > stage.canvas.width - 117) {nave.x = stage.canvas.width - 117};
		};
		if (keyManager.isKeyPressed(KeyboardManager.UP_KEY)) {
			nave.y -= 10;
			if (nave.y < 60) {nave.y = 60};	//gameBar
		};
		if (keyManager.isKeyPressed(KeyboardManager.DOWN_KEY)) {
			nave.y += 10;
			if (nave.y > stage.canvas.height - 48) {nave.y = stage.canvas.height - 48};
		};
	}

	function createGameArea(){
		gameArea = new createjs.Container();
		gameArea.setBounds(0,0,1100,800);
		gameArea.x = 0;
		gameArea.y = 0;
		stage.addChild(gameArea);
	}

	function createGameBar(){
		gameBar = new createjs.Container();
		gameBar.setBounds(0,0,1100,50);
		gameBar.x = 0;
		gameBar.y = 0;

		gameBar.addChild(createFondoBar() );
		intentos = createIntentos();
		for (var i = 0; i < intentos.length; i++) {
			gameBar.addChild(intentos[i]);
		};
		gameLetrasInfo = createLetrasInfo(gameBar, game);
		gameLetras = createLetras(gameBar, game);
		for (var i = 0; i < game.length; i++) {
			gameBar.addChild(gameLetrasInfo[i]);
			gameBar.addChild(gameLetras[i]);
		};
		gameBar.addChild(createDañoLabel() );
		gameBar.addChild(createDañoFondo() );
		dañoNivel = createDañoNivel();
		for (var i = 0; i < dañoNivel.length; i++) {
			gameBar.addChild(dañoNivel[i]);
			dañoNivel[i].visible = false;
		};

		stage.addChild(gameBar);
	}

	function createAsteroide(i){
		var asteroide = new createjs.Bitmap("src/img/asteroide.png");
		asteroide.x = Math.floor(Math.random()*stage.canvas.width);

		var randomX = Math.floor(Math.random()*stage.canvas.width);
		var randomY = Math.floor(Math.random()*2);
		var randomtime = 15000+Math.floor(Math.random()*25000);

		asteroides[i] = asteroide;
		if (randomY == 1) {
			asteroides[i].y = -80;
			createjs.Tween.get(asteroides[i])
				.to({x:randomX, y:880}, randomtime, createjs.Ease.quadOut)
				.call(createAsteroide, [i], this);
		}else{
			asteroides[i].y = 880;
			createjs.Tween.get(asteroides[i])
				.to({x:randomX, y:-80}, randomtime, createjs.Ease.quadOut)
				.call(createAsteroide, [i], this);
		};

		gameArea.addChild(asteroides[i]);
	}

	function aparecer(){
		if (contIntentos == 0) {
			location.reload();
		};
		intentos[contIntentos].visible = false;
		contIntentos--;
		contDaño = 0;
		for (var i = 0; i < dañoNivel.length; i++) {
			dañoNivel[i].visible = false;		
		};
		nave.x = 0;
		nave.y = stage.canvas.height/2;
	}

	function newGame(){
		var cant = game.length;
		game = palabras[Math.floor(Math.random()*palabras.length)];
		contLetras = 0;

		for (var i = 0; i < gameLetras.length; i++) {
			gameLetrasInfo[i].visible = false;
			gameLetras[i].visible = false;
		}
		gameLetrasInfo.splice(0, cant);
		gameLetras.splice(0, cant);
		gameLetrasInfo = createLetrasInfo(gameBar, game);
		gameLetras = createLetras(gameBar, game);
		for (var i = 0; i < game.length; i++) {
			gameBar.addChild(gameLetrasInfo[i]);
			gameBar.addChild(gameLetras[i]);
		};

		for (var i = 0; i < letras.length; i++) {
			letras[i].visible = false;
		}
		letras.splice(0, cant);
		letras = createLetrasGame(game, planeta, letras);
		for(var i = 0; i < letras.length; i++){
			stage.addChild(letras[i]);
		};

		contDaño = 0;
		for (var i = 0; i < dañoNivel.length; i++) {
			dañoNivel[i].visible = false;		
		};
		nave.x = 0;
		nave.y = stage.canvas.height/2;
	}

	window.Create = Create;
})();
