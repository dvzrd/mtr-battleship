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
            emailAddress: {
                required: 'You need a title for your game so others can find it.'
            }
        },
        submitHandler() {
            _handleGameCreate(component);
        }
    };
};

let _handleGameCreate = () => {
    let title = $('[name="title"]').val();

    console.log('call create game method');
};

Modules.client.gameCreate = gameCreate;