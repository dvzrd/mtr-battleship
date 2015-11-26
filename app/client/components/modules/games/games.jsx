App.Games = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let selector = {completedAt: null};
        let subscription = Meteor.subscribe('games', selector);

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
                <module className="games module">
                    {noGames ?
                        // TODO: make component for messages
                        <p className="centered message">There are no games, try adding some!</p> :
                        <App.GamesList games={this.data.games}/>}
                </module>
            );
        }
    }
});