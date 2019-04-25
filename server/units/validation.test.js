const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('Should reject non-string values', () => {
    var res =  isRealString(99);

    expect(res).toBe(false);
  });

  it('Should reqject string with only spaces', () => {
    var res =  isRealString('');

    expect(res).toBe(false);
  });

  it('Should allow string with non-space characters', () => {
    var res = isRealString('  Feras  ');

    expect(res).toBe(true);
  });

});