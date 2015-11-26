Selections = new Mongo.Collection('selections');

Selections.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Selections.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let SelectionsSchema = new SimpleSchema({
    'boardId': {
        type: String,
        label: 'The id of the game board this selection belongs to'
    },
    owner: {
        type: String,
        label: 'The username of the user that created this selection'
    },
    'selection': {
        type: String,
        label: 'The id of the target cell that was selected'
    },
    'createdAt': {
        type: Date,
        label: 'The date the selection was made'
    }
});

Boards.attachSchema(SelectionsSchema);