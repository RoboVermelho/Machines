(function(APP) {
	var nm = APP.namespace("APP.automato.conversor");
	var base = APP.base;
/**
    _epson - sinal para o epson
    _init        - sinal para estado inicial.
    _fim     - sinal para estado final.
    _ident  - identificador da classe.
*/
nm.AfndeToAfnd =  function (config) {
    for (i in config) {
        if (config.hasOwnProperty(i)) {
                this[i] = config[i];
        }
    }
}

/**
	Nota: a coleção de estados de cada elemento da nova máquina, ficam na chave "estado":
	estado = {
		nome : "Teste",
		estado : [ q1,q2,q3]
	}
*/
// <--------------------------------------------------------------------->
nm.AfndeToAfnd.prototype.convert =  function(lista_letras,estado_inicial) {
    var nova_maquina = [],
        state_name_counter = 0,
        final_state_name_counter = 0,
        ident = this._ident,
        addTests = this.addTests,
        final_state_sig = this._final,
        init_state_sig = this._init,
		getStateIndex = this.getStateIndex,
        test_list = [];

	lista_letras = base.arrayRemove(lista_letras,this._epson); //Remove epson da lista.
	
	//Criar primeiro estado
    nova_maquina[0] = { estado :  estado_inicial };    
    nova_maquina[0][ident] =  'q' + state_name_counter;
    test_list = addTests(test_list,nova_maquina[0].estado,lista_letras);
    state_name_counter++;
    nova_maquina[0][init_state_sig] = true;
	
	//Executa testes para cada letra em cada estado.
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
        estado_resultante = base.arrayUnique(estado_resultante,ident);      
        
        if (estado_resultante.length > 0)  {
			
			estado_resultante = this.applyEclose(estado_resultante);////Aplicar e-close nos resultados.
			var estado_existe = this.machineHasState(estado_resultante,nova_maquina); //Verifica se esse estado já existe na máquina.
			
			if (estado_existe === true) {
					var indice_estado =  getStateIndex (nova_maquina,'estado',estado_resultante,ident) ;
					nova_maquina[index_estado][letra] = nova_maquina[indice_estado];
					estado_existe = true;
			} else  { //Adiciona estado à máquina.
					var index_new_state = nova_maquina.length;
					nova_maquina[index_new_state] = { estado : estado_resultante };
					nova_maquina[index_new_state][ident] = 'q' + state_name_counter;
					
					var estado_final = base.collectionHasProperty(estado_resultante,final_state_sig);
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

/**
	Verifica se a máquina já possui um estado.
	Nota: os estados no caso são arrays de objetos.
*/
nm.AfndeToAfnd.prototype.machineHasState = function(novo_estado,maquina) {
	var size = maquina.length;
	var estado_existe = false;
	var ident = this._ident;
	var cont  = 0;
	
	for (; cont < size; cont++) {
		var est_maquina = maquina[cont].estado;
		estado_existe = base.equalSet(est_maquina, novo_estado,ident);
		if (estado_existe === true) {
			return true;
		}
	}
	return false;
}

nm.AfndeToAfnd.prototype.applyEclose = function(estado) {
    ////Aplicar e-close nos resultados.
    var eclose_list = [],
        cont = 0,
        eclose = this.eclose,
        ident = this._ident,
        estado_final = [],
        size = estado.length;
    
    for (; cont < size; cont++) {
        eclose_list = eclose_list.concat(eclose([],estado[cont]));
    }        
    estado_final  = base.arrayUnique(eclose_list,ident);  
    return estado_final;    
}
// <--------------------------------------------------------------------->

nm.AfndeToAfnd.prototype.addTests = function(test_list,novo_estado,lista_letras) {
    var size_letras = lista_letras.length,
        cont_letras = 0;
    for (; cont_letras < size_letras; cont_letras++) {
        test_list.push({ estado : novo_estado , letra : lista_letras[cont_letras] });
    } 
    return test_list;
}
// <--------------------------------------------------------------------->

nm.AfndeToAfnd.prototype.getStateIndex =  function (machine,state_field,state,identifier) {
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
// <--------------------------------------------------------------------->

nm.AfndeToAfnd.prototype.eclose = function(lista,estado) {
	var ident = this._ident,
		 epson = this._epson,
		 exist_in_list = false;
		 
		exist_in_list = base.hasObject(lista,estado,ident); 
		if (exist_in_list ===  false) {
			lista.push(estado);
		} else {
			return lista;
		}
		
		var cont = 0;
		var size = typeof estado[epson] !==  'undefined' ? estado[epson].length : 0;
		
		for (; cont < size; cont++) {
			var novo_estado = estado[epson][cont];
			var na_lista = base.hasObject(lista,novo_estado,ident);
			if (na_lista === false) {
				this.eclose(lista,novo_estado);
			}
		}
	return lista;
}

})(APP);

