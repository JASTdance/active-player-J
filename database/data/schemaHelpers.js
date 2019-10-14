const Promise = require('bluebird');
const db = require('../index');

module.exports = Promise.promisifyAll({
  songSaver: (song, cb) => {
    const stmt = `INSERT INTO songs (length, timestamp, isliked, songfile, title, artist, album, thumbnail) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `;
    const songVals = [
      song.length,
      song.timestamp,
      song.isliked,
      song.songfile,
      song.title,
      song.artist,
      song.album,
      song.thumbnail,
    ];
    db.queryAsync(stmt, songVals)
      .then((results) => cb(null, results))
      .catch((err) => cb(err));
  },
  playlistSaver: (songid, playlist, cb) => {
    const stmt = `INSERT INTO ${playlist} (songid) 
               VALUES (?)
              `;
    const songVal = [songid];
    db.queryAsync(stmt, songVal)
      .then((results) => cb(null, results))
      .catch((err) => cb(err));
  },
  songGetter: (songid, cb) => {
    const stmt = 'SELECT * FROM songs WHERE id = ?';
    const songVal = [songid];
    db.queryAsync(stmt, songVal)
      .then((results) => cb(null, results))
      .catch((err) => cb(err));
  },
  playlistGetter: (playlist, cb) => {
    const stmt = `SELECT * FROM ${playlist}`;
    db.queryAsync(stmt)
      .then((results) => cb(null, results))
      .catch((err) => cb(err));
  },
  timestampUpdater: (songid, timestamp, cb) => {
    const stmt = `UPDATE songs SET timestamp = ${timestamp}
                  WHERE id = ${songid}
                  `;
    db.queryAsync(stmt)
      .then((results) => cb(null, results))
      .catch((err) => cb(err));
  },
});
