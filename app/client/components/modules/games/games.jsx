App.Games = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let selector = {completedAt: null},
            subscription = Meteor.subscribe('games', selector);

        return {
            isLoading: !subscription.ready(),
            games: Games.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },
    render() {
        let noGames = this.data.games.length === 0;

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="animated fadeInUp games module">
                    {noGames ?
                        // TODO: make component for messages
                        <p className="centered message">There are no games, click the gamepad icon to start!</p> :
                        <App.GamesList games={this.data.games}/>}
                </module>
            );
        }
    }
});