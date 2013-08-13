describe("Backbone", function(){

  it("should be an Object", function(){

    expect( typeof Backbone ).to.equal("object");

  });

});


describe("Backbone.Model", function(){

  it("should be a Function", function(){

    expect(typeof Backbone.Model).to.equal('function');

  });

  describe(".extend()", function(){

    beforeEach(function(){
      this.Animal = Backbone.Model.extend();
    });

    it("should return a Constructor", function(){
      expect( typeof this.Animal ).to.equal('function');
      expect( this.Animal.prototype.constructor ).to.be(this.Animal);
    });

    it("should return constructor whos prototype delegates properties to Backbone.Model.prototype", function(){
      expect( Backbone.Model.prototype.isPrototypeOf(this.Animal.prototype) ).to.be(true);
      expect( new this.Animal instanceof this.Animal).to.be(true);
    });

    it("should take an object and copy all of it's properties to the prototype of the new Model", function(){
      var Animal = Backbone.Model.extend({numberOfLegs: 4});
      expect( (new Animal).numberOfLegs ).to.equal(4);
    });

    it("should share functions with Backbome.Model.prototype", function(){
      var Animal = Backbone.Model.extend({numberOfLegs: 4});
      var cat = new Animal;
      expect( cat.get ).to.be( Backbone.Model.prototype.get );
      expect( cat.set ).to.be( Backbone.Model.prototype.set );
      expect( cat.on ).to.be( Backbone.Model.prototype.on );
      expect( cat.fire ).to.be( Backbone.Model.prototype.fire );
    });

    describe(".extend()", function(){

      beforeEach(function(){
        this.Human = this.Animal.extend();
      });

      it("should return a Constructor", function(){
        expect( typeof this.Human ).to.equal('function');
        expect( this.Human.prototype.constructor ).to.be(this.Human);
      });

      it("should return an object that delegates properties to Animal", function(){
        expect( this.Animal.prototype.isPrototypeOf(this.Human.prototype) ).to.be(true);
        expect( new this.Animal instanceof this.Animal).to.be(true);
        expect( new this.Human instanceof this.Animal).to.be(true);
      });

    });

  });

  describe("new Animal", function(){
    beforeEach(function(){
      this.Animal = Backbone.Model.extend();
    });

    it("should take an object and extend it's self with it", function(){
      var cat = new this.Animal({hairColor: 'brown'});
      expect(cat.hairColor).to.equal('brown');
    });

  });

  describe("#get", function(){
    it("should retrieve the value of the property given", function(){
      var Animal = Backbone.Model.extend();
      var cat = new Animal({sex:'m', color:'red'});
      expect( cat.get('sex') ).to.equal('m');
      expect( cat.get('color') ).to.equal('red');
    });
  });

  describe("#set", function(){
    it("should set the value of the given property to the given value", function(){
      var Animal = Backbone.Model.extend();
      var cat = new Animal();
      expect( cat.set('sex', 'f') ).to.be(cat);
      expect( cat.set('color', 'purple') ).to.be(cat);
      expect( cat.get('sex') ).to.equal('f');
      expect( cat.get('color') ).to.equal('purple');
    });

    it("should fire a 'change:#{property_name}' event", function(){
      var calls = [];
      function callback(event, data){
        calls.push([this, event, data]);
      }

      var Animal = Backbone.Model.extend();
      var cat = new Animal();
      cat.on('change:sex', callback);
      cat.set('sex','purple');
      expect( calls.length ).to.be(1);
      expect( calls[0][0] ).to.be(cat);
      expect( calls[0][1] ).to.equal('change:sex');
      expect( calls[0][2] ).to.eql({ sex: [ undefined, 'purple' ] });
    });
  });

  function createCallback() {
    function callback(event, data){
      callback.calls.push([this, event, data]);
    }
    callback.calls = [];
    return callback;
  }

  describe('#on &, #fire', function(){
    it("should register the given callback for the given event and call that callback when that event is fired", function(){
      var Animal = Backbone.Model.extend();
      var cat = new Animal();

      var  poop_callback0 = createCallback();
      var  poop_callback1 = createCallback();
      var vomit_callback0 = createCallback();
      var vomit_callback1 = createCallback();

      cat.on('poop',  poop_callback0);
      cat.on('poop',  poop_callback1);
      cat.on('vomit', vomit_callback0);
      cat.on('vomit', vomit_callback1);

      expect(  poop_callback0.calls.length ).to.be(0);
      expect(  poop_callback1.calls.length ).to.be(0);
      expect( vomit_callback0.calls.length ).to.be(0);
      expect( vomit_callback1.calls.length ).to.be(0);

      cat.fire('poop', {smellLevel:85});

      expect(  poop_callback0.calls.length ).to.be(1);
      expect(  poop_callback1.calls.length ).to.be(1);
      expect( vomit_callback0.calls.length ).to.be(0);
      expect( vomit_callback1.calls.length ).to.be(0);

      expect( poop_callback0.calls.length ).to.be(1);
      expect( poop_callback0.calls[0][0]  ).to.be(cat);
      expect( poop_callback0.calls[0][1]  ).to.equal('poop');
      expect( poop_callback0.calls[0][2]  ).to.eql({smellLevel:85});

      expect( poop_callback1.calls.length ).to.be(1);
      expect( poop_callback1.calls[0][0]  ).to.be(cat);
      expect( poop_callback1.calls[0][1]  ).to.equal('poop');
      expect( poop_callback1.calls[0][2]  ).to.eql({smellLevel:85});

      cat.fire('poop', {smellLevel:96});

      expect(  poop_callback0.calls.length ).to.be(2);
      expect(  poop_callback1.calls.length ).to.be(2);
      expect( vomit_callback0.calls.length ).to.be(0);
      expect( vomit_callback1.calls.length ).to.be(0);

      expect( poop_callback0.calls.length ).to.be(2);
      expect( poop_callback0.calls[1][0]  ).to.be(cat);
      expect( poop_callback0.calls[1][1]  ).to.equal('poop');
      expect( poop_callback0.calls[1][2]  ).to.eql({smellLevel:96});

      expect( poop_callback1.calls.length ).to.be(2);
      expect( poop_callback1.calls[1][0]  ).to.be(cat);
      expect( poop_callback1.calls[1][1]  ).to.equal('poop');
      expect( poop_callback1.calls[1][2]  ).to.eql({smellLevel:96});

      cat.fire('vomit', {smellLevel:12});

      expect(  poop_callback0.calls.length ).to.be(2);
      expect(  poop_callback1.calls.length ).to.be(2);
      expect( vomit_callback0.calls.length ).to.be(1);
      expect( vomit_callback1.calls.length ).to.be(1);

      expect( vomit_callback0.calls.length ).to.be(1);
      expect( vomit_callback0.calls[0][0]  ).to.be(cat);
      expect( vomit_callback0.calls[0][1]  ).to.equal('vomit');
      expect( vomit_callback0.calls[0][2]  ).to.eql({smellLevel:12});

      expect( vomit_callback1.calls.length ).to.be(1);
      expect( vomit_callback1.calls[0][0]  ).to.be(cat);
      expect( vomit_callback1.calls[0][1]  ).to.equal('vomit');
      expect( vomit_callback1.calls[0][2]  ).to.eql({smellLevel:12});
    });
  });

});
