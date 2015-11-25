App.Battle = React.createClass({
    componentDidMount() {
        var gameId = FlowRouter.getParam('_id');

        Modules.client.gameComplete({
            gameId: gameId
        });
    },
    render() {
        return (
            <view className="animated fadeIn battle view">
                <App.GameBoards />
            </view>
        );
    }
});