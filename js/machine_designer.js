function MachineDesigner(paper,lista_estados,lista_funcoes)  {
	this.paper = paper;
	this.lista_estados = lista_estados;
	this.lista_funcoes = lista_funcoes;
}

MachineDesigner.prototype.drawMachine = function()  {
	//Desenhando máquina.
	var paper = this.paper;
	var lista_estados = this.lista_estados;
	var funcoes = this.lista_funcoes;
	var position = { x : 60, y : 60 };
	var size = lista_estados.length;
	Joint.resetPaper();
	Joint.paper(paper.id,paper.width, paper.heigth);
	var fsa = Joint.dia.fsa;
	
	//Gerar os círculos
	var _x = position.x;
	var _y = position.y;					
	for (var ct = 0; ct < lista_estados.length; ct++) {

		var estado = lista_estados[ct];
		if (estado._initial === true) {
			estado.graph = fsa.StartState.create({ position : { x : _x , y : _y }});
		} else if (estado._final === true) {
			estado.graph = fsa.EndState.create({ position : { x : _x , y : _y }});
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
			console.log(lista_destino.length);
			var is_array = (typeof lista_destino.slice !== undefined) ? true : false;
			if (is_array !== true) {
				for (var cont_des = 0; cont_des < lista_destino.length; cont_des++) {
						var obj_destino = lista_destino[cont_des];
					estado.graph.joint(obj_destino.graph,(fsa.arrow.label = nm_funcao, fsa.arrow));
				}
			} else {
				console.log('aqui');
				var obj_destino = lista_destino;
				estado.graph.joint(obj_destino.graph,(fsa.arrow.label = nm_funcao, fsa.arrow));
			}
		}
		
	}						
}