App.Game = React.createClass({
    render() {
        return (
            <li className="game item">
                <a className="route link" href="#">
                    <h2 className="title">
                        {this.props.game.title} <small className="date">Render date here</small>
                    </h2>
                    <span className="creator">Created by {this.props.game.creator}</span>
                </a>
            </li>
        );
    }
});