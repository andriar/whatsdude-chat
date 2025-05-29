import { useSupabaseClient, useToast } from '#imports';
import type { Database } from '~/types/database.types';
import { useConversationsStore } from '~/stores/inbox/conversations';
import { useMessagesStore } from '~/stores/inbox/messages';
import type { IConversation } from '~/types/inbox';

type Message = Database['public']['Tables']['messages']['Row'];
type Conversation = Database['public']['Tables']['conversations']['Row'];

export function useConversationSubscriptions() {
  const supabase = useSupabaseClient();
  const conversationsStore = useConversationsStore();
  const messageStore = useMessagesStore();
  const toast = useToast();

  function setupMessageSubscription() {
    return supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        handleMessageChange
      )
      .subscribe();
  }

  function setupConversationSubscription() {
    return supabase
      .channel('conversation-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        handleConversationChange
      )
      .subscribe();
  }

  function handleMessageChange(payload: { eventType: 'INSERT' | 'UPDATE' | 'DELETE'; new: unknown; old: unknown }) {
    switch (payload.eventType) {
      case 'INSERT':
        handleNewMessage(payload.new as Message);
        break;
      case 'UPDATE':
        console.log('Updated message:', payload.new);
        break;
      case 'DELETE':
        console.log('Deleted message:', payload.old);
        break;
    }
  }

  function handleConversationChange(payload: { eventType: 'INSERT' | 'UPDATE' | 'DELETE'; new: unknown; old: unknown }) {
    switch (payload.eventType) {
      case 'INSERT':
        console.log('New conversation:', payload.new as Conversation);

        // handleNewConversation(payload.new as Conversation);
        break;
      case 'UPDATE':
        console.log('Updated conversation:', payload.new as Conversation);
        break;
      case 'DELETE':
        console.log('Deleted conversation:', payload.old as Conversation);
        break;
    }
  }
  
  // function handleNewConversation(payload: Conversation) {
  //   conversationsStore.addConversation(payload);
  // }

  // add queue for new conversation
  // if new conversation to many, then add to queue
  async function handleNewMessage(payload: Message) {
    const index = conversationsStore.conversations.findIndex((conv: IConversation) => conv.id === payload.conversation_id);
    if (index === -1) {
      const conv = await conversationsStore.fetchConversationById(payload.conversation_id);

      const newConversation = {
        ...conv,
        preview: conv?.last_message,
        unread: 0,
        created_at: conv?.last_message_at,
        last_message_at: conv?.last_message_at,
        last_message_time: conv?.last_message_time,
        last_message: conv?.last_message,
      }
      return await conversationsStore.addConversation(newConversation as IConversation);

    }
    conversationsStore.updateLastMessage(index, payload.content);

    const isOpenedConversation = conversationsStore.activeConversation?.id === payload.conversation_id;
    if (isOpenedConversation) {
      messageStore.addMessage(payload);
    } else {
      showNotification(payload.content);
    }
  }

  function showNotification(message: string) {
    toast.add({
      title: 'New message received',
      description: message,
    });
  }

  return {
    setupMessageSubscription,
    setupConversationSubscription,
  };
} 