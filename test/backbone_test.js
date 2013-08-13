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
    })

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

    });
  })

});
