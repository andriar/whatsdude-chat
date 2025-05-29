export interface ISupabaseMessage extends ISupabaseInsertMessage {
  id: number
  created_at: string
}

export interface ISupabaseInsertMessage {
  content: string
  conversation_id: number
  sender_id: string
}

export interface ISupabaseConversation {
  id: number
  is_group: boolean
  name: string | null
  created_at: string
  created_by: string
}

export interface ISupabaseConversationParticipant {
  id: number
  conversation_id: number
  user_id: string
  created_at: string
}