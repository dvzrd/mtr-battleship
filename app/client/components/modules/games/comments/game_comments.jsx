App.GameComments = React.createClass({
    mixins: [ReactMeteorData],

    propTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    render() {
        return (
            <module className="game comments module">
                <App.GameCommentForm />
            </module>
        );
    }
});