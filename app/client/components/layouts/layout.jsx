App.Layout = React.createClass({
    render() {
        return (
            <layout className="layout">
                <header className="animated fadeInDown header">
                    <App.Logo />
                </header>

                <main className="main">
                    {this.props.view}
                </main>

                <footer className="animated fadeInUp footer">
                    <App.Menu />
                    <App.Copyright />
                </footer>
            </layout>
        );
    }
});