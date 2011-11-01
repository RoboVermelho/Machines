(function(APP) {


var nm = APP.namespace("APP.base");
/**
	Recebe uma lista de objetos, e os concatena em um novo objeto.
	@param {Object} - uma quantidade X de objetos.
	@return {Object}
*/
nm.mix = function () {
	var arg, prop, child = {};
	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}
	return child;
}

/**
	Adiciona todos os atributos de parent, para o objeto child.
	@param {Object} parent - objeto pai, que vai doar a informação.
	@param {Object} child - objeto filho, que vai receber as informações.
	@return {Object}
*/
nm.extend = function(parent, child) {
	var i;
	child = child || {};
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}
	return child;
}

/**
	Verifica se um valor existe dentro de um array.
	@param {Mixed} vlr - valor a ser pesquisado.
	@param {Array} _array - array em que o valor vai ser pesquisado.
	@return {Boolean}
*/
nm.inArray = function(vlr,_array) { return (_array.indexOf(vlr) !== -1) ? true : false; }

/**
	Verifica se um objeto existe em um conjunto,  pela checagem de um campo  identificador.
	@param {String} vlr - valor a ser pesquisado.
	@param {Array Mixed} _array - conjunto onde será pesquisado.
	@param {Mixed} identifier - identificador a ser usado como referência.
	@return {Mixed} índice no array, ou undefined se não encontrado.
*/
nm.objectInArray = function(vlr,_array,identifier) {
	var cont = 0,
		size = _array.length;
	for (; cont < size; cont++) {
		if (_array[cont][identifier] === vlr) {
			return _array[cont];
		}
	}				
}

/**
	Converte uma string em um array.
	@param {String} word - palavra a ser convertida.
	@return  {Array} 
*/
nm.strToArray = function(word) { return word.split(""); }
//<=======================================>


/**
	Recebe um array de objetos, e retorna o mesmo array sem
	elementos duplicados.
	@param {Array Object} _array - conjunto para ser pesquisado.
	@param {String} identifier - registro
*/
nm.arrayUnique = function(_array,identifier) {
    var new_array = [],
        cont = 0,
        exist_in_array = false;
        size = _array.length;

    for (; cont < size; cont++) {      
        exist_in_array = nm.hasObject(new_array,_array[cont],identifier);
        if (exist_in_array === false) {
            new_array.push(_array[cont]);
        }
    }
    return new_array;
}
//=================================================
/**
	Verifica se o objeto existe em uma coleção através de um identificador.
	@param {Array Object} collection - coleção a ser pesquisada.
	@param {Object} 	obj - objeto a ser pesquisado.
	@param {String} identifier - campo para verificação.
	@return {Boolean}
*/
nm.hasObject =  function (collection,obj,identifier) {
    var size = collection.length,
        cont = 0;
    
    for(; cont < size; cont++) {
        if (collection[cont][identifier] === obj[identifier]) {
            return true;
        }
    }
    return false;
} 
//=================================================


/**
	Verifica se dois conjuntos de objetos são iguais.
	@param {Array Object} conj1 - primeiro conjunto a ser  pesquisado.
	@param {Array Object} conj2 - segundo conjunto a ser pesquisado.
	@param {String} identifier - campo usado como identificador.
*/
nm.equalSet = function equalSet(conj1,conj2,identifier) {
    var size = conj1.length,
        conj_elm,
        exists_in_array = false;
        cont = 0;
    
    if (conj1.length !== conj2.length) {
        return false;
    } else {
        for (; cont < size; cont++) {
            conj_elm  = conj1[cont];
            exists_in_array = nm.hasObject(conj2,conj_elm,identifier);
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
@return {Boolean}
*/
nm.collectionHasProperty = function (collection,property) {
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

/**
	Verifica se um objeto tem uma propriedade.
	@param {Object} obj - objeto a ser verificado.
	@param {String} property - nome da propriedade a ser pesquisada.
	@return {Boolean}
*/
nm.hasProperty = function (obj,property) {
    if (obj.hasOwnProperty(property)) {
        return true;
    }
    return false;
}

/**
	Remove elemento de um array.
*/
nm.arrayRemove =  function (arr,elm) {
    var index = $.inArray(elm,arr);
    if (index !== -1) {
        return arr.slice(0,index).concat(arr.slice(index + 1));
    } 
    return false;
}

})(APP);
