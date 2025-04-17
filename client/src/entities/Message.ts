type Message = {
    role: Role,
    content: string,
    created_At: string,
    images?: string[]
}

export enum Role {
    User = 'User',
    Admin = 'Admin',
    Bot = 'Bot'
}

export default Message;