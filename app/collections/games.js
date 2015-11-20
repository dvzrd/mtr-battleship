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
    'name': {
        type: String,
        label: 'The name of the game.'
    },
    'creator': {
        type: String,
        label: 'The user that created the game'
    }
});

Games.attachSchema( GamesSchema );