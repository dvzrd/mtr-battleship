App.GameCommentsFeed = React.createClass({
    mixins: [],

    propTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    // @TODO: get data from comments collections and loop each comment

    render() {
        return (
            <module className="game comments feed">
                <ul className="unstyled comments list">
                    <App.GameComment />
                </ul>
            </module>
        );
    }
});