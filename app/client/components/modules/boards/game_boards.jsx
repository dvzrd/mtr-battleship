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
        let gameId = this.data.gameId;

        // @ TODO: modify join game method to accept username from client

        // bot can be added by using an existing bot account {username: 'HAL9000'}
        // when bot is added, create a game board (createGameBoard method)
        // game board already has units placed (ready status) (Collection.botBoards)
        // as game creator, user will make first attack
        // when bot is on offensive - generate random targetId (1 to 5 + A to E)
        // ensure random targetId is never the same each round (has to change after each attack)
        // add some generated comments when bot hits or misses or gets hit, etc (low priority)
        // this loops until game ends

        //Meteor.call('joinGame', gameId, (error) => {
        //    if (error) {
        //        Bert.alert(error.reason, 'warning');
        //    } else {
        //        Bert.alert('Get ready to destroy!', 'success');
        //
        //        // @TODO: refactor - separate module createGameBoard
        //        let boardAttributes = {
        //            gameId: gameId
        //        };
        //
        //        Meteor.call('createGameBoard', boardAttributes, (error, boardId) => {
        //            if (error) {
        //                Bert.alert(error.reason, 'success');
        //            } else {
        //                FlowRouter.go(path);
        //            }
        //        });
        //    }
        //});
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