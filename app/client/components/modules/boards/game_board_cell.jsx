App.GameBoardCell = React.createClass({
    mixins: [ReactMeteorData],
    propTypes: {
        targetId: React.PropTypes.string,
        board: React.PropTypes.object
    },

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let selectedCells = [];

        return {
            unitPlacements: selectedCells
        }
    },

    // @TODO: break this up and move into a separate module

    handleCellTarget(event) {
        event.preventDefault();
        console.log(Meteor.user().username + ' clicked on ' + this.props.targetId);

        let user = Meteor.user(),
            board = this.props.board,
            targetCell = '#' + this.props.targetId,
            isBoardOwner = user.username === board.owner,
            unitPlacements = this.data.unitPlacements;

        //console.log(this.props.board);

        if (isBoardOwner) {
            if (board.status === null) {
                // @TODO: only select 5 cells
                // if selected > 5, replace selection
                if (unitPlacements.length > 5) {
                    console.log('five targets selected');
                    console.log(unitPlacements.length);
                } else {
                    $(targetCell).toggleClass('selected');
                    unitPlacements.push(targetCell);
                    console.log(unitPlacements.length);
                }
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
            <div className='cell' id={targetId} onClick={this.handleCellTarget}></div>
        );
    }
});