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

    creator() {
        // @TODO: if creator is current user show username
        // else show option to create AI destroyer
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <div className="player creator">
                    <span className="label username">
                        {this.data.game.creator}
                        <span className="points">10/50 points</span>
                    </span>
                </div>
            );
        } else {
            return (
                <div className="player creator">
                    <span className="label username">
                        No Player Found
                    </span>
                </div>
            );
        }
    },

    destroyer() {
        //@TODO: if destroyer is null - show option to create AI challenger
        // else show destroyer and check if current user
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <div className="player destroyer">
                    <span className="label username">
                        {this.data.game.challenger}
                        destroyer
                        <span className="points">10/50 points</span>
                    </span>
                </div>
            );
        } else {
            return (
                <div className="player destroyer">
                    <span className="label username">
                        No Player Found
                    </span>
                </div>
            );
        }
    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game details module">
                    {this.creator()}
                    <div className="versus divider">vs</div>
                    {this.destroyer()}
                </module>
            );
        }
    }
});