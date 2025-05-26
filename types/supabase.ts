export interface ISupabaseMessage extends ISupabaseInsertMessage {
  id: number
  created_at: string
}

export interface ISupabaseInsertMessage {
  content: string
  conversation_id: number
  sender_id: string
}