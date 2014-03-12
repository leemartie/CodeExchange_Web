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
			return "*@*@*@"+prefix+"*@"+"*"+"@"+"*"+"\\!"+"*";
		},
		
		encodeMethodNameFacet	:	function(prefix){
			return "*@*@*@"+"*"+"@"+prefix+"*@"+"*"+"\\!"+"*";
		},
		
		encodeMethodCallArgFacet : function(prefeix){
			return "*@*@*@"+"*"+"@"+"*"+"@"+prefix+"*\\!"+"*";
		},
		
		

		//method orderFound<!>methodName<@>typecount/valuecount<#>type/value/callingclass/declaringclass/start/end
		encodeInvocationFilter		:	function(){
			
			
			var objectsClassFilter = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
			var methodCallNameFilter = $(SetupManager.pound+SetupManager.callInputID).val();;
			var argumentTypeFilter = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			

			//start @ end @ declaringClassName @ className @ methodName <@argType @ argType...> ! <@argValue @argValue ...>
			//<> indicates is optional
			
			//first argument
			
			var invocationFilter = "*";
			
			if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter != "")
				invocationFilter="*@*@*@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+argumentTypeFilter+"*"+"\\!"+"*";
			//ones
			else if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter == "")
				invocationFilter="*@*@*@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+"*"+"\\!"+"*";
			else if(objectsClassFilter != "" && methodCallNameFilter == "" && argumentTypeFilter != "")
				invocationFilter="*@*@*@"+objectsClassFilter+"@"+"*"+"@"+argumentTypeFilter+"*"+"\\!"+"*";
			else if(objectsClassFilter == "" && methodCallNameFilter != "" && argumentTypeFilter != "")
				invocationFilter="*@*@*@"+"*"+"@"+methodCallNameFilter+"@"+argumentTypeFilter+"*"+"\\!"+"*";
			//twos
			else if(objectsClassFilter == "" && methodCallNameFilter == "" && argumentTypeFilter != "")
				invocationFilter="*@*@*@"+"*"+"@"+"*"+"@"+argumentTypeFilter+"*"+"\\!"+"*";
			else if(objectsClassFilter == "" && methodCallNameFilter != "" && argumentTypeFilter == "")
				invocationFilter="*@*@*@"+"*"+"@"+methodCallNameFilter+"@"+"*"+"\\!"+"*";
			else if(objectsClassFilter != "" && methodCallNameFilter == "" && argumentTypeFilter == "")
				invocationFilter="*@*@*@"+objectsClassFilter+"@"+"*"+"@"+"*"+"\\!"+"*";
			
			return invocationFilter;
		},

	//method orderFound<!>methodName<@>typecount/valuecount<#>type/value/callingclass/declaringclass/start/end
	encodeInvocationFilterLeaveOneOut		:	function(leaveOut, prefix){
			
			var invocationFilter = "*";

			var prefixWild = prefix+"*";
			//start @ end @ declaringClassName @ className @ methodName <@argType @ argType...> ! <@argValue @argValue ...>
			//<> indicates is optional
			
			//first argument
			
			
			if(leaveOut == SetupManager.callingObjectInputID){
				var methodCallNameFilter = $(SetupManager.pound+SetupManager.callInputID).val();
				var argumentTypeFilter = $(SetupManager.pound+SetupManager.argTypeInputID).val();
				
				if(methodCallNameFilter != "" && argumentTypeFilter != "")
					invocationFilter="*@*@*@"+prefixWild+"@"+methodCallNameFilter+"@"+argumentTypeFilter+"*"+"\\!"+"*";
				else if(methodCallNameFilter != "" && argumentTypeFilter == "")
					invocationFilter="*@*@*@"+prefixWild+"@"+methodCallNameFilter+"@"+"*"+"*"+"\\!"+"*";				
				else if(methodCallNameFilter == "" && argumentTypeFilter != "")
					invocationFilter="*@*@*@"+prefixWild+"@"+"*"+"@"+argumentTypeFilter+"*"+"\\!"+"*";
				else
					invocationFilter="*@*@*@"+prefixWild+"@"+"*"+"@"+"*"+"\\!"+"*";
				
			}else if(leaveOut == SetupManager.callInputID){
				var objectsClassFilter = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
				var argumentTypeFilter = $(SetupManager.pound+SetupManager.argTypeInputID).val();
				
				
				if(objectsClassFilter != "" && argumentTypeFilter != "")
					invocationFilter="*@*@*@"+objectsClassFilter+"@"+prefixWild+"@"+argumentTypeFilter+"*"+"\\!"+"*";
				else if(objectsClassFilter != "" && argumentTypeFilter == "")
					invocationFilter="*@*@*@"+objectsClassFilter+"@"+prefixWild+"@"+"*"+"\\!"+"*";				
				else if(objectsClassFilter == "" && argumentTypeFilter != "")
					invocationFilter="*@*@*@"+"*"+"@"+prefixWild+"@"+argumentTypeFilter+"*"+"\\!"+"*";
				else
					invocationFilter="*@*@*@"+"*"+"@"+prefixWild+"@"+"*"+"\\!"+"*";
				
			}else if(leaveOut == SetupManager.argTypeInputID){
				var objectsClassFilter = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
				var methodCallNameFilter = $(SetupManager.pound+SetupManager.callInputID).val();
				
				if(objectsClassFilter != "" && methodCallNameFilter != "")
					invocationFilter="*@*@*@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+prefixWild+"*"+"\\!"+"*";
				else if(methodCallNameFilter != "" && objectsClassFilter == "")
					invocationFilter="*@*@*@"+"*"+"@"+methodCallNameFilter+"@"+prefixWild+"*"+"\\!"+"*";			
				else if(methodCallNameFilter == "" && objectsClassFilter != "")
					invocationFilter="*@*@*@"+objectsClassFilter+"@"+"*"+"@"+prefixWild+"*"+"\\!"+"*";				
				else
					invocationFilter="*@*@*@"+"*"+"@"+"*"+"@"+prefixWild+"*"+"\\!"+"*";
				
			}
	

			return invocationFilter;
		}
}