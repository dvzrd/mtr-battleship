App.GameCreate = React.createClass({
    componentDidMount() {
        Modules.client.battleCreate({
            form: '#gameCreate'
        });
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    render() {
        return (
            <module className="create game module">
                <h2 className="title">Create a Game</h2>

                <form id="gameCreate" className="create game form" onSubmit={this.handleSubmit}>
                    <div className="input group">
                        <label className="label" htmlFor="title"><i className="fa fa-rocket"></i></label>
                        <input type="text" name="title" className="title input" placeholder="Name your game so others can find it"
                               autofocus/>
                    </div>
                    <button type="submit" className="primary centered button">Battle</button>
                </form>
            </module>
        );
    }
});