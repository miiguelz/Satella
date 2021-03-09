module.exports = class Message {
    constructor(client, data){
        this.pinned = data.pinned
        this.tts = data.tts
        this.referenceMessage = data.referenced_message
        this.id = data.id
        this.subject = data.content

        this.user = client.users.get(data.author.id)
        this.member = client.guilds.get(data.guild.id).members.get(this.author.id)
        this.guild = client.guilds.get(data.guild_id)
    }

    async reply(subject){
        //let userAgent = `DiscordBot ()`
    }
}