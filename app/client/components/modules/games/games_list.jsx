App.GamesList = React.createClass({
    render() {
        return (
            <ul className="games list">
                {this.props.games.map((title, index) => {
                    return <App.Game key={index} title={title} />;
                })}
            </ul>
        );
    }
});