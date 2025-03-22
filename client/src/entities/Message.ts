type Message = {
    role: Role,
    content: string,
    created_At: string
}

enum Role {
    User = 'User',
    Admin = 'Admin'
}

export default Message;