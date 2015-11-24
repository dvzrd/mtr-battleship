App.GameItem = React.createClass({
    handleGameJoin(event) {
        event.preventDefault();

        // @TODO: Move this to joinGame method (and Modules.client)

        var pathDef = '/battle/:_id',
            params = {_id: this.props.game._id},
            path = FlowRouter.path(pathDef, params),
            currentUser = Meteor.user();

        if (this.props.game.creator === currentUser.username) {
            FlowRouter.go(path);
        }
        if (this.props.game.destroyer === currentUser.username) {
            FlowRouter.go(path);
        }
        if (this.props.game.playerCount === 2) {
            Bert.alert('This game is full', 'warning');
            // @TODO: method for joining a recently created and available game
        } else {
            Bert.alert('Making game', 'warning');
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