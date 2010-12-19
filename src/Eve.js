/**
 * Event listening and firing extension.
 * @author lei.kang
 */

/**
 * Eve object including events registry and simple functions to listen and fire
 * event.
 */
Eve = {
  __events_pool : {},

  /**
   * Register a new Eve.event into the registry.
   *
   * @param event_name
   * @returns {Eve.event}
   */
  listen : function(event_name) {
    var event;
    if (this.__events_pool[event_name] == null) {
      event = new Eve.event(event_name);
    } else {
      event = this.__events_pool[event_name];
    }
    this.__events_pool[event_name] = event;
    return event;
  },
  /**
   * Remove a Eve.event from the registry.
   *
   * @param event_name
   */
  forget : function(event_name) {
    if (this.__events_pool[event_name] != null) {
      delete this.__events_pool[event_name];
    }
  },
  /**
   * Data storage object for each Eve.event
   *
   * @param event_name
   * @returns store A data storage object
   */
  lookup : function(event_name) {
    return this.__events_pool[event_name];
  }
};

/**
 * Eve.event object in the Eve events registry. Constructor with even name.
 *
 * @param event name
 */
Eve.event = function(name) {
  this._name = name;
  this._functions = {
    prioritised : new Array(),
    unprioritised : new Array()
  };
  this._data;
};
/**
 * Define the behaviours of Eve.event.
 */
Eve.event.prototype = {
  /**
   * Add an Eve.event.func object into the Eve.event functions registry.
   *
   * @param fn A Eve.event.func object
   * @returns {Eve.event.func}
   */
  run : function(fn, priority) {
    var func = new Eve.event.func(fn, priority);
    if (func.priority) {
      if (this._functions.prioritised[func.priority]) {
        if(console) {
          console.error("Found an Eve.event.func with the same priority!");
        } else {
          throw "Found an Eve.event.func with the same priority!";
        }
      } else {
        this._functions.prioritised[func.priority] = func;
      }
    } else {
      this._functions.unprioritised.push(func);
    }
    return func;
  },
  /**
   * Remove a Eve.event.func from Eve.event functions registry.
   *
   * @param fn a primitive function object
   * @returns {Eve.event}
   */
  never : function(fn) {
    for (i in this._functions.prioritised) {
      if (this._functions.prioritised[i].fn == fn) {
        delete this._functions.prioritised[i];
      }
    }
    for (i in this._functions.unprioritised) {
      if (this._functions.unprioritised[i].fn == fn) {
        delete this._functions.unprioritised[i];
      }
    }
    return this;
  },
  /**
   * Trigger all the functions registered in the current Eve.event.
   *
   * @returns {Eve.event}
   */
  fire : function() {
    var functions;
    functions = this._functions;
    var all_functions_array = functions.prioritised.concat(functions.unprioritised);
    for ( var i = 0; i < all_functions_array.length; i++) {
      var func = all_functions_array[i];
      if (func) {
        func.execute();
      }
    }
    return this;
  },
  /**
   * Register a data store for the current Eve.event.
   *
   * @param store A simple javascript object with key/value pairs;
   * @returns {Eve.event}
   */
  using : function(data) {
    this._data = data;
    return this;
  },
  /**
   * Get the data store for the current Eve.event object.
   *
   * @returns A simple javascript object with key/value pairs;
   */
  data : function() {
    return this._data;
  }
};

/**
 * Eve.event.func object into the event functions registry
 *
 * @param fn A function object.
 * @param priority Function triggering order is based on this priority.
 */
Eve.event.func = function(fn, priority) {
  this.fn = fn;
  this.priority = priority;
  this.scope;
};
/**
 * Define Object behaviours of Eve.event.func.
 */
Eve.event.func.prototype = {
  /**
   * Define the scope the registered function is going to run inside.
   *
   * @param scope A javascript object
   */
  under : function(scope) {
    this.scope = scope;
  },
  /**
   * Execute the function, called by fire() function in {Eve.event}
   */
  execute : function() {
    if(this.fn != null) {
      if (this.scope) {
        this.fn.apply(this.scope);
      } else {
        this.fn();
      }
    }
  }
};
