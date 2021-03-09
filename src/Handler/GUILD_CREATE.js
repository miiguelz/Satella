const ClientUser = require("../Structures/ClientUser")
const Guild = require("../Structures/Guild")
const Member = require("../Structures/Member")
const User = require("../Structures/User")

module.exports = async (client, payload) => {
    if (client._guilds.includes(payload.d.id)) {
        const guild = new Guild(client, payload.d)
        client.guilds.set(guild.id, guild)
    } else {
        const guild = new Guild(client, payload.d)
        client.guilds.set(guild.id, guild)
        client.emit("NewGuild", guild)
    }

    payload.d.members.forEach(e => {
        const member = new Member(client, e)
        const guild = new Guild(client, payload.d)
        guild.members.set(member.id, member)
        const user = new User(client, e.user)
        client.users.set(user.id, user)
    });
}