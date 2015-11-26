App.GameBoards = React.createClass({
    mixins: [ReactMeteorData],

    shouldComponentUpdate() {
        return true;
    },
    getMeteorData() {
        let gameId = this.props.game._id,
            creator = this.props.game.creator,
            destroyer = this.props.game.destroyer,
            selector = {gameId: gameId},
            subscription = Meteor.subscribe('boards', selector);

        return {
            isLoading: !subscription.ready(),
            creatorBoard: Boards.findOne({gameId: gameId, owner: creator}),
            destroyerBoard: Boards.findOne({gameId: gameId, owner: destroyer})
        };
    },
    renderGameCreatorBoard() {
        if (this.data.creatorBoard) {
            return (
                <App.GameBoard boardId={this.data.creatorBoard._id}/>
            );
        } else {
            // @TODO: show messages from messages component
            return (
                <p className="message">You have no opponent</p>
            );
        }
    },
    renderGameDestroyerBoard() {
        if (this.data.destroyerBoard) {
            return (
                <App.GameBoard boardId={this.data.destroyerBoard._id} />
            );
        } else {
            // @TODO: show messages from messages component
            return (
                <p className="message">You have no opponent</p>
            );
        }
    },
    render () {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game boards module">
                    {this.renderGameCreatorBoard()}
                    {this.renderGameDestroyerBoard()}
                </module>
            )
        }
    }
});