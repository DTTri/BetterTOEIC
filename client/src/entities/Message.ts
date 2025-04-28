type Message = {
    role: Role,
    content: string,
    created_At: string,
    images?: string[]
}

export enum Role {
    User = 'user',
    Bot = 'bot'
}

export default Message;