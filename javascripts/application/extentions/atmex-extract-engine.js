/*
$(document).ready(function() {
	_atme.extractEngine.Init();
});*/

_atme.extractEngine = {};


_atme.extractEngine.mainViewHtml = function(){
	var html = '';
	
	
	html += '<div id="MapToBeExtracted" class="MapToBeExtracted">';
	html += '<h3>This is the image to be extracted:</h3>';
	html += '<p>"A Tile Map Extractor v1" seems to be fastest in firefox, runs slow in crome. </p>';

	html += '<canvas id="map"></canvas>';
	html += '<p id="ExtractionProgress">Init</p>';
	html += '</div>';

	html += '<div id="TheExtractedMap" class="TheExtractedMap">';
	html += '<h3>And This Is The Extracted Tile Set & Map:</h3>';
	html += '<p>Right click the generated tile set and save it to your hard drive. Name it extracted-tiles.png and put it into the images folder of your downloaded copy of "A Tile Map Editor v1" for easy access without changing the level string.</p>';
	html += '<div>';
	html += '<canvas id="palette" class="SavePaletteAsPng"></canvas>';
	html += '<p>Copy this project string and load it into <a href="www.olapersson.com/projects/a-tile-map-editor/a-tile-map-editor.html" class="RegularLink" target="_blank">"A Tile Map Editor v1"</a></p>';
	html += '<div id="map-array" class="SaveLevelString"></div>';
	html += '</div>';
	html += '</div>';

	return html;
};
_atme.App.create.mainViewHtmlFunctionArray.push(_atme.extractEngine.mainViewHtml);

_atme.extractEngine.awake = function(){
	_atme.extractEngine.newTileSetPalette();
	_atme.extractEngine.newExtractMap();
	_atme.extractEngine.setupHtmlAndCanvasReferences();
}

_atme.App.awakeFunctionArray.push(_atme.extractEngine.awake);

_atme.extractEngine.setupHtmlAndCanvasReferences = function(){
	_atme.extractEngine.ExtractMap.CanvasObject = document.getElementById('map');
	_atme.extractEngine.ExtractMap.CanvasContext = _atme.extractEngine.ExtractMap.CanvasObject.getContext('2d');

	_atme.extractEngine.Palette.CanvasObject = document.getElementById('palette');
	_atme.extractEngine.Palette.CanvasContext = _atme.extractEngine.Palette.CanvasObject.getContext('2d');
	
	_atme.extractEngine.LevelAsStringContainer = document.getElementById('map-array');
	$('.OriginalSkin .MapToBeExtracted, .OriginalSkin .TheExtractedMap').css({visibility:'hidden'});
}

_atme.extractEngine.newExtractMap = function(){

	_atme.extractEngine.ExtractMap = {};
	_atme.extractEngine.ExtractMap.Img = null;
	_atme.extractEngine.ExtractMap.ImgUrl = ''; // 	_atme.extractEngine.ExtractMap.ImgUrl = 'images/mario-1-1b.png';
	_atme.extractEngine.ExtractMap.Block = {};
	_atme.extractEngine.ExtractMap.Block.Width = _atme.currentProject.tileSize;
	_atme.extractEngine.ExtractMap.Block.Height = _atme.currentProject.tileSize;

}

_atme.extractEngine.newTileSetPalette = function(){
	_atme.extractEngine.Palette = {};
	_atme.extractEngine.Palette.UniqueTilesArrayOfRgbaPixels = [];
}

_atme.extractEngine.ExtractMapImageIsLoaded = function(){
	_atme.extractEngine.DrawExtractMapImageIntoCanvas();
	
	$('.OriginalSkin .MapToBeExtracted').css({visibility:'visible'});
	$('.OriginalSkin .TheExtractedMap').css({visibility:'hidden'});

	setTimeout(function(){
		
		_atme.extractEngine.ExtractTiles();

	},2000);


}

_atme.extractEngine.currentLevelName = '';

_atme.extractEngine.LoadExtractMapImage = function(imageURL){
	
	var levelName = imageURL;
	levelName = levelName.split("/");
	
	_atme.extractEngine.currentLevelName = levelName[levelName.length-1].slice(0, -4);;
	
	$.getImageData({
		url: imageURL,
		server : "http://www.olapersson.com/php/utilities/get-image-data.php?callback=?",
		success: function(image){
	    // Do something with the now local version of the image
		_atme.extractEngine.ExtractMap.Img = image;
		_atme.extractEngine.ExtractMapImageIsLoaded();
	  },
	  error: function(xhr, text_status){
	    // Handle your error here
	  }
	});
	
	
}

_atme.extractEngine.DrawExtractMapImageIntoCanvas = function(){
	_atme.extractEngine.ExtractMap.CanvasObject.width = _atme.extractEngine.ExtractMap.Img.width;
	_atme.extractEngine.ExtractMap.CanvasObject.height = _atme.extractEngine.ExtractMap.Img.height;
	_atme.extractEngine.ExtractMap.CanvasContext.drawImage(_atme.extractEngine.ExtractMap.Img, 0, 0);
}

_atme.extractEngine.ExtractTiles = function(){
	
	var NewLevel = {
		name : _atme.extractEngine.currentLevelName, 
		width : null, 
		height : null, 
		map : []
	}
	
	var currentLevelIndex = _atme.currentProject.levelArray.push(NewLevel) - 1;
	
	
	var TileMapWidth = _atme.extractEngine.ExtractLoop.Width = (_atme.extractEngine.ExtractMap.CanvasObject.width / _atme.extractEngine.ExtractMap.Block.Width);
	var TileMapHeight = _atme.extractEngine.ExtractLoop.Height = (_atme.extractEngine.ExtractMap.CanvasObject.height / _atme.extractEngine.ExtractMap.Block.Height);
	
	_atme.currentProject.levelArray[currentLevelIndex].width = TileMapWidth;
	_atme.currentProject.levelArray[currentLevelIndex].height = TileMapHeight;

	_atme.extractEngine.ExtractLoop.Start();

}

_atme.extractEngine.ExtractLoop = {};

_atme.extractEngine.ExtractLoop.Start = function(){
	_atme.extractEngine.ExtractLoop.X = 0;
	_atme.extractEngine.ExtractLoop.Y = 0;
	
	_atme.extractEngine.ExtractLoop.StepY();
	
}

_atme.extractEngine.ExtractLoop.StepY = function(){
	

	
	if (_atme.extractEngine.ExtractLoop.Y < _atme.extractEngine.ExtractLoop.Height){
		
		 setTimeout(function(){
			
			_atme.extractEngine.ExtractLoop.StepX();

		},10);
		
		
	} else {
		_atme.extractEngine.ExtractLoop.End();
	}


	

}

_atme.extractEngine.ExtractLoop.StepX = function(){
	
	var currentTile = _atme.extractEngine.ExtractLoop.Width * _atme.extractEngine.ExtractLoop.Y + _atme.extractEngine.ExtractLoop.X;
	var allTiles = _atme.extractEngine.ExtractLoop.Width * _atme.extractEngine.ExtractLoop.Height;
	$("#ExtractionProgress").html("Extracting tile " + currentTile + " / " + allTiles);
	
	
	if (_atme.extractEngine.ExtractLoop.X < _atme.extractEngine.ExtractLoop.Width){
		
		_atme.extractEngine.ExtractTile(_atme.extractEngine.ExtractLoop.X * _atme.extractEngine.ExtractMap.Block.Width, _atme.extractEngine.ExtractLoop.Y * _atme.extractEngine.ExtractMap.Block.Height);
		
		_atme.extractEngine.ExtractLoop.X ++;
		
		 setTimeout(function(){
			
			_atme.extractEngine.ExtractLoop.StepX();

		},10);
		
	} else {
		_atme.extractEngine.ExtractLoop.X = 0;
		_atme.extractEngine.ExtractLoop.Y ++;
		_atme.extractEngine.ExtractLoop.StepY();
	}



	

}

_atme.extractEngine.ExtractLoop.End = function(){
	_atme.extractEngine.DrawUniqueTileArrayIntoPalette();
	_atme.extractEngine.PrintLevelProject();
	
	var allTiles = _atme.extractEngine.ExtractLoop.Width * _atme.extractEngine.ExtractLoop.Height;
	$("#ExtractionProgress").html("Finished! Extracted " + allTiles + " tiles");
	
	
	$('.OriginalSkin .TheExtractedMap').css({visibility:'visible'});
}

_atme.extractEngine.ExtractTile = function(OffsetX, OffsetY){
	

	
	var CurrentTilePixelArray = [];
	
	for(var Y = 0; Y < _atme.extractEngine.ExtractMap.Block.Height; Y++){
		for(var X = 0; X < _atme.extractEngine.ExtractMap.Block.Width; X++){
			var CurrentPixel = _atme.extractEngine.ExtractMap.CanvasContext.getImageData(OffsetX + X, OffsetY + Y, 1, 1);
			// var CurrentPixelData = _atme.extractEngine.ExtractMap.CanvasContext.getImageData(OffsetX + X, OffsetY + Y, 1, 1).data;
			CurrentTilePixelArray.push(CurrentPixel);
		}
	}

	var ExistsAt = _atme.extractEngine.ExistsInArrayAtIndex(CurrentTilePixelArray, _atme.extractEngine.Palette.UniqueTilesArrayOfRgbaPixels);

	if( ExistsAt == -1 ){
		ExistsAt = _atme.extractEngine.Palette.UniqueTilesArrayOfRgbaPixels.push(CurrentTilePixelArray) -1;
	}
	
	var currentLevelIndex = _atme.currentProject.levelArray.length - 1;
	
	
	_atme.currentProject.levelArray[currentLevelIndex].map.push(ExistsAt);

}

_atme.extractEngine.ExistsInArrayAtIndex = function(value, InArray){
	
	for(var i = 0; i < InArray.length; i++ ){
	
		var Idenical = _atme.extractEngine.ValuesAreIdentical(value, InArray[i]);

		if(Idenical){
			return i;
		}
	}
	
	return -1;
}

_atme.extractEngine.ValuesAreIdentical = function(ValueOne, ValueTwo){

	if(ValueOne.constructor != ValueTwo.constructor) return false;
	
	var ReturnValue = true;

	switch(ValueOne.constructor){
		case String :

			if(ValueOne != ValueTwo){
				ReturnValue = false;
			}
			break;
		case Array :
		case Uint8ClampedArray :
			if(ValueOne.length != ValueTwo.length){
				ReturnValue = false;
				break;
			}
			var ArrayLength = ValueOne.length;
			for(var i = 0; i<ArrayLength;i++){
				if(!_atme.extractEngine.ValuesAreIdentical(ValueOne[i], ValueTwo[i])){
					ReturnValue = false;
					break;
				}
			}
			break;
		case Object :
		case ImageData :
			var ValueOneArray = [];
			$.each(ValueOne, function(key, value) {
				ValueOneArray.push(key, value);
			});
			
			var ValueTwoArray = [];
			$.each(ValueTwo, function(key, value) {
				ValueTwoArray.push(key, value);
			});
			
			if(!_atme.extractEngine.ValuesAreIdentical(ValueOneArray, ValueTwoArray)){
				ReturnValue = false;
				break;
			}
			break;
		case Number :
			if(ValueOne != ValueTwo){
				ReturnValue = false;
			}
			break;
	}
	
	return ReturnValue;

	
}


_atme.extractEngine.DrawUniqueTileArrayIntoPalette = function(){
	var CurrentBlock;
	var X, Y;
	var TileCount = _atme.extractEngine.Palette.UniqueTilesArrayOfRgbaPixels.length;
	
	_atme.extractEngine.Palette.CanvasObject.width = _atme.extractEngine.ExtractMap.Block.Width;
	_atme.extractEngine.Palette.CanvasObject.height = _atme.extractEngine.ExtractMap.Block.Height * TileCount;

	for(var i = 0; i < TileCount; i++){

		CurrentBlock = _atme.extractEngine.Palette.UniqueTilesArrayOfRgbaPixels[i];
		
		for(var j = 0; j < CurrentBlock.length; j++){
			X = j % _atme.extractEngine.ExtractMap.Block.Width;
			Y = Math.floor(j / _atme.extractEngine.ExtractMap.Block.Height) + i * _atme.extractEngine.ExtractMap.Block.Height;
			_atme.extractEngine.Palette.CanvasContext.putImageData(CurrentBlock[j], X, Y);
			
		}
	}
		
}

_atme.extractEngine.PrintLevelProject = function(){

	_atme.currentProject.tileSize = _atme.extractEngine.ExtractMap.Block.Width;
	_atme.currentProject.tileSetTileCount = _atme.extractEngine.Palette.UniqueTilesArrayOfRgbaPixels.length; 

	var string = _atme.extractEngine.convertToString(_atme.currentProject);
	_atme.extractEngine.LevelAsStringContainer.innerHTML = string;
}

_atme.extractEngine.convertToString = function(VariableToString){

	var string = '';
	switch(VariableToString.constructor){
		case String : 
		string += '"' + VariableToString + '"';
		break;
		case Array : 
		case Uint8ClampedArray :
		string += '[';
		for(var i = 0; i<VariableToString.length;i++){
			string += _atme.extractEngine.convertToString(VariableToString[i]);
			string += ', '
		}
		if(string.length>1){
			string = string.slice(0, -2);
		}
		string += ']';
		break;
		case Object :
		case ImageData :
			string += '{';
			$.each(VariableToString, function(key, value) {
				string += key + " : " + _atme.extractEngine.convertToString(value);
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

