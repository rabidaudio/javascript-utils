var fs   = require('fs');
var find = require('find');
var getTags  = require('./tags');

function search_dir(dir) {
  find.file(/\.mp3$/, dir, function (files) {
    properSort(files);
  }
}

function properSort(mp3_files) {
  var i, file, tag, path;
  if (mp3_files === undefined || mp3_files.length < 1) {
    return;
  }
  for (i = 0; i < mp3_files.length; i++) {
    file = mp3_files[i];
    tag = getTags(file);
    path = fs.realpathSync(pathToString(proper_path(tag), "unix"));

    file_move(file, path);
  }
}

function file_move(from, to){
  fs.rename(from, to, function(error){
    if(error) throw error;
    console.log(from + " ==> "+ to);
  })
}

function proper_path(tags) {
  var artist_dir = tags.artist.clean_name();
  var album_dir = tags.year + " - " + tags.album.clean_name();
  var track_name = tags.track_num + " " + tags.title.clean_name() + ".mp3";//TODO allow other formats
  return [artist_dir, album_dir, track_name];
}
function pathToString(path_parts, os){
  var delim = "/";
  if(os === "win"){
    delim = "\\";
  }
  return path_parts.join(delim);
}

String.prototype.clean_name = function (length) {
  if (length === undefined) {
    length = 40;
  }
  return this.replace(/[^A-Za-z0-9 \-]/g, "_").substring(0, length);
}
