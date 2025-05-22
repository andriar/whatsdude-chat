export interface IConversation {
  id: number
  name: string
  avatar: string
  preview: string
  unread?: number
  active: boolean
}

export interface IMessage {
  id: number
  from: 'me' | 'them'
  type: 'text' | 'audio' | 'file'
  text?: string
  duration?: string
  fileName?: string
  fileSize?: string
}

export interface ITab {
  label: string
} 