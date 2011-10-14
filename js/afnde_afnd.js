var q0 = {},
    q1 = {},
    q2 = {},
    qf = {};

q0.__constructor__ = 'q0';
q0.a = [q1,q0];
q0.b = [q0];


q1.__constructor__ = 'q1';
q1.a = [q2];
//q1.b = [q1];


q2.__constructor__ = 'q2';
q2.b = [qf];

qf.__constructor__ = 'qf';
qf.final = true;

//Definindo funções vazias.
q0.E = q1;
q1.E = q2;

// <--------------------------------------------------------------------->
function hasObject(collection,obj,identifier) {
    var size = collection.length,
        cont = 0;
    
    for(; cont < size; cont++) {
        if (collection[cont][identifier] === obj[identifier]) {
            return true;
        }
    }
    return false;
}

function collectionHasProperty(collection,property) {
    var size = collection.length,
        cont = 0;
    
    for (; cont < size; cont++) {
        if (collection[cont].hasOwnProperty(property)) {
            return true;
        }
    }
    return false;    
}

function hasProperty(obj,property) {
    if (obj.hasOwnProperty(property)) {
        return true;
    }
    return false;
}

// <--------------------------------------------------------------------->
function arrayUnique(_array,identifier) {
    var new_array = [],
        cont = 0,
        exist_in_array = false,
        size = _array.length;

    for (; cont < size; cont++) {      
        exist_in_array = hasObject(new_array,_array[cont],identifier);
        if (exist_in_array === false) {
            new_array.push(_array[cont]);
        }
    }
    return new_array;
}
// <--------------------------------------------------------------------->

function iterate(lista_letras,estado_inicial) {
    var nova_maquina = [],
        state_name_counter = 0,
        final_state_name_counter = 0,
        test_list = [];

    nova_maquina[0] = { estado :  estado_inicial, nome : 'q' + state_name_counter };    
    test_list = addTests(test_list,nova_maquina[0].estado,lista_letras);
    state_name_counter++;
    for (var cont = 0; cont < test_list.length; cont++) {
        
        var test = test_list[cont],
            estado = test.estado,
            letra = test.letra,
            estado_resultante = [],
            size_estado = estado.length,
            estado_counter = 0,
            index_estado = getStateIndex(nova_maquina,'estado',estado,'__constructor__');

        //Gera o estado resultante.
        for (; estado_counter < size_estado; estado_counter++) {
            if (typeof estado[estado_counter][letra] !== 'undefined') {
                estado_resultante = estado_resultante.concat(estado[estado_counter][letra]);
            }
        }   
        estado_resultante = arrayUnique(estado_resultante,'__constructor__');      
        
        
        ////Aplicar e-close nos resultados.
        estado_resultante = applyEclose(estado_resultante);
        
        //Verifica se esse estado já existe na máquina.
        var estado_existe = false,
            size_maquina = nova_maquina.length,
            counter_maquina = 0;
        
        for (; counter_maquina < size_maquina; counter_maquina++) {
            var est_nova_maquina = nova_maquina[counter_maquina].estado
            estado_existe = equalSet(est_nova_maquina, estado_resultante,
                                     '__constructor__');
            
            if (estado_existe === true) {
                nova_maquina[index_estado][letra] = nova_maquina[counter_maquina];
                estado_existe = true;
                break;  
            }
        }

        if (estado_existe === false) {//Adiciona estado à máquina.
            var index_new_state = nova_maquina.length;
            nova_maquina[index_new_state] = { estado : estado_resultante, nome : 'q' + state_name_counter  };
            var estado_final = collectionHasProperty(estado_resultante,'final');
            if (estado_final === true) {
                nova_maquina[index_new_state].final = true;
                nova_maquina[index_new_state].nome = 'qf' + final_state_name_counter;
                final_state_name_counter++;
            } else {
                state_name_counter++;
            }
            nova_maquina[index_estado][letra] = nova_maquina[index_new_state];
            test_list = addTests(test_list,estado_resultante,lista_letras);
        }
        
    }
    
    return nova_maquina; 
}
// <--------------------------------------------------------------------->

function applyFunction(estado,letra) {
    var cont = 0,
        size = estado.length,
        novo_estado = [],
        estado_func = [];
    
    for (; cont < size; cont++) {
        if (typeof estado[cont][letra] !== 'undefined') {
            estado_func = estado_func.concat(estado[cont][letra]);
        }
    }   
    novo_estado = arrayUnique(estado_func,'__constructor__');  
    return novo_estado;    
}


function applyEclose(estado) {
    ////Aplicar e-close nos resultados.
    var eclose_list = [],
        cont = 0,
        estado_final = [],
        size = estado.length;
    
    for (; cont < size; cont++) {
        eclose_list = eclose_list.concat(eclose(estado[cont]));
    }        
    estado_final  = arrayUnique(eclose_list,'__constructor__');  
    return estado_final;    
}

// <--------------------------------------------------------------------->
function addTests(test_list,novo_estado,lista_letras) {
    var size_letras = lista_letras.length,
        cont_letras = 0;
    for (; cont_letras < size_letras; cont_letras++) {
        test_list.push({ estado : novo_estado , 
                         letra : lista_letras[cont_letras] });
    } 
    return test_list;
}

// <--------------------------------------------------------------------->
function getStateIndex(machine,state_field,state,identifier) {
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

function eclose(state) {
    var state_list = [],
        exist_in_list = false;
    
    state_list.push(state);
    while (typeof state.E !== 'undefined' && exist_in_list === false) {
        exist_in_list = hasObject(state_list,state.E,'__constructor__');
        if (exist_in_list === false) {
            state_list.push(state.E);
            state = state.E;
        }
    }
    return state_list;
}

// <--------------------------------------------------------------------->
function strToArray(word) {
    var letter,
        size = word.length,
        _array = [],
        cont = 0;
    
    for (; cont < size; cont++) {
        _array.push(word.charAt(cont));
    }    
    return _array;
}
// <--------------------------------------------------------------------->

function equalSet(conj1,conj2,identifier) {
    var size = conj1.length,
        conj_elm,
        exists_in_array = false;
        cont = 0;
    
    if (conj1.length !== conj2.length) {
        return false;
    } else {
        for (; cont < size; cont++) {
            conj_elm  = conj1[cont];
            exists_in_array = hasObject(conj2,conj_elm,identifier);
            if (exists_in_array === false) {
                return false;
            }
        }
    }
    return true;
}
// <--------------------------------------------------------------------->
var nova_maquina = iterate(['a','b'],eclose(q0));
console.log(nova_maquina[0]['b']);


