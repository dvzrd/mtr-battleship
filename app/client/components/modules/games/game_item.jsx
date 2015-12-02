App.GameItem = React.createClass({
    handleGameJoin(event) {
        event.preventDefault();

        // @TODO: refactor - break down these calls
        let user = Meteor.user(),
            gameId = this.props.game._id,
            userIsPlaying = this.props.game.creator === user.username || this.props.game.destroyer === user.username,
            gameIsFull = this.props.game.playerCount === 2 && !userIsPlaying,
            pathDef = '/battle/:_id',
            params = {_id: gameId},
            path = FlowRouter.path(pathDef, params);

        if (!user) {
            Bert.alert('You need to be logged in to join a game', 'warning');
        }
        if (gameIsFull) {
            // @TODO: method for joining a recently created and available game
            return Meteor.Error('game-full', 'This game is full.');
        } else {
            if (userIsPlaying) {
                FlowRouter.go(path);
            } else {

                let joinAttributes = {
                    gameId: gameId,
                    destroyer: user.username
                };

                Meteor.call('joinGame', joinAttributes, (error) => {
                    if (error) {
                        Bert.alert(error.reason, 'warning');
                    } else {
                        Bert.alert('Get ready to destroy!', 'success');

                        // @TODO: refactor - separate function for createGameBoard
                        let boardAttributes = {
                            gameId: gameId,
                            owner: user.username
                        };

                        Meteor.call('createGameBoard', boardAttributes, (error) => {
                            if (error) {
                                Bert.alert(error.reason, 'success');
                            } else {
                                FlowRouter.go(path);
                            }
                        });
                    }
                });
            }
        }
    },
    render() {
        return (
            <li className="game item" onClick={this.handleGameJoin}>

                <h2 className="title">
                    {this.props.game.title}
                    <small className="meta">created {DateHelpers.fromNow(this.props.game.createdAt)} by {this.props.game.creator}</small>
                </h2>
                <span className="count">Players: {this.props.game.playerCount}</span>

            </li>
        );
    }
});