var EncoderDecoder = {
		

		//method orderFound<!>methodName<@>typecount/valuecount<#>type/value/callingclass/declaringclass/start/end
		encodeInvocationFilter		:	function(){
			var invocationFilter ="";
			
			var objectsFilter = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
			var methodCallNameFilter = $(SetupManager.pound+SetupManager.callInputID).val();;
			var argumentTypeFilter = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			
			if(methodCallNameFilter != ""){
				var methodCallEncoded = "*!"+methodCallNameFilter;
				invocationFilter = invocationFilter + "snippet_invocation_name:"+methodCallEncoded;
				
				if(argumentTypeFilter != ""){
					var typeEncode = "@*#"+argumentTypeFilter;
					invocationFilter = invocationFilter+" AND snippet_invocation_argument_types:"+methodCallEncoded+typeEncode;
					
					if(objectsFilter != ""){
						var objectEncode = "#"+objectsFilter;
						invocationFilter = invocationFilter+" AND snippet_invocation_calling_object_class:"+methodCallEncoded+objectEncode;
					
					
					}
					
				}
				
			}
			else if(argumentTypeFilter != ""){
				var methodCallEncoded = "*!*";
				invocationFilter = invocationFilter + "snippet_invocation_name:"+methodCallEncoded;
				
				
				var typeEncode = "@*#"+argumentTypeFilter;
				invocationFilter = invocationFilter+" AND snippet_invocation_argument_types:"+methodCallEncoded+typeEncode;
					
					if(objectsFilter != ""){
						var objectEncode = "#"+objectsFilter;
						invocationFilter = invocationFilter+" AND snippet_invocation_calling_object_class:"+methodCallEncoded+objectEncode;
					
					
					}					
				
			}

			else if(objectsFilter != ""){
				var methodCallEncoded = "*!*";
				invocationFilter = invocationFilter + "snippet_invocation_name:"+methodCallEncoded;
				
				
				var typeEncode = "@*#*";
				invocationFilter = invocationFilter+" AND snippet_invocation_argument_types:"+methodCallEncoded+typeEncode;
					
					
				var objectEncode = "#"+objectsFilter;
				invocationFilter = invocationFilter+" AND snippet_invocation_calling_object_class:"+methodCallEncoded+objectEncode;

			}
			
			return invocationFilter;
		}
}