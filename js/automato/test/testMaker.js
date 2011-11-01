(function(APP) {
	var nm = APP.namespace("APP.automato.test");
	nm.TestMaker = function () {}
	
	nm.TestMaker.factory = function(type,config)  {
		var constr = type,
			newTest;
		
		if (typeof nm.TestMaker[constr] !== 'function') {
			throw {
				name : "Error",
				message : constr + " doesn't exist"
			};
		}
		newTest = new nm.TestMaker[constr](config);
		return newTest;
	}

	nm.TestMaker.Afd   = nm.AfdTest;
	nm.TestMaker.Afnd  = nm.AfndTest;
	nm.TestMaker.Afnde = nm.AfndeTest;
})(APP);	