Games = new Mongo.Collection('games');

Games.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Games.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let GamesSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of the game'
    },
    'creator': {
        type: String,
        label: 'The username of user that created the game'
    },
    'createdAt': {
        type: Date,
        label: 'The date the game was created'
    },
    'challenger': {
        type: String,
        label: 'The username of user that joined the game'
    },
    'playerCount': {
        type: Number,
        label: 'The player count of the game',
        limit: 2
    },
    'winner': {
        type: String,
        label: 'The username of the winner of this game'
    },
    'completedAt': {
        type: Date,
        label: 'The date the game was completed'
    }
});

Games.attachSchema(GamesSchema);