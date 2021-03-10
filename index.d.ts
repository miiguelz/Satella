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
          (event: "InteractionCreate", func: (arg0: Interaction) => void): T;
       }

       interface Guild {
           name: string
           members_count: number
           region: string
           id: string
           owner: string
           joinedAt: string
           members: Map<string, Member>
           roles: Map<string, Role>
           channels: Map<string, Channel>
           createSlashCommand(data: SlashCommands): Interaction;
       }

       interface Interaction {
           type: number
           user: User
           guild: Guild
           name: string
           interactionId: string
           interactionToken: string
           reply(subect: string | Embed): Promise<void>
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

       interface AvatarOptions {
           format: "png" | "jpeg" | "gif" | "webp"
       }

       interface User {
           name: string;
           flags: number
           id: string
           avatar: string
           creatAt: number
           hashtag: string
           username: string
           avatarURL(options?: AvatarOptions): string
       }

       interface ReactionOptions {
           name: string
           id?: string
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
           reply(subject: string | Embed): Promise<Message>
           createReaction(reaction: ReactionOptions): Promise<void>;
       }

       interface ChannelPermissions {
           type: number
           id: string
           deny: string
           allow: string
       }

       interface Channel {
           type: number
           topic?: string
           position: number
           permissionsOverwites?: ChannelPermissions[]
           send(subject: string | Embed): Promise<Message>;
       }

       interface Role {
          position: number
          permissions: string
          name: string
          mentionable: boolean
          color: number
          id: string
       }

       interface footer{
           text: string
           icon_url?: string
       }

       interface field{
           name: string
           value: string
           inline?: boolean
       }
       
       interface SlashChoices{
           name: string
           value: string
       }

       interface SlashOptions{
           name: string
           description: string
           type: number
           choices?: SlashChoices[]
           required: boolean
       }

       export class SlashCommands {
           name: string
           description: string
           options: SlashOptions[]
       }

       interface Embed {
           title?: string
           type?: string
           description?: string
           url?: string
           timestamp?: number
           color?: string
           footer?: footer
           fields?: field[]
       }

       interface Emoji {
           name: string
           id: string
           animated: boolean
           managed: boolean
           available: boolean
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
           roles: Map<string, Role>
           emojis: Map<string, Emoji>
       }
}

export = Satella