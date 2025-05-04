type ChatMessage = {
    role: Role,
    content: string,
    created_At: string,
    images?: string[]
}

export enum Role {
    User = 'user',
    Bot = 'bot'
}

export default ChatMessage;