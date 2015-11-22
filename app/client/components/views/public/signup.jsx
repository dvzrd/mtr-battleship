App.Signup = React.createClass({
    componentDidMount() {
        Modules.client.signup({
            form: '#signup'
        });
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    render() {
        return (
            <view className="signup view">
                <h2 className="title">Sign Up</h2>

                <form id="signup" className="signup form" onSubmit={this.handleSubmit}>
                    <div className="input group">
                        <label className="label" htmlFor="emailAddress">Email Address</label>
                        <input type="email" name="emailAddress" className="email input" placeholder="Email Address"/>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" class="primary button">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Log In</a>.</p>
            </view>
        );
    }
});