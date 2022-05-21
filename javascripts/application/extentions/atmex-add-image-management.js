

// Pages ---------------------------------------------------------------------------------------------------------------------------
_atme.extractImages = {};

_atme.extractImages.NavigationButtonsHtml = function(){
	var html = '';
	html += '<ul class="Menu">';
	html += '<li class="MenuItem"><a href="#" onclick="_atme.extractImages.addANewImageToExtractButton()" class="Button">Add Image To extract As Level</a></li>';
	html += '</ul>';
	return html;
}
_atme.App.create.topNavigationHtmlFunctionArray.push(_atme.extractImages.NavigationButtonsHtml);

_atme.extractImages.addANewImageToExtractButton = function(){
	
	var TempImageUrl = "http://www.olapersson.com/projects/a-tile-map-extractor-1/images/mario-4-1.png";

	if(_atme.currentProject.levelArray!=undefined){
		_atme.prompt({
			"Image URL (String)" : TempImageUrl
		}, "_atme.extractImages.addANewImageToExtract()","Add A New Image To Extract As Level To Your Project<br/><br/>(If you just ran the demo, you can add the pre-typed Image URL to you project.)");
	} else {
		_atme.prompt({}, "","No Project File Found. Create One By Clicking \"New Project\"");
	}
	

}
_atme.extractImages.addANewImageToExtract  = function(imageURL){


	if(imageURL == undefined){
		var promptResults = _atme.getPromptResults();

		if(promptResults.ImageURL){
			imageURL = promptResults.ImageURL;
		}
	} 

	Execute(_atme.extractEngine.LoadExtractMapImage, [imageURL]);
	
}
