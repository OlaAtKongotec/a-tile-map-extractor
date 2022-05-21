_atme.GeneralFunctions = {};

_atme.GeneralFunctions.ElementExists = function(Element){
	return Element.length>0;
}
_atme.GeneralFunctions.RequireNode = function(ObjectNode, Warning){
	if(ObjectNode==undefined){
		throw new Error(Warning);
	}
}

_atme.GeneralFunctions.ConvertToString = function(VariableToString){

	var string = '';
	switch(VariableToString.constructor){
		case String : 
		string += '"' + VariableToString + '"';
		break;
		case Array : 
		string += '[';
		for(var i = 0; i<VariableToString.length;i++){
			string += _atme.GeneralFunctions.ConvertToString(VariableToString[i]);
			string += ', '
		}
		if(string.length>1){
			string = string.slice(0, -2);
		}
		string += ']';
		break;
		case Object :
			string += '{';
			$.each(VariableToString, function(key, value) {
				string += key + " : " + _atme.GeneralFunctions.ConvertToString(value);
				string += ', '
			});
			if(string.length>1){
				string = string.slice(0, -2);
			}
			string += '}';
		break;
		case Number :
			string += VariableToString;
		break; 
	}
	return string;
}

_atme.GeneralFunctions.SelectTextInsideId = function(SelectTextInsideIdString){
	if (document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(SelectTextInsideIdString));
		range.select();
	}
	else if (window.getSelection) {
		var range = document.createRange();
		range.selectNode(document.getElementById(SelectTextInsideIdString));
		window.getSelection().addRange(range);
	}
}

_atme.GeneralFunctions.ArrayRemoveAtIndex = function(arrayName,arrayIndex){
	arrayName.splice(arrayIndex,1); 
}

function Rect (top, left, width, height) {
	return rect = {
		top: top,
		left: left,
		width: width,
		height: height
	}
}

function Color (r,g,b,a) {
	return color = {
		r: r,
		g: g,
		b: b,
		a: a
	}
}

_atme.GeneralFunctions.originalImageSize = function(url, callback){
	var image = new Image();
	image.onload = function(){
		callback || callback();
	};
	image.src = url;
	
}

function Execute(functionName, argumentArray){
	if(argumentArray==undefined) argumentArray=[];
	var returnValue;
	if(typeof functionName == 'function'){
		returnValue = functionName.apply(this, argumentArray);
	} else {
		console.log("Didn't Execute Function!");
	}
	return returnValue;	
}

_atme.GeneralFunctions.capitaliseFirstLetter = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

_atme.GeneralFunctions.sortNumericOrderAssending = function(a, b){ 
	return (a-b); 
}

_atme.GeneralFunctions.sortNumericOrderDecreasing = function(a, b){ 
	return (b-a); 
}

_atme.GeneralFunctions.capitalizeFirstLetter = function (string) {
        var newString = '';
        string = string.split(' ');
        for(var c=0; c < string.length; c++) {
                newString += string[c].substring(0,1).toUpperCase() + string[c].substring(1,string[c].length);
        }
        return newString;
}

_atme.GeneralFunctions.variableName = function(thisText){
	
	var allowSpace = false;
	thisText = _atme.GeneralFunctions.capitalizeFirstLetter(thisText);

	var w = "!@#$%^&*()+=[]\\\';,./{}|\":<>?-_";
	var s = 'abcdefghijklmnopqrstuvwxyz0123456789';
	s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var x = new Array('àáâãäå', 'ç', 'èéêë', 'ìíîï', 'ñ', 'ðóòôõöø', 'ùúûü', 'ýÿ');
	var r = new Array('a', 'c', 'e', 'i', 'n', 'o', 'u', 'y');

	if(allowSpace){
		s = s + ' ';
	}

	// thisText = thisText.toLowerCase();
	var newText = new Array();

	for (i = 0; i < thisText.length; i++){
		thisChar = thisText.charAt(i);
		if(w.indexOf(thisChar) == -1){
			if(s.match(''+thisChar+'')){
				newText[i] = thisChar;
			}else{
				for (j = 0; j < x.length; j++){
					if(x[j].match(thisChar)){
						newText[i] = r[j];
					}
				}
			}
		}
	}

	return newText.join('');
}


/*
callback(argument_1, argument_2);
callback.call(some_object, argument_1, argument_2);
callback.apply(some_object, [argument_1, argument_2]);
*/

