// navBarTop.js

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavBarTopStyle = {
  backgroundColor: '#222222',
  borderColor: '#444444',
  margin: '0px 0px 0px 0px'
};

var DebuggerButtonTriggerNewCVO = React.createClass({
  handleClick: function () {
    $(document).trigger('newCVO');
  },
  render: function () {
    return (
      <button onClick={this.handleClick}>DEBUG TriggerNewCVO</button>
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
     loadVideo('0_Pq0xYr3L4',10);
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
    return (
      <div style={style} class="hello">
        <div style={titleStyle}>piTunes</div>
        <div style = {NavBarMenuDropdownStyle}>
          <NavBarMenuDropdown />
        </div>
        <div style={debuggerButtonsStyle}>
          <DebuggerButtonTriggerNewCVO />
          <DebuggerButtonRemVid />
          <DebuggerButtonLoadVid />
        </div>
      </div>
    );

  }
});