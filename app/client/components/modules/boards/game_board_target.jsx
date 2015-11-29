App.GameBoardTarget = React.createClass({
    mixins: [],
    propTypes: {
        targetId: React.PropTypes.string,
        status: React.PropTypes.string,
        board: React.PropTypes.object
    },

    shouldComponentUpdate() {
        return true;
    },

    // @TODO: break this up and move into a separate module
    // see /client/modules/game_create.js for reference

    handleTargetClick(event) {
        event.preventDefault();
        console.log(Meteor.user().username + ' clicked on ' + this.props.targetId);

        let user = Meteor.user(),
            board = this.props.board,
            targetCell = this.props.targetId,
            targetStatus = this.props.status,
            isBoardOwner = user.username === board.owner;

        if (isBoardOwner) {
            if (board.status === null) {
                let targetAttributes = {
                    boardId: board._id,
                    boardOwner: user.username,
                    targetId: targetCell
                };

                if (targetStatus === 'empty') {
                    Meteor.call('placeUnit', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            console.log(user.username + ' selected ' + targetCell);
                        }
                    });
                } else {
                    Meteor.call('removeUnit', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            console.log(user.username + ' removed ' + targetCell);
                        }
                    });
                }
            } else {
                Bert.alert('You cannot change unit positions when game is in progress', 'warning');
            }
        } else {
            if (board.status === 'defending') {
                // call method for offensive targeting
            } else {
                Bert.alert('Waiting for opponent', 'warning');
            }
        }
    },

    render() {
        const {targetId, status} = this.props;

        let className = 'cell';

        // @TODO: refactor later
        if (status === 'selected') {
            className += ' selected';
        }
        if (status === 'target') {
            className += ' target'
        }
        if (status === 'missed') {
            className += 'missed'
        }
        if (status === 'destroyed') {
            className += ' destroyed'
        }

        return (
            <div className={className} id={targetId} onClick={this.handleTargetClick}></div>
        );
    }
});