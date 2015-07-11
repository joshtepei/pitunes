var knex = require('./config/knex-config');
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Users', function (user) {
      user.increments('id').primary().unsigned();
      user.string('email', 50).unique().notNullable();
      user.string('password', 100);
      user.string('oauth', 30);
      user.string('name', 50);
      user.string('icon', 100);
      user.string('location', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table Users');
    });
  }
});

bookshelf.knex.schema.hasTable('Playlists').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Playlists', function (playlist) {
      playlist.increments('id').primary().unsigned();
      playlist.integer('user_id').unsigned().references('id').inTable('Users');
      playlist.string('name', 50).notNullable();
      playlist.timestamps();
    }).then(function (table) {
      console.log('Created Table Playlists');
    });
  }
}); 

bookshelf.knex.schema.hasTable('Media').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Media', function (media) {
      media.increments('id').primary().unsigned();
      media.string('youtube_id', 100);
      media.integer('Youtube_link', 100);
      media.integer('play_count').unsigned().defaultTo(0);
      media.string('name', 255).defaultTo('');
      media.timestamps();
    }).then(function (table) {
      console.log('Created Table Media');
    });
  }
});

bookshelf.knex.schema.hasTable('Media_Playlists').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Media_Playlists', function (playlist) {
      playlist.increments('id').primary().unsigned();
      playlist.unsigned('playlist_id').references('id').inTable('Playlists');
      playlist.unsigned('media_id').references('id').inTable('Media');
      playlist.integer('order', 8).unsigned();
    }).then(function (table) {
      console.log('Created Table Media Playlists');
      callback();
    });
  }
}); 
bookshelf.knex.schema.hasTable('Rooms').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Rooms', function (room) {
      room.increments('id').primary().unsigned();
      room.string('name', 50);
      room.boolean('private').defaultTo(false);
      room.string('password', 100);
      room.timestamps();
    }).then(function (table) {
      console.log('Created Table Rooms');
      callback();
    });
  }
});

console.log('config file run');


module.exports = bookshelf;
