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
        if (this.data.creatorBoard) {
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
        } else {
            // @TODO: this should not occur in client, handle it with a method
            return (
                <p className="message">The game creator is missing! Join or create another game!</p>
            )
        }
    },

    renderGameDestroyerBoard() {
        if (this.data.destroyerBoard) {
            let unitsPlaced = this.data.destroyerBoard.unitPlacements,
                attacking = this.data.destroyerBoard.status === 'attacking';

            if (unitsPlaced) {
                return (
                    <App.GameBoard boardId={this.data.creatorBoard._id}/>
                );
            }
            if (attacking) {
                return (
                    <App.GameBoard boardId={this.data.creatorBoard._id}/>
                );
            } else {
                return (
                    <App.GameBoard boardId={this.data.destroyerBoard._id}/>
                );
            }
        } else {
            // @TODO: messages module is needed
            return (
                <p className="message">No Opponent found! Wait for someone to join or add an AI!</p>
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