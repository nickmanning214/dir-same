const walkDir = require('./util/walkDir.js');

const deepEqual = require('deep-equal');
const fs = require('fs');
const path = require('path');

function pathToFileContents(path){
    return fs.lstatSync(path).isDirectory()?'':fs.readFileSync(path).toString();
}

module.exports = function(originalPath,otherPath){

    const originPathBase = path.parse(originalPath).dir;
    const originalPathName = path.parse(originalPath).name;

    const otherPathBase = path.parse(otherPath).dir;
    const otherPathName = path.parse(otherPath).name;

    const originalPaths = walkDir(originPathBase,originalPathName)
    const otherPaths = walkDir(otherPathBase,otherPathName);

    
    const originalPathsLocal = originalPaths.map(path=>path.substr(originPathBase.length+originalPathName.length+1))
    const otherPathsLocal = otherPaths.map(path=>path.substr(otherPathBase.length+otherPathName.length+1))



    if (deepEqual(originalPathsLocal,otherPathsLocal)) {
        const originalPathContents = originalPaths.map(pathToFileContents);
        const otherPathContents = otherPaths.map(pathToFileContents)
        if (deepEqual(originalPathContents,otherPathContents)) {

            return true;
        }
        return false;
    }
    else {
        return false;
    }
}
