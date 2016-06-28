function Delegate(){

}

Delegate.create = function(scope, method){
	return function(){
		return	method.apply(scope, arguments);
	}
}