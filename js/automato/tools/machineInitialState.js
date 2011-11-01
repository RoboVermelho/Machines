(function(APP) {
	var nm = APP.namespace("APP.tools");
	nm.MachineInitialState = function () {
			var estado_inicial;
			var init = APP.CONFIG.init_state;
			for (i in APP.maquina) {
				if (APP.maquina.hasOwnProperty(i)) {
					if (APP.maquina[i][init] === true) {
						estado_inicial = APP.maquina[i];
						return estado_inicial;
					}
				}
			}				
		}
})(APP);