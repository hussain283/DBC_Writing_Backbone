!function(){
  Backbone = {}

  Backbone.Model = function(){};

  Backbone.Model.extend = extend;

  Backbone.Model.initialize = function(options){ Copier(this,options); };


  Backbone.Model.prototype.get = function(prop){ return this[prop]; }

  Backbone.Model.prototype.set = function(prop, value){ 
    var value_history = [ this[prop] , value ]
    var data = {}
    
    data[prop] = value_history
    this[prop] = value;

    this.fire('change:' + prop, data);
    return this
  }

  Backbone.Model.prototype.on = function(event_name, callback){
    if (this.call_backs === undefined) { 
      this.call_backs = {}
    } 
    if (this.call_backs[event_name] === undefined) { this.call_backs[event_name] = [] }

    this.call_backs[event_name].push(callback);
  }

  Backbone.Model.prototype.fire = function(event_name, value) {
    
    if (this.call_backs != undefined ) { 
      for (var i = 0 ; i < this.call_backs[event_name].length ; i++) {
        this.call_backs[event_name][i].call(this, event_name, value);
      }
    }
  }

  function extend(options){
    
    function BackboneModel(options){ Copier(this,options); };

    BackboneModel.prototype = Object.create(this.prototype);
    
    BackboneModel.prototype.constructor = BackboneModel;

    BackboneModel.extend = extend;

    if (options) { this.initialize.call(this.prototype, options) }

    return BackboneModel;
  }

  function Copier(self, options){
    for (var prop in options){
      self[prop] = options[prop]
    }
  }

}();

