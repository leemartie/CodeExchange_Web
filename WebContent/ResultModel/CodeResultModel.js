/**
 * Created by lee on 12/16/14.
 */
function CodeResultModel() {

    this.code = "";
    this.url = "";
    this.avatar = "";
    this.projectName = "";
    this.projectId = "";
    this.numberOfImports= 0;
    this.numberOfIssues= 0;
    this.numberOfOpenIssues= 0;
    this.numberOfClosedIssues= 0;
    this.churn= 0;
    this.size= 0;
    this.complexity= 0;
    this.package = "";
    this.extendsClass = "";
    this.implementsClass = "";
    this.author= "";
    this.owner= "";
    /*String*/
    this.imports= new Array();
    /*MethodCallModel*/
    this.methodCalls= new Array();
    /*MethodDecModel*/
    this.methodDecs= new Array();
    /*variable names occuring in the class*/
    this.variableNames = new Array();


}