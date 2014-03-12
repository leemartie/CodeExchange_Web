var Util = {
		
		
		getOnlyUniqueElements : function(array){
			var unique = new Array();
			
			for(var i = 0; i<array.length; i++){
				if(unique.indexOf(array[i]) == -1 && array[i] != "null")
					unique.push(array[i]);
			}
			return unique;
		}
};