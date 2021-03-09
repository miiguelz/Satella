module.exports = class Member{
    constructor(client, data){
        this.nick = data.nick || data.user.username
        this.id = data.user.id
        this.joinedAt = data.joined_at
        this.roles = data.roles
    }
}