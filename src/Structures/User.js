module.exports = class User {
    constructor(client, data){
        this.name = data.username
        this.flags = data.public_flags
        this.id = data.id
        this.avatar = data.avatar
        this.creatAt = new Date(Math.floor(this.id / 4194304) + 1420070400000)
    }
}