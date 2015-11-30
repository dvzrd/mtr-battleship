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
            gameId: gameId,
            creator: creator,
            destroyer: destroyer,
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
        let user = Meteor.user(),
            isCreator = this.data.creator === user.username,
            noOpponent = this.data.creatorBoard.status === 'ready' && !this.data.destroyerBoard,
            gameProps = {
                gameId: this.data.gameId,
                creator: this.data.creator
            };


        if (isCreator) {
            let ready = this.data.creatorBoard.status === 'ready' && this.data.destroyerBoard,
                offensive = this.data.creatorBoard.status === 'offense';

            if (noOpponent) {
                // @TODO: messages module
                return (
                    <module className="messages module">
                        <p className="centered light message">
                            No one dares to oppose you! Wait for someone foolish enough to try...
                        </p>
                        <button type="button" className="primary centered button" onClick={this.spawnBot}>Spawn bot
                        </button>
                    </module>
                );
            }
            if (ready || offensive) {
                return (
                    <App.GameBoard gameProps={gameProps} board={this.data.destroyerBoard}/>
                );
            } else {
                return (
                    <App.GameBoard gameProps={gameProps} board={this.data.creatorBoard}/>
                );
            }
        } else {
            let noUnitsDeployed = this.data.destroyerBoard.status === null,
                ready = this.data.destroyerBoard.status === 'ready' && this.data.creatorBoard.status === 'ready',
                defensive = this.data.destroyerBoard.status === 'defense';

            if (noUnitsDeployed) {
                return (
                    <App.GameBoard gameProps={gameProps} board={this.data.destroyerBoard}/>
                );
            }
            if (ready || defensive) {
                return (
                    <App.GameBoard gameProps={gameProps} board={this.data.destroyerBoard}/>
                );
            } else {
                return (
                    <App.GameBoard gameProps={gameProps} board={this.data.creatorBoard}/>
                );
            }
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