//This function could probably be rewritten to make it better/more efficient. It came from stackoverflow and was hacked together.

module.exports = function walkSync(dir, filelist) {

    if( dir[dir.length-1] != '/') dir=dir.concat('/')

  
    var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
    filelist = filelist || [];
    if (files.length == 0) filelist.push(dir); //support empty dirs
    else files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
      }
      else {
        filelist.push(dir+file);
      }
    });
    return filelist;
  };
