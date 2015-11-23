App.Battle = React.createClass({
    render() {
        return (
            <view className="animated fadeIn battle view">
                <App.GameBoard />
                <div className="versus divider">
                    vs
                </div>
                <App.GameBoard />
            </view>
        );
    }
});