App.GameBoards = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},

    shouldComponentUpdate() {
        return true;
    },
    getMeteorData() {
        let gameId = FlowRouter.getParam('_id'),
            selector = {gameId: gameId},
            subscription = Meteor.subscribe('boards', selector);

        return {
            isLoading: !subscription.ready(),
            boards: Boards.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },
    renderGameCreatorBoard() {
        return (
            <App.GameBoard />
        );
    },
    renderGameDestroyerBoard() {
        return (
            <App.GameBoard />
        );
    },
    renderGameBoards() {
        return (
            <module className="game boards module">
                {this.renderGameCreatorBoard()}
                <App.GameDetails />
                {this.renderGameDestroyerBoard()}
            </module>
        )
    },
    render () {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game boards module">
                    {this.renderGameBoards()}
                </module>
            )
        }
    }
});