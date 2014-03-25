var EncoderDecoder = {
		
		decodeStart			: function(filter){
			var filterArray = String(filter).split('@');
			
			return filterArray[0];
		},
		
		decodeEnd			: function(filter){
				var filterArray = String(filter).split('@');
			
				return filterArray[1];
		},
		
		decodeClassFilter	:	function(filter){
	
			var filterArray = String(filter).split('@');
		
			return filterArray[2];
			

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
			

			
			if(filterArray.length >= 6){
				var index = filterArray[5].indexOf('!');
				//trip off the !
				if(index != -1){
					return filterArray[5].substring(0,index);
				}
				
				return filterArray[5];
			}else 
				return "";
		
		},
		
		encodeClassFacet	:	function(prefix){
			return "*@*@"+prefix+"@*@"+"*"+"@"+"*"+"!"+"*";
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
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+""+"!"+".*";
			
			}//ones
			else if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter == ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+".*"+"!"+".*";
			}else if(objectsClassFilter != "" && methodCallNameFilter == "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
			}else if(objectsClassFilter == "" && methodCallNameFilter != "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+"!"+".*";
			//twos
			}else if(objectsClassFilter == "" && methodCallNameFilter == "" && argumentTypeFilter != ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
			}else if(objectsClassFilter == "" && methodCallNameFilter != "" && argumentTypeFilter == ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+".*"+"!"+".*";
			}else if(objectsClassFilter != "" && methodCallNameFilter == "" && argumentTypeFilter == ""){
				invocationFilter=anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+anythingButAt+"@"+".*"+"!"+".*";
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
					invocationFilter=anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+"!"+".*";
				else if(methodCallNameFilter != "" && argumentTypeFilter == "")
					invocationFilter=anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+anythingButAt+".*"+"!"+".*";				
				else if(methodCallNameFilter == "" && argumentTypeFilter != "")
					invocationFilter=anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
				else
					invocationFilter=anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+anythingButAt+"@"+".*"+"!"+".*";
				
			}else if(leaveOut == SetupManager.callInputID){
				var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
				var argumentTypeFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.argTypeInputID).val());
				
				
				if(objectsClassFilter != "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+"@"+argumentTypeFilter+""+".*"+""+"!"+""+".*"+"";
				else if(objectsClassFilter != "" && argumentTypeFilter == "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";				
				else if(objectsClassFilter == "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+prefixWild+"@"+argumentTypeFilter+".*"+""+"!"+""+".*"+"";
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";
				
			}else if(leaveOut == SetupManager.argTypeInputID){
				var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
				var methodCallNameFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callInputID).val());
				
				if(objectsClassFilter != "" && methodCallNameFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
				else if(methodCallNameFilter != "" && objectsClassFilter == "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";			
				else if(methodCallNameFilter == "" && objectsClassFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";				
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
				
			}
	

			return invocationFilter;
		}
}