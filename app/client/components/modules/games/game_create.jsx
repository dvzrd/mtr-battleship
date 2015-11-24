App.GameCreate = React.createClass({
    componentDidMount() {
        Modules.client.gameCreate({
            form: '#gameCreate'
        });
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    renderForm() {
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <form id="gameCreate" className="create game form" onSubmit={this.handleSubmit}>
                    <div className="input group">
                        <label className="label" htmlFor="title"><i className="fa fa-rocket"></i></label>
                        <input type="text" name="title" className="title input" placeholder="Title of your game"
                               autofocus/>
                    </div>
                    <button type="submit" className="primary centered button">Create Game</button>
                </form>
            );
        } else {
            return (
                <p className="centered message">You must be logged in to create a game.</p>
            );
        }
    },
    render() {
        return (
            <module className="create game module">
                {this.renderForm()}
            </module>
        );
    }
});