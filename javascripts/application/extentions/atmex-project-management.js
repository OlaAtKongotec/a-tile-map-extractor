

// Project ---------------------------------------------------------------------------------------------------------------------------
_atme.projectManagement = {};
_atme.currentProject = {};

_atme.projectManagement.NavigationButtonsHtml = function(){
	var html = '';
	html += '<ul class="Menu">';
	html += '<li class="MenuItem"><a href="#" onclick="_atme.projectManagement.createNewButton()" class="Button">New Project</a></li>';
	html += '</ul>';
	return html;
}
_atme.App.create.topNavigationHtmlFunctionArray.push(_atme.projectManagement.NavigationButtonsHtml);

_atme.projectManagement.createNewButton = function(){

		_atme.prompt({
			"Project Name (String)" : "New Project", 
			"Tile Size (Int)" : 16
		}, 
		"_atme.projectManagement.createNew()", 
		"Warning! This Replaces The Current Project.");

}

_atme.projectManagement.createNew = function(ProjectName, TileSize){
	
	var promptResults = _atme.getPromptResults();
	
	if(promptResults){
		ProjectName = promptResults.ProjectName;
		TileSize = promptResults.TileSize;
	}
	
	_atme.currentProject = {
		name : ProjectName,
		tileSize : TileSize,
		tileSetTileCount : null,
		tileSetImageUrl : "images/extracted-tiles.png", 
		brushTile : 1,
		airTile : 0,
		paletteShortcuts : [0,25,50,75,100,125,150,175,200,225,250],
		levelArray : []
	};

	Execute(_atme.extractEngine.awake);

}







_atme.projectManagement.saveButton = function(){
	
	if(_atme.currentProject.pageArray!=undefined){
		var object = _atme.currentProject;
		var string = _atme.GeneralFunctions.ConvertToString(object);
		var html = '<span class="PromptBoxTitle">Copy This Level Object (String)</span><div class="SaveLevelString" id="SaveLevelStringId">' + string + "</div>";
		_atme.prompt({}, "", html);
		_atme.GeneralFunctions.SelectTextInsideId("SaveLevelStringId");
	} else {
		_atme.prompt({}, "","No Project File Found. Create One By Clicking \"New Project\"");
	}

}
_atme.projectManagement.loadButton = function(){
	_atme.prompt({"Level Object (String)" : ""}, "_atme.projectManagement.load()", "Warning! This Replaces The Current Project.");
}
_atme.projectManagement.load = function(){
	var promptResults = _atme.getPromptResults();
	var LevelObjectString = promptResults.LevelObject;
	var evalLevel = eval("("+LevelObjectString+")");
	if(evalLevel.constructor != Object){
		alert("Levelformat Error");
		return;
	}
	_atme.currentProject = evalLevel;
	Execute(_atme.initialiseDesign);
	Execute(_atme.canvas.drawPage);
	Execute(_atme.projectOrganizer.draw);
	
}

