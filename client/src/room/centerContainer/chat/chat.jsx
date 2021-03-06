var React = require('react');
var StatusBar = require('../../centerContainer/statusbar/statusbar.jsx');

var socket = io(window.location.origin);

var ChatList = React.createClass({
  render: function() {
    var style = {
      color: '#FFF',
      listStyleType: 'none',
      bottom: '0',
      maxHeight: '100%',
      marginBottom: '0px'
    };
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return <ul style={style}>{this.props.items.map(createItem)}</ul>;
  }
});

var Chat = React.createClass({
  getInitialState: function() {
    socket.on('user message', function(data){
      var nextItems = this.state.items.concat([data.displayName + ': ' + data.message]);
      this.setState({ items: nextItems });
    }.bind(this));

    socket.on('room status', function(data){
      console.log('room status: ', data);
      if (data.id === this.props.app.get('current_room').get('id')) {
        this.props.app.get('current_room').updateForRoomStatus(data);
      }
    }.bind(this));

    socket.on('user status', function(data){
      if (this.props.app.get('user').get('id') === data.id) {
        console.log('data: ', data);
        if (this.props.app.get('current_room').get('id') !== data.room) {
          console.log('updating user to defaults')
          //user is not in the room they most recently logged into so sign them out
          this.props.app.userSignOut();
        } else {
          console.log('updating user status')
          //update user info, they are presumably the most recent dj
          this.props.app.get('user').retrieveCurrentPlaylist();
        }
      }
    }.bind(this));

    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.props.app.get('user').get('display_name');
    if (this.state.text === '') { return; }
    socket.emit('user message', { displayName: name, message: this.state.text });
    var nextItems = this.state.items.concat([ name + ': ' + this.state.text ]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  componentDidUpdate: function () {
    var container = this.refs.messageContainer.getDOMNode();
    if (container.scrollHeight - (container.scrollTop + container.offsetHeight) >= 50) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
    if (this.scrolled === false) {
      var container = this.refs.messageContainer.getDOMNode();
      container.scrollTop = container.scrollHeight;
    }
  },
  render: function() {
    var style = {
      left: '2.5%',
      width: '95%',
    };
    var divStyle = {
      background: '#424242',
      border: '10px solid #222',
      position: 'absolute',
      width: '100%',
      height: '40%',
      bottom: '0',
      borderRadius: '40px',
      zIndex: '-1'
    };
    var searchBarInputStyle = {
      backgroundColor: '#DDDDDD',
      borderColor: '#222',
      position: 'absolute',
      bottom: '0',
      borderRadius: '40px',
      marginBottom: '8px',
      width: '95%',
      left: '2.5%'
    };
    var chatListStyle = {
      overflow: 'auto',
      maxHeight: '65%'
    };
    return (
      <div style={divStyle}>
        <StatusBar currentDJ={null} videoTitle={null} app={this.props.app}/>
        <div style={chatListStyle} ref="messageContainer">
          <ChatList items={this.state.items}/>
        </div>
        <form style={style} onSubmit={this.handleSubmit}>
          <input style={searchBarInputStyle} onChange={this.onChange} value={this.state.text} className="form-control" placeholder="Say Something..."/>
        </form>
      </div>
    );
  }
});

module.exports = Chat;
