App.Battle = React.createClass({
    componentDidMount() {
        var gameId = FlowRouter.getParam('_id');

        Modules.client.gameComplete({
            gameId: gameId
        });
        //var gameId = new ReactiveVar(FlowRouter.getParam('_id'));
        //console.log(gameId.curValue);
    },
    render() {
        return (
            <view className="animated fadeIn battle view">
                <App.GameBoard />
                <App.GameDetails />
                <App.GameBoard />
            </view>
        );
    }
});