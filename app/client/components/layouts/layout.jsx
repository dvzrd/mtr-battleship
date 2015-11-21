App.Layout = React.createClass({
    render() {
        return (
            <layout className="layout">
                <App.Header />

                {this.props.view}

                <App.Footer />
            </layout>
        );
    }
});