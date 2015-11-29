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

    handleUnitDeployment(event) {
        event.preventDefault();

        console.log('units deployed');
    },

    handleTargetFire(event) {
        event.preventDefault();

        console.log('attack launched!');
    },

    renderActions() {
        if (this.props.board.status === null) {
            return (
                <button type="button" className="fluid primary button" onClick={this.handleUnitDeployment}>Deploy Units</button>
            );
        } else {
            return (
                <button type="button" className="fluid primary button" onClick={this.handleTargetFire}>Attack Target</button>
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