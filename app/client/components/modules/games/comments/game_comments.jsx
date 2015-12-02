App.GameComments = React.createClass({
    render() {
        return (
            <modal className="game comments modal">
                <App.GameCommentsFeed />
                <App.GameCommentForm />
            </modal>
        );
    }
});