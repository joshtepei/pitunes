// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var DebuggerButtonJoinQueue = React.createClass({
  handleClick: function () {
    socket.emit('user queue join', {user: user.id, room: 1});
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Join Queue U1R1</button>
    );
  }
});

var DebuggerButtonSimVideoDesync = React.createClass({
  handleClick: function () { 
    setVideoTime(3);
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Sim Desync</button>
    );
  }
});

var DebuggerButtonJoinRoom = React.createClass({
  handleClick: function () {
    socket.emit('user room join', {user: user.id,room:1})
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>Join Room U1R1</button>
    );
  }
});

var DebuggerButtonRemVid = React.createClass({
  handleClick: function () {
    removeVideo();
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>DEBUG RemVid</button>
    );
  }
});

var DebuggerButtonRemVid = React.createClass({
  handleClick: function () {
    removeVideo();
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>DEBUG RemVid</button>
    );
  }
});

var DebuggerButtonLoadVid = React.createClass({
  handleClick: function() {
     loadVideo('0_Pq0xYr3L4', 10);
   },
  render: function() {
    return (
      <button onClick={this.handleClick}>LoadTestVid at 0:10</button>
    );
  }
});

var NavBarTop = React.createClass({
  render: function() {
    var style = {
      background: '#222222',
      border: '2px solid #444444',
      position: 'absolute', 
      width: '100%',
      height: '8%'
    };
    var titleStyle = {
      height:'100%',
      color: 'grey',
      fontSize: '200%',
      marginLeft: '7%'
    };
    var debuggerButtonsStyle = {
      right: '30%',
      top: '10%',
      height: '100%',
      position: 'absolute'
    };
    var NavBarMenuDropdownStyle = {
      right: '6%',
      top: '0',
      position: 'absolute',
    };
    var piStyle = {
      color: '#FFF'
    };
    var tunesStyle = {
      color: '#CC0000'
    };
    return (
      <div style={style}>
        <div style={titleStyle}><span style={piStyle}>pi</span><span style={tunesStyle}>TUNES</span></div>
        <div style={debuggerButtonsStyle}>
          <DebuggerButtonSimVideoDesync />
          <DebuggerButtonJoinQueue />
          <DebuggerButtonJoinRoom />
        </div>
        <div style = {NavBarMenuDropdownStyle}>
          <NavBarMenuDropdown />
        </div>
      </div>
    );

  }
});