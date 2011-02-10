/**
 * times;map;module;
 */
(function() {

	/**
	 * Add all elements in the given array into the self.
	 * 
	 * @param arr
	 */
	Array.prototype.push_all = function(arr) {
		for ( var i = 0; i < arr.length; i++) {
			this.push(arr[i]);
		}
		return this;
	};

	/**
	 * Array.each function. [1,2,3].each(function(i,item){...})
	 * 
	 * @param handler function
	 */
	Array.prototype.each = function(handler) {
		for ( var i = 0, len = this.length; i < len; i++) {
			handler(i, this[i]);
		}
	};

	/**
	 * Same as Array#each, but traverses self in reverse order.
	 * 
	 * @param handler
	 */
	Array.prototype.reverse_each = function(handler) {
		for ( var i = this.length - 1; i >= 0; i--) {
			handler(i, this[i]);
		}
	};

	/**
	 * Array.map function. [1,2,3].map(function(item){...}) returns an new array
	 * of results.
	 * 
	 * @param handler function
	 */
	Array.prototype.map = function(handler) {
		var results = new Array();
		for ( var i = 0, len = this.length; i < len; i++) {
			results[i] = handler(i, this[i]);
		}
		return results;
	};

	/**
	 * Returns the element at index. A negative index counts from the end of this.
	 * Returns null if the index is out of range.
	 * 
	 * @param index
	 * @returns Returns the element at index.
	 */
	Array.prototype.at = function(index) {
		var len = this.length;
		if (index >= 0 && index < len) {
			return this[index];
		} else if (index < 0 && index >= (-len)) {
			return this[len + index];
		} else {
			return null;
		}
	};

	/**
	 * Returns whether the array contains the given object.
	 * 
	 * @param obj
	 * @returns {Boolean}
	 */
	Array.prototype.contains = function(obj) {
		var hasContained = false;
		for ( var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				hasContained = true;
			}
		}
		return hasContained;
	};
	Array.prototype.includes = Array.prototype.contains;

	/**
	 * Returns a copy of self with all null elements removed.
	 * 
	 * @returns {Array}
	 */
	Array.prototype.compact = function() {
		var result = [];
		for ( var i = 0; i < this.length; i++) {
			if (this[i] != null) {
				result.push(this[i]);
			}
		}
		return result;
	};

	/**
	 * Remove the given object from the array.
	 * 
	 * @param obj
	 * @returns {Array}
	 */
	Array.prototype.remove = function(obj) {
		for ( var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				delete this[i];
			}
		}

		var temp = this.compact();
		this.clear().push_all(temp);
		return this;
	};

	/**
	 * Deletes the element at the specified index.
	 * 
	 * @param i
	 * @returns {Array}
	 */
	Array.prototype.remove_at = function(i) {
		if (this[i]) {
			delete this[i];
		}
		var temp = this.compact();
		this.clear().push_all(temp);
		return this;
	};

	/**
	 * Deletes every element of self for which block evaluates to true.
	 * 
	 * @param condition_function(Index i,Element el)
	 * @returns {Array}
	 */
	Array.prototype.remove_if = function(condition_function) {
		var temp = this.reject(condition_function);
		this.clear().push_all(temp);
		return this;
	};

	/**
	 * Clear the content in the array;
	 * 
	 * @returns {Array}
	 */
	Array.prototype.clear = function() {
		var len = this.length;
		for ( var i = 0; i < len; i++) {
			this.pop();
		}
		return this;
	};

	/**
	 * Returns whether the array is empty;
	 * 
	 * @returns {Boolean}
	 */
	Array.prototype.is_empty = function() {
		return (this.length == 0);
	};

	/**
	 * Returns the intersection of the two arrays;
	 * 
	 * @param arr
	 * @returns {Array}
	 */
	Array.prototype.intersect = function(arr) {
		var tempArray = this.concat(arr).sort();
		var resultArray = new Array();
		var previousEl;
		for ( var i = 0; i < tempArray.length; i++) {
			if (previousEl == tempArray[i]) {
				resultArray.push(tempArray[i]);
			}
			previousEl = tempArray[i];
		}
		return resultArray;
	};

	/**
	 * Array Difference—Returns a new array that is a copy of the original array,
	 * removing any items that also appear in "arr".
	 * 
	 * @param arr
	 * @returns {Array}
	 */
	Array.prototype.deduct = function(arr) {
		var result = [].concat(this);
		for ( var i = 0; i < arr.length; i++) {
			if (this.contains(arr[i])) {
				result.remove(arr[i]);
			}
		}
		return result;
	};
	/**
	 * Set Union — Returns a new array by joining this array with other_ary,
	 * removing duplicates.
	 * 
	 * @param arr
	 * @returns {Array}
	 */
	Array.prototype.union = function(arr) {
		return this.push_all(arr).uniq();
	};

	/**
	 * Returns a new array by removing duplicate values in self.
	 * 
	 * @returns {Array}
	 */
	Array.prototype.uniq = function() {
		var resultArray = new Array();
		for ( var i = 0, len = this.length; i < len; i++) {
			if (!resultArray.includes(this[i])) {
				resultArray.push(this[i]);
			}
		}
		return resultArray;
	};

	/**
	 * Returns an array containing the elements in self corresponding to the given
	 * selector(s). The selectors may be either integer indices or ranges.
	 * 
	 * @param selector(s)
	 * @returns {Array}
	 */
	Array.prototype.values_at = function(selectors) {
		var resultArray = new Array();
		for ( var i = 0, len = arguments.length; i < len; i++) {
			resultArray.push(this[arguments[i]]);
		}
		return resultArray;
	};

	/**
	 * Converts any arguments to arrays, then merges elements of self with
	 * corresponding elements from each argument. This generates a sequence of
	 * self.size n-element arrays, where n is one more that the count of
	 * arguments. If the size of any argument is less than enumObj.size, null
	 * values are supplied. If a block is given, it is invoked for each output
	 * array, otherwise an array of arrays is returned.
	 * 
	 * @param arrays
	 * @returns {Array}
	 */
	Array.prototype.zip = function(arrays) {
		var resultArray = new Array();
		for ( var j = 0; j < this.length; j++) {
			var current_element_array = (this[j] instanceof Array) ? this[j] : [ this[j] ];
			for ( var i = 0, len = arguments.length; i < len; i++) {
				if (arguments[i] instanceof Array) {
					var current_argument_array = arguments[i];
					current_element_array.push(current_argument_array[j] || null);
				}
			}
			resultArray.push(current_element_array);
		}
		return resultArray;
	};

	/**
	 * Assumes that self is an array of arrays and transposes the rows and
	 * columns.
	 * 
	 * @returns {Array}
	 */
	Array.prototype.transpose = function() {
		var resultArray = this[0];
		for ( var i = 1; i < this.length; i++) {
			resultArray = resultArray.zip(this[i]);
		}
		return resultArray;
	};

	/**
	 * Returns first n elements from array.
	 * 
	 * @param n
	 * @returns {Array}
	 */
	Array.prototype.take = function(n) {
		return this.slice(0, n - 1);
	};

	/**
	 * Passes elements to the block until the block returns null or false, then
	 * stops iterating and returns an array of all prior elements. e.g.:
	 * [1,2,3,4,5].take_while(function(i,el){return i<3;}) ==> [1,2,3]
	 * 
	 * @param condition_function(Index i,Element el)
	 * @returns {Array}
	 */
	Array.prototype.take_while = function(condition_function) {
		var resultArray = new Array();
		var i = 0;
		while (i < this.length && condition_function(i, this[i]) && this[i]) {
			resultArray.push(this[i]);
			i++;
		}
		return resultArray;
	};

	/**
	 * Invokes the block passing in successive elements from self, returning an
	 * array containing those elements for which the block returns a true value.
	 * e.g.: [5,2,3,1,4].select(function(i,el){return el<3;}) ==> [2,1]
	 * 
	 * @param condition_function
	 * @returns {Array}
	 */
	Array.prototype.select = function(condition_function) {
		var resultArray = new Array();
		for ( var i = 0, len = this.length; i < len; i++) {
			if (condition_function(i, this[i]) && this[i]) {
				resultArray.push(this[i]);
			}
		}
		return resultArray;
	};

	/**
	 * Returns a new array containing the items in self for which the block is not
	 * true. e.g.: [1,2,3,4,5].reject(function(i,el){return el<3;}) ==> [3,4,5]
	 * 
	 * @param condition_function
	 * @returns {Array}
	 */
	Array.prototype.reject = function(condition_function) {
		var resultArray = new Array();
		for ( var i = 0, len = this.length; i < len; i++) {
			if (!condition_function(i, this[i]) && this[i]) {
				resultArray.push(this[i]);
			}
		}
		return resultArray;
	};

	/**
	 * Returns new array by rotating self, whose first element is the element at n
	 * in self. If n is negative then it rotates in counter direction.
	 * 
	 * @param n (optional)
	 * @returns {Array}
	 */
	Array.prototype.rotate = function(n) {
		var cnt = 1;
		var len = this.length;
		if (n && n >= 0) {
			cnt = n;
		} else if (n && n < 0) {
			cnt = len + n;
		}
		var tempArray = this.concat(this);
		return tempArray.slice(cnt, cnt + len);
	};

	/**
	 * Returns the last element(s) of self.
	 * 
	 * @param n (optional)
	 * @returns {Array}
	 */
	Array.prototype.last = function(n) {
		var lastN = 1;
		if (n) {
			lastN = n;
		}
		return this.slice(this.length - lastN);
	};

	/**
	 * Returns the first element, or the first n elements, of the array.
	 * 
	 * @param n
	 * @returns {Array}
	 */
	Array.prototype.first = function(n) {
		var firstN = 1;
		if (n) {
			firstN = n;
		}
		return this.slice(0, firstN);
	};

	/**
	 * Inserts the given values before the element with the given index (which may
	 * be negative).
	 * 
	 * @param index
	 * @param object(s)
	 * @returns {Array}
	 */
	Array.prototype.insert = function(index, objects) {
		var argumentsArray = [].push_all(arguments);
		var objectsToInsert = argumentsArray.slice(1);
		if (index >= 0) {
			return this.first(index).push_all(objectsToInsert).push_all(this.slice(index));
		}
		if (index < 0) {
			return this.first(this.length + index + 1).push_all(objectsToInsert).push_all(this.slice(this.length + index + 1));
		}
	};

	/**
	 * Equality—Two arrays are equal if they contain the same number of elements
	 * and if each element is equal to (according to Object.==) the corresponding
	 * element in the other array.
	 * 
	 * @param arr
	 * @returns {Boolean}
	 */
	Array.prototype.equals = function(arr) {
		var result = true;
		var len = this.length;
		if (len == arr.length) {
			for ( var i = 0; i < len; i++) {
				if (this[i] != arr[i]) {
					result = false;
					break;
				}
			}
		} else {
			result = false;
		}
		return result;
	};

	/**
	 * Returns the number of elements. If an argument is given, counts the number
	 * of elements which equals to obj. If a block is given, counts the number of
	 * elements yielding a true value.
	 * 
	 * @param condition_function
	 * @returns {Number}
	 */
	Array.prototype.count = function(condition_function) {
		var count = 0;
		this.each(function(i, item) {
			if (typeof condition_function == "function" && condition_function(i, item)) {
				count++;
			} else if (item == condition_function) {
				count++;
			}
		});
		return count;
	};

	/**
	 * Tries to return the element at position index. If the index lies outside
	 * the array, returns default if provided, Negative values of index count from
	 * the end of the array.
	 * 
	 * @param index
	 * @param default_value
	 * @returns the element at position index
	 */
	Array.prototype.fetch = function(index, default_value) {
		return this.at(index) != null ? this.at(index) : default_value;
	};

	/**
	 * Returns the index of the first object in self such that is == to obj. If a
	 * block is given instead of an argument, returns first object for which block
	 * is true. Returns null if no match is found. e.g.
	 * [1,2,3,4,5].index(function(i,el){return el==2;}) ==> 1;
	 * [1,2,3,4,5].index(3) ==> 2
	 * 
	 * @param condition
	 * @returns {Number}
	 */
	Array.prototype.index = function(condition) {
		if (typeof condition == "function") {
			for ( var i = 0, len = this.length; i < len; i++) {
				if (condition(i, this[i]) == true) {
					return i;
				}
			}
		} else {
			for ( var i = 0, len = this.length; i < len; i++) {
				if (condition == this[i]) {
					return i;
				}
			}
		}
		return null;
	};

	/**
	 * Returns a new array that is a one-dimensional flattening of this array
	 * (recursively). That is, for every element that is an array, extract its
	 * elements into the new array. If the optional level argument determines the
	 * level of recursion to flatten.
	 * e.g.:[1,2,[3,[4,5],6,[7]],8,[9,10]].flatten(1) ==> [1, 2, 3, [4, 5], 6,
	 * [7], 8, 9, 10]
	 * 
	 * @param level
	 * @returns {Array}
	 */
	Array.prototype.flatten = function(level) {
		var recursive_level = level != undefined ? level : 64;
		var current_level = 0;
		var resultArray = new Array();
		var recursiveFlatting = function(item) {
			if (item instanceof Array && current_level <= recursive_level) {
				item.each(function(i, el) {
					current_level++;
					recursiveFlatting(el);
					current_level--;
				});
			} else {
				resultArray.push(item);
			}
		};
		recursiveFlatting(this);
		return resultArray;
	};

	/**
	 * Deletes every element of self for which block evaluates to false.
	 * 
	 * @param condition_function(Index i,Element el)
	 * @returns {Array}
	 */
	Array.prototype.keep_if = function(condition_function) {
		var temp = this.select(condition_function);
		this.clear().push_all(temp);
		return this;
	};

	/**
	 * Choose a random element or n random elements from the array. The elements
	 * are chosen by using random and unique indices into the array in order to
	 * ensure that an element doesn‘t repeat itself unless the array already
	 * contained duplicate elements
	 * 
	 * @param n
	 * @returns {Array}
	 */
	Array.prototype.sample = function(n) {
		if (n > this.length) {
			throw "Out of array length!";
		}
		var self = this;
		var sampleCapacity = new Number(n != undefined ? n : 1);
		var getRandomElement = function() {
			return Math.floor(Math.random() * self.length);
		};
		var indexArray = new Array();
		for ( var i = 0; i < sampleCapacity; i++) {
			var current_index = getRandomElement();
			while (indexArray.contains(current_index)) {
				current_index = getRandomElement();
			}
			indexArray.push(current_index);
		}
		return indexArray.map(function(i, el) {
			return self[el];
		});
	};

	/**
	 * Returns a new array with elements of this array shuffled. e.g.: a = [ 1, 2,
	 * 3 ] #=> [1, 2, 3], a.shuffle #=> [2, 3, 1]
	 * 
	 * @returns {Array}
	 */
	Array.prototype.shuffle = function() {
		return this.sample(this.length);
	};

	/**
	 * Alias for length
	 * 
	 * @returns {Number}
	 */
	Array.prototype.size = function() {
		return this.length;
	};

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
})();
