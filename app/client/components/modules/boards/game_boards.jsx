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

    spawnBot(event) {
        event.preventDefault();

        console.log('add HAL 9000 as opponent');
    },

    // @TODO: refactor board render into separate module - employ micro-branching

    renderGameBoard() {
        if (this.data.creatorBoard) {
            let ready = this.data.creatorBoard.status === 'ready' && this.data.destroyerBoard,
                offensive = this.data.creatorBoard.status === 'offense' && this.data.destroyerBoard,
                noOpponent = this.data.creatorBoard.status === 'ready' && !this.data.destroyerBoard;

            if (ready) {
                return (
                    <App.GameBoard board={this.data.destroyerBoard}/>
                );
            }
            if (offensive) {
                return (
                    <App.GameBoard board={this.data.destroyerBoard}/>
                );
            }
            if (noOpponent) {
                // @TODO: messages module
                return (
                    <module className="messages module">
                        <p className="centered light message">
                            No one dares to oppose you! Wait for someone foolish enough to try...
                        </p>
                        <button type="button" className="primary centered button" onClick={this.spawnBot}>Spawn bot</button>
                    </module>
                );
            } else {
                return (
                    <App.GameBoard board={this.data.creatorBoard}/>
                );
            }
        } else {
            return (
                // @TODO: messages module
                <p className="centered message">
                    The game creator is missing! You can join or create another game <a href={RouterHelpers.pathFor('root')}>here!</a>
                </p>
            )
        }
    },

    render () {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game boards module">
                    {this.renderGameBoard()}
                </module>
            )
        }
    }
});