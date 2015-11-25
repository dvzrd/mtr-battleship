Meteor.publish('boards', function (selector) {
    check(selector, Object);
    return Boards.find(selector, {fields: {'gameId': 1}});
});

Meteor.publish('board', function (boardId) {
    check(boardId, String);
    return Boards.find({_id: boardId});
});
