(function(APP) {
	var nm = APP.namespace("APP.automato.test");
	
	nm.AfndTest = function (end_signal) {
		this.end_signal = end_signal
	}

	nm.AfndTest.prototype.test = function(word,late_state) {
		var letter = word.shift(),
			atual_state_list = late_state[letter],
			atual_state,
			end = this.end_signal,
			valid_word = false,
			list_size = (typeof atual_state_list !== 'undefined') ? atual_state_list.length : 0;
			cont = 0;
			
		if (typeof atual_state_list === 'undefined') {     //Machine lock. 
			return false;
		}    

		for (; cont < list_size; cont++) {
			atual_state = atual_state_list[cont];
			
			if (word.length === 0 && atual_state[end] === true) {
				return  true;
			}

			valid_word = this.test(word,atual_state);                
		}   
		return valid_word;
	}
})(APP);