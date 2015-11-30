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
            gameId: this.props.gameProps.gameId,
            creator: this.props.gameProps.creator,
            boardId: this.props.board._id,
            boardOwner: this.props.board.owner,
            status: this.props.board.status,
            targetId: this.props.board.targetId,
            targets: this.props.board.targets
        };
    },

    handleUnitDeployment(event) {
        event.preventDefault();

        let updateAttributes = {
            boardId: this.data.boardId,
            status: 'ready'
        };

        // @TODO: validate if 5 selected before calling method

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

        let targetId = this.data.targetId,
            targets = this.data.targets,
            target = _.find(targets, function(target) { return target.id === targetId }),
            board = Boards.findOne({owner: Meteor.user().username});

        if (!target) {
            Bert.alert('You must lock on a target before attacking', 'warning');
        } else {
            let attackAttributes = {
                boardId: this.data.boardId,
                targetId: target.id,
                targetStatus: target.status
            };

            Meteor.call('attackTarget', attackAttributes, (error, report) => {
                if (error) {
                    Bert.alert(error.reason, 'warning');
                } else {
                    let updateAttributes = {
                        boardId: board._id,
                        status: 'defense'
                    };

                    Meteor.call('updateStatus', updateAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Your attack ' + report.status + ' ' + attackAttributes.targetId, report.class);
                        }
                    });
                }
            });
        }
    },


    renderActions() {
        let user = Meteor.user(),
            isCreator = this.data.creator === user.username,
            isOwner = this.data.boardOwner === user.username,
            noUnitsDeployed = this.data.status === null,
            ready = this.data.status === 'ready',
            offensive = this.data.status === 'defense';

        if (noUnitsDeployed && isOwner) {
            return (
                <button type="button" className="fluid primary button" onClick={this.handleUnitDeployment}>Deploy
                    Units</button>
            );
        }
        if (offensive && !isOwner) {
            return (
                <button type="button" className="fluid negative button" onClick={this.handleTargetAttack}>Attack
                    Target</button>
            );
        }
        // @TODO: fix this - it lets creator attack before other player is ready
        if (ready && !isOwner) {
            return (
                <button type="button" className="fluid negative button" onClick={this.handleTargetAttack}>Attack
                    Target</button>
            );
        } else {
            return (
                // @TODO: messages module
                <module className="primary messages module">
                    <p className="light message">
                        Opponent is planning their attack...
                    </p>
                </module>
            );
        }
    },

    render() {
        let boardProps = {
            gameId: this.data.gameId,
            boardId: this.data.boardId,
            owner: this.data.boardOwner,
            status: this.data.status,
            targetId: this.data.targetId
        };

        return (
            <module className="game board module" id={boardProps.boardId}>
                <div className="grid">
                    {this.data.targets.map((target) => {
                        return (
                            <App.GameBoardTarget key={target.id} boardProps={boardProps} targetProps={target} />
                        );
                    })}
                </div>
                {this.renderActions()}
            </module>
        );
    }
});