var TypeAhead = Class.create({
    initialize: function(textarea, array, sugg){
	this.textarea = $(textarea);
	this.array = array;
	this.sugg = $(sugg);
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
	var pos = this.getCaret();
	var text = this.textarea.value
	var extracted = this.extractWord(pos,text);
	var matches = this.match(extracted);
	if(matches.length == 0){
	    return false;
	    this.sugg.update("");
	}else if(matches.length == 1){
	    this.insert(matches.first(), extracted, pos);
	    this.sugg.update("");
	}else{
	    this.sugg.update("Possible Matches: "+ matches.join(", "));
	}
    },
    insert: function(match, extracted, pos){
	var add_text = match.substring(extracted.length, match.length);
	var old_text = this.textarea.value
	var new_text = old_text.substring(0,pos) + add_text + old_text.substring(pos, old_text.length);
	this.textarea.value = new_text;
	this.setCaret(pos + add_text.length);
    },
    extractWord: function(pos, text){
	var word = "";
	pos -= 1;
	while (text.charAt(pos) != " " && text.charAt(pos) != ""){
	    word += text.charAt(pos);
	    pos -= 1;
	}
	return word.split("").reverse().join("");
    },
    match: function(extracted){
	var matches = [];
	this.array.each(function(word){
	    if(word.startsWith(extracted)) matches.push(word);
	});
	return matches;
    },

    // Thanks to Vishal Monpara's Blog
    // http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
    getCaret: function(){
	var ctrl = this.textarea;
	var CaretPos = 0;	// IE Support
	if (document.selection) {
	    ctrl.focus ();
	    var Sel = document.selection.createRange ();
	    Sel.moveStart ('character', -ctrl.value.length);
	    CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
	    CaretPos = ctrl.selectionStart;
	return (CaretPos);
    },
    setCaret: function(pos){
	var ctrl = this.textarea;
	if(ctrl.setSelectionRange)
	{
	    ctrl.focus();
	    ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
	    var range = ctrl.createTextRange();
	    range.collapse(true);
	    range.moveEnd('character', pos);
	    range.moveStart('character', pos);
	    range.select();
	}
    }
});