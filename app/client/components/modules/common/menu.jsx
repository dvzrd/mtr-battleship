App.Menu = React.createClass({
    renderButtons() {
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <div className="buttons">
                    <a className="left secondary icon button" href="#">
                        <i className="fa fa-plus"></i>
                    </a>
                    <a className="right secondary icon button" href={RouterHelpers.pathFor('dashboard')}>
                        <i className="fa fa-user"></i>
                    </a>
                </div>

            );
        } else {
            return (
                <a className="right secondary icon button" href={RouterHelpers.pathFor('login')}>
                    <i className="fa fa-plug"></i>
                </a>
            );
        }
    },
    render() {
        return (
            <module className="menu module">
                {this.renderButtons()}
            </module>
        );
    }
});