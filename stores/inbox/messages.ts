import { defineStore } from 'pinia';
import type { IMessage } from '~/types/inbox';
import type { ISupabaseMessage } from '~/types/supabase';

export const useMessagesStore = defineStore('messages', () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  // state
  const messages = reactive<IMessage[]>([]);

  // actions
  async function fetchMessages(conversationId: number) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId);
    if (error) {
      console.error('Error fetching messages:', error);
    }
    (data as ISupabaseMessage[]).forEach((message: ISupabaseMessage) => {
      addMessage(message);
    });
  }

  function resetMessages() {
    messages.length = 0;
  }

  async function addMessage(message: ISupabaseMessage) {
    messages.push({
      id: message.id,
      from: message.sender_id !== user.value?.id ? 'them' : 'me',
      type: 'text',
      text: message.content,
      created_at: message.created_at,
    });
  }

  // expose managed state
  return {
    messages,
    fetchMessages,
    addMessage,
    resetMessages,
  };
});
