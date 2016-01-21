/**
 * Created by lee on 12/16/14.
 */
function MethodDecModel() {

    this.name            =   "";
    this.isConstructor   =   false;
    this.isVarArgs       =   false;
    this.isStatic        =   false;
    this.isAbstract      =   false;
    this.isGeneric       =   false;
    this.declaringClass  =   "";
    this.returnType      =   "";
    this.complexity      =   0;
    this.parameterTypes  =   new Array();

}