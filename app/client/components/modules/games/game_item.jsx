App.GameItem = React.createClass({
    handleGameJoin(event) {
        event.preventDefault();

        var pathDef = '/battle/:_id',
            params = {_id: this.props.game._id},
            path = FlowRouter.path(pathDef, params),
            user = Meteor.user();

        FlowRouter.go(path);

        //if (user) {
        //    console.log(user + ' is creator, just route');
        //    FlowRouter.go(path);
        //} else {
        //    console.log('not the creator, but check if destroyer exists');
        //}
    },
    render() {
        return (
            <li className="game item">
                <div className="route link" onClick={this.handleGameJoin}>
                    <h2 className="title">
                        {this.props.game.title} <small className="date">Render date here</small>
                    </h2>
                    <span className="creator">Created by {this.props.game.creator}</span>
                    <span className="count">Players: {this.props.game.playerCount}</span>
                </div>
            </li>
        );
    }
});