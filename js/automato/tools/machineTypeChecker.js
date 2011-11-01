(function(APP)  {
	var nm = APP.namespace("APP.tools");
	nm.MachineTypeChecker = function () {
		var state_name_list = APP.estados;
		var state_list = [];
		var func_list = APP.funcoes;
		var cont = 0,
			epson = APP.CONFIG.epson_signal;
		
		for (var ct  = 0; ct < state_name_list.length; ct++) {
			state_list.push(APP.maquina[state_name_list[ct]]);
		}					
		
		var size = state_list.length;
		for (; cont < size; cont++) {
			if (typeof state_list[cont][epson] !== 'undefined') {
				if (state_list[cont][epson].length > 0) {
					return 'Afnde';
				}						
			}
		}

		for (cont = 0; cont < size; cont++) {
			for (var cont2 = 0; cont2 < func_list.length; cont2++) {
				if (typeof state_list[cont][func_list[cont2]]  !== 'undefined') {
					if (state_list[cont][func_list[cont2]].length > 1) {
						return 'Afnd';
					}
				}
			}
		}
		return 'Afd' ;
	}
})(APP);