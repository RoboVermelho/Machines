(function(APP) {
	var nm = APP.namespace("APP.tools");
	var base = APP.base;
	nm.MachineHasSymbol =  function(simbolo) {
		var funcao_existe = base.inArray(simbolo,APP.funcoes);
		var estado_existe = base.inArray(simbolo,APP.estados);
		var epson_signal = APP.CONFIG.epson_signal;
		
		if (funcao_existe === true || estado_existe === true || simbolo === epson_signal) {
			return true;
		} else {
			return false;
		}
	}	
	
})(APP);