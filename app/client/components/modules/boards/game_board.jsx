App.GameBoard = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {
        boardId: React.PropTypes.string
    },
    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        return {
            board: Boards.findOne({_id: this.props.boardId}),
            // @TODO: move to a collection
            cells: [
                {id: '1A'}, {id: '2A'}, {id: '3A'}, {id: '4A'}, {id: '5A'},
                {id: '1B'}, {id: '2B'}, {id: '3B'}, {id: '4B'}, {id: '5B'},
                {id: '1C'}, {id: '2C'}, {id: '3C'}, {id: '4C'}, {id: '5C'},
                {id: '1D'}, {id: '2D'}, {id: '3D'}, {id: '4D'}, {id: '5D'},
                {id: '1E'}, {id: '2E'}, {id: '3E'}, {id: '4E'}, {id: '5E'}
            ]
        };
    },

    renderActions() {
        if (!this.data.board.unitPlacements) {
            return (
                <button type="button" className="fluid primary button">Place Units</button>
            );
        } else {
            return (
                <button type="button" className="fluid primary button">Target Fire</button>
            )
        }
    },

    render() {
        const {boardId} = this.props;

        return (
            <module className="game board module" id={this.props.boardId}>
                <div className="grid">
                    {this.data.cells.map((cell) => {
                        return (
                            <App.GameBoardCell key={cell.id} targetId={cell.id}/>
                        );
                    })}
                </div>
                {this.renderActions()}
            </module>
        );
    }
});