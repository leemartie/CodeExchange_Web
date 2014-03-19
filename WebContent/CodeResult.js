/**
 * @author lee
 */

/**
 * Class to represent each code result
 * @param code
 * @returns {CodeResult}
 */
function CodeResult(code, start, end, invocations){
	//this is just a property
	this.code = code;//.substring(start,end);
	this.start = start;
	this.end = end;
	this.invocations = invocations;
	
	this.getCode = function(){
		return code;
	};

	this.markInvocations = function(codeToChange,offset){
		
		var currentStart = 0;
		var codeStr = "";
		
		for(var i = 0; i < this.invocations.length; i++){
			
			var invocation = this.invocations[i];
			var start = parseInt(EncoderDecoder.decodeStart(invocation));
			var end = parseInt(EncoderDecoder.decodeEnd(invocation));
			var className = EncoderDecoder.decodeClassFilter(invocation);
			var methodName = EncoderDecoder.decodeMethodFilter(invocation);
			var firstArg = EncoderDecoder.decodeArgumentFilter(invocation);
			
			var offsetStart = start-offset;
			var offsetEnd = end-offset;
			
			var markSub = 
						codeToChange.substring(offsetStart,offsetEnd);
			
			
			var temp = codeToChange.substring(currentStart,offsetStart);
		
			codeStr = codeStr + temp+ "\n//CodeExchange: methodCall [class: "+className+
								"] [method: "+methodName+
								"] [1st argType: "+firstArg+"]"+
								"\n"+markSub;
			currentStart = offsetEnd;
		}
		
		var rest = 
		codeToChange.substring(currentStart,codeToChange.length);
		
		var allCode = codeStr+rest;
		
		return allCode;
		
	};
	
	this.getHtml = function(){
		var startCode = this.code.substring(0,start);
		var middleCode = this.code.substring(start,end);
		var endCode = this.code.substring(end,this.code.length);
		
		var allDiv = $('<div></div>');
		
		var topButtonDiv = $('<div></div>');
		
		var expandTop = $('<div style="display:none"></div>');
		
		var topCode = $('<div class="code"><pre class="syntax java">'+startCode+'</pre></div>');
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
		
		var displayCode=	
			
			$('<mark>                                          <br\></mark>'+
							'<div class="code"><pre class="syntax java">'+this.markInvocations(middleCode,startCode.length)+
							'</pre></div>'+
							'<mark>                                          <br\></mark>')	;
		//this.markInvocations(middleCode, startCode.length);
		
		var bottomButtonDiv = $('<div></div>');
		var expandBottom = $('<div style="display:none"></div>');		
		var bottomCode =	$('<div class="code"><pre class="syntax java">'+endCode+'</pre></div>');
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

