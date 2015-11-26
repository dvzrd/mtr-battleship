App.GameBoard = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {
        boardId: React.PropTypes.string
    },
    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let gameId = FlowRouter.getParam('_id'),
            boardId = 'get it from gameboards props',
            subscription = Meteor.subscribe('game', gameId);

        return {
            isLoading: !subscription.ready(),
            game: Games.findOne({_id: gameId}),
            //board: Boards.fineOne({_id: boardId}),
            grid: [
                {
                    id: 'A',
                    cells: 5
                },
                {
                    id: 'B',
                    cells: 5
                },
                {
                    id: 'C',
                    cells: 5
                },
                {
                    id: 'D',
                    cells: 5
                },
                {
                    id: 'E',
                    cells: 5
                }
            ]
        };
    },

    renderGameGrid() {

    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game board module" id='boardId'>
                    {this.data.grid.map((index) => {
                        return (
                            <div className="grid" key={index.id} id={index.id}>

                            </div>
                        );
                    })}
                </module>
            );
        }
    }
});