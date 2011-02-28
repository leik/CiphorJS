(function() {
	/**
	 * Add new function into the Object prototype.
	 * 
	 * @returns
	 */
	Object.prototype.getClass = function() {
		var _class;
		if (this.prototype != null) {
			_class = new Class(this.prototype);
		} else {
			_class = new Class(this);
		}
		return _class;
	};

	/**
	 * The "Class" concept in reflection.
	 * 
	 * @param object
	 */
	var Class = function(object) {
		this.__object = object;
		this.__exclude_fields = [ '__proto__', 'prototype' ].join(',');
		this.__exclude_methods = [ 'getClass', 'function()' ].join(',');
	};
	Class.prototype = {
		/**
		 * Get the constructor from the class.
		 * 
		 * @returns
		 */
		getConstructor : function() {
			return this.__object.constructor;
		},

		/**
		 * Get all fields available in the class
		 * 
		 * @returns {Array}
		 */
		getFields : function() {
			var declaredFields = new Array();
			var obj = this.__object;
			for ( var field in obj) {
				if (typeof obj[field] != "function" && this.__exclude_fields.match(field) == null) {
					declaredFields.push(field);
				}
			}
			return declaredFields;
		},

		/**
		 * Get all methods in the class.
		 * 
		 * @returns {Array}
		 */
		getMethods : function() {
			var declaredMethods = new Array();
			var obj = this.__object;
			for ( var method in obj) {
				if (typeof obj[method] == "function" && this.__exclude_methods.match(method) == null) {
					declaredMethods.push(method);
				}
			}
			return declaredMethods;
		},

		/**
		 * Get required field object.
		 * 
		 * @param field
		 * @returns {Field}
		 */
		getField : function(field) {
			return new Field(field);
		},

		/**
		 * Get required method object.
		 * 
		 * @param method
		 * @returns {Method}
		 */
		getMethod : function(method) {
			return new Method(method, this.__object[method]);
		}
	};

	/**
	 * The "Field" concept in reflection.
	 * 
	 * @param fieldName
	 */
	var Field = function(fieldName) {
		this._name = fieldName;
	};
	Field.prototype = {
		/**
		 * Get the field name.
		 * 
		 * @returns field name.
		 */
		getName : function() {
			return this._name;
		},

		/**
		 * Get the value of the field from a instance.
		 * 
		 * @param instance.
		 * @returns value.
		 */
		get : function(instance) {
			return instance[this._name];
		},

		/**
		 * Set the value of the field into a instance.
		 * 
		 * @param instance
		 * @param value
		 */
		set : function(instance, value) {
			instance[this._name] = value;
		},

		/**
		 * Get the the type of the field if we can.
		 * 
		 * @param instance
		 * @returns
		 */
		getType : function(instance) {
			return typeof instance[this._name];
		}
	};

	/**
	 * The "Method" concept in reflection.
	 * 
	 * @param methodName
	 * @param fn
	 */
	var Method = function(methodName, fn) {
		this._name = methodName;
		this._fn = fn;
	};

	Method.prototype = {
		/**
		 * Get the method name.
		 * 
		 * @returns method name.
		 */
		getName : function() {
			return this._name;
		},

		/**
		 * Invoke the method.
		 * 
		 * @param instance
		 * @return Object
		 */
		invoke : function(instance) {
			var argArray = new Array();
			for ( var i = 1; i < arguments.length; i++) {
				argArray.push(arguments[i]);
			}
			return this._fn.apply(instance, argArray);
		}
	};
})();
