App.Game = React.createClass({
    render() {
        return (
            <li className="game item">
                <h2 className="title">{this.props.game.title}</h2>
            </li>
        );
    }
});