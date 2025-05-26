import { defineStore } from 'pinia'
import type { IMessage } from '~/types/inbox'

export const useMessagesStore = defineStore('messagesStore', () => {
  const supabase = useSupabaseClient();
  // state
  const messages = reactive<IMessage[]>([])

  // actions

  async function fetchMessages(conversationId: number) {
    const { data, error } = await supabase.from('messages').select('*').eq('conversation_id', conversationId)
    if (error) {
      console.error('Error fetching messages:', error)
    }
    (data as IMessage[]).forEach((message: IMessage) => {
      messages.push(message)
    })
  }
                                                                    
  // expose managed state
  return {
    messages,
    fetchMessages
  }
})
