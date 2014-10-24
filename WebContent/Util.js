/*******************************************************************************
 * Copyright (c) {2014} {Software Design and Collaboration Laboratory (SDCL)
 *				, University of California, Irvine}.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    {Software Design and Collaboration Laboratory (SDCL)
 *	, University of California, Irvine}
 *			- initial API and implementation and/or initial documentation
 *******************************************************************************/
var Util = {
		
		
		getOnlyUniqueElements : function(array){
			var unique = new Array();
			
			for(var i = 0; i<array.length; i++){
				if(unique.indexOf(array[i]) == -1)
					unique.push(array[i]);
			}
			return unique;
		}
};