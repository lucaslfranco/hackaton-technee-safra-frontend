const req = require.context('.', true, /\.\/[^/]+\/[^/]+\.js$/)

/* Get all component names and exports from file names
   e.g.:    |    FileName     |   Exports    |  
            |   comments.js   |   Comments   |
            |  profileModal.js |  ProfileModal |
*/
req.keys().forEach((key) => {
    let componentName = key.replace(/^.+\/([^/]+)\.js/, '$1')
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    module.exports[componentName] = req(key).default
})