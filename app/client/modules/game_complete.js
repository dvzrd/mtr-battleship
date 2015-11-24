// @TODO: refactor handleCompleteGameClick from menu button to this module

let gameComplete = (options) => {
    _handleGameComplete(options.button, options.gameId);
};

let _handleGameComplete = (button, gameId) => {

    $(button).click(function () {
        Meteor.call('completeGame', gameId, (error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                Bert.alert('Game completed!', 'success');
                FlowRouter.go('root');
            }
        });
    });
};

Modules.client.gameComplete = gameComplete;