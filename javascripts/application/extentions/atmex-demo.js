_atme.Demo = {};

_atme.Demo.NavigationButtonHtml = function(){
	var html = '';
	html += '<ul class="Menu">';
	html += '<li class="MenuItem"><a href="#" onclick="_atme.Demo.loadDemoButton()" class="Button">Run Demo</a></li>';
	html += '</ul>';
	return html;
}
_atme.App.create.topNavigationHtmlFunctionArray.push(_atme.Demo.NavigationButtonHtml);

_atme.Demo.loadDemoButton = function(){
	_atme.prompt({}, "_atme.Demo.loadDemo()","Warning! This Replaces The Current Project and extracts level one from Super Mario Bros 1");	
}

_atme.Demo.loadDemo = function(){
	_atme.promptCancel();
	Execute(_atme.projectManagement.createNew, ['Super Mario Bros',16]);
	Execute(_atme.extractImages.addANewImageToExtract, ['http://www.olapersson.com/projects/a-tile-map-extractor-1/images/mario-1-1.png']);
}



