App.GameDetails = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let subscription = Meteor.subscribe('games');

        return {
            isLoading: !subscription.ready(),
            games: Games.find().fetch()
        };
    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game details module">
                    <h2 className="centered title">Title {this.data.games.title}</h2>

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