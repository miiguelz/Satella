module.exports = async (client, payload) => {
    let channel = client.channels.get(payload.d.channel_id)
    let message = channel.messages.get(payload.d.id)
    channel.messages.remove(message.id)

    client.emit("MessageDelete", message)
}