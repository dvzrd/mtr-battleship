App.GameBoardCell = React.createClass({
    propTypes: {
        targetId: React.PropTypes.string,
        board: React.PropTypes.object
    },

    shouldComponentUpdate() {
        return true;
    },

    getInitialState() {
        return {
            selected: []
        }
    },

    // @TODO: break this up and move into a separate module

    handleCellTarget(event) {
        event.preventDefault();
        console.log(Meteor.user().username + ' clicked on ' + this.props.targetId);

        let user = Meteor.user(),
            board = this.props.board,
            boardOwner = user.username === board.owner,
            targetCell = '#' + this.props.targetId;

        console.log(this.props.board);

        if (boardOwner) {

            if (board.status === null) {
                $(targetCell).addClass('selected');
                var selected = this.state.selected.slice();
                selected.push(this.props.targetId);
                this.setState({ selected: selected });
                console.log(this.state.selected);
                console.log(selected);
            } else {
                Bert.alert('Game in progress', 'warning');
            }
        } else {
            $(targetCell).addClass('target');
        }

        console.log(this.state.selected);
    },

    render() {
        const {targetId} = this.props;

        return (
            <div className="cell" id={targetId} onClick={this.handleCellTarget}></div>
        );
    }
});