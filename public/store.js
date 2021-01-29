const electron = require('electron')
const fs = require('fs')
const path = require('path')


class Store {
    constructor(options){
        const userDataPath = (electron.app || electron.remote.app).getPath('userData')
        this.path = path.join(userDataPath, options.configName + '.json')
        this.data = parseFile(this.path, options.userPreferedData)
    }

    get(key){
        return this.data[key]
    }

    set(key, value){
        this.data[key] = value
        fs.writeFileSync(this.path, JSON.stringify(this.data))
    }

}

const parseFile = (path, defaultData) => {
    try{
        return JSON.parse(fs.readFileSync(path))
    } catch(e) {
        console.log(e)
        return defaultData
    }
}

module.exports = Store