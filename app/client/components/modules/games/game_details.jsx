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

    defender() {
        // @TODO: if creator is current user show username
        // else show option to create AI challenger
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <h4 className="left player">
                    {this.data.game.creator} <small className="points">10/50 points</small>
                </h4>
            );
        } else {
            return (
                <h4 className="left player">
                    No Player Found
                </h4>
            );
        }
    },

    challenger() {
        //@TODO: if challenger is null - show option to create AI challenger
        // else show challenger and check if current user
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <h4 className="right player">
                    {this.data.game.challenger} <small className="points">10/50 points</small>
                </h4>
            );
        } else {
            return (
                <h4 className="right player">
                    No Player Found
                </h4>
            );
        }
    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game details module">
                    <h2 className="centered title">{this.data.game.title}</h2>

                    <div className="players">
                        {this.defender()}
                        {this.challenger()}
                    </div>
                </module>
            );
        }
    }
});