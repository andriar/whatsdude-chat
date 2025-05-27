import { defineStore } from 'pinia'

interface IParticipant {
  user_id: string
  conversation_id: number
}

interface IUserProfile {
  user_id: string
  name: string
  avatar: string
}

export const useConversationsParticipantsStore = defineStore('conversationsParticipants', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const conversationParticipants = ref(new Map<number, IUserProfile>())
  const loadingParticipants = ref(false)

  async function fetchParticipantsByConversationIds(conversationIds: number[]) {
    if (!conversationIds.length) return
    
    try {
      loadingParticipants.value = true

      // Get participants excluding current user
      const { data: participantsData, error: participantsError } = await supabase
        .from('conversation_participants')
        .select('user_id, conversation_id')
        .in('conversation_id', conversationIds)
        .neq('user_id', user.value?.id)

      if (participantsError) throw participantsError

      const userIds = participantsData.map((item: IParticipant) => item.user_id)
      if (!userIds.length) return

      // Get user profiles for participants
      const { data: userData, error: userError } = await supabase
        .from('user_profiles')
        .select('user_id, name, avatar')
        .in('user_id', userIds)

      if (userError) throw userError
      if (!userData) return

      // Create lookup map for conversation IDs
      const userToConversationMap = new Map(
        participantsData.map((p: IParticipant) => [p.user_id, p.conversation_id])
      )

      // Combine user data with conversation IDs
      // Create a Map with conversation_id as key and participant data as value
      conversationParticipants.value = userData.reduce((map: Map<number, IUserProfile>, user: IUserProfile) => {
        const conversationId = userToConversationMap.get(user.user_id) as number;
        map.set(conversationId, {
          ...user,
        });
        return map;
      }, new Map<number, IUserProfile>());

    } catch (error) {
      console.error('Error in fetchParticipantsByConversationIds:', error)
    } finally {
      loadingParticipants.value = false
    }
  }

  return {
    conversationParticipants,
    loadingParticipants,
    fetchParticipantsByConversationIds
  }
})
