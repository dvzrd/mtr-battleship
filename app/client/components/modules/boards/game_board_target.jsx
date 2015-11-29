App.GameBoardTarget = React.createClass({
    mixins: [],
    propTypes: {
        boardProps: React.PropTypes.object,
        targetId: React.PropTypes.string,
        status: React.PropTypes.string
    },

    shouldComponentUpdate() {
        return true;
    },

    // @TODO: break this up and move into a separate module
    // see /client/modules/game_create.js for reference

    handleTargetClick(event) {
        event.preventDefault();

        let user = Meteor.user(),
            boardId = this.props.boardProps.boardId,
            targetId = this.props.targetId,
            status = this.props.boardProps.status,
            targetStatus = this.props.status,
            isBoardOwner = user.username === this.props.boardProps.owner;

        if (isBoardOwner) {
            if (status === null) {
                let targetAttributes = {
                    boardId: boardId,
                    targetId: targetId
                };

                if (targetStatus === 'empty') {
                    Meteor.call('placeUnit', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Unit placed on ' + targetId, 'success');
                        }
                    });
                } else {
                    Meteor.call('removeUnit', targetAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Unit removed from ' + targetId, 'warning');
                        }
                    });
                }
            } else {
                Bert.alert('You cannot change unit positions when game is in progress', 'warning');
            }
        } else {
            if (status === 'offense') {
                // call method for offensive targeting
            } else {
                Bert.alert('Waiting for opponent', 'warning');
            }
        }
    },

    render() {
        const {targetId, status} = this.props;

        let className = 'cell',
            isBoardOwner = Meteor.user().username === this.props.boardProps.owner;

        // @TODO: refactor - micro-branching

        if (status === 'selected' && isBoardOwner) {
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