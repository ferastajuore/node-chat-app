const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Feras',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Ali',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Mona',
        room: 'Node Course'
      }];
  });



  it('should add new user', () => {
      var users = new Users();
      var user = {
          id: '123',
          name: 'mona',
          room: 'node course'
      }

      var resUser = users.addUser(user.id,user.name,user.room);

      expect(users.users).toEqual([user]);
  });

  it('Should remove user', () => {
    var userID = '1';
    var user = users.removeUser(userID);

    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove user', () => {
    var userID = '99';
    var user = users.removeUser(userID);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('Should find user', () => {
    var userID = '1';
    var user = users.getUser(userID);

    expect(user.id).toBe(userID)
  });

  it('Should not find user', () => {
    var userID = '99';
    var user = users.getUser(userID);

    expect(user).toBeFalsy();
  });

  it('Should return name for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Feras','Mona']);
  });

  it('Should return name for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Ali']);
  });

});