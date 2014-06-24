/**
 * Created by lee on 4/7/14.
 */

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

    function toString(){
        return "type: "+this.type+", value: "+this.value;
    }
}