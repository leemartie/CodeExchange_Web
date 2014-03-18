/**
 * @author lee
 */

/**
 * Class to represent each code result
 * @param code
 * @returns {CodeResult}
 */
function CodeResult(code, start, end){
	//this is just a property
	this.code = code;//.substring(start,end);
	this.start = start;
	this.end = end;
	
	
	this.getCode = function(){
		return code;
	};
	
//	this.format = function(){
//		var formatedCode ="";
//		
//			var split = code.split("\n");
//			var lineLengthMax = 30;
//			
//			for(var i = 0; i< split.length; i++){
//				var line = String(split[i]);
//				if(line.length > lineLengthMax){
//					var tabs = line.split("\t");
//					var tabCount = tabs.length+1;
//					var firstPart = line.substring(0, lineLengthMax);
//					
//					
//					var tabString = "";
//					for(var j = 0; j<tabCount; j++){
//						tabString = tabString+"\t";
//					}
//					
//					var lastPart = line.substring(lineLengthMax, line.length);
//					
//					 line = firstPart+"\n"+tabString+lastPart;
//				}
//				
//				formatedCode = formatedCode +"\n"+ line;
//			}
//		
//		return formatedCode;
//	}
	
	this.getHtml = function(){
		var startCode = this.code.substring(0,start);
		var middleCode = this.code.substring(start,end);
		var endCode = this.code.substring(end,this.code.length);
		
		var allDiv = $('<div></div>');
		
		var topButtonDiv = $('<div></div>');
		
		var expandTop = $('<div style="display:none"></div>');
		
		var topCode = $('<pre class="syntax java">'+startCode+'</pre>');
		expandTop.append(topCode);
		var topButton = $("<div><div>");
		topButton.append($("<span style='cursor:pointer'><text style='color:blue'><u>see code above</u></text></span>"));
	
		var collapse = false;
		topButton.click(function(event) {	
			topButton.empty();
			if(!collapse){
				topButton.append($("<span style='cursor:pointer'><text style='color:blue'><u>hide code above</u></text></span>"));
				collapse = true;
			}
			else{
				topButton.append($("<span style='cursor:pointer'><text style='color:blue'><u>see code above</u></text></span>"));
				collapse = false;
			}

			expandTop.toggle();
	      });
		topButtonDiv.append(topButton);
		
		
		topButtonDiv.append(expandTop);
		
		var displayCode=	$('<mark>                                          <br\></mark>'+
							'<pre class="syntax java">'+
							middleCode+
							'</pre>'+
							'<mark>                                          <br\></mark>')	;
		
		
		var bottomButtonDiv = $('<div></div>');
		var expandBottom = $('<div style="display:none"></div>');		
		var bottomCode =	$('<pre class="syntax java">'+endCode+'</pre>');
		expandBottom.append(bottomCode);
		var bottomButton = $("<div><div>");
		bottomButton.append($("<span style='cursor:pointer'><text style='color:blue'><u>see code below</u></text></span>"));
	
		var collapseBottom = false;
		bottomButton.click(function(event) {	
			bottomButton.empty();
			if(!collapseBottom){
				bottomButton.append($("<span style='cursor:pointer'><text style='color:blue'><u>hide code below</u></text></span>"));
				collapseBottom = true;
			}
			else{
				bottomButton.append($("<span style='cursor:pointer'><text style='color:blue'><u>see code below</u></text></span>"));
				collapseBottom = false;
			}

			expandBottom.toggle();
	      });
		bottomButtonDiv.append(bottomButton);
		
		
		
		
		bottomButtonDiv.append(expandBottom);
		

		
		allDiv.append(topButtonDiv);
		allDiv.append(displayCode);
		allDiv.append(bottomButtonDiv);
		
	
		
		return allDiv;
	};
	
	
	//note: this is a function property of the class CodeResult
	//the distinction is made in the naming patter
	this.getJQueryObject = function(){
		return this.getHtml();
	};
	
}

