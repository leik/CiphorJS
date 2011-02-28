/**
 * Initial configuration object for CiphorJS components. baseUrl : the url for
 * the ciphor root directory.
 */
var config = (function() {
	var config;
	var scriptTags = document.getElementsByTagName("script");
	for ( var i = 0, len = scriptTags.length; i < len; i++) {
		if (scriptTags[i].getAttribute("config") != undefined) {
			eval("config = {" + scriptTags[i].getAttribute("config") + "}");
		}
	}
	;
	return config;
})();

var Package = {
	__imported : {},
	__baseUrl : null,

	base : function(url) {
		if (url) {
			this.__baseUrl = url;
		} else if (config && config.baseUrl) {
			this.__baseUrl = config.baseUrl;
		} else {
			this.__baseUrl = window.location.protocol + "\/\/" + window.location.host;
		}
		this.__baseUrl += "\/";
	},

	import : function(packageName) {
		if (!this.__baseUrl) {
			this.base();
		}
		if (!this.__imported[packageName]) {
			var url = this.__baseUrl + packageName.replace(/\./g, "\/").concat(".js");
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, false);
			xhr.send(null);
			eval(xhr.responseText);
			this.__imported[packageName] = true;
		}
	}
};

/**
 * Inheritance function;
 * 
 * @param super_class The super class to extends.
 * @memberOf Function
 * @returns {Object}
 */
Function.prototype.extends = function(super_class) {
	var super_constructor = super_class;
	this.prototype = new super_constructor();
	this.prototype.super = super_class.prototype;
	return this;
};

/**
 * Interface implementing function.
 * 
 * @param [interface,interface...] unfixed number of arguments are accepted.
 * @memberOf Function
 * @returns {Object}
 */
Function.prototype.implements = function() {
	if (!this.prototype.interfaces) {
		this.prototype.interfaces = new Array();
	}
	for ( var i = 0; i < arguments.length; i++) {
		this.prototype.interfaces.push(arguments[i]);
	}
	return this;
};

/**
 * Implementing interface with implementation methods.
 * 
 * @param implementation_class
 * @memberOf Function
 * @returns {Object}
 */
Function.prototype.withMethods = function(implementation_class) {
	for ( var function_name in implementation_class) {
		this.prototype[function_name] = implementation_class[function_name];
	}
	for ( var i = 0, len = this.prototype.interfaces.length; i < len; i++) {
		this.prototype.interfaces[i].allImplemented(this);
	}
	return this;
};

/**
 * Interface class definition.
 * 
 * @param clazz
 * @returns Interface
 */
var Interface = function(clazz) {
	this.raw_class = clazz;
	this.interface_functions = new Array();
	for ( var func in clazz) {
		if (clazz.hasOwnProperty(func)) {
			this.interface_functions.push(func);
		}
	}
};

/**
 * Check whether all the abstract methods are implemented by the implementation
 * class.
 * 
 * @param clazz
 * @memberOf Interface
 */
Interface.prototype.allImplemented = function(clazz) {
	var all_implemented = true;
	var unimplemented_methods = new Array();
	for ( var i = 0, len = this.interface_functions.length; i < len; i++) {
		var function_name = this.interface_functions[i];
		if (clazz.prototype[function_name] == null) {
			all_implemented = false;
			unimplemented_methods.push(function_name);
		}
	}
	if (!all_implemented) {
		throw "Interface methods unimplemented: " + unimplemented_methods;
	}
};
