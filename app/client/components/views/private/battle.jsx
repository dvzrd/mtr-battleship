App.Battle = React.createClass({
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