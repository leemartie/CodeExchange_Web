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
	this.code = String(code).substring(start,end);
	this.start = start;
	this.end = end;
	
	
	this.getCode = function(){
		return code;
	};
	
	this.getHtml = function(){
		var html = '<code data-language="java">'+this.code+'</code>';
		return html;
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