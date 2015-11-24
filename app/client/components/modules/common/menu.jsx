App.Menu = React.createClass({
    getInitialState: function() {
        return { renderGameCreate: false };
    },
    handleCreateClick: function() {
        this.setState({ renderGameCreate: !this.state.renderGameCreate });
    },
    renderButtons() {
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <div className="buttons">
                    <a className="left secondary icon button" href="#" onClick={this.handleCreateClick}>
                        {this.state.renderGameCreate ? <i className="fa fa-times"></i> : <i className="fa fa-plus"></i>}
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
                {this.state.renderGameCreate ? <App.GameCreate /> : null}
            </module>
        );
    }
});