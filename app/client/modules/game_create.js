let gameCreate = (options) => {
    _validate(options.form, options.component);
};

let _validate = (form, component) => {
    $(form).validate(validation(component));
};

let validation = (component) => {
    return {
        rules: {
            title: {
                required: true
            }
        },
        messages: {
            title: {
                required: 'You need a title for your game so others can find it.'
            }
        },
        submitHandler() {
            _handleGameCreate(component);
        }
    };
};

let _handleGameCreate = () => {
    let gameAttributes = {
        title: $('[name="title"]').val()
    }, currentUser = Meteor.user();

    if (!currentUser) {
        Bert.alert('You need to be logged in to create games', 'warning');
    } else {
        Meteor.call('createGame', gameAttributes, (error, gameId) => {
            let pathDef = '/battle/:_id',
                params = gameId,
                path = FlowRouter.path(pathDef, params);

            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                //@TODO: find a better way to toggle this modal
                $('.create.game.module.active').removeClass('active');

                Bert.alert('Game created!', 'success');

                // @TODO: refactor this call to gameBoardCreate module
                let gameAttributes = {
                    gameId: gameId._id
                };

                Meteor.call('createGameBoard', gameAttributes, (error) => {
                    if (error) {
                        console.error(error.reason);
                    } else {
                        FlowRouter.go(path);
                    }
                });
            }
        });
    }
};

Modules.client.gameCreate = gameCreate;