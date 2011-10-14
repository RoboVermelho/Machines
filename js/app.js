var MYAPP = {};

//--DOM
MYAPP.DOM  = {};
MYAPP.DOM.function_list = "#contruir_maquina ul#func_list li";
MYAPP.DOM.result_list = "#contruir_maquina ul#state_list li input[type=checkbox]";
MYAPP.DOM.state_list = "ul#lista_estado li span"

//---CSS
MYAPP.CSS = {};
MYAPP.CSS.selected_class = 'selected';

//--MACHINE
MYAPP.MACHINE = {};

//--CONFIGURA?O.
MYAPP.lista_estados = [{ nome : 'q0' }, { nome : 'q1', a : ['q1']},{ nome : 'q2'}];
MYAPP.lista_funcoes = ['a','b','c'];


$("#new_states").hide();
//$("#contruir_maquina").hide();
$("input[name=nv_estado]").click(function() {
	var nv_estado = $("input[name=estado]").val(),
		state_list = $("ul#lista_estado li span"),
		count = 0,
		size = state_list.length;
		
	for (; count < size; count++) {
		var nm_state = $(state_list[count]).text();
		if (nm_state === nv_estado) {
			alert('Estado j?xiste');
			return false;
		}
	}
	$("ul#lista_estado").append("<li><span>" + nv_estado + "</span></li>");
});

$("input[name=nv_funcao]").click(function() {
	var nv_estado = $("input[name=funcao]").val(),
		state_list = $("ul#lista_funcao li span"),
		count = 0,
		size = state_list.length;
		
	for (; count < size; count++) {
		var nm_state = $(state_list[count]).text();
		if (nm_state === nv_estado) {
			alert('Fun? j?xiste');
			return false;
		}
	}
	$("ul#lista_funcao").append("<li><span>" + nv_estado + "</span></li>");
});	

$("input[name=construir_maquina]").click(function() {
	$("#new_states").hide();
	$("#contruir_maquina").show();
	//Pega os estados.
	/*
	var lista_estados = [];
	var list_estados = $("ul#lista_estado li span"),
		cont = 0,
		length = list_estados.length;
	for (; cont < length; cont++) {
		var nv_estado = $(list_estados[cont]).text();
		lista_estados.push(nv_estado);
	}
	///////////////////////
	//Lista de fun?s.
	var list_funcoes = [],
		ref_funcoes = $("ul#lista_funcao li span"),
		cont = 0,
		length = ref_funcoes.length;
	for (; cont < length; cont++) {
		var nv_funcao = $(ref_funcoes[cont]).text();
		list_funcoes.push(nv_funcao);
	}
	*/
	////////////////////////////////// -- Apenas para testes.

	$.each(lista_estados,function(index,vlr) {
		$("ul#lista_estados").append("<li>" + vlr + "</li>");
		$("ul#state_list").append("<li><input type='checkbox' name='func' value='" + vlr + "' />" + vlr + "</li>");
	});
	
	$.each(lista_funcoes, function(index,vlr) {
		$("ul#func_list").append("<li>" + vlr + "</li>");
	});				
	
	
});

	
	$.each(MYAPP.lista_estados,function(index,vlr) {
		$("ul#lista_estados").append("<li>" + vlr.nome + "</li>");
		$("ul#state_list").append("<li><input type='checkbox' name='func' value='" + vlr.nome + "' />" + vlr.nome + "</li>");
	});
	
	$.each(MYAPP.lista_funcoes, function(index,vlr) {
		$("ul#func_list").append("<li>" + vlr + "</li>");
	});	
	
	$("#contruir_maquina ul#lista_estados li").live('click',function() {
		$("#contruir_maquina ul#lista_estados li").removeClass('selected');
		$(this).addClass('selected');
	});
	

	MYAPP.lista_estados = [{ nome : 'q0' }, { nome : 'q1', a : ['q1']},{ nome : 'q2'}];
	MYAPP.lista_funcoes = ['a','b','c'];
	
	
	MYAPP.MACHINE.q0 = MYAPP.lista_estados[0];
	MYAPP.MACHINE.q0.a = [MYAPP.lista_estados[0],MYAPP.lista_estados[1]];
	
	$("#contruir_maquina ul#func_list li").live("click", function() {
		
		try {
		var  selected_state = $("#contruir_maquina ul#lista_estados li.selected"),
				selected_func   = $(this);
				showTransitionOfMachine(selected_state,selected_func);
		} catch (ex) { return false; }

	});				
	
	
	/**
		Exibe as transições de um estado em uma função.
		@param {jQuery Object} state_selected - estado a ser pesquisado na máquina.
		@param {jQuery Object} function_selected  - função a ser pesquisada.
		@param {Boolean} se a a? foi efetuada com sucesso.
	*/
	function showTransitionOfMachine(state_selected,function_selected) {
		try {
			if (arguments.length !== 2) {
				throw { message : "Numero de argumentos invalido" };
			}
			var selected_style           = MYAPP.CSS.selected_class,
				  function_list_ref      	  = $(MYAPP.DOM.function_list),
				  checkbox_list			  = $( MYAPP.DOM.result_list), 
				  state_name               = $(state_selected).text(),
				  function_name           = $(function_selected).text(),	
				  ref_checkbox_list = [];
				  
				  var funcao_selecionada    = markAsSelected(function_list_ref,function_selected,selected_style);
				  var destiny_list                = getDestinyListFromMachine(state_name,function_name);
				  var resultado_registrado  =  exibirDestinoDaFuncao(destiny_list, checkbox_list);
			
			if (funcao_selecionada === true && resultado_registrado === true) {
				return true;
			} else {
				return false;
			}
		} catch (ex) { return false; }
	}
	
	/**
		Retorna a lista com os estados destino,  partindo de uma função de transição em um estado.
		@param {String} state - nome do estado na máquina.
		@param {String} func - nome da função de transição a ser pesquisada no estado.
		@return {Mixed} Array de estados resultantes.
	*/
	function getDestinyListFromMachine (state_name,func_name) {
		try {
			if (typeof state_name !== 'string' || typeof func_name !== 'string') {
				throw "Type error";
			}
			var machine = MYAPP.MACHINE,
					result_state = [],
			       state_name = machine[state_name];
			 if (typeof state_name !== 'undefined') {
				result_state = state_name[func_name];
			}
			if (typeof result_state === 'undefined') {
				result_state = [];
			}
			return result_state;
		} catch (ex) { return false; }
	}
	

	/**
		Marca as checkboxes de resultado, de acordo com uma lista de estados.
		@param {Object Array} lista_resultado - lista de estados que devem ser marcados.
		@param {jQuery Object Array} lista_checkbox - lista de checkbox que vão ser marcadas.
	*/
	function exibirDestinoDaFuncao(lista_resultado,lista_checkbox) {
		try {
			var size = lista_resultado.length,
				  cont = 0,
				  lista_nomes = [];
			
			if (typeof size === 'undefined') {
				throw "Type error";
			}
			
			for (; cont < size; cont++) {
				lista_nomes.push(lista_resultado[cont].nome);
			}
			$(lista_checkbox).each (function(index,ref) {
				var operation_ok = markCheckbox(ref,lista_nomes);
				if (operation_ok === false) {
					return false;
				}
			});
		return true;
		} catch (ex) { return false; }
	}
	
	/**
		Marca um objeto de um grupo com uma classe, e remove essa classe dos outros elementos.
		@param {Array jQuery Object} group - grupo de elementos onde o item selecionado estão
		@param {jQuery Object}  selected_elm - elemento no qual será aplicado o estilo.
		@param {String} style - nome do estilo a ser aplicado.
		@param {Boolean} - verdadeiro se sucesso, falso em qualquer erro.
	*/
	function markAsSelected(group,selected_elm,style) {
		try {

			$(group).removeClass(style);
			$(selected_elm).addClass(style);					
		} catch (ex) { return false; }
		return true;
	}
	
	/**
		Verifica se o checkbox tem um valor em uma lista, e se tiver, deixa ele como checked, 
		e se não deixa como unchecked.
		@param {jQuery Object} input_ref - checkbox a ser testado.
		@param {Array Mixed} value_list - lista de valores a ser pesquisada.
		@return {Boolean} - Se a opera? foi executada com sucesso.
	*/
	function markCheckbox(input_ref,value_list) { 
		try {
			var vlr_input = $(input_ref).val(),
				 in_array  = inArray(vlr_input,value_list);
				if (in_array === true) {
					$(input_ref).attr('checked',true);
				} else {
					$(input_ref).attr('checked',false);
				}
				return true;
		} catch (ex) { return false; }
	}

	

