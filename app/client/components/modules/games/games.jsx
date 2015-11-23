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
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="games module">
                    <App.GamesList games={this.data.games} />
                </module>
            );
        }
    }
});