//This function could probably be rewritten to make it better/more efficient. It came from stackoverflow and was hacked together.
/*

old

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
*/

const fs = require('fs');
const walk = require('@nickmanning214/walk-tree');
const path = require('path');

function walkDir(dirName){
  return walk(dirName,(tree,Node)=>new Node({parentPath:path.join(__dirname,'..','tests')},dirName),(tree,parentNode,Node)=>{

    const dirName = path.join(parentNode.metaData.parentPath,parentNode.value);
    if (fs.lstatSync(dirName).isDirectory()){
        return fs.readdirSync(dirName).map(fileName=>new Node({parentPath:dirName},fileName))
    }
    else return [];
  }).map(file=>`${path.join(file.metaData.parentPath,file.value)}`);

}

module.exports = walkDir;

