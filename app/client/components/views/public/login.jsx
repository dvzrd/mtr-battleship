App.Login = React.createClass({
    componentDidMount() {
        Modules.client.login({
            form: '#login'
        });
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    render() {
        return (
            <view className="login view">
                <h2 className="title">Login</h2>

                <form id="login" className="login form" onSubmit={this.handleSubmit}>
                    <div className="input group">
                        <label className="label" htmlFor="emailAddress">Email Address</label>
                        <input type="email" name="emailAddress" className="email input" placeholder="Email Address"/>
                    </div>
                    <div className="input group">
                        <label className="label" htmlFor="password">Password <a className="route link"
                                                                                href="/recover-password">Forgot
                            Password?</a></label>
                        <input type="password" name="password" className="password input" placeholder="Password"/>
                    </div>
                    <button type="submit" className="primary button">Login</button>
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
            </view>
        );
    }
});