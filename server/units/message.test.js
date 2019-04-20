const expect = require('expect');

const {generateMessage , generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('Should generate correct message object', () => {
    var from = "userTest",
        text = "I'm testing message",
        message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,text})
  });

});

describe('generateLocationMessage', () => {
  
  it('Should generate correct location object', () => {
    var from = 'ali',
        latitude = 99,
        longitude = 55,
        url = 'https://www.google.com/maps?q=99,55',
        message = generateLocationMessage(from, latitude, longitude);


    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,url})
  })

});