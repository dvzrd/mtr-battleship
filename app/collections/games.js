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
        label: 'The title of the game.'
    },
    'creator': {
        type: String,
        label: 'The user that created the game'
    },
    'playerCount': {
        type: Number,
        label: 'The player count of the game'
    }
});

Games.attachSchema(GamesSchema);