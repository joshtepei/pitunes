var utils = require('./playlistsUtils');

module.exports = {

  attachPlaylist: function(req, res, next, playlist_id) {
    req.playlist_id = parseInt(playlist_id);
    next();
  },

  getPlaylist: function(req, res, next) {
    var playlist_ID = req.playlist_id;
    utils.retrievePlaylist(playlist_ID)
    .then(function(playlist) {
      if (playlist) {
        res.json(playlist.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  addPlaylist: function(req, res, next) {
    utils.storePlaylist(req.user_id, req.body)
    .then(function(playlist) {
      if (playlist) {
        res.json(playlist.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  updatePlaylist: function(req, res, next) {
    var playlist_ID = req.playlist_id;
    var playlistInfo = req.body;

    utils.updatePlaylist(playlist_ID, playlistInfo)
    .then(function(playlist) {
      if (playlist) {
        res.json(playlist.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  deletePlaylist: function(req, res, next) {
    utils.deletePlaylist(req.playlist_id)
    .then(function() {
      next();
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  }
};
