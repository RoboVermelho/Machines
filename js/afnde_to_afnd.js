
/**
    _epson - sinal para o epson
    _init        - sinal para estado inicial.
    _fim     - sinal para estado final.
    _ident  - identificador da classe.
*/
function AfndeToAfnd(config) {
    for (i in config) {
        if (config.hasOwnProperty(i)) {
                this[i] = config[i];
        }
    }
}

// <--------------------------------------------------------------------->
AfndeToAfnd.prototype.convert =  function(lista_letras,estado_inicial) {
    var nova_maquina = [],
        state_name_counter = 0,
        final_state_name_counter = 0,
        ident = this._ident,
        addTests = this.addTests,
        final_state_sig = this._final,
        init_state_sig = this._init,
		getStateIndex = this.getStateIndex,
        test_list = [];

    nova_maquina[0] = { estado :  estado_inicial };    
    nova_maquina[0][ident] =  'q' + state_name_counter;
    test_list = addTests(test_list,nova_maquina[0].estado,lista_letras);
    state_name_counter++;
    nova_maquina[0][init_state_sig] = true;
    for (var cont = 0; cont < test_list.length; cont++) {
        
        var test = test_list[cont],
            estado = test.estado,
            letra = test.letra,
            estado_resultante = [],
            size_estado = estado.length,
            estado_counter = 0,
            index_estado = getStateIndex(nova_maquina,'estado',estado,ident);

        //Gera o estado resultante.
        for (; estado_counter < size_estado; estado_counter++) {
            if (typeof estado[estado_counter][letra] !== 'undefined') {
                estado_resultante = estado_resultante.concat(estado[estado_counter][letra]);
            }
        }   
        estado_resultante = arrayUnique(estado_resultante,ident);      
        
        if (estado_resultante.length > 0)  {
			////Aplicar e-close nos resultados.
			estado_resultante = this.applyEclose(estado_resultante);
			
			//Verifica se esse estado já existe na máquina.
			var estado_existe = false,
				size_maquina = nova_maquina.length,
				counter_maquina = 0;
			
			for (; counter_maquina < size_maquina; counter_maquina++) {
				var est_nova_maquina = nova_maquina[counter_maquina].estado
				estado_existe = equalSet(est_nova_maquina, estado_resultante,
										 ident);
				
				if (estado_existe === true) {
					nova_maquina[index_estado][letra] = nova_maquina[counter_maquina];
					estado_existe = true;
					break;  
				}
			}

			if (estado_existe === false) {//Adiciona estado à máquina.
				var index_new_state = nova_maquina.length;
				nova_maquina[index_new_state] = { estado : estado_resultante };
				nova_maquina[index_new_state][ident] = 'q' + state_name_counter;
				
				var estado_final = collectionHasProperty(estado_resultante,final_state_sig);
				if (estado_final === true) {
					nova_maquina[index_new_state][final_state_sig] = true;
				}
				state_name_counter++;
				
				nova_maquina[index_estado][letra] = nova_maquina[index_new_state];
				test_list = addTests(test_list,estado_resultante,lista_letras);
			} 
		}
    }
    return nova_maquina; 
}
// <--------------------------------------------------------------------->

AfndeToAfnd.prototype.applyEclose = function(estado) {
    ////Aplicar e-close nos resultados.
    var eclose_list = [],
        cont = 0,
        eclose = this.eclose,
        ident = this._ident,
        estado_final = [],
        size = estado.length;
    
    for (; cont < size; cont++) {
        eclose_list = eclose_list.concat(eclose(estado[cont]));
    }        
    estado_final  = arrayUnique(eclose_list,ident);  
    return estado_final;    
}
// <--------------------------------------------------------------------->

AfndeToAfnd.prototype.addTests = function(test_list,novo_estado,lista_letras) {
    var size_letras = lista_letras.length,
        cont_letras = 0;
    for (; cont_letras < size_letras; cont_letras++) {
        test_list.push({ estado : novo_estado , letra : lista_letras[cont_letras] });
    } 
    return test_list;
}
// <--------------------------------------------------------------------->

AfndeToAfnd.prototype.getStateIndex =  function (machine,state_field,state,identifier) {
    var cont = 0,
        found = false,
        size = machine.length;
    for (; cont < size; cont++) {
        found = equalSet(machine[cont][state_field],state,identifier);
        if (found === true) {
            return cont;
        }
    }
    return -1;
}
// <--------------------------------------------------------------------->


AfndeToAfnd.prototype.eclose = function(state) {
    var state_list = [],
        epson = this._epson,
        ident = this._ident,
        exist_in_list = false;
    
    state_list.push(state);
    while (typeof state[epson] !== 'undefined' && exist_in_list === false) {
        exist_in_list = hasObject(state_list,state[epson],ident);
        if (exist_in_list === false) {
            state_list.push(state[epson]);
            state = state[epson];
        }
    }
    return state_list;
}
