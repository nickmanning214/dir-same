const walkDir = require('./util/walkDir.js');

const deepEqual = require('deep-equal');
const fs = require('fs');
const path = require('path');

function pathToFileContents(path){
    return fs.lstatSync(path).isDirectory()?'':fs.readFileSync(path).toString();
}

module.exports = function(originPathBase,originalPath,otherPathBase,otherPath){

    

    const originalPaths = walkDir(originPathBase,originalPath)
    const otherPaths = walkDir(otherPathBase,otherPath);

    
    const originalPathsLocal = originalPaths.map(path=>path.substr(originPathBase.length+originalPath.length+1))
    const otherPathsLocal = otherPaths.map(path=>path.substr(otherPathBase.length+otherPath.length+1))



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
