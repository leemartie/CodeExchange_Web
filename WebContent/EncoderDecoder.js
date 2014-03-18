var EncoderDecoder = {
		
		decodeClassFilter	:	function(filter){
	
			var filterArray = String(filter).split('@');
		
			return filterArray[3];
			

		},
		
		
		decodeMethodFilter	:	function(filter){
	
			var filterArray = String(filter).split('@');
			
			var index = filterArray[4].indexOf('!');
			//trip off the !
			if(index != -1){
				return filterArray[4].substring(0,index);
			}
			
			
			return filterArray[4];

		},
		
		
		decodeArgumentFilter	:	function(filter){
	
			var filterArray = String(filter).split('@');
			
			if(filterArray.length >= 6)
				return filterArray[5];
			else 
				return "";
		
		},
		
		encodeClassFacet	:	function(prefix){
			return "*@*@*@"+prefix+"*@"+"*"+"@"+"*"+"!"+"*";
		},
		
		encodeMethodNameFacet	:	function(prefix){
			return "*@*@*@"+"*"+"@"+prefix+"*@"+"*"+"!"+"*";
		},
		
		encodeMethodCallArgFacet : function(prefeix){
			return "*@*@*@"+"*"+"@"+"*"+"@"+prefix+"*!"+"*";
		},
		
		

		//method orderFound<!>methodName<@>typecount/valuecount<#>type/value/callingclass/declaringclass/start/end
		encodeInvocationFilter		:	function(){
			
			
			var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
			var methodCallNameFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callInputID).val());
			var argumentTypeFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.argTypeInputID).val());
			
			

			//start @ end @ declaringClassName @ className @ methodName <@argType @ argType...> ! <@argValue @argValue ...>
			//<> indicates is optional
			
			//first argument
			var anythingButAt = "[^@]%2B";
			
			var invocationFilter = 	invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+
			""+anythingButAt+""+"@"+""+anythingButAt+""+"@"+".*"+""+"\\!"+""+".*";

			
			
			if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+""+"!"+".*";
			
			}//ones
			else if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter == ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+".*"+"!"+".*";
			}else if(objectsClassFilter != "" && methodCallNameFilter == "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
			}else if(objectsClassFilter == "" && methodCallNameFilter != "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+"!"+".*";
			//twos
			}else if(objectsClassFilter == "" && methodCallNameFilter == "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
			}else if(objectsClassFilter == "" && methodCallNameFilter != "" && argumentTypeFilter == ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+".*"+"!"+".*";
			}else if(objectsClassFilter != "" && methodCallNameFilter == "" && argumentTypeFilter == ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+".*"+"!"+".*";
			}
			return invocationFilter;
		},

	//method orderFound<!>methodName<@>typecount/valuecount<#>type/value/callingclass/declaringclass/start/end
	encodeInvocationFilterLeaveOneOut		:	function(leaveOut, prefix){
			
			var invocationFilter = "*";
			var anythingButAt = "[^@]%2B";

			var prefixWild = prefix+"[^@]*";
			//start @ end @ declaringClassName @ className @ methodName <@argType @ argType...> ! <@argValue @argValue ...>
			//<> indicates is optional
			
			//first argument
			
			
			if(leaveOut == SetupManager.callingObjectInputID){
				var methodCallNameFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callInputID).val());
				var argumentTypeFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.argTypeInputID).val());
				
				if(methodCallNameFilter != "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+methodCallNameFilter+"@"+argumentTypeFilter+""+".*"+""+"!"+""+".*"+"";
				else if(methodCallNameFilter != "" && argumentTypeFilter == "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+methodCallNameFilter+"@"+anythingButAt+""+""+".*"+""+"!"+""+".*"+"";				
				else if(methodCallNameFilter == "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+""+anythingButAt+""+"@"+argumentTypeFilter+""+".*"+""+"!"+""+".*"+"";
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+""+anythingButAt+""+"@"+".*"+""+"!"+""+".*"+"";
				
			}else if(leaveOut == SetupManager.callInputID){
				var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
				var argumentTypeFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.argTypeInputID).val());
				
				
				if(objectsClassFilter != "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+prefixWild+"@"+argumentTypeFilter+""+".*"+""+"!"+""+".*"+"";
				else if(objectsClassFilter != "" && argumentTypeFilter == "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";				
				else if(objectsClassFilter == "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+prefixWild+"@"+argumentTypeFilter+".*"+""+"!"+""+".*"+"";
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";
				
			}else if(leaveOut == SetupManager.argTypeInputID){
				var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
				var methodCallNameFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callInputID).val());
				
				if(objectsClassFilter != "" && methodCallNameFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
				else if(methodCallNameFilter != "" && objectsClassFilter == "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";			
				else if(methodCallNameFilter == "" && objectsClassFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";				
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
				
			}
	

			return invocationFilter;
		}
}