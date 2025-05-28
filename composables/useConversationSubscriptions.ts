import { useSupabaseClient, useToast } from '#imports';
import type { Database } from '~/types/database.types';
import { useConversationsStore } from '~/stores/inbox/conversations';
import { useMessagesStore } from '~/stores/inbox/messages';

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

  function handleNewMessage(payload: Message) {
    conversationsStore.updateLastMessage(payload.conversation_id, payload.content);

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