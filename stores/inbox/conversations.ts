import { defineStore } from 'pinia'
import type { IConversation } from '~/types/inbox'
import { useMessagesStore } from './messages';

export const useConversationsStore = defineStore('conversationsStore', () => {

  const supabase = useSupabaseClient();

  // state
  const conversations = reactive<IConversation[]>([])
  const activeConversation = ref<IConversation | null>(null)
  const loadingConversations = ref(false)

  // actions
  function setActiveConversation(conversation: IConversation) {
    if (activeConversation.value?.id === conversation.id) return;
    activeConversation.value = conversation

    const messagesStore = useMessagesStore();
    messagesStore.fetchMessages(conversation.id);
  }

  function addConversation(conversation: IConversation) {
    conversations.unshift(conversation)
  }

  async function fetchConversations() {
    loadingConversations.value = true;
  
    const { data, error } = await supabase.rpc(
      'get_current_user_conversations_with_last_message'
    );
  
    if (error) {
      console.error('Error fetching conversations:', error);
      loadingConversations.value = false;
      return;
    }
  
    console.log('data', data);
  
    if (!data) return;
  
    // Clear the existing conversations
    conversations.splice(0, conversations.length);
  
    // Populate the conversations array
    (data as IConversation[]).forEach((conv: IConversation, idx: number) => {
      conversations.push({
        id: Number(conv.conversation_id), // Convert to number to match IConversation type
        name: 'user ' + ++idx,
        avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg',
        preview: conv.last_message,
        last_message: conv.last_message, // Add missing property
        last_message_time: conv.last_message_time, // Add missing property
        last_message_at: formatDateTime(conv.last_message_time),
        unread: 0,
      });
    });
  
    if (conversations.length > 0) setActiveConversation(conversations[0]);
    loadingConversations.value = false;
  }
  

  // expose managed state
  return {
    conversations,
    activeConversation,
    loadingConversations,
    setActiveConversation,
    addConversation,
    fetchConversations,
  }
})
