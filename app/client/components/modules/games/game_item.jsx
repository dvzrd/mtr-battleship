App.GameItem = React.createClass({
    render() {
        var id = this.props.game._id,
            path = 'battle/' + id;

        return (
            <li className="game item">
                <a className="route link" href={path}>
                    <h2 className="title">
                        {this.props.game.title} <small className="date">Render date here</small>
                    </h2>
                    <span className="creator">Created by {this.props.game.creator}</span>
                    <span className="count">Players: {this.props.game.playerCount}</span>
                </a>
            </li>
        );
    }
});