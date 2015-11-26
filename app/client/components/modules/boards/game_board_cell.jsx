App.GameBoardCell = React.createClass({
    propTypes: {
        targetId: React.PropTypes.string,
        board: React.PropTypes.object
    },

    shouldComponentUpdate() {
        return true;
    },

    // @TODO: break this up and move into a separate module

    handleCellTarget(event) {
        event.preventDefault();
        console.log(Meteor.user().username + ' clicked on ' + this.props.targetId);

        let user = Meteor.user(),
            board = this.props.board,
            boardId = '#' + this.props.board._id,
            boardGrid = $(boardId).find('.grid'),
            targetCell = '#' + this.props.targetId,
            isBoardOwner = user.username === board.owner;

        //console.log(this.props.board);

        if (isBoardOwner) {
            if (board.status === null) {
                $(targetCell).addClass('selected');
                // @TODO: only select 5 cells
                // if selected > 5, replace selection
                console.log(boardGrid);

            } else {
                Bert.alert('Game in progress', 'warning');
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
        const {targetId} = this.props;

        return (
            <div className="cell" id={targetId} onClick={this.handleCellTarget}></div>
        );
    }
});