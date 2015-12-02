App.GameComments = React.createClass({
    mixins: [ReactMeteorData],

    propTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    render() {
        return (
            <module className="game comments module">
                <p>game comments module</p>
            </module>
        );
    }
});