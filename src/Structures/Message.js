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
        this.member = data.member ? this.guild.members.get(data.author.id) : null
        this.channel = client.channels.get(data.channel_id)
    }

    async reply(subject) {
        let userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require("../../package.json").version})`;

        return new Promise((resolve, reject) => {
            const fetch = require("node-fetch")

            let data;

            if (typeof subject == "string") {
                data = JSON.stringify({ content: subject, tts: false, message_reference: { message_id: this.id, guild_id: this._data.guild_id } })
            } else if (typeof subject == "object") {
                subject.color = subject.color ? parseInt(subject.color.replace("#", ""), 16) : null
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
                    if (json.message) return new Error(json.message)
                    let msg = new Message(this._client, json)
                    resolve(msg)
                })
        })
    }

    async createReaction(reaction) {
        let userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require("../../package.json").version})`;

        return new Promise((resolve, reject) => {
            let fetch = require("node-fetch")

            if (!reaction.id) {
                fetch(`https://discord.com/api/v8/channels/${this._data.channel_id}/messages/${this._data.id}/reactions/${encodeURIComponent(`${reaction.name}`)}/@me`, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bot " + this._client.token
                    }
                }).then(res => {
                    if (res.status !== 204) return new Error("An error has happened!")
                })
            } else {

                fetch(`https://discord.com/api/v8/channels/${this._data.channel_id}/messages/${this._data.id}/reactions/${encodeURIComponent(`${reaction.name}:${reaction.id}`)}/@me`, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bot " + this._client.token
                    }
                }).then(res => {
                    if (res.status !== 204) return new Error("An error has happened!")
                })
            }
        })
    }
}