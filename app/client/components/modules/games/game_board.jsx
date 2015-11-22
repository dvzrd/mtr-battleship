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
                <module className="game board module">
                    <div className="grid" id="A">
                        <div className="cell" id="1A"></div>
                        <div className="cell" id="2A"></div>
                        <div className="cell" id="3A"></div>
                        <div className="cell" id="4A"></div>
                        <div className="cell" id="5A"></div>
                    </div>
                    <div className="grid" id="B">
                        <div className="cell" id="1B"></div>
                        <div className="cell" id="2B"></div>
                        <div className="cell" id="3B"></div>
                        <div className="cell" id="4B"></div>
                        <div className="cell" id="5B"></div>
                    </div>
                    <div className="grid" id="C">
                        <div className="cell" id="1C"></div>
                        <div className="cell" id="2C"></div>
                        <div className="cell" id="3C"></div>
                        <div className="cell" id="4C"></div>
                        <div className="cell" id="5C"></div>
                    </div>
                    <div className="grid" id="D">
                        <div className="cell" id="1D"></div>
                        <div className="cell" id="2D"></div>
                        <div className="cell" id="3D"></div>
                        <div className="cell" id="4D"></div>
                        <div className="cell" id="5D"></div>
                    </div>
                    <div className="grid" id="E">
                        <div className="cell" id="1E"></div>
                        <div className="cell" id="2E"></div>
                        <div className="cell" id="3E"></div>
                        <div className="cell" id="4E"></div>
                        <div className="cell" id="5E"></div>
                    </div>
                </module>
            );
        }
    }
});