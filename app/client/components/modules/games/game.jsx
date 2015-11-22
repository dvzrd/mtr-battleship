App.Game = React.createClass({
    render() {
        return (
            <li className="game item">
                <p>Title: {this.props.game.title}</p>
            </li>
        );
    }
});