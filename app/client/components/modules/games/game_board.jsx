App.GameBoard = React.createClass({
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
                <module className="game board">
                    game board
                </module>
            );
        }
    }
});