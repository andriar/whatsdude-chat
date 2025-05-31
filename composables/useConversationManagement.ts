import type { Database } from '~/types/database.types';

type Conversation = Database['public']['Tables']['conversations']['Insert'];
type ConversationParticipant = Database['public']['Tables']['conversation_participants']['Insert'];

export function useConversationManagement() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const authId = user.value?.id;

  async function createNewConversation(targetUserId: string) {
    if (!authId) {
      console.error('User not authenticated');
      return;
    }

    const { data: conversationData, error } = await supabase
      .from('conversations')
      .insert({
        is_group: false,
        name: null,
        created_by: authId,
      } satisfies Conversation)
      .select()
      .single();

    if (error) {
      console.error('Error creating new conversation:', error);
      return;
    }

    if (!conversationData) return;

    // Check if conversation_id already exists in conversation_participants
    const { data: existingParticipant } = await supabase
      .from('conversation_participants')
      .select()
      .eq('conversation_id', conversationData.id)
      .single();

    if (existingParticipant) return conversationData
    
    const participants: ConversationParticipant[] = [
      { conversation_id: conversationData.id, user_id: authId },
      { conversation_id: conversationData.id, user_id: targetUserId },
    ];

    for (const participant of participants) {
      await supabase
        .from('conversation_participants')
        .insert(participant satisfies ConversationParticipant);
    }

    console.info('Success Create New conversation:', conversationData);

    return conversationData;
  }

  return {
    createNewConversation,
  };
}
