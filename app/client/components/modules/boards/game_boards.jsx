App.GameBoards = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let selector = {gameId: '', owner: ''};
        let subscription = Meteor.subscribe('boards', selector);

        return {
            isLoading: !subscription.ready(),
            boards: Boards.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },
    renderGameBoard() {

    },
    render () {
        let unchallenged = this.data.boards.length === 1;

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game boards module">
                    <App.GameBoard />
                    <App.GameDetails />
                    <App.GameBoard />
                </module>
            );
        }
    }
});