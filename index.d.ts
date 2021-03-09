import events from "events"

declare function Satella(options?: Satella.ClientOptions): Satella.Client;

declare namespace Satella {
       interface ClientOptions {
           intents: number;
       }

       interface Events<T> {
          (event: "ready", func: () => void): T;
          (event: "MessageSent", func: (arg0: Message) => void): T;
          (event: "NewGuild", func: (arg0: Guild) => void): T;
       }

       interface Guild {
           name: string
           members_count: number
           region: string
           id: string
           owner: string
           joinedAt: string
           members: Map<string, Member>
       }

       interface ClientUser {
           verified: boolean;
           name: string;
           id: string;
           flags: number;
           hashtag: string;
           username: string;
       }

       interface Member {
           nick: string
           id: string
           joinedAt: string
           roles: string[]
       }

       interface User {
           name: string;
           flags: number
           id: string
           avatar: string
           creatAt: number
       }

       interface Message {
           pinned: boolean
           tts: boolean
           referenceMessage?: string
           id: string
           subject: string
           user: User
           member: Member
           guild: Guild
           reply(subject: string | object): Promise<Message>
       }

       interface Role {
          position: number
          permissions: string
          name: string
          mentionable: boolean
          color: number
          id: string
       }

       export class Client extends events {
           options: ClientOptions
           token: string
           login(token: string): void
           on: Events<this>
           once: Events<this>
           user: ClientUser

           users: Map<string, User>
           guilds: Map<string, Guild>
       }
}

export = Satella