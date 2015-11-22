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

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game details module">
                    <h2 className="centered title">{this.data.game.title}</h2>

                    <div className="players">
                        <h4 className="left player">
                            Player 1 <small className="points">10/50 points</small>
                        </h4>
                        <h4 className="right player">
                            Player 2 <small className="points">10/50 points</small>
                        </h4>
                    </div>
                </module>
            );
        }
    }
});