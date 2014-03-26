var SmartQueryCreator = {
		
		makeSmartQuery	:	function(query){
			
			var tempQuery = "";
			
			if(query == ""){
				tempQuery = "*";
				return tempQuery;
			}
			
			
			query = SmartQueryCreator.escapeSpecialCharacters(query);
			queryArray = query.split(/\s+/);
	
			for(var i = 0; i<queryArray.length; i++){
				if(i == 0){
					tempQuery = queryArray[i];
				}else{
					tempQuery = tempQuery + " AND " +queryArray[i];
				}
				
			}
			
			return tempQuery;
			
		},

		escapeSpecialCharacters: function(value) {
            var specials = ['+', '-', '&', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '|'];
            var regexp = new RegExp("(\\" + specials.join("|\\") + ")", "g");
            return value.replace(regexp, "\\$1");
          },
		
		escapeDots: function(value) {
			
            var specials = ['.','<','>'];
            var regexp = new RegExp("(\\" + specials.join("|\\") + ")", "g");
            return value.replace(regexp, "[$1]");
		},
          
        highlight : function(value, str){
            var specials = [value];
            var regexp = new RegExp("(\\" + specials.join("|\\") + ")", "g");
            return value.replace(regexp, "<mark>$1</mark>");
        }
          
        

};