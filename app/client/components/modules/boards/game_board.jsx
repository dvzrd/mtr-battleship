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
            boardId: this.props.board._id,
            boardOwner: this.props.board.owner,
            targets: this.props.board.targets
        };
    },

    handleUnitDeployment(event) {
        event.preventDefault();

        let updateAttributes = {
            boardId: this.data.boardId,
            status: 'ready'
        };

        Meteor.call('updateStatus', updateAttributes, (error) => {
           if (error) {
               Bert.alert(error.reason, 'warning');
           } else {
               Bert.alert('Your units are deployed, get ready for battle!', 'success');
           }
        });
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

        let boardProps = {
            boardId: board._id,
            owner: board.owner,
            status: board.status
        };

        return (
            <module className="game board module" id={board._id}>
                <div className="grid">
                    {this.data.targets.map((target) => {
                        return (
                            <App.GameBoardTarget key={target.id} boardProps={boardProps} targetId={target.id} status={target.status} />
                        );
                    })}
                </div>
                {this.renderActions()}
            </module>
        );
    }
});