(function() {

	/**
	 * Ruby style attr_writer method. It creates setter methods for declared
	 * attributes in arguments.
	 * 
	 * @param attr(s)
	 */
	Object.prototype.attr_writer = function(attr) {
		for ( var i = 0, len = arguments.length; i < len; i++) {
			var attr_name = arguments[i];
			var setterMethodName = 'set' + attr_name.capitalise();
			this.constructor.prototype[setterMethodName] = function(value) {
				this[attr_name] = value;
			};
		}
	};

	/**
	 * Ruby style attr_reader method. It creates getter methods for declared
	 * attributes in arguments.
	 * 
	 * @param attr
	 */
	Object.prototype.attr_reader = function(attr) {
		for ( var i = 0, len = arguments.length; i < len; i++) {
			var attr_name = arguments[i];
			var getterMethodName = 'get' + attr_name.capitalise();
			this.constructor.prototype[getterMethodName] = function() {
				return this[attr_name];
			};
		}
	};

	/**
	 * Ruby style attr_accessor method. It creates both setter and getter methods
	 * for declared attributes in arguments.
	 * 
	 * @param attr
	 */
	Object.prototype.attr_accessor = function(attr) {
		for ( var i = 0, len = arguments.length; i < len; i++) {
			this.attr_reader(arguments[i]);
			this.attr_writer(arguments[i]);
		}
	};
})();
