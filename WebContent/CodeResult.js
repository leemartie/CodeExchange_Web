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
		
		var formatedCode = '<pre class="syntax java">'+
							startCode+
							'</pre>'+
							'<mark>start here                                <br\></mark>'+
							'<pre class="syntax java">'+
							middleCode+
							'</pre>'+
							'<mark>                                          <br\></mark>'
							+'<pre class="syntax java">'+
							endCode+
							'</pre>';
		return formatedCode;
	};
	
	
	//note: this is a function property of the class CodeResult
	//the distinction is made in the naming patter
	this.getJQueryObject = function(){
		return $(this.getHtml());
	};
	
}

