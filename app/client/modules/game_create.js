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
        title: $('[name="title"]').val(),
        creator: Meteor.user().username,
        createdAt: new Date(),
        destroyer: null,
        playerCount: 1,
        winner: null,
        completedAt: null
    };

    Meteor.call('createGame', gameAttributes, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            Bert.alert('Game created!', 'success');
            $('.create.game.module.active').removeClass('active');
            FlowRouter.go('/dashboard');
        }
    });
};

Modules.client.gameCreate = gameCreate;