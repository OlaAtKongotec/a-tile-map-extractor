_atme.StartPopup = {};

_atme.StartPopup.NavigationButtonHtml = function(){
	var html = '';
	html += '<ul class="Menu">';
	html += '<li class="MenuItem"><a href="#" onclick="_atme.StartPopup.show()" class="Button">About</a></li>';
	html += '</ul>';
	return html;
}
_atme.App.create.topNavigationHtmlFunctionArray.push(_atme.StartPopup.NavigationButtonHtml);

_atme.StartPopup.Html = function(){
	var html = "<div id='StartPopup' class='StartPopup'>";

	html += '<a href="#" onclick="_atme.StartPopup.hide()" class="CloseButton"></a>';
	
	html += "<p>";
	html += "<span>A Tile Map Extractor v1</span>";
	html += '<span>By <a href="mailto:ola@kongotec.com" class="RegularLink">Ola Persson</a></span>';
	html += '<span><a href="http://www.olapersson.com" target="_blank" class="RegularLink">www.olapersson.com</a></span>';
	html += "</p>";

	html += "<p>";
	html += '<span>Extract maps and tile sets from screenshots of tile based games.</a></span>';
	html += '<span>Exported projects are in <a href="http://www.olapersson.com/projects/a-tile-map-editor/a-tile-map-editor.html" class="RegularLink" target="_blank">"A Tile Map Editor v1"</a>-format.</span>';
	html += "</p>";
	
	html += "<p>";
	html += '<span>Instructions:</span>';
	html += '<span>Carefully crop the screenshot image to only hold full tiles.</span>';
	html += '<span>Dont use any compression, only lossless .png.</span>';
	html += '<span>The extractor compares pixels in absolute rgb, so any slight difference will result in two tiles.</span>';
	html += '<span>Right click the exported tile set image and "Save As" .png.</span>';
	html += '<span>Add multiple images to your project one after another to extend the tile set and add more level maps.</span>';
	html += "</p>";

	html += "<p>";
	html += '<span>Warning:</span>';
	html += '<span><a href="http://www.olapersson.com/projects/a-tile-map-editor/a-tile-map-editor.html" class="RegularLink" target="_blank">"A Tile Map Editor v1"</a> & "A Tile Map Extractor v1" currently only supports square blocks.<br/><br/></span>';
	
	html += "</p>";

	
	html += "<p>";
	html += '<span>Enjoy! / Ola Persson.</span>';
	html += "</p>";
	
	html += "</div>";
	return html;
};
_atme.App.create.addLastHtmlFunctionArray.push(_atme.StartPopup.Html);

_atme.StartPopup.show = function () {
	$('#StartPopup').css({
		visibility: 'visible'
	});
}

_atme.StartPopup.hide = function () {
	$('#StartPopup').css({
		visibility: 'hidden'
	});
}