var React = require('react');
var DebuggerButtons = require('../room/debuggerButtons/debuggerButtons.jsx');

var TopNavBar = React.createClass({
  getInitialState: function () {
    return ({ buttonText: 'Sign In' });
  },
  componentDidMount: function () {
    this.props.app.on('userSignInOut', this.updateForSignInStatus);
    this.updateForSignInStatus();
  },
  updateForSignInStatus: function () {
    if (this.props.app.isSignedIn()) {
      this.setState({ buttonText: 'Sign Out'});
    } else {
      this.setState({ buttonText: 'Sign In'});
    }
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div className="container topnav">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand topnav" href="#/"><span className="j-color-black">pi</span><span className="j-color-blue">Tunes</span></a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/rooms">Rooms</a>
              </li>
              <li>
                <a className="j-pointer" onClick={this.props.signInClick}>{this.state.buttonText}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = TopNavBar;
