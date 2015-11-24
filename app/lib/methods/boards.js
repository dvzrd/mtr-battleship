Meteor.methods({
   createGameBoard(creatorAttributes) {
       check(creatorAttributes, {
           gameId: String
       });

       var now = new Date(),
           user = Meteor.user(),
           duplicateBoard = Boards.findOne({gameId: creatorAttributes.gameId, owner: user.username});

       if (!user) {
           throw new Meteor.Error('user-not-logged-in', 'You need to be logged in to create a game board.');
       } if (duplicateBoard) {
           throw new Meteor.Error('game-board-already-exists', 'This game board already exists.');
       } else {

           var board = _.extend(creatorAttributes, {
               owner: user.username,
               createdAt: now,
               unitPlacements: null,
               status: null,
           }), boardId = Boards.insert(board);

           return {
               _id: boardId
           };
       }
   }
});