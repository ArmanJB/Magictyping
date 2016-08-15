(function(){
	var	stage = null;
	var bgArea = null;
	var skyArea = null;
	var escArea = null;
	var buttonArea = null;
	var menuArea = null;

	var spriteSheet = null;
	var nave = null;
	var nubes = [];
	var title = null;

	function Create(canvas){
		stage = new createjs.Stage(canvas);
		stage.enableMouseOver(30);
		init();
	}

	function init(){
		initGraphics();

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", refresh);
	}

	function refresh(){stage.update(); }

	function initGraphics(){
		createBgArea();
		createSkyArea();
		createEscArea();
		createButtons();
		createMenu();

		//spriteSheet = createSpriteSheet();
		//nave = createNave(spriteSheet, stage.canvas.width/2, stage.canvas.height/2);
		//stage.addChild(nave);
		setTimeout(function(){ createjs.Tween.get(title).to({x:250,y:30,alpha:1},1000,createjs.Ease.getPowOut(2.5));}, 1500);
	}

	function createBgArea(){
		bgArea = new createjs.Container();
		bgArea.setBounds(0,0,1100,800);
		bgArea.x = 0;
		bgArea.y = 0;
		stage.addChild(bgArea);
		//
		var nubeBg = new createjs.Bitmap('src/img/cielo.png');
		nubeBg.x = 0;nubeBg.y = 0;
		createjs.Tween.get(nubeBg)
			.to({x:1100, y:0}, 20000, createjs.Ease.linear)
			.call(createBg, [], this);

		bgArea.addChild(nubeBg);
		//

		createBg();
	}

	function createSkyArea(){
		skyArea = new createjs.Container();
		skyArea.setBounds(0,0,1100,800);
		skyArea.x = 0;
		skyArea.y = 0;
		stage.addChild(skyArea);

		for (var i = 0; i < 10; i++) {createNube(i);};
	}

	function createEscArea(){
		escArea = new createjs.Container();
		escArea.setBounds(0,0,1100,800);
		escArea.x = 0;
		escArea.y = 0;
		stage.addChild(escArea);

		var castillo = new createjs.Bitmap('src/img/inicio_bg.png');
		castillo.x = 0; castillo.y = 0;
		escArea.addChild(castillo);

		var mago = new createjs.Bitmap('src/img/mago.png');
		mago.x = (stage.canvas.width/2)-55;
		mago.y = (stage.canvas.height/2)-80;
		mago.scaleX = 0.4; mago.scaleY = 0.4; //156*226
		escArea.addChild(mago);

		title = new createjs.Bitmap('src/img/titulo.png');
		title.x = 250; title.y = 100;
		title.alpha = 0;
		title.scaleX = 0.15; title.scaleY = 0.15;
		escArea.addChild(title);
	}

	function createButtons(){
		buttonArea = new createjs.Container();
		buttonArea.setBounds(0,0,1100,800);
		buttonArea.x = 0;
		buttonArea.y = 0;
		stage.addChild(buttonArea);

		var etuto = new createjs.Bitmap('src/img/botones/etiquetaTutorial.png');
		etuto.x = 280;
		etuto.y = 465;
		//stage.addChild(etuto);
		etuto.visible = false;
		buttonArea.addChild(etuto);

		var btutoh = new createjs.Bitmap('src/img/botones/botonTutoHover64x64.png');
		btutoh.x = 300;
		btutoh.y = 520;
		//stage.addChild(btutoh);
		buttonArea.addChild(btutoh);
		btutoh.addEventListener('mouseout', function(){
			btuto.visible = true;
			etuto.visible = false;
		});
		var btuto = new createjs.Bitmap('src/img/botones/botonTutoNatural64x64.png');
		btuto.x = 300;
		btuto.y = 520;
		//stage.addChild(btuto);
		buttonArea.addChild(btuto);
		btuto.addEventListener('mouseover', function(){
			btuto.visible = false;
			etuto.visible = true;
		});

		var eplay = new createjs.Bitmap('src/img/botones/etiquetaJugar.png');
		eplay.x = 490;
		eplay.y = 465;
		//stage.addChild(eplay);
		buttonArea.addChild(eplay);
		eplay.visible = false;

		var bplayh = new createjs.Bitmap('src/img/botones/botonPlayHover64x64.png');
		bplayh.x = (stage.canvas.width/2)-40;
		bplayh.y = 520;
		//stage.addChild(bplayh);
		buttonArea.addChild(bplayh);
		bplayh.addEventListener('mouseout', function(){
			bplay.visible = true;
			eplay.visible = false;
		});
		bplayh.addEventListener('click', function(){
			buttonArea.visible = false;
			escArea.visible = false;
			menuArea.visible = true;
		});
		var bplay = new createjs.Bitmap('src/img/botones/botonPlayNatural64x64.png');
		bplay.x = (stage.canvas.width/2)-40;
		bplay.y = 520;
		//stage.addChild(bplay);
		buttonArea.addChild(bplay);
		bplay.addEventListener('mouseover', function(){
			bplay.visible = false;
			eplay.visible = true;
		});

		var esound = new createjs.Bitmap('src/img/botones/etiquetaSonido.png');
		esound.x = 680;
		esound.y = 465;
		//stage.addChild(esound);
		buttonArea.addChild(esound);
		esound.visible = false;

		var bsoundh = new createjs.Bitmap('src/img/botones/botonSonidoHover64x64.png');
		bsoundh.x = 700;
		bsoundh.y = 520;
		//stage.addChild(bsoundh);
		buttonArea.addChild(bsoundh);
		bsoundh.addEventListener('mouseout', function(){
			bsound.visible = true;
			esound.visible = false;
		});
		var bsound = new createjs.Bitmap('src/img/botones/botonSonidoNatural64x64.png');
		bsound.x = 700;
		bsound.y = 520;
		//stage.addChild(bsound);
		buttonArea.addChild(bsound);
		bsound.addEventListener('mouseover', function(){
			bsound.visible = false;
			esound.visible = true;
		});
	}

	/*************************************/

	function createBg() {
		var nubeBg = new createjs.Bitmap('src/img/cielo.png');
		nubeBg.x = -1100;nubeBg.y = 0;

		createjs.Tween.get(nubeBg, {loop: true}).to({x:1100, y:0}, 40000, createjs.Ease.linear);
		bgArea.addChild(nubeBg);
	}

	function createNube(i){
		var nube = new createjs.Bitmap('src/img/nube'+(Math.floor(Math.random()*3)+1)+'.min.png');
		nube.scaleX = 1.5;nube.scaleY = 1.5;
		nube.x = -200; nube.y = Math.floor(Math.random()*(stage.canvas.height/7));
		var randomtime = 20000+Math.floor(Math.random()*25000);

		nubes[i] = nube;
		createjs.Tween.get(nubes[i])
			.to({x:1220, y:nubes[i].y}, randomtime, createjs.Ease.quadOut)
			.call(createNube, [i], this);

		skyArea.addChild(nubes[i]);
	}

	function createMenu(){
		menuArea = new createjs.Container();
		menuArea.setBounds(0,0,1100,800);
		menuArea.x = 0;
		menuArea.y = 0;
		stage.addChild(menuArea);

		var trama = new createjs.Bitmap('src/img/trama.png');
		trama.x = 0;
		trama.y = 0;
		menuArea.addChild(trama);

		var titleMenu = new createjs.Bitmap('src/img/niveles/tituloPantallaNiveles.png');
		titleMenu.x = 300; titleMenu.y = 50;
		titleMenu.scaleX = 0.15; titleMenu.scaleY = 0.15;
		menuArea.addChild(titleMenu);

		var bbasicoh = new createjs.Bitmap('src/img/niveles/botonBasicoHover.png');
		bbasicoh.x = 440; bbasicoh.y = 200;
		bbasicoh.scaleX = 0.2; bbasicoh.scaleY = 0.2;
		menuArea.addChild(bbasicoh);
		var bbasico = new createjs.Bitmap('src/img/niveles/botonBasicoNatural.png');
		bbasico.x = 440; bbasico.y = 200;
		bbasico.scaleX = 0.2; bbasico.scaleY = 0.2;
		menuArea.addChild(bbasico);
		bbasico.addEventListener('mouseover', function(){
			bbasico.visible = false;
		});
		bbasicoh.addEventListener('mouseout', function(){
			bbasico.visible = true;
		});
		bbasicoh.addEventListener('click', function(){
			playGame('basico')
		});

		var bintermedioh = new createjs.Bitmap('src/img/niveles/botonIntermedioHover.png');
		bintermedioh.x = 440; bintermedioh.y = 310;
		bintermedioh.scaleX = 0.2; bintermedioh.scaleY = 0.2;
		menuArea.addChild(bintermedioh);
		var bintermedio = new createjs.Bitmap('src/img/niveles/botonIntermedioNatural.png');
		bintermedio.x = 440; bintermedio.y = 310;
		bintermedio.scaleX = 0.2; bintermedio.scaleY = 0.2;
		menuArea.addChild(bintermedio);
		bintermedio.addEventListener('mouseover', function(){
			bintermedio.visible = false;
		});
		bintermedioh.addEventListener('mouseout', function(){
			bintermedio.visible = true;
		});
		bintermedioh.addEventListener('click', function(){
			playGame('intermedio')
		});

		var bexpertoh = new createjs.Bitmap('src/img/niveles/botonExpertoHover.png');
		bexpertoh.x = 440; bexpertoh.y = 420;
		bexpertoh.scaleX = 0.2; bexpertoh.scaleY = 0.2;
		menuArea.addChild(bexpertoh);
		var bexperto = new createjs.Bitmap('src/img/niveles/botonExpertoNatural.png');
		bexperto.x = 440; bexperto.y = 420;
		bexperto.scaleX = 0.2; bexperto.scaleY = 0.2;
		menuArea.addChild(bexperto);
		bexperto.addEventListener('mouseover', function(){
			bexperto.visible = false;
		});
		bexpertoh.addEventListener('mouseout', function(){
			bexperto.visible = true;
		});
		bexpertoh.addEventListener('click', function(){
			playGame('experto')
		});

		menuArea.visible = false;
	}

	function playGame(nivel){
		stage.removeAllChildren();
		var esc = new createjs.Bitmap('src/img/escenario.png');
		esc.x = 0; esc.y = 50;
		stage.addChild(esc);
		createGameBar();
	}

	function createGameBar(){
		gameBar = new createjs.Container();
		gameBar.setBounds(0,0,1100,50);
		gameBar.x = 0;
		gameBar.y = 0;

		gameBar.addChild(createFondoBar() );

		/*gameLetrasInfo = createLetrasInfo(gameBar, game);
		gameLetras = createLetras(gameBar, game);
		for (var i = 0; i < game.length; i++) {
			gameBar.addChild(gameLetrasInfo[i]);
			gameBar.addChild(gameLetras[i]);
		};*/
		gameBar.addChild(createDañoLabel() );
		gameBar.addChild(createDañoFondo() );
		
		var dañoNivel = new createjs.Shape();
		dañoNivel.graphics
			.beginFill("red")
			.drawRoundRectComplex(811,25,223,14,7,7,7,7);

		gameBar.addChild(dañoNivel);

		stage.addChild(gameBar);
	}


	window.Create = Create;
})();
