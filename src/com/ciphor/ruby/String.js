(function() {
	/**
	 * Returns a copy of string with the first character converted to upper case.
	 * 
	 * @returns {String}
	 */
	String.prototype.capitalise = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	/**
	 * Case-insensitive version of comparison.
	 * 
	 * @param str
	 * @returns {Boolean}
	 */
	String.prototype.casecmp = function(str) {
		return this.toLowerCase() == str.toLowerCase();
	};

	/**
	 * Passes each character in str to the given block.
	 * 
	 * @param function_block(Char c)
	 * @returns {String}
	 */
	String.prototype.each_char = function(function_block) {
		var result = "";
		for ( var i = 0, len = this.length; i < len; i++) {
			result += function_block(this[i]);
		}
		return result;
	};

	/**
	 * Returns true if str ends with a suffix given.
	 * 
	 * @param suffix
	 * @returns {Boolean}
	 */
	String.prototype.end_with = function(suffix) {
		var exp = new RegExp(suffix + "$", "g");
		return exp.test(this);
	};

	/**
	 * Returns true if str starts with a prefix given.
	 * 
	 * @param prefix
	 * @returns {Boolean}
	 */
	String.prototype.stat_with = function(prefix) {
		var exp = new RegExp("^" + prefix, "g");
		return exp.test(this);
	};

	/**
	 * Returns a copy of str with leading and trailing whitespace removed.
	 * 
	 * @returns {String}
	 */
	String.prototype.strip = function() {
		var result = "";
		result = this.replace(/^(\s|\t|\n|\r)*/g, "");
		result = result.replace(/(\s|\t|\n|\r)*$/g, "");
		return result;
	};

	/**
	 * Returns a copy of str with uppercase alphabetic characters converted to
	 * lowercase and lowercase characters converted to uppercase. Note: case
	 * conversion is effective only in ASCII region.
	 * 
	 * @returns {String}
	 */
	String.prototype.swapcase = function() {
		var result = "";
		var upperCaseExp = /[A-Z]/;
		var lowerCaseExp = /[a-z]/;
		this.each_char(function(c) {
			if (upperCaseExp.test(c)) {
				result += c.toLowerCase();
			} else if (lowerCaseExp.test(c)) {
				result += c.toUpperCase();
			} else {
				result += c;
			}
		});
		return result;
	};
	/**
	 * Inserts other_str before the character at the given index, modifying str.
	 * Negative indices count from the end of the string, and insert after the
	 * given character. The intent is insert aString so that it starts at the
	 * given index.
	 * 
	 * @param index
	 * @param str
	 * @returns {String}
	 */
	String.prototype.insert = function(index, str) {
		if (index >= 0) {
			return this.slice(0, index).concat(str).concat(this.slice(index));
		}
		if (index < 0) {
			return this.slice(0, this.length + index + 1).concat(str).concat(this.slice(this.length + index + 1));
		}
	};

	/**
	 * Returns a new string with the characters from str in reverse order.
	 * 
	 * @returns {String}
	 */
	String.prototype.reverse = function() {
		var result = "";
		this.each_char(function(c) {
			result = c + result;
		});
		return result;
	};

})();
