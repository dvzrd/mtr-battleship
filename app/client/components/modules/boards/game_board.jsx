App.GameBoard = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {
        board: React.PropTypes.object
    },
    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        return {
            targets: this.props.board.targets
        };
    },

    handleUnitPlacement(event) {
        event.preventDefault();
    },

    handleTargetFire(event) {
        event.preventDefault();
    },

    renderActions() {
        if (!this.props.board.unitPlacements) {
            return (
                <button type="button" className="fluid primary button" onClick={this.handleUnitPlacement}>Place Units</button>
            );
        } else {
            return (
                <button type="button" className="fluid primary button" onClick={this.handleTargetFire}>Target Fire</button>
            )
        }
    },

    render() {
        const board = this.props.board;

        return (
            <module className="game board module" id={board._id}>
                <div className="grid">
                    {this.data.targets.map((target) => {
                        return (
                            <App.GameBoardTarget key={target.id} targetId={target.id} status={target.status} board={board} />
                        );
                    })}
                </div>
                {this.renderActions()}
            </module>
        );
    }
});