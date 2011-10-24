function AfndToAfd(config) {
	for (i in config) {
		if (config.hasOwnProperty(i)) {
			this[i] = config[i];
		}
	}

};

/**
	Algoritmo para converção:
		Recebe estado inicial.
		Gera os testes para este estado (Estado x funcao_1 , estado x funcao_2, etc
		Enquanto houverem testes:
			Executa teste, e verifica o estado resultante.
			O conjunto de estados resultante não existe na máquina? Sim:
				Cria um novo estado.
				Adiciona estado na lista de estados.
				Armazene seu índice.
				Cria testes para este novo estado.
				Adiciona testes na lista de testes.
				
			Não:
				Identifique o indice do estado
			Define resultado do teste como sendo o índice.
		Fim Enquanto.
			
		Estrutura do estado:
		{
			state_ident : String,
			estado : [ ] //Lista de estados que ele representa.
		}
			
*/
AfndToAfd.prototype.convert = function(lista_letras,estado_inicial) {
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
					//nova_maquina[index_estado_testado][letra] = nova_maquina[state_index];
				  //  estado_existe = true;
				   // break;  
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
					//nova_maquina[index_estado_testado][letra] = nova_maquina[index_novo_estado];
					result_state_index  = index_novo_estado;
					
					
					test_list = addTests(test_list,estado_resultante,lista_letras);		//Registra novos testes.
				
				}
				nova_maquina[index_estado_testado][letra] = nova_maquina[result_state_index];
			}
        }
    return nova_maquina; 
}
// <--------------------------------------------------------------------->

AfndToAfd.prototype.isFinal = function(estado_base) {
	var final_signal = this.final_signal;
	var is_final = collectionHasProperty(estado_base.estado,final_signal);
	return is_final;
}

// <--------------------------------------------------------------------->
AfndToAfd.prototype.stateExists = function(maquina,state) {
        //Verifica se esse estado já existe na máquina.
        var estado_existe = false,
            size = maquina.length,
			ident = this.state_ident,
            cont = 0;
        
        for (; cont < size; cont++) {
            var est_nova_maquina = maquina[cont].estado;			
            estado_existe = equalSet(est_nova_maquina, state,  ident);
			if (estado_existe === true) {
				return true;
			}
		}
		return false;
}
// <--------------------------------------------------------------------->

AfndToAfd.prototype.addTests = function (test_list,novo_estado,lista_letras) {
    var size_letras = lista_letras.length,
        cont_letras = 0;
    for (; cont_letras < size_letras; cont_letras++) {
        test_list.push({ estado : novo_estado , 
                         letra : lista_letras[cont_letras] });
    } 
    return test_list;
}
// <--------------------------------------------------------------------->

AfndToAfd.prototype.stateGenerate =  function(estado,letra,identifier) {
    var cont  = 0,
        size = estado.length,
        estado_resultante = [];
    
    //Gera o estado resultante.
    for (; cont < size; cont++) {
        if (typeof estado[cont][letra] !== 'undefined') {
            estado_resultante = estado_resultante.concat(estado[cont][letra]);
        }
    }   
    estado_resultante = arrayUnique(estado_resultante,identifier);  
    return estado_resultante;    
}
// <--------------------------------------------------------------------->

AfndToAfd.prototype.getStateIndex = function(machine,state_field,state,identifier) {
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



