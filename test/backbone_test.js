describe("Backbone", function(){

  it("should be an Object", function(){

    expect( typeof Backbone ).to.equal("object");

  });

});


describe("Backbone.Model", function(){

  it("should be a Function", function(){

    expect(typeof Backbone.Model).to.equal('function');

  });

  describe(".extend", function(){

    beforeEach(function(){
      this.Animal = Backbone.Model.extend();
    });

    it("should return an object that delegates properties to Backbone.Model", function(){
      expect( Backbone.Model.prototype.isPrototypeOf(this.Animal.prototype) ).to.be(true);
    });

    describe(".extend", function(){

      beforeEach(function(){
        this.Human = this.Animal.extend();
      });

      it("should return an object that delegates properties to Backbone.Model", function(){
        expect( this.Animal.prototype.isPrototypeOf(this.Human.prototype) ).to.be(true);
      });

    });

  });

});
