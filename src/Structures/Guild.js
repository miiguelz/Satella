module.exports = class Guild{
    constructor(client, data){
        this.name = data.name
        this.members_count = data.member_count
        this.region = data.region
        this.owner = data.owner_id
        this.id = data.id
        this.joinedAt = data.joined_at

        this.members = new Map()
    }
}