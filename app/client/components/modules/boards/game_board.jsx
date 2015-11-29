App.GameBoard = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {
        gameProps: React.PropTypes.object,
        board: React.PropTypes.object
    },
    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        return {
            creator: this.props.gameProps.creator,
            boardId: this.props.board._id,
            boardOwner: this.props.board.owner,
            status: this.props.board.status,
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

    handleTargetAttack(event) {
        event.preventDefault();

        console.log('attack launched!');
    },

    renderActions() {
        let user = Meteor.user(),
            isCreator = this.data.creator === user.username,
            noUnitsDeployed = this.data.status === null,
            ready = this.data.status === 'ready',
            offensive = this.data.status === 'offense';

        if (noUnitsDeployed) {
            return (
                <button type="button" className="fluid primary button" onClick={this.handleUnitDeployment}>Deploy
                    Units</button>
            );
        }
        if (offensive) {
            return (
                <button type="button" className="fluid negative button" onClick={this.handleTargetAttack}>Attack
                    Target</button>
            );
        }
        if (ready && isCreator) {
            return (
                <button type="button" className="fluid negative button" onClick={this.handleTargetAttack}>Attack
                    Target</button>
            );
        } else {
            return (
                // @TODO: messages module
                <module className="primary messages module">
                    <p className="light message">
                        Waiting on opponent...
                    </p>
                </module>
            );
        }
    },

    render() {
        let boardProps = {
            boardId: this.data.boardId,
            owner: this.data.boardOwner,
            status: this.data.status
        };

        return (
            <module className="game board module" id={boardProps.boardId}>
                <div className="grid">
                    {this.data.targets.map((target) => {
                        return (
                            <App.GameBoardTarget key={target.id} boardProps={boardProps} targetId={target.id}
                                                 status={target.status}/>
                        );
                    })}
                </div>
                {this.renderActions()}
            </module>
        );
    }
});