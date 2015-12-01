App.GameBoard = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {
        gameProps: React.PropTypes.object,
        boardId: React.PropTypes.string
    },
    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let user = Meteor.user(),
            boardId = this.props.boardId,
            subscription = Meteor.subscribe('board', boardId);

        return {
            isLoading: !subscription.ready(),
            gameId: this.props.gameProps.gameId,
            creator: this.props.gameProps.creator,
            board: Boards.findOne({_id: boardId}),
            userBoard: Boards.findOne({owner: user.username})
        };
    },

    handleUnitDeployment(event) {
        event.preventDefault();

        let updateAttributes = {
            boardId: this.data.board._id,
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

        let targetId = this.data.board.targetId,
            targets = this.data.board.targets,
            target = _.find(targets, function(target) { return target.id === targetId }),
            userBoardId = this.data.userBoard._id;

        if (!target) {
            Bert.alert('You must lock on a target before attacking', 'warning');
        } else {
            let attackAttributes = {
                boardId: this.data.board._id,
                targetId: target.id,
                targetStatus: target.status
            };

            Meteor.call('attackTarget', attackAttributes, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'warning');
                } else {
                    //Bert.alert('Your attack ' + report.status + ' ' + attackAttributes.targetId, warning);
                    // @TODO: if report.status === 'destroyed'
                    // call update score method
                    // else show alert for status.missed
                    //console.log(report.status);
                    //if (report.status === 'destroyed') {
                    //    Bert.alert('The attack on ' + attackAttributes.targetId + ' destroyed the enemy position!', 'success');
                    //} else {
                    //    Bert.alert('The enemy eluded us this time. The attack on ' + attackAttributes.targetId + ' failed!', 'warning');
                    //}

                    let updateAttributes = {
                        boardId: userBoardId,
                        status: 'defense'
                    };

                    Meteor.call('updateStatus', updateAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('You attacked ' + attackAttributes.targetId + '! Going on the defensive.', 'success')
                        }
                    });
                }
            });
        }
    },


    renderActions() {
        let user = Meteor.user(),
            isOwner = this.data.board.owner === user.username,
            noUnitsDeployed = this.data.board.status === null,
            ready = this.data.board.status === 'ready',
            offensive = this.data.board.status === 'defense';

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
                        Opponent is planning something...
                    </p>
                </module>
            );
        }
    },

    render() {
        let boardProps = {
            gameId: this.data.gameId,
            boardId: this.data.board._id,
            owner: this.data.board.owner,
            status: this.data.board.status,
            targetId: this.data.board.targetId
        };

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game board module" id={boardProps.boardId}>
                    <div className="grid">
                        {this.data.board.targets.map((target) => {
                            return (
                                <App.GameBoardTarget key={target.id} boardProps={boardProps} targetProps={target} />
                            );
                        })}
                    </div>
                    {this.renderActions()}
                </module>
            );
        }
    }
});