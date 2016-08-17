function KeyboardManager(){
	this.keyMap = {};
	document.body.onkeydown = Delegate.create(this, this.addKeyToMap);
	document.body.onkeyup = Delegate.create(this, this.removeKeyFromMap);
}

KeyboardManager.LEFT_KEY = 'k37';
KeyboardManager.UP_KEY = 'k38';
KeyboardManager.RIGHT_KEY = 'k39';
KeyboardManager.DOWN_KEY = 'k40';

KeyboardManager.A_Key = 'k65';
KeyboardManager.B_Key = 'k66';
KeyboardManager.C_Key = 'k67';
KeyboardManager.D_Key = 'k68';
KeyboardManager.E_Key = 'k69';
KeyboardManager.F_Key = 'k70';
KeyboardManager.G_Key = 'k71';
KeyboardManager.H_Key = 'k72';
KeyboardManager.I_Key = 'k73';
KeyboardManager.J_Key = 'k74';
KeyboardManager.K_Key = 'k75';
KeyboardManager.L_Key = 'k76';
KeyboardManager.M_Key = 'k77';
KeyboardManager.N_Key = 'k78';
KeyboardManager.O_Key = 'k79';
KeyboardManager.P_Key = 'k80';
KeyboardManager.Q_Key = 'k81';
KeyboardManager.R_Key = 'k82';
KeyboardManager.S_Key = 'k83';
KeyboardManager.T_Key = 'k84';
KeyboardManager.U_Key = 'k85';
KeyboardManager.V_Key = 'k86';
KeyboardManager.W_Key = 'k87';
KeyboardManager.X_Key = 'k88';
KeyboardManager.Y_Key = 'k89';
KeyboardManager.Z_Key = 'k90';

KeyboardManager.prototype.addKeyToMap = function(e){
	var key = e.keyCode;
	this.keyMap["k"+key] = true;
}

KeyboardManager.prototype.removeKeyFromMap = function(e){
	var key = e.keyCode;
	if (this.keyMap["k"+key]) {
		this.keyMap["k"+key] = null;
	};
}

KeyboardManager.prototype.isKeyPressed = function(key){
	return	this.keyMap[key];
}

KeyboardManager.prototype.getTeclado = function() {
	return [KeyboardManager.A_Key, KeyboardManager.B_Key, KeyboardManager.C_Key, KeyboardManager.D_Key,
			KeyboardManager.E_Key, KeyboardManager.F_Key, KeyboardManager.G_Key, KeyboardManager.H_Key, 
			KeyboardManager.I_Key, KeyboardManager.J_Key, KeyboardManager.K_Key, KeyboardManager.L_Key,
			KeyboardManager.M_Key, KeyboardManager.N_Key, KeyboardManager.O_Key, KeyboardManager.P_Key,
			KeyboardManager.Q_Key, KeyboardManager.R_Key, KeyboardManager.S_Key, KeyboardManager.T_Key,
			KeyboardManager.U_Key, KeyboardManager.V_Key, KeyboardManager.W_Key, KeyboardManager.X_Key,
			KeyboardManager.Y_Key, KeyboardManager.Z_Key
	];
}

KeyboardManager.prototype.getKey = function(item){
	var letters = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 'P','Q', 'R', 'S', 'T','U', 'V', 'W', 'X','Y', 'Z'];
	var keys = this.getTeclado();
	var merge = [];
	keys.forEach(function(itm, index){
		merge[itm] = letters[index];
	});

	return merge[item];
}