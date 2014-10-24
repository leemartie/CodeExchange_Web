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

function QueryModel(type, value) {
    this.type    =  type;
    this.value   =  value;
    this.valueIndex = 0;
    this.stackIndex = 0;
    this.displayType = "";
    this.displayValue = "";
    this.active = true;
    this.score = 0;
    this.rangeQuery = false;
    this.variableNames = "";
    this.imports = "";

    function toString(){
        return "type: "+this.type+", value: "+this.value;
    }
}