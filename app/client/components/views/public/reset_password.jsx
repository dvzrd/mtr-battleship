App.ResetPassword = React.createClass({
    componentDidMount() {
        Modules.client.resetPassword({
            form: '#resetPassword'
        });
    },
    handleSubmit(event) {
        event.submitHandler();
    },
    render() {
        return (
            <view className="reset account password view">
                    <h2 className="title">Reset Password</h2>

                    <form id="resetPassword" className="reset password form" onSubmit={this.handleSubmit}>
                        <p className="info alert">To reset your password, enter a new one below. You will be logged in with
                            your new password.</p>

                        <div className="input group">
                            <label className="label" htmlFor="newPassword">New Password</label>
                            <input type="password" name="newPassword" className="password input" placeholder="New Password"/>
                        </div>
                        <div className="input group">
                            <label className="label" htmlFor="password">Repeat New Password</label>
                            <input type="password" name="repeatNewPassword" className="password input" placeholder="Password"/>
                        </div>
                        <button type="submit" className="primary button">Reset Password &amp; Login</button>
                    </form>
            </view>
        );
    }
});