var APP = APP || {};
APP.funcoes = [];
APP.estados = [];
APP.maquina = {};
APP.CONFIG = {};
APP.CONFIG.state_identifier = 'nome';
APP.CONFIG.epson_signal = 'E';
APP.CONFIG.init_state = '_inicial';
APP.CONFIG.end_state = '_final';

APP.DOM = {};
APP.DOM.tela_maquina = "div#paper";

/**
	Cria ou acessa namespaces.
	@param {String} ns_string - nome do namespace desejado.
	@return {Object}
*/
APP.namespace = function (ns_string) {
	var parts = ns_string.split('.'),
	parent = APP,
	i;
	// strip redundant leading global
	if (parts[0] === "APP") {
		parts = parts.slice(1);
	}
	for (i = 0; i < parts.length; i += 1) {
		// create a property if it doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};