App.GamesList = React.createClass({
    render() {
        return (
            <ul className="unstyled games list">
                {this.props.games.map((game, index) => {
                    return <App.Game key={index} game={game} />;
                })}
            </ul>
        );
    }
});