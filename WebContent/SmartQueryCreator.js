/**
 * Should not break up white space by ANd if the query is in quotes.
 *
 * @type {{makeSmartQuery: makeSmartQuery, escapeSpecialCharacters: escapeSpecialCharacters, escapeDots: escapeDots, highlight: highlight}}
 */
var SmartQueryCreator = {
		
		makeSmartQuery	:	function(query,ORtoggle){
			
			var tempQuery = "";
			
			if(query == ""){
				tempQuery = "*";
				return tempQuery;
			}

            //it is a quoted query
			if(!(query instanceof Array) && query.charAt(0) == '"'){
                return query;
            }

			query = SmartQueryCreator.escapeSpecialCharacters(query);
			queryArray = query.trim().split(/\s+/);
	
			for(var i = 0; i<queryArray.length; i++){
                if(queryArray[i] == " " || queryArray[i] == "")
                    continue;

				if(i == 0){
					tempQuery = encodeURIComponent(queryArray[i].trim());
				}else if(ORtoggle){
                    tempQuery = tempQuery + " OR " +encodeURIComponent(queryArray[i].trim());
                }
                else{
					tempQuery = tempQuery + " AND " +encodeURIComponent(queryArray[i].trim());
				}
				
			}
			
			return tempQuery;
			
		},

		escapeSpecialCharacters: function(value) {



            var specials = ['*', '+', '-',  '!', '(', ')', '{', '}', '[',
                ']', '^', '"', '~', '*', '?', ':', '\\', '/','|'];



            var regexp = new RegExp("(\\" + specials.join("|\\") + ")", "g");
            value = value.replace(regexp, "\\$1");

            return value;
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