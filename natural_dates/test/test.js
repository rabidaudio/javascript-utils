var chai = require('chai');
chai.use(require('chai-datetime'));
var should = chai.should();

require('../src/natural_dates');

var REF_DATE = new Date('2015-01-01T06:00:00.000Z'); //a Thursday
Date.natural.referenceDate = REF_DATE;

describe('Date', function(){
  describe('#getNaturalDate()', function(){
    it('should exist', function(){
        new Date().should.have.property('getNaturalDate');
        new Date().getNaturalDate.should.be.a.Function;
    });

    it('should be configurable', function(){
        Date.natural.referenceDate.should.be.ok;
    });

    it('should get Yesterday', function(){
        var yesterday = new Date(2014, 11, 31);
        yesterday.getNaturalDate().should.eql("Yesterday");
    });
    it('should get Today', function(){
        var today = new Date(2015, 0, 1);
        today.getNaturalDate().should.eql("Today");
    });
    it('should get Tomorrow', function(){
        var tomorrow = new Date(2015, 0, 2);
        tomorrow.getNaturalDate().should.eql("Tomorrow");
    });
    it('should get later in the week', function(){
        var monday = new Date(2015, 0, 5);
        monday.getNaturalDate().should.eql("This Monday");
    });
    it('should get earlier in the week', function(){
        var monday = new Date(2014, 11, 29);
        monday.getNaturalDate().should.eql("Last Monday");
    });
    it('should get two weeks from now', function(){
        var monday = new Date(2015, 0, 12);
        monday.getNaturalDate().should.eql("Next Monday the 12th");
    });
    it('should get future dates this year',function(){
        var april = new Date(2015, 3, 1);
        april.getNaturalDate().should.eql('April 1st');
    });
    it('should get past dates this year',function(){
        var april = new Date(2014, 9, 2);
        april.getNaturalDate().should.eql('October 2nd');
    });
    it('should get future dates other years',function(){
        var april = new Date(2016, 3, 1);
        april.getNaturalDate().should.eql('April 1st 2016');
    });
    it('should get past dates other years',function(){
        var april = new Date(2013, 9, 2);
        april.getNaturalDate().should.eql('October 2nd 2013');
    });
  });

  // describe('boolean checks', function(){
  //   it('should know this week', function(){
  //       new Date(2015, 0, 3).thisWeek.should.be.true;
  //       new Date(2014, 11, 29).thisWeek.should.be.true;
  //       new Date(2015, 0, 3).thisWeek.should.be.true;
  //       new Date(2014, 11, 29).thisWeek.should.be.true;
  //   })
  // });

  describe('#naturalTime()', function(){
    it('should handle am', function(){
        var morning = new Date(2015, 0, 1, 3, 0);
        morning.getNaturalTime().should.eql('3 am');
    });
    it('should handle pm', function(){
        var afternoon = new Date(2015, 0, 1, 15, 0);
        afternoon.getNaturalTime().should.eql('3 pm');
    });
    it('should handle noon', function(){
        var noon = new Date(2015, 0, 1, 12, 0);
        noon.getNaturalTime().should.eql('noon');
    });
    it('should handle midnight', function(){
        var midnight = new Date(2015, 0, 1, 0, 0);
        midnight.getNaturalTime().should.eql('midnight');
    });
  });
})