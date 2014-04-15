var EncoderDecoder = {
		
		decodeStart			: function(filter){
			var filterArray = String(filter).split('@');
			
			return filterArray[0];
		},
		
		decodeEnd			: function(filter){
				var filterArray = String(filter).split('@');
			
				return filterArray[1];
		},
		
		decodeCallingClassFilter	:	function(filter){
	
			var filterArray = String(filter).split('@');
		
			return filterArray[3];
			

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
            var anythingButAt = "[^@]%2B";

            var invocationFilter = 	anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+
                anythingButAt+"@"+prefix+"@"+anythingButAt+".*"+""+"!"+".*";
			return invocationFilter;
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
			
			var invocationFilter = 	""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+
			""+anythingButAt+""+"@"+""+anythingButAt+""+"@"+".*"+""+"\\!"+""+".*";

			
			
			if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter != ""){
				var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+""+"!"+".*";
				var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+""+"!"+".*";
				invocationFilter="("+part1+"|"+part2+")";
			
			}//ones
			else if(objectsClassFilter != "" && methodCallNameFilter != "" && argumentTypeFilter == ""){
				
				
				var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+".*"+"!"+".*";
				var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+".*"+"!"+".*";
				invocationFilter="("+part1+"|"+part2+")";
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
				
				var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+anythingButAt+"@"+".*"+"!"+".*";
				var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+".*"+"!"+".*";
				invocationFilter="("+part1+"|"+part2+")";
			}
			return invocationFilter;
		},

	//method orderFound<!>methodName<@>typecount/valuecount<#>type/value/callingclass/declaringclass/start/end
	encodeInvocationFilterLeaveOneOut		:	function(leaveOut, prefix){
			
			var invocationFilter = "*";
			var anythingButAt = "[^@]%2B";

			var prefixWild = SmartQueryCreator.escapeDots(prefix)+"[^@]*";
			
			//start @ end @ declaringClassName @ className @ methodName <@argType @ argType...> ! <@argValue @argValue ...>
			//<> indicates is optional
			
			//first argument
			
			
			if(leaveOut == SetupManager.callingObjectInputID){
				var methodCallNameFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callInputID).val());
				var argumentTypeFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.argTypeInputID).val());
				
				if(methodCallNameFilter != "" && argumentTypeFilter != ""){
					
					var part1 = anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+"!"+".*"
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+methodCallNameFilter+"@"+argumentTypeFilter+".*"+"!"+".*";
					invocationFilter="("+part1+"|"+part2+")";
				}
				else if(methodCallNameFilter != "" && argumentTypeFilter == ""){
					var part1 = anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+anythingButAt+".*"+"!"+".*";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+methodCallNameFilter+"@"+anythingButAt+".*"+"!"+".*";
					invocationFilter="("+part1+"|"+part2+")";
				}
				else if(methodCallNameFilter == "" && argumentTypeFilter != ""){
					var part1 = anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+argumentTypeFilter+".*"+"!"+".*";
					invocationFilter="("+part1+"|"+part2+")";
				}
				else{
					var part1 = anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+anythingButAt+"@"+".*"+"!"+".*";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+"@"+anythingButAt+"@"+".*"+"!"+".*";
					invocationFilter="("+part1+"|"+part2+")";
				}
				
			}else if(leaveOut == SetupManager.callInputID){
				var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
				var argumentTypeFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.argTypeInputID).val());
				
				
				if(objectsClassFilter != "" && argumentTypeFilter != ""){
				
					var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+"@"+argumentTypeFilter+""+".*"+""+"!"+""+".*"+"";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+prefixWild+"@"+argumentTypeFilter+""+".*"+""+"!"+""+".*"+"";
					
					
					invocationFilter="("+part1+"|"+part2+")";
				}
				else if(objectsClassFilter != "" && argumentTypeFilter == ""){
					var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";
					
					invocationFilter=anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";
					
					invocationFilter="("+part1+"|"+part2+")";
				}
				else if(objectsClassFilter == "" && argumentTypeFilter != "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+prefixWild+"@"+argumentTypeFilter+".*"+""+"!"+""+".*"+"";
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+prefixWild+"@"+".*"+""+"!"+""+".*"+"";
				
			}else if(leaveOut == SetupManager.argTypeInputID){
				var objectsClassFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callingObjectInputID).val());
				var methodCallNameFilter = SmartQueryCreator.escapeDots($(SetupManager.pound+SetupManager.callInputID).val());
				
				if(objectsClassFilter != "" && methodCallNameFilter != ""){
					var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
					
					
					invocationFilter="("+part1+"|"+part2+")";
				}
				else if(methodCallNameFilter != "" && objectsClassFilter == "")
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+methodCallNameFilter+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";			
				else if(methodCallNameFilter == "" && objectsClassFilter != ""){
					
					var part1 = anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
					var part2 = anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+objectsClassFilter+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
					
					
					
					invocationFilter="("+part1+"|"+part2+")";
				}
				else
					invocationFilter=""+anythingButAt+"@"+anythingButAt+"@"+anythingButAt+"@"+""+anythingButAt+""+"@"+anythingButAt+"@"+prefixWild+""+".*"+""+"!"+""+".*"+"";
				
			}
	

			return invocationFilter;
		}
}