(function(APP) {
	var nm = APP.namespace("APP.automato.draw");
	
nm.MachineDesigner =  function (config)  {
	for (i in config) {
		if (config.hasOwnProperty(i)) {
			this[i] = config[i];
		}
	}
}

nm.MachineDesigner.prototype.drawMachine = function()  {
	//Desenhando máquina.
	var paper = this.paper;
	var lista_estados = this.lista_estados;
	var funcoes = this.lista_funcoes;
	var position = { x : 60, y : 60 };
	var size = lista_estados.length;
	var _ident = this._ident;
	var _final = this._final;
	var _init = this._init
	Joint.resetPaper();
	Joint.paper(paper.id,paper.width, paper.heigth);
	var fsa = Joint.dia.fsa;
	
	//Gerar os círculos
	var _x = position.x;
	var _y = position.y;					
	for (var ct = 0; ct < lista_estados.length; ct++) {

		var estado = lista_estados[ct];
		if (estado[_final] === true) {
			estado.graph = fsa.EndState.create({ position : { x : _x , y : _y }});		
		}
		else if (estado[_init] === true) {
			estado.graph = fsa.StartState.create({ position : { x : _x , y : _y }});
		} else {
			estado.graph = fsa.State.create({ position : { x : _x , y : _y }, label : estado.nome});
		}
		_x += 80;
		
		(ct % 2 === 0)  ?  _y += 80 : _y -= 80;
	}
	
	//Registrar arcos.
	for (var ct = 0; ct < lista_estados.length; ct++) {
		var estado = lista_estados[ct];
		for (var fc = 0; fc < funcoes.length; fc++) {
			var nm_funcao = funcoes[fc];
			var lista_destino = estado[nm_funcao];
		
		if  ( typeof lista_destino !== 'undefined')  {
			var is_array = (typeof lista_destino.slice !== 'undefined') ? true : false;
				if (is_array === true) {
					for (var cont_des = 0; cont_des < lista_destino.length; cont_des++) {
							var obj_destino = lista_destino[cont_des];
						estado.graph.joint(obj_destino.graph,(fsa.arrow.label = nm_funcao, fsa.arrow));
					}
				} else {
					var obj_destino = lista_destino;
					var is_array = (typeof lista_destino.slice !== 'undefined') ? true : false;
					if (is_array === true ) {
						if (obj_destino.length > 0) {
							estado.graph.joint(obj_destino[0].graph,(fsa.arrow.label = nm_funcao, fsa.arrow));
						}
					} else {
						estado.graph.joint(obj_destino.graph,(fsa.arrow.label = nm_funcao, fsa.arrow));
					}
					
				}
				
			}
		}
		
	}						
}

})(APP);
