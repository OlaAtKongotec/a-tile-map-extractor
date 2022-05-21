// Prompt ---------------------------------------------------------------------------------------------------------------------------
_atme.prompt = function(qObject, callback, text){
	_atme.promptCancel();
	var html = '<div class="PromptBox">';
	html += '<span class="PromptBoxTitle">' + text + '</span>';
	html += '<form>';
	html += '<table class="PromptForm">';
	$.each(qObject, function(key, value) {
		html += '<tr><td class="PromptKey">'+key+'</td><td><input type="text" name="'+key+'" value="'+value+'"/></td></tr>';
	});
	html += '</table>';
	html += '</form>';
	if(callback){
		html += '<a href="#" onclick="'+callback+'" class="Button">OK</a>';	
	}
	html += '<a href="#" onclick="_atme.promptCancel()" class="Button">Cancel</a>';
	html += "</div>";
	$("body").append(html);
}
_atme.promptCancel = function(){
	if(_atme.GeneralFunctions.ElementExists($('.PromptBox'))){
		$('.PromptBox').remove();
	}
}
_atme.getPromptResults = function(){
	if(_atme.GeneralFunctions.ElementExists($('.PromptBox'))){
		var PromptResult = 'PromptResult = {';
		if(_atme.GeneralFunctions.ElementExists($('.PromptForm'))){
			var trArray = $('.PromptForm').find("input");
			for(var i=0; i< trArray.length; i++){
				var name = $(trArray[i]).attr("name");
				var value = $(trArray[i]).attr("value");
				var evilString = name.split(" ");
				var stringType = evilString.pop();
				evilString = evilString.join('');
				var isString = stringType==="(String)"?"'":"";
				PromptResult += evilString + ' : ' + isString + value + isString + ', ';
			}
		}
		PromptResult = PromptResult.slice(0, -2) + '}';
		eval(PromptResult);
		_atme.promptCancel();
		return PromptResult;
	}
}