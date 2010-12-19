Object.prototype.getClass = function() {
  var _class;
  if(this.prototype != null) {
    _class = new Class(this.prototype);
  } else {
    _class = new Class(this);
  }
  return _class;
};
Class = function(object) {
  this.__object = object;
  this.__exclude_fields = [ '__proto__', 'prototype' ].join(',');
  this.__exclude_methods = [ '_getClass','function()' ].join(',');
};
Class.prototype = {

  getConstructor : function() {
    return this.__object.constructor;
  },
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
  getField : function(field) {
    return new Field(field);
  },
  getMethod : function(method) {
    return new Method(method,this.__object[method]);
  }
};

Field = function(fieldName) {
  this._name = fieldName;
};
Field.prototype = {
  getName : function() {
    return this._name;
  },
  get : function(instance) {
    return instance[this._name];
  },
  set : function(instance,value) {
    instance[this._name] = value;
  },
  getType : function(instance) {
    return typeof instance[this._name];
  }
};

Method = function(methodName,fn){
  this._name = methodName;
  this._fn = fn;
};

Method.prototype = {
  getName : function(){
    return this._name;
  },
  invoke : function(instance){
    var argArray = new Array();
    for(var i=1;i<arguments.length;i++){
      argArray.push(arguments[i]);
    }
    var argString = argArray.join(",");
    this._fn.apply(instance,argArray);
  }
};
