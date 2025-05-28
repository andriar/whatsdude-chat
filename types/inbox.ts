export interface IConversation {
  id: number
  name: string
  avatar: string
  sender_id: string
  preview: string
  unread?: number
  last_message_at: string
  conversation_id?: string
  last_message_time: string
  last_message: string
  created_at: string
}

export interface IMessage {
  id: number
  from: 'me' | 'them'
  type: 'text' | 'audio' | 'file'
  text?: string
  duration?: string
  fileName?: string
  fileSize?: string
  created_at: string
}

export interface ITab {
  label: string
} 