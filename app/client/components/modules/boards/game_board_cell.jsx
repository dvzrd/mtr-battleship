App.GameBoardCell = React.createClass({
    propTypes: {
        targetId: React.PropTypes.string
    },

    shouldComponentUpdate() {
        return true;
    },

    handleCellTarget(event) {
        event.preventDefault();

        console.log('clicked on ' + this.props.targetId);
    },

    render() {
        const {targetId} = this.props;

        return (
            <div className="cell" id={targetId} onClick={this.handleCellTarget}></div>
        );
    }
});