var q0 = {},
    qf = {};

q0.a = qf;
q0.b = q0;
qf.a = qf;
qf.b = qf;
qf.final = true;

function AfdTest(end_signal) {
	this.end_signal = end_signal;
}

AfdTest.prototype.test = function (word,late_state) {
    var letter = word.shift(),
		  end = this.end_signal, 	
          atual_state = (typeof  late_state[letter] !== 'undefined') ? late_state[letter] [0] : undefined,
          valid_word = false;

    if (typeof atual_state === 'undefined') {     //Machine lock.
        console.log('machine locked');
        return false;
    }

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


