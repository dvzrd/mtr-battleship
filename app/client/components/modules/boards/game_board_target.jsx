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
    // This has become a big mess, really need to break this up into functions
    // see /client/modules/game_create.js for reference

    handleCellTarget(event) {
        event.preventDefault();
        console.log(Meteor.user().username + ' clicked on ' + this.props.targetId);

        let user = Meteor.user(),
            board = this.props.board,
            targetCell = '#' + this.props.targetId,
            targetStatus = this.props.status,
            isBoardOwner = user.username === board.owner;

        if (isBoardOwner) {
            if (board.status === null && targetStatus === 'empty') {
                let placementAttributes = {
                    boardId: board._id,
                    boardOwner: user.username,
                    targetId: this.props.targetId
                };

                Meteor.call('placeUnit', placementAttributes, (error) => {

                });
            } else {
                Bert.alert('You cannot change unit positions when game is in progress', 'warning');
            }
        } else {
            if (board.status === 'defending') {
                $(targetCell).addClass('target');
            } else {
                Bert.alert('Waiting for opponent', 'warning');
            }
        }
    },

    render() {
        const {targetId, status} = this.props;

        let className = 'cell';

        if (status === 'selected') {
            className += ' selected';
        }

        return (
            <div className={className} id={targetId} onClick={this.handleCellTarget}></div>
        );
    }
});