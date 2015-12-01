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
            destroyerBoard: Boards.findOne({gameId: gameId, owner: destroyer}),
            game: Games.findOne({_id: gameId})
        };
    },

    // @TODO: refactor bot spawn into separate client module

    spawnBot(event) {
        event.preventDefault();

        console.log('add HAL 9000 as opponent');
    },

    renderNotice() {
        let game = this.data.game,
            gameOver = game.winner && game.completedAt;

        // @TODO: messages module

        if (gameOver) {
            return (
                <module className="messages module">
                    <p className="centered light message">
                        The game is over! The winner is {game.winner}!
                    </p>
                    <a className="primary centered button" href={RouterHelpers.pathFor('root')}>Go home!</a>
                </module>
            );
        } else {
            return (
                <module className="messages module">
                    <p className="centered light message">
                        This game has been marked completed but no winner was declared... quite strange.
                    </p>
                    <a className="primary centered button" href={RouterHelpers.pathFor('root')}>Take me home!</a>
                </module>
            );
        }
    },

    // @TODO: refactor board render into separate client module - employ micro-branching

    renderGameBoard() {
        let user = Meteor.user(),
            isCreator = this.data.creator === user.username,
            creatorBoard = this.data.creatorBoard,
            destroyerBoard = this.data.destroyerBoard,
            noOpponent = creatorBoard.status === 'ready' && !destroyerBoard,
            gameProps = {
                gameId: this.data.gameId,
                creator: this.data.creator
            };

        if (isCreator) {
            if (noOpponent) {
                // @TODO: messages module - move into renderNotice
                return (
                    <module className="messages module">
                        <p className="centered light message">
                            No one dares to oppose you! Wait for someone foolish enough to try...
                        </p>
                        <button type="button" className="primary centered button" onClick={this.spawnBot}>Spawn bot
                        </button>
                    </module>
                );
            } else {

                let ready = creatorBoard.status === 'ready' && destroyerBoard.status === 'ready',
                    offensive = creatorBoard.status === 'offense';

                if (ready || offensive) {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={destroyerBoard._id}/>
                    );
                } else {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={creatorBoard._id}/>
                    );
                }
            }
        } else {
            let noUnitsDeployed = destroyerBoard.status === null,
                ready = destroyerBoard.status === 'ready' && creatorBoard.status === 'ready',
                defensive = destroyerBoard.status === 'defense';

            if (noUnitsDeployed) {
                return (
                    <App.GameBoard gameProps={gameProps} boardId={destroyerBoard._id}/>
                );
            } else {


                if (ready || defensive) {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={destroyerBoard._id}/>
                    );
                } else {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={creatorBoard._id}/>
                    );
                }
            }
        }
    },

    render () {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            let gameOver = this.data.game.winner || this.data.game.completedAt;

            return (
                <module className="game boards module">
                    {(gameOver) ? this.renderNotice() : this.renderGameBoard()}
                </module>
            )
        }
    }
});