(function(){
	var teclado = null;
	var keyManager = null;

	var	stage = null;
	var bgArea = null;
	var skyArea = null;
	var escArea = null;
	var buttonArea = null;
	var menuArea = null;

	var spriteSheet = null;
	var nubes = [];
	var title = null;

	var guiasVar = null;
	var nivelActual = null;
	var palabra = null;
	var palabraGr = [];
	var palabraCont = 0;

	var contGraf = null;
	var contador = 0;

	var mago = null;
	var ogros = [];

	var gameBar = null;
	var dañoNivel = null;
	var dañoVar = 223;

	function Create(canvas){
		stage = new createjs.Stage(canvas);
		stage.enableMouseOver(30);

		keyManager = new KeyboardManager();
		teclado = keyManager.getTeclado();
		init();
	}

	function init(){
		initGraphics();

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", refresh);
	}

	function refresh(){
		updateTeclado();
		stage.update(); 
		if (dañoVar <= 0) {
			dañoNivel.visible = false;
			for (var i = 0; i < ogros.length; i++) {
				createjs.Tween.removeTweens(ogros[i]);
				stage.removeChild(ogros[i]);
			};
			dañoVar = 1;
			swal({
					title: 'Buen trabajo!',
					text: 'Tu puntuación en esta partida fue: <b>'+contador+'</b>',
					type: 'success',
					confirmButtonColor: '#8CD4F5',
					confirmButtonText: 'Jugar nuevamente!',
					timer: 3000,
  					showConfirmButton: false,
  					html: true
				},
				function(){
					location.reload();
				}
			);
		};
	}

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

		mago = new createjs.Bitmap('src/img/mago.png');
		mago.x = 185;
		mago.y = 140;
		mago.scaleX = 0.35; mago.scaleY = 0.35;
		stage.addChild(mago);

		nivelActual = nivel;
		createGameBar();

		guiasVar = guias();
		for (var i = 1; i <= 8; i++) {
			setTimeout(function(){ 
				playOgros(guiasVar[Math.floor(Math.random()*guiasVar.length)], ogros.length);
			}, (i*2500));
		}
	}

	function createGameBar(){
		if (gameBar!=null) {gameBar.removeAllChildren();};
		gameBar = new createjs.Container();
		gameBar.setBounds(0,0,1100,50);
		gameBar.x = 0;
		gameBar.y = 0;

		var fondoBar = new createjs.Shape();
		fondoBar.graphics
			.setStrokeStyle(3)
			.beginStroke("#000080")
			.beginFill("#323a72")
			.drawRoundRectComplex(0,0,1100,60,15,15,0,0);
		gameBar.addChild(fondoBar);

		var daño = new createjs.Text("Ogros: ", "20px Arial", "white");
		daño.textBaseLine = "top";
		daño.x = 580;
		daño.y = 20;
		gameBar.addChild(daño);

		contGraf = new createjs.Text(contador, "20px Arial", "white");
		contGraf.textBaseLine = "top";
		contGraf.x = 650;
		contGraf.y = 20;
		gameBar.addChild(contGraf);

		daño = new createjs.Text("Fortaleza: ", "20px Arial", "white");
		daño.textBaseLine = "top";
		daño.x = 710;
		daño.y = 20;
		gameBar.addChild(daño);

		var dañoFondo = new createjs.Shape();
		dañoFondo.graphics
			.beginFill("black")
			.drawRoundRect(810,23,225,18,8);
		gameBar.addChild(dañoFondo);
		
		dañoNivel = new createjs.Shape();
		dañoNivel.graphics
			.beginFill("red")
			.drawRoundRectComplex(811,25,dañoVar,14,7,7,7,7);
		gameBar.addChild(dañoNivel);

		/************************************/
		var conjunto = palabras(nivelActual);
		palabra = conjunto[Math.floor(Math.random()*conjunto.length)];
		//console.log(palabra);

		var posX = 50;
		for (var i = 0; i < palabra.length; i++) {
			var info = new createjs.Text(palabra[i], "45px Arial", "white");
			info.textBaseLine = "top";
			info.x = posX + 35;
			info.y = 15;
			gameBar.addChild(info);

			posX = info.x;
		}

		var posX = 50;
		for (var i = 0; i < palabra.length; i++) {
			palabraGr[i] = new createjs.Text(palabra[i], "45px Arial", "green");
			palabraGr[i].textBaseLine = "top";
			palabraGr[i].x = posX + 35;
			palabraGr[i].y = 15;
			gameBar.addChild(palabraGr[i]);

			posX = palabraGr[i].x;
		};

		stage.addChild(gameBar);
	}

	function updateTeclado(){
		if (palabra!=null) {
			teclado.forEach(function(item){
				if (keyManager.isKeyPressed(item)) {
					if (keyManager.getKey(item)==palabra[palabraCont]) {
						palabraGr[palabraCont].visible = false;
						palabraCont++;
						//console.log(palabraCont+' '+palabra.length);
					};
					if (palabra.length == palabraCont) {
						//window.alert('Lo has hecho bien');
						ataque();
						palabraCont=0;
						palabra = null;
						palabraGr = [];
						createGameBar();	
					};
				};
			});
		};
	}

	function playOgros(guia, i){
		var ogro = new createjs.Bitmap('src/img/ogro.png');
		ogro.scaleX = 0.2;ogro.scaleY = 0.2;
		ogro.x = 1150; ogro.y = guia.y;
		//var randomtime = 20000+Math.floor(Math.random()*25000);

		ogros.push(ogro);
		createjs.Tween.get(ogros[i])
			.to({x:guia.toX, y:guia.toY}, 10000, createjs.Ease.linear)
			.call(ataqueOgro, [ogros[i]], this)

		stage.addChild(ogros[i]);
	}
	function ataqueOgro(ogro){
		createjs.Tween.get(ogro)
			.to({y:295},500, createjs.Ease.linear)
			.to({y:300},500, createjs.Ease.linear)
			.call(disminuir, [ogro], this);
	}
	function disminuir(ogro){
		gameBar.removeChild(dañoNivel);
		dañoNivel = new createjs.Shape();
		dañoNivel.graphics
			.beginFill("red")
			.drawRoundRectComplex(811,25,(dañoVar-2),14,7,7,7,7);
		gameBar.addChild(dañoNivel);
		dañoVar=dañoVar-2;

		ataqueOgro(ogro);
	}

	function ataque(){
		stage.removeChild(mago);
		mago = new createjs.Bitmap('src/img/magoWin.png');
		mago.x = 185;
		mago.y = 140;
		mago.scaleX = 0.35; mago.scaleY = 0.35;
		stage.addChild(mago);
		setTimeout(function(){
			stage.removeChild(mago);
			mago = new createjs.Bitmap('src/img/mago.png');
			mago.x = 185;
			mago.y = 140;
			mago.scaleX = 0.35; mago.scaleY = 0.35;
			stage.addChild(mago);
		}, 250);
		//
		var ogX = ogros[0].x;
		var ogY = ogros[0].y;
		createjs.Tween.removeTweens(ogros[0]);
		ogros[0].visible=false;
		stage.removeChild(ogros[0])
		ogros.splice(0,1);
		//
		contador++;
		gameBar.removeChild(contGraf);
		contGraf = new createjs.Text(contador, "20px Arial", "white");
		contGraf.textBaseLine = "top";
		contGraf.x = 650;
		contGraf.y = 20;
		gameBar.addChild(contGraf);
		//
		setTimeout(function(){
			playOgros(guiasVar[Math.floor(Math.random()*guiasVar.length)], ogros.length);
		}, 5000);
		//
		var spriteSheet = new createjs.SpriteSheet({
			images:['src/img/ataques/flamaSprite.png'],
			frames: {width:180, height:220, count:12, regX:0, regY:0},
			animations: {stand: [0,11,'stand']}
		});
		var flamaBebe = new createjs.Sprite(spriteSheet, 'stand');
		flamaBebe.setBounds(0,0,180,220)
		flamaBebe.scaleX = 0.3; flamaBebe.scaleY = 0.3;
		flamaBebe.x = ogX
		flamaBebe.y = ogY;
		stage.addChild(flamaBebe);

		setTimeout(function(){
			stage.removeChild(flamaBebe);
		}, 5000);
	}


	window.Create = Create;
})();
