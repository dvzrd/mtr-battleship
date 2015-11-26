App.Battle = React.createClass({
    render() {
        return (
            <view className="animated fadeIn battle view">
                <App.GameDetails />
                <App.GameBoards />
                <p>chat module</p>
            </view>
        );
    }
});