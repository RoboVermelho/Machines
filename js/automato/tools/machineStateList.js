(function(APP) {
	var nm = APP.namespace("APP.tools");
	nm.MachineStateList = function(machine) {
		var machine = machine || APP.maquina;
		var lista_estados = [];
		for (i in machine) {
			if (machine.hasOwnProperty(i)) {
				lista_estados.push(machine[i]);
			}
		}	
		return lista_estados;
	}	
})(APP);