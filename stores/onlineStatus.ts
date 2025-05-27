import { defineStore } from 'pinia'

interface OnlineUser {
  user_id: string
  online_at: string
}

interface PresenceState {
  [key: string]: OnlineUser[]
}

export const useOnlineStatusStore = defineStore('onlineStatus', () => {
  // state
  const onlineUsers = ref(new Map<string, OnlineUser>())

  // getters
  const isUserOnline = computed(() => (userId: string) => {
    return onlineUsers.value.has(userId)
  })

  const getOnlineUsers = computed(() => {
    return Array.from(onlineUsers.value.values())
  })

  // actions
  function updatePresenceState(presenceState: PresenceState) {
    onlineUsers.value.clear()
    Object.values(presenceState).forEach((users) => {
      users.forEach((user) => {
        onlineUsers.value.set(user.user_id, user)
      })
    })
  }

  function addUser(user: OnlineUser) {
    onlineUsers.value.set(user.user_id, user)
  }
  function removeUser(userId: string) {
    if (onlineUsers.value.has(userId)) {
      onlineUsers.value.delete(userId)
    }
  }

  function formatLastSeen(timestamp: string | null): string {
    if (!timestamp) return 'unknown'
    
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  return {
    // state
    onlineUsers,
    // getters
    isUserOnline,
    getOnlineUsers,
    // actions
    updatePresenceState,
    addUser,
    removeUser,
    formatLastSeen,
  }
}) 