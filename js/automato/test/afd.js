/**
	Teste de um autômato formal determinístico.
	@param {String} end_signal - flag do estado final.
*/
(function(APP) {
	var nm = APP.namespace("APP.automato.test");

	nm.AfdTest = function(end_signal) {
		this.end_signal = end_signal;
	}

	nm.AfdTest.prototype.test = function (word,late_state) {
		var letter = word.shift(),
			  end = this.end_signal, 	
			  atual_state = (typeof  late_state[letter] !== 'undefined') ? late_state[letter] [0] : undefined,
			  valid_word = false;

		if (typeof atual_state === 'undefined') {     return false;    }
		
		if (word.length === 0) {
			if (atual_state[end] === true) {
				return true;
			} else {
				return false;
			}
		}    
		valid_word = this.test(word,atual_state);
		return valid_word;
	}
})(APP);