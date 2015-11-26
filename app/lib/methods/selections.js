Meteor.methods({
    insertSelection(selectionAttributes) {
        check(selectionAttributes, {
            boardId: String,
            selection: String
        });

        var now = new Date(),
            user = Meteor.user(),
            duplicateSelection = Selections.findOne({boardId: selectionAttributes.boardId, owner: user.username, selection: selectionAttributes.selection});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to be logged in select units.');
        }
        if (duplicateSelection) {
            return Meteor.Error('selection-already-exists', 'This selection was already made.');
        } else {

            var selection = _.extend(selectionAttributes, {
                owner: user.username,
                createdAt: now,
            }), selectionId = Selections.insert(selection);

            return {
                _id: selectionId
            };
        }
    },
    removeSelection(selectionId) {
        check(selectionId, String);

        var user = Meteor.user(),
            selection = Selections.findOne({_id: selectionId, owner: user.username});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to be logged in remove a selection');
        }
        if (!selection) {
            throw new Meteor.Error('selection-does-not-exist', 'This selection is not in the collection');
        } else {
            let removedSelection = selection.selection;

            Selections.remove(selectionId);

            return removedSelection;
        }
    }
});