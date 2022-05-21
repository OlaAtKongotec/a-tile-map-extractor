/* By Ola Persson, ola@kongotec.com*/

$(document).ready(function() {

    _atme.App.init();
    //$(document).bind("contextmenu",function(e){
    //    return false;
    //});
});

var _atme = {};

_atme.App = {};
_atme.App.parentElement = null;
_atme.App.tool = 'edit'; // edit, draw


_atme.App.awakeFunctionArray = [];
_atme.App.init = function(){
	
	_atme.App.setParentElement();
	_atme.App.scrollBarWidth = 15;// scrollbarWidth();
	var html = _atme.App.CreateHtml();
	_atme.App.parentElement.html(html);
	
	for(var i=0; i < _atme.App.awakeFunctionArray.length; i++){
		_atme.App.awakeFunctionArray[i]();
	}

	_atme.projectManagement.createNew("New Project", 16);
};

_atme.App.setParentElement = function(){
	if(!_atme.GeneralFunctions.ElementExists($("#TileMapExtractor"))){
		var html = '<div id="TileMapExtractor" class="TileMapExtractor"></div>';
		$("body").append(html);
	}
	_atme.App.parentElement = $("#TileMapExtractor");
	_atme.App.design.setParentElementToWindowSize();
}

_atme.App.CreateHtml = function(){
	var html = "";
	html += _atme.App.create.topNavigation();
	html += _atme.App.create.mainView();
	//html += _atme.App.create.bottomNavigation();
	html += _atme.App.create.addLastHtml();
	return html;
}

// Create Html ---------------------------------------------------------------------------------------------------------------------------
_atme.App.create = {};
_atme.App.create.topNavigationHtmlFunctionArray = [];
_atme.App.create.topNavigation = function(){
	var html = '';
	html += '<div class="TopNavigation">';
	for(var i=0; i < _atme.App.create.topNavigationHtmlFunctionArray.length; i++){
		html += _atme.App.create.topNavigationHtmlFunctionArray[i]();
	}
	html += "</div>";
	return html;
};
_atme.App.create.mainViewHtmlFunctionArray = [];
_atme.App.create.mainView = function(){
	var html = '';
	html += '<div class="MainView">';
	for(var i=0; i < _atme.App.create.mainViewHtmlFunctionArray.length; i++){
		html += _atme.App.create.mainViewHtmlFunctionArray[i]();
	}
	html += '</div>';
	return html;
};
_atme.App.create.bottomNavigationHtmlFunctionArray = [];
_atme.App.create.bottomNavigation = function(){
	var html = '';
	html += '<div class="BottomNavigation">';
	for(var i=0; i < _atme.App.create.bottomNavigationHtmlFunctionArray.length; i++){
		html += _atme.App.create.bottomNavigationHtmlFunctionArray[i]();
	}
	html += "</div>";
	return html;
};
_atme.App.create.addLastHtmlFunctionArray = [];
_atme.App.create.addLastHtml = function(){
	var html = '';
	for(var i=0; i < _atme.App.create.addLastHtmlFunctionArray.length; i++){
		html += _atme.App.create.addLastHtmlFunctionArray[i]();
	}
	return html;
};

// Application Design
_atme.App.design = {};
_atme.App.design.initialize = function(){
	_atme.App.design.setParentElementToWindowSize();
	_atme.App.design.setMainViewHeight();
	_atme.App.design.setCanvasWidth();
}
$(window).resize(function(){
	_atme.App.design.update();
	clearTimeout(_atme.resizeEndTimeout);
	_atme.resizeEndTimeout = setTimeout('_atme.App.design.update()',100);
});
_atme.App.design.update = function(){
	_atme.App.design.setParentElementToWindowSize();
	_atme.App.design.setMainViewHeight();
	_atme.App.design.setCanvasWidth();
}
_atme.App.design.setParentElementToWindowSize = function(){
	_atme.App.parentElement.height($(window).height());
	_atme.App.parentElement.width($(window).width());
}
_atme.App.design.setMainViewHeight = function(){
	if(_atme.GeneralFunctions.ElementExists($('.MainView'))){
		_atme.App.design.topNavigationHeight = _atme.GeneralFunctions.ElementExists($('.TopNavigation')) ? $('.TopNavigation').height() : 0;
		_atme.App.design.bottomNavigationHeight = _atme.GeneralFunctions.ElementExists($('.BottomNavigation')) ? $('.BottomNavigation').height() : 0;
		var height = _atme.App.parentElement.height() - _atme.App.design.topNavigationHeight - _atme.App.design.bottomNavigationHeight;
		$('.MainView').height(height);
	}
}
_atme.App.design.setCanvasWidth = function(){
	if(_atme.GeneralFunctions.ElementExists($('.Canvas'))){
		var ProjectOrganizerWidth = _atme.GeneralFunctions.ElementExists($('.ProjectOrganizer')) ? $('.ProjectOrganizer').width() : 0;
		var width = _atme.App.parentElement.width() - ProjectOrganizerWidth;
		$('.Canvas').width(width);
	}
}




