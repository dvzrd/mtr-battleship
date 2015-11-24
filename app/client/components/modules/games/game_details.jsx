App.GameDetails = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let gameId = FlowRouter.getParam('_id');
        let subscription = Meteor.subscribe('game', gameId);

        return {
            isLoading: !subscription.ready(),
            game: Games.findOne({_id: gameId})
        };
    },

    // @TODO: refactor both player renders into own component

    renderCreator() {
        if (this.data.game.creator === null) {
            // @TODO: show button to add opponent ai
            return (
                <div className="player creator">
                    <span className="label username">
                        No Player Found
                    </span>
                </div>
            )
        } else {
            return (
                <div className="player creator">
                    <span className="label username">
                        {this.data.game.creator} <span className="points">
                        {this.data.game.creatorScore} points</span>
                    </span>
                </div>
            );
        }
    },

    renderDestroyer() {
        if (this.data.game.destroyer === null) {
            // @TODO: show button to add opponent ai
            return (
                <div className="player destroyer">
                    <span className="label username">
                        No Player Found
                    </span>
                </div>
            )
        } else {
            return (
                <div className="player destroyer">
                    <span className="label username">
                        {this.data.game.destroyer} <span className="points">
                        {this.data.game.destroyerScore} points</span>
                    </span>
                </div>
            );
        }
    },

    handleTargetClick(event) {
        event.preventDefault();

        console.log('clicked target button');
        // @TODO: disable event until both boards are status ready,
        // if one board is not ready, player has to submit unit placements
    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game details module">
                    {this.renderCreator()}
                    <div className="versus divider">
                        <button type="button" className="negative circular icon button" onClick={this.handleTargetClick}>
                            <i className="fa fa-bullseye"></i>
                        </button>
                    </div>
                    {this.renderDestroyer()}
                </module>
            );
        }
    }
});