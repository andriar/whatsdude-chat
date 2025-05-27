import { useSupabaseClient } from '#imports'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { ref, onUnmounted } from 'vue'
import { useOnlineStatusStore } from '~/stores/onlineStatus'

interface PresencePayload {
  user_id: string
  online_at: string
}

export const usePresence = () => {
  const supabase = useSupabaseClient()
  const onlineStatusStore = useOnlineStatusStore()
  const channel = ref<RealtimeChannel | null>(null)

  const trackPresence = async (userId: string) => {
    // Create a presence channel
    channel.value = supabase.channel('online-users', {
      config: {
        presence: {
          key: userId,
        },
      },
    })

    // Subscribe to presence changes
    channel.value
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.value?.presenceState()
        if (presenceState) {
          console.log('sync', presenceState)
          onlineStatusStore.updatePresenceState(presenceState)
        }
      })
      .on('presence', { event: 'join' }, ({ newPresences }: { newPresences: PresencePayload[] }) => {
        newPresences.forEach((presence) => {
          onlineStatusStore.addUser({
            user_id: presence.user_id,
            online_at: presence.online_at
          })
        })
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }: { leftPresences: PresencePayload[] }) => {
        console.log('leftPresences', leftPresences)
        leftPresences.forEach((presence) => {
          onlineStatusStore.removeUser(presence.user_id)
        })
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          // Track presence
          await channel.value?.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          })
        }
      })
  }

  const untrackPresence = async () => {
    if (channel.value) {
      await channel.value.unsubscribe()
      await channel.value.untrack()
      channel.value = null
    }
  }

  onUnmounted(() => {
    untrackPresence()
  })

  return {
    trackPresence,
    untrackPresence,
  }
} 