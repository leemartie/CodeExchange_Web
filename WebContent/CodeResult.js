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
	this.code = String(code);//.substring(start,end);
	this.start = start;
	this.end = end;
	
	
	this.getCode = function(){
		return code;
	};
	
	this.format = function(){
		var formatedCode ="";
		
			var split = code.split("\n");
			var lineLengthMax = 30;
			
			for(var i = 0; i< split.length; i++){
				var line = String(split[i]);
				if(line.length > lineLengthMax){
					var tabs = line.split("\t");
					var tabCount = tabs.length+1;
					var firstPart = line.substring(0, lineLengthMax);
					
					
					var tabString = "";
					for(var j = 0; j<tabCount; j++){
						tabString = tabString+"\t";
					}
					
					var lastPart = line.substring(lineLengthMax, line.length);
					
					 line = firstPart+"\n"+tabString+lastPart;
				}
				
				formatedCode = formatedCode +"\n"+ line;
			}
		
		return formatedCode;
	}
	
	this.getHtml = function(){
		var formatedCode = '<code data-language="java">'+
			//this.code.substring(0,start)+//'<mark>'+
			this.code.substring(start,end)+//'</mark>'+
			/*this.code.substring(end,this.code.length)+*/'</code>';
		return formatedCode;
	};
	
	this.Highlight = function(){
		Rainbow.color();
	};
	
	//note: this is a function property of the class CodeResult
	//the distinction is made in the naming patter
	this.getJQueryObject = function(){
		return $(this.getHtml());
	};
	
}

/**
 * Static class for all fomratting stuff on results
 */
var CodeFormatter = {

		highLight	:	function(){
			Rainbow.color();
		}
};