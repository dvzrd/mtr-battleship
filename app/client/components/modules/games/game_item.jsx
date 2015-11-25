App.GameItem = React.createClass({
    handleGameJoin(event) {
        event.preventDefault();

        // @TODO: refactor - separate module gameJoin
        var pathDef = '/battle/:_id',
            gameId = this.props.game._id,
            params = {_id: gameId},
            path = FlowRouter.path(pathDef, params),
            currentUser = Meteor.user();

        if (!currentUser) {
            Bert.alert('You need to be logged in to join a game', 'warning');
        } else {
            Meteor.call('joinGame', gameId, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'warning');
                } else {
                    Bert.alert('Get ready to destroy!', 'success');

                    // @TODO: refactor - separate module createGameBoard
                    let boardAttributes = {
                        gameId: gameId
                    };

                    Meteor.call('createGameBoard', boardAttributes, (error, boardId) => {
                        if (error) {
                            Bert.alert(error.reason, 'success');
                        } else {
                            FlowRouter.go(path);
                        }
                    });
                }
            });
        }
    },
    render() {
        return (
            <li className="game item" onClick={this.handleGameJoin}>

                <h2 className="title">
                    {this.props.game.title}
                    <small className="date">Render date here</small>
                </h2>
                <span className="creator">Created by {this.props.game.creator}</span>
                <span className="count">Players: {this.props.game.playerCount}</span>

            </li>
        );
    }
});