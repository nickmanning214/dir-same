const walkSync = require('walk-sync');
const deepEqual = require('deep-equal');
const fs = require('fs');

function pathToFileContents(path){
    return fs.readFileSync(path);
}

module.exports = function(originalPath,otherPath){

  

    const originalPaths = walkSync(originalPath).sort();
    const otherPaths = walkSync(otherPath).sort();

    const originalPathsEndings = originalPaths.map(path=>path.substr(originalPath.length))
    const otherPathsEndings = otherPaths.map(path=>path.substr(otherPath.length))

    console.log(otherPath,otherPathsEndings)

    if (deepEqual(originalPathsEndings,otherPathsEndings)) {
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
