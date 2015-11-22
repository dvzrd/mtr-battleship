App.Battle = React.createClass({
    render() {
        return (
            <view className="battle view">
                <App.GameDetails />
                <App.GameBoard />
            </view>
        );
    }
});