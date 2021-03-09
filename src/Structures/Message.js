module.exports = class Message {
    constructor(client, data) {
        this._client = client
        this._data = data
        this.pinned = data.pinned
        this.tts = data.tts
        this.referenceMessage = data.referenced_message
        this.id = data.id
        this.subject = data.content

        this.guild = client.guilds.get(data.guild_id)
        this.user = client.users.get(data.author.id)
        this.member = data.member ? this.guild.members.get(data.author.id): null
    }

    async reply(subject) {
        let userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require("../../package.json").version})`;

        return new Promise((resolve, reject) => {
            const fetch = require("node-fetch")

            let data;

            if (typeof subject == "string") {
                data = JSON.stringify({ content: subject, tts: false, message_reference: { message_id: this.id, guild_id: this._data.guild_id } })
            } else if (typeof subject == "object") {
                data = JSON.stringify({ embed: subject, tts: false, message_reference: { message_id: this.id, guild_id: this._data.guild_id } })
            }

            fetch(`https://discord.com/api/v8/channels/${this._data.channel_id}/messages`, {
               method: "POST",
               body: data,
               headers: {
                   "Authorization": "Bot " + this._client.token,
                   "User-Agent": userAgent,
                   "Content-Type": "application/json"
               } 
            }).then(res => res.json())
            .then(json => {
                let msg = new Message(this._client, json)
                resolve(msg)
            })
        })
    }
}