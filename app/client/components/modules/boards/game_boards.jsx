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

    // @TODO: refactor all this logic into a separate module
    // condense into a loop

    renderGameCreatorBoard() {
        let unitsPlaced = this.data.creatorBoard.unitPlacements,
            attacking = this.data.creatorBoard.status === 'attacking';

        if (unitsPlaced) {
            return (
                <App.GameBoard boardId={this.data.destroyerBoard._id}/>
            );
        }
        if (attacking) {
            return (
                <App.GameBoard boardId={this.data.destroyerBoard._id}/>
            );
        } else {
            return (
                    <App.GameBoard boardId={this.data.creatorBoard._id}/>
            );
        }
    },

    renderGameDestroyerBoard() {
        if (this.data.destroyerBoard) {
            return (
                <App.GameBoard boardId={this.data.destroyerBoard._id}/>
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
                    <button type="button" className="centered primary button">Place Units</button>
                </module>
            )
        }
    }
});