var TypeAhead = Class.create({
    initialize: function(textarea, array){
	this.textarea = $(textarea);
	this.array = array;
	this.observe();
    },
    observe: function(){
	this.textarea.observe("keydown", function(e){
	    if (e.keyCode == Event.KEY_TAB){
		e.stop();
		this.tab();
	    }
	}.bind(this));
    },
    tab: function(){
	var pos = this.textarea.selectionStart;
	var text = this.textarea.value
	console.log(this.extractWord(pos,text));
    },
    extractWord: function(pos, text){
	var word = "";
	pos -= 1;
	while (text.charAt(pos) != " " && text.charAt(pos) != ""){
	    word += text.charAt(pos);
	    pos -= 1;
	}
	return word.split("").reverse().join("");
    }
});