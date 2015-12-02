App.GameCommentsFeed = React.createClass({
    mixins: [],

    propTypes: {},

    componentDidMount() {
        // @TODO: scroll down to the bottom of chat

        let comments = $('.comments.list');
        comments.scrollTop = comments[0].scrollHeight;
    },

    shouldComponentUpdate() {
        return true;
    },

    // @TODO: get data from comments collections and loop each comment

    render() {
        return (
            <ul className="unstyled comments list">
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
                <App.GameComment />
            </ul>
        );
    }
});