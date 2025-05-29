import { defineStore } from 'pinia';
import type { IConversation } from '~/types/inbox';
import { useMessagesStore } from './messages';
import { useConversationsParticipantsStore } from './conversations-participants';

export const useConversationsStore = defineStore('conversations', () => {
  const supabase = useSupabaseClient();
  const messagesStore = useMessagesStore();
  const participantsStore = useConversationsParticipantsStore();

  // state
  const conversations = reactive<IConversation[]>([]);
  const activeConversation = ref<IConversation | null>(null);
  const loadingConversations = ref(false);

  // actions
  function setActiveConversation(conversation: IConversation) {
    if (activeConversation.value?.id === conversation.id) return;
    activeConversation.value = conversation;

    messagesStore.resetMessages();
    messagesStore.fetchMessages(conversation.id);
  }

  async function addConversation(conversation: IConversation) {
    await participantsStore.fetchParticipantsByConversationIds([conversation.conversation_id]);
    const participants = participantsStore.conversationParticipants.get(
      Number(conversation.conversation_id)
    );
    if (!participants?.user_id) {
      console.warn(`No user_id found for conversation ${conversation.conversation_id}`);
      return;
    }
    const newConversation = createConversationObject(conversation, participants);

    conversations.unshift(newConversation as IConversation);

    return newConversation;
  }

  async function fetchConversations() {
    loadingConversations.value = true;

    const { data, error } = await supabase.rpc('get_own_conversations');

    if (error) {
      console.error('Error fetching conversations:', error);
      loadingConversations.value = false;
      return;
    }

    if (!data) return;

    await populateConversations(data as IConversation[]);

    if (conversations.length > 0) setActiveConversation(conversations[0]);
    loadingConversations.value = false;
  }

  async function fetchConversationById(conversationId: number) {
    const { data, error } = await supabase.rpc('get_own_conversation_by_id', {
      conv_id: conversationId,
    });

    if (error) {
      console.error('Error fetching conversation:', error);
      return null;
    }

    if (!data || data.length === 0) return null;

    return data[0] as IConversation;
  }

  async function populateConversations(conversationData: IConversation[]) {
    const conversationIds = conversationData.map(conv => conv.conversation_id);
    await participantsStore.fetchParticipantsByConversationIds(conversationIds);

    // Clear the existing conversations
    conversations.splice(0, conversations.length);

    // Populate the conversations array
    conversationData.forEach((conv: IConversation) => {
      const participants = participantsStore.conversationParticipants.get(conv.conversation_id);
      if (!participants?.user_id) {
        console.warn(`No user_id found for conversation ${conv.conversation_id}`);
        return;
      }

      conversations.push(createConversationObject(conv, participants));
    });
  }

  function createConversationObject(
    conv: IConversation,
    participants: { name: string; avatar: string; user_id: string }
  ) {
    return {
      id: Number(conv.conversation_id),
      name: participants?.name || 'unknown user',
      avatar:
        participants?.avatar || 'https://latest-multichannel.qiscus.com/img/default_avatar.svg',
      sender_id: participants?.user_id,
      preview: conv.last_message || 'No messages yet',
      last_message: conv.last_message || 'No messages yet',
      last_message_time: conv.last_message_time,
      last_message_at: conv.last_message_time ? formatDateTime(conv.last_message_time) : '',
      unread: 0,
    };
  }

  async function updateLastMessage(index: number, lastMessage: string) {
    // Create new conversation object with updated last_message
    const updatedConversation = {
      ...conversations[index],
      last_message: lastMessage,
      preview: lastMessage,
      last_message_time: new Date().toISOString(),
      last_message_at: formatDateTime(new Date().toISOString()),
    };

    // Replace old conversation with updated one
    conversations.splice(index, 1, updatedConversation);
  }

  // expose managed state
  return {
    conversations,
    activeConversation,
    loadingConversations,
    setActiveConversation,
    addConversation,
    fetchConversations,
    updateLastMessage,
    fetchConversationById,
  };
});
