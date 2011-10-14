/**
	Verifica se um valor existe dentro de um array.
	@param {Mixed} vlr - valor a ser pesquisado.
	@param {Array} _array - array em que o valor vai ser pesquisado.
	@return {Boolean}
*/
function inArray(vlr,_array) {
	var cont = 0,
		size = _array.length;
	for (; cont < size; cont++) {
		if (_array[cont] === vlr) {
			return true;
		}
	}					
	return false;
}

function objectInArray(vlr,_array,identifier) {
	var cont = 0,
		size = _array.length;
	for (; cont < size; cont++) {
		if (_array[cont][identifier] === vlr) {
			return _array[cont];
		}
	}					
}


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

function arrayUnique(_array,identifier) {
    var new_array = [],
        cont = 0,
        exist_in_array = false;
        size = _array.length;

    for (; cont < size; cont++) {      
        exist_in_array = hasObject(new_array,_array[cont],identifier);
        if (exist_in_array === false) {
            new_array.push(_array[cont]);
        }
    }
    return new_array;
}

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

/**
Verifica se em uma coleção de objetos, pelo menos um deles, tem uma propriedade setada.
@param {Object Array} collection - Array de objetos.
@param {String} property - propriedade a ser pesquisada.
*/
function collectionHasProperty(collection,property) {
    var cont = 0,
        size = collection.length;
    
    for(; cont < size; cont++) {
        if (collection[cont].hasOwnProperty(property)) {
            return true;
        }
    }
    return false;
}
// <--------------------------------------------------------------------->
