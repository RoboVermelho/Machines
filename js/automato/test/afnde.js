(function(APP) {
	var nm = APP.namespace("APP.automato.test");
	var base = APP.base;
	
	nm.AfndeTest = function(config) {
		if (typeof config !== 'undefined') {
			if (config.constructor.name = "Object") {
				this.end_signal = config.end_signal;
				this.epson_signal = config.epson_signal;
				this.identifier = config.identifier;
			}
		}
	}
	// <--------------------------------------------------------------------->

	nm.AfndeTest.prototype.eclose = function(state) {
		var state_list = [],
			ident = this.identifier,
			epson=  this.epson_signal,
			exist_in_list = false;
		
		state_list.push(state);
		for (var state_cont = 0; state_cont < state_list.length; state_cont++) {
			state = state_list[state_cont];
			
			while (typeof state[epson] !== 'undefined' && exist_in_list === false) {
				var destinos_epson = state[epson],
					cont = 0,
					size = destinos_epson.length;
					
					if (size === 0) { break; }
					
					for (; cont < size; cont++) {
						destino = destinos_epson[cont];
						exist_in_list = base.hasObject(state_list,destino,ident);
						if (exist_in_list === false) {
							state_list.push(destino);
							state = state[epson];
						}				
					}
			}
		}
		return state_list;
	}
	// <--------------------------------------------------------------------->


	nm.AfndeTest.prototype.test = function(word,state_list) {
		var letter = word.shift(),
			valid_word,
			apply_func_list = [],
			cont = 0,
			eclose = this.eclose,
			identifier = this.identifier,
			e_close_result_list = [],
			end_signal = this.end_signal,
			size = state_list.length;
		
		if (typeof letter !== 'undefined') {
				
			for (; cont < size; cont++) {
				if (typeof state_list[cont][letter] !== 'undefined') {
					apply_func_list = apply_func_list.concat(state_list[cont][letter]);
				}
			}
			apply_func_list = base.arrayUnique(apply_func_list,identifier);
			
			////Aplicar e-close nos resultados.
			var eclose_list = [];
			size = apply_func_list.length;
			for (cont = 0; cont < size; cont++) {
				eclose_list = eclose_list.concat(this.eclose(apply_func_list[cont]));
			}
		   
			var new_states_list = base.arrayUnique(eclose_list,identifier);

			if(word.length !== 0) {
				valid_word = this.test(word,new_states_list);
			} else {
				valid_word = base.collectionHasProperty(new_states_list,end_signal);		
			}
		} else {
			valid_word = base.collectionHasProperty(state_list,end_signal);	
		}
		return valid_word;
	}
// <--------------------------------------------------------------------->
})(APP);
