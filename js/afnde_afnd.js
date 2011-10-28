
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

/**
	Define o estado destino, à partir de um estado base (ex: q1) e uma função (ex: a)
*/
AfndeToAfnd.prototype.destinyState = function(estado,letra) {
		var cont = 0,
			  size = state.length,
			  ident = this.ident,
			  estado_resultante = [];
			  
			  
        //Gera o estado resultante.
        for (; cont < size; cont++) {
            if (typeof estado[cont][letra] !== 'undefined') {
                estado_resultante = estado_resultante.concat(estado[cont][letra]);
            }
        }   
        estado_resultante = arrayUnique(estado_resultante,ident);      
        estado_resultante = this.applyEclose(estado_resultante);////Aplicar e-close nos resultados.
		return estado_resultante;

}
// <--------------------------------------------------------------------->
AfndeToAfnd.prototype.convert =  function(lista_letras,estado_inicial) {
    var nova_maquina = [],
        state_name_counter = 0,
        ident = this._ident,
        addTests = this.addTests,
        final_state_sig = this._final,
        init_state_sig = this._init,
		getStateIndex = this.getStateIndex,
        test_list = [];

	//Cria primeiro estado.	
	var first_state = { estado :  estado_inicial};
	first_state[ident] =  'q' + state_name_counter;
	first_state[init_state_sig] = true;
	nova_maquina.push(first_state);
	
    test_list = addTests(test_list,nova_maquina[0].estado,lista_letras);
    state_name_counter++;
	
    for (var cont = 0; cont < test_list.length; cont++) {
        
        var test = test_list[cont],
            estado = test.estado,
            letra = test.letra,
            size_estado = estado.length,
            estado_counter = 0,
            index_estado = getStateIndex(nova_maquina,'estado',estado,ident);

		var estado_resultante = this.destinyState(estado,letra);
		 var estado_existe = this.hasState(nova_maquina,estado_resultante);//Verifica se esse estado já existe na máquina.
		 
		if (estado_existe === true) {
			var estado_resultante_index = this.getStateIndex(nova_maquina,'estado',estado_resultante,ident);
			nova_maquina[index_estado][letra] = nova_maquina[estado_resultante_index];
        }  else  {//Adiciona estado à máquina.
            var novo_estado = { estado : estado_resultante };
			novo_estado[ident] = 'q' + state_name_counter;
			nova_maquina.push(novo_estado);
			var index_novo_estado = this.getStateIndex(nova_maquina,'estado',novo_estado,ident);
			
            var estado_final = collectionHasProperty(estado_resultante,final_state_sig);
            if (estado_final === true) {
                nova_maquina[index_new_state][final_state_sig] = true;
            }
            state_name_counter++;
            
            nova_maquina[index_estado][letra] = nova_maquina[index_new_state];
            test_list = addTests(test_list,estado_resultante,lista_letras);
        } 
    }
    return nova_maquina; 
}
// <--------------------------------------------------------------------->

AfndeToAfnd.prototype.applyEclose = function(estado) {////Aplicar e-close nos resultados.

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

/** Verifica se um estado existe na máquina, através do conjunto de estados */
AfndeToAfnd.prototype.hasState = function (nova_maquina,nv_estado) {
        var estado_existe = false,
            size = nova_maquina.length,
			ident = this.ident,
            cont = 0;
        
        for (; cont < size ; cont++) {
            var est_nova_maquina = nova_maquina[cont].estado;
            estado_existe = equalSet(est_nova_maquina, nv_estado,ident);
			if (estado_existe === true) { return true; }
		}
	return false;
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
