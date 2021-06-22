const { mkdir, writeFileSync, accessSync, access, createWriteStream, constants: { F_OK, W_OK } } = require("fs")

class Logger {
    constructor(dir = '', prefix = 'logger', ext = 'log', header = "") {
        this.parentDir = dir
        this.prefixName = prefix
        this.extension = ext
        this.date = null
        this.header = header
        this.fileName = null
        this.isAllowToWrite = !1
        this.writeStream = null
        this.init = () => {
            if (this.parentDir)
                if (!this.checkFileExists(this.parentDir))
                    mkdir(this.parentDir, { recursive: !0 }, (err) => {
                        if (err) this.isAllowToWrite = !1
                        else this.isAllowToWrite = !0
                    })
        }
        this.init()
    }

    getCurrDate() {
        let cDate = new Date()
        return cDate.getFullYear() + "-" + (cDate.getMonth() + 1) + "-" + cDate.getDate()
    }

    getFilePath() {
        this.fileName = `${this.parentDir}/${this.prefixName + this.date}.${this.extension}`
        return this.fileName
    }

    checkFileExists(file) {
        try {
            accessSync(file, F_OK);
            return true
        } catch (err) {
            console.error(err);
            return false
        }
    }

    checkFileAccess() {
        try {
            access(this.fileName, W_OK)
            return true
        } catch (err) {
            console.error(err);
            return false
        }
    }

    writeLog() {
        try {
            writeFileSync(this.fileName, "");
        } catch (error) {
            console.error(error);
        }
    }

    appendLog(data) {
        try {
            if (!this.writeStream)
                this.writeStream = createWriteStream(this.fileName, { 'flags': 'a' })
            this.writeStream.write(Object.values(data) + "\n")
        } catch (error) {
            console.error(error);
        }
    }

    log() {
        let getDate = this.getCurrDate()
        if (getDate === this.date) {
            this.appendLog(arguments)
        } else {
            this.date = this.getCurrDate()
            this.fileName = this.getFilePath()
            if (this.writeStream)
                this.writeStream.close()
            if (!this.checkFileExists(this.fileName)) {
                this.writeLog()
                if (this.header) this.appendLog(this.header)
            }
            this.appendLog(arguments)
        }
    }
}

module.exports = Logger