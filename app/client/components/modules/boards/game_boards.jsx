App.GameBoards = React.createClass({
    render () {
        return (
            <module className="game boards module">
                <App.GameBoard />
                <App.GameDetails />
                <App.GameBoard />
            </module>
        )
    }
});