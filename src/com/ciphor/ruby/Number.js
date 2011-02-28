(function() {
	/**
	 * Number.times function. 3.times(function(item){...})
	 * 
	 * @param handler function
	 * @returns {Array}
	 */
	Number.prototype.times = function(handler) {
		var results = new Array();
		if (this > 0 && this == parseInt(this)) {
			for ( var i = 0; i < Math.ceil(this); i++) {
				results.push(handler(i));
			}
		} else {
			throw "Illegal number for times() function. Positive integer is required.";
		}
		return results;
	};

	/**
	 * x.modulo(y) means x-y*(x/y).floor
	 * 
	 * @param num
	 * @returns {Number}
	 */
	Number.prototype.modulo = function(num) {
		return x - y * (x / y).floor();
	};

	/**
	 * Returns the absolute value of num.
	 * 
	 * @returns {Number}
	 */
	Number.prototype.abs = function() {
		return Math.abs(this);
	};

	/**
	 * Returns the smallest Integer greater than or equal to num.
	 * 
	 * @returns {Number}
	 */
	Number.prototype.ceil = function() {
		return Math.ceil(this);
	};

	/**
	 * Returns the largest integer less than or equal to num.
	 * 
	 * @returns {Number}
	 */
	Number.prototype.floor = function() {
		return Math.floor(this);
	};

	/**
	 * Rounds num to a given precision in decimal digits (default 0 digits).
	 * Precision may be negative. Returns a floating point number when ndigits is
	 * more than zero.
	 * 
	 * @returns {Number}
	 */
	Number.prototype.round = function(ndigits) {
		return this.toFixed(ndigits);
	};

	/**
	 * Invokes block with the sequence of numbers starting at self, incremented by
	 * step (default 1) on each call. The loop finishes when the value to be
	 * passed to the block is greater than limit (if step is positive) or less
	 * than limit (if step is negative).
	 * 
	 * @param function_block(Number i)
	 * @param limit
	 * @param step(Optional)
	 */
	Number.prototype.step = function(function_block, limit, step) {
		var stepGap = 1;
		if (step != undefined) {
			stepGap = step;
		}
		if (stepGap >= 0) {
			for ( var i = this; i <= limit; i = i + stepGap) {
				function_block(i);
			}
		} else {
			for ( var i = this; i >= limit; i = i + stepGap) {
				function_block(i);
			}
		}
	};
})();
