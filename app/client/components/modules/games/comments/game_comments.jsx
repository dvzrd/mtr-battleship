App.GameComments = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        let gameId = FlowRouter.getParam('_id'),
            selector = {gameId: gameId},
            subscription = Meteor.subscribe('comments', selector);

        return {
            isLoading: !subscription.ready(),
            comments: Comments.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <modal className="game comments modal">
                    <App.GameCommentsFeed comments={this.data.comments}/>
                    <App.GameCommentForm />
                </modal>
            );
        }
    }
});