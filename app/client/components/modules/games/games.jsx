App.Games = React.createClass({
    mixins: [ReactMeteorData],
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
                <module className="games module">
                    <App.GamesList games={this.data.games} />
                </module>
            );
        }
    }
});