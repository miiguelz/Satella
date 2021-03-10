module.exports = class Guild {
    constructor(client, data) {
        this.name = data.name
        this.members_count = data.member_count
        this.region = data.region
        this.owner = data.owner_id
        this.id = data.id
        this.joinedAt = data.joined_at

        this.members = new Map()

        this.roles = new Map()
        this._client = client
        this.channels = new Map()
    }

    createSlashCommand(data) {
        let userAgent = `DiscordBot (https://github.com/bryzzen-kibador/Satella, ${require("../../package.json").version})`;

        let url = `https://discord.com/api/v8/applications/${this._client.user.id}/guilds/${this.id}/commands`

        const fetch = require("node-fetch")

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bot " + this._client.ws.token,
                "User-Agent": userAgent,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(res => {console.log(res)})

    }
}