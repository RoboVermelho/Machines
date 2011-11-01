(function(APP) {
	var nm = APP.namespace("APP.automato.conversor");
	var base = APP.base;
	
nm.AfndToAfd =  function (config) {
		for (i in config) {
			if (config.hasOwnProperty(i)) {
				this[i] = config[i];
			}
		}
	};


nm.AfndToAfd.prototype.convert = function(lista_letras,estado_inicial) {
    var nova_maquina = [],
        state_name_counter = 0,
        ident = this.state_ident,
        final_signal = this.final_signal,//'final',
        init_signal = this.init_signal,// 'initial',
		addTests = this.addTests,
		getStateIndex = this.getStateIndex,  
		stateGenerate = this.stateGenerate,
		state_base_name = this.state_base_name,
        test_list = [];

    nova_maquina[0] = { estado :  [estado_inicial], nome : state_base_name + state_name_counter };   
    nova_maquina[0][init_signal] = true;
    test_list = addTests(test_list,nova_maquina[0].estado,lista_letras);
    state_name_counter++;
    
    for (var cont = 0; cont < test_list.length; cont++) {
        var test = test_list[cont],
			result_state_index = 0,
			index_estado_testado = 0,
            estado = test.estado,
            letra 	   = test.letra,
            estado_resultante = [],
            index_estado_testado = getStateIndex(nova_maquina,'estado',estado,ident);

            //Gera o estado resultante.        
            estado_resultante = stateGenerate(estado,letra,ident);
        
		
			if (estado_resultante.length > 0) {
				//Verifica se esse estado já existe na máquina.
				var estado_existe = this.stateExists(nova_maquina,estado_resultante);
				if (estado_existe === true) {
					result_state_index = this.getStateIndex(nova_maquina,'estado',estado_resultante,ident);
				} else {
					//Registra novo estado
					var novo_estado = { estado : estado_resultante, nome : state_base_name + state_name_counter };
					var index_novo_estado = nova_maquina.length;
					nova_maquina[index_novo_estado] = novo_estado;
					state_name_counter++;
					
					//Verificar se o estado é final:
					var is_final = this.isFinal(novo_estado); 
					if (is_final === true) {
						nova_maquina[index_novo_estado][final_signal] = true;
					}

					result_state_index  = index_novo_estado;
					
					
					test_list = addTests(test_list,estado_resultante,lista_letras);		//Registra novos testes.
				
				}
				nova_maquina[index_estado_testado][letra] = nova_maquina[result_state_index];
			}
        }
    return nova_maquina; 
}
// <--------------------------------------------------------------------->

nm.AfndToAfd.prototype.isFinal = function(estado_base) {
	var final_signal = this.final_signal;
	var is_final = base.collectionHasProperty(estado_base.estado,final_signal);
	return is_final;
}

// <--------------------------------------------------------------------->
nm.AfndToAfd.prototype.stateExists = function(maquina,state) {
        //Verifica se esse estado já existe na máquina.
        var estado_existe = false,
            size = maquina.length,
			ident = this.state_ident,
            cont = 0;
        
        for (; cont < size; cont++) {
            var est_nova_maquina = maquina[cont].estado;			
            estado_existe = base.equalSet(est_nova_maquina, state,  ident);
			if (estado_existe === true) {
				return true;
			}
		}
		return false;
}
// <--------------------------------------------------------------------->

nm.AfndToAfd.prototype.addTests = function (test_list,novo_estado,lista_letras) {
    var size_letras = lista_letras.length,
        cont_letras = 0;
    for (; cont_letras < size_letras; cont_letras++) {
        test_list.push({ estado : novo_estado , 
                         letra : lista_letras[cont_letras] });
    } 
    return test_list;
}
// <--------------------------------------------------------------------->

nm.AfndToAfd.prototype.stateGenerate =  function(estado,letra,identifier) {
    var cont  = 0,
        size = estado.length,
        estado_resultante = [];
    
    //Gera o estado resultante.
    for (; cont < size; cont++) {
        if (typeof estado[cont][letra] !== 'undefined') {
            estado_resultante = estado_resultante.concat(estado[cont][letra]);
        }
    }   
    estado_resultante = base.arrayUnique(estado_resultante,identifier);  
    return estado_resultante;    
}
// <--------------------------------------------------------------------->

nm.AfndToAfd.prototype.getStateIndex = function(machine,state_field,state,identifier) {
    var cont = 0,
        found = false,
        size = machine.length;
    for (; cont < size; cont++) {
        found = base.equalSet(machine[cont][state_field],state,identifier);
        if (found === true) {
            return cont;
        }
    }
    return -1;
}

})(APP);

