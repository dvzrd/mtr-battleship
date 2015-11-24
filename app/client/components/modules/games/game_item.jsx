App.GameItem = React.createClass({
    handleGameJoin(event) {
        event.preventDefault();

        // @TODO: Move this to joinGame method (and Modules.client)

        var pathDef = '/battle/:_id',
            gameId = this.props.game._id,
            params = {_id: gameId},
            path = FlowRouter.path(pathDef, params),
            currentUser = Meteor.user();

        if (this.props.game.creator === currentUser.username) {
            FlowRouter.go(path);
        }
        if (this.props.game.destroyer === currentUser.username) {
            FlowRouter.go(path);
        } else {
            if (this.props.game.playerCount === 2 || this.props.game.creator === currentUser.username) {
                // @TODO: method for joining a recently created and available game
                Bert.alert('This game is full', 'warning');
            } else {
                Meteor.call('joinGame', gameId, (error) => {
                    if (error) {
                        Bert.alert(error.reason, 'warning');
                    } else {
                        Bert.alert('Get ready to destroy!', 'success');
                        FlowRouter.go(path);
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
                    <small className="date">Render date here</small>
                </h2>
                <span className="creator">Created by {this.props.game.creator}</span>
                <span className="count">Players: {this.props.game.playerCount}</span>

            </li>
        );
    }
});