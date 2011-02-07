/**
 * Object Oriented extension for Javascript.
 */

/**
 * Inheritance of Class
 */
Object.prototype.extends = function(super_class){
	var super_constructor = super_class;
	this.prototype = new super_constructor();
	this.prototype.super = super_class.prototype;
	return this;
};

var Interface = function(clazz){
	this.raw_class = clazz;
	this.interface_functions = new Array();
	for(var func in clazz){
		if(clazz.hasOwnProperty(func)){
			this.interface_functions.push(func);
		}
	}
};

Interface.prototype.allImplemented = function(clazz){
	var all_implemented = true;
	var unimplemented_methods = new Array();
	for(var i=0,len=this.interface_functions.length;i<len;i++){
		var function_name = this.interface_functions[i];
		if(clazz.prototype[function_name] == null){
			all_implemented = false;
			unimplemented_methods.push(function_name);
		}
	}
	if(!all_implemented){
		throw "Interface methods unimplemented: "+unimplemented_methods;
	}
};

Object.prototype.implements = function(interface_class){
	this.prototype.interface = interface_class;
	return this;
};

Object.prototype.withMethods = function(implementation_class){
	var current_interface = this.prototype.interface;
	for(var function_name in implementation_class){
		this.prototype[function_name] = implementation_class[function_name];
	}
	current_interface.allImplemented(this);
	return this;
};