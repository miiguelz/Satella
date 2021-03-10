module.exports = class Channel {
    constructor(client, data){
        this.type = data.type
        this.topic = data.topic || ""
        this.position = data.position
        this.permissionsOverwrites = data.permissions_overwrites ? data.permissions_overwrites : null
        this.category = data.parent_id
        this.name = data.name
        this.lastMessage = data.last_message_id
        this.id = data.id
    }
}