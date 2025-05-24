<template>
  <div class="flex h-screen bg-gray-100 w-full">
    <!-- Main Content -->
    <main class="flex flex-1 p-8 gap-8">
      <!-- Inbox List -->
      <section class="w-80 bg-white rounded-2xl shadow-md flex flex-col py-6">
        <div class="flex items-center justify-between px-6 pb-4">
          <h2 class="text-xl font-semibold">Inbox</h2>
          <UButton icon="i-lucide-plus" size="sm" variant="ghost" />
        </div>
        <UTabs :items="tabs" class="px-6 pb-4" />
        <RoomListContainer
          :items="conversations"
          :active-conversation="activeConversation"
          @select="selectActiveConversation"
        />
      </section>

      <!-- Chat Area -->
      <ChatContainer
        :active-conversation="activeConversation"
        :messages="messages"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { IMessage } from '@/types/inbox';
import type { IConversation, ITab } from '@/types/inbox';

// import components
import ChatContainer from '@/components/features/inbox/chat/ChatContainer.vue';
import RoomListContainer from '@/components/features/inbox/RoomListContainer.vue';

definePageMeta({
  middleware: ['auth'],
  layout: 'sidebar',
});

const tabs: ITab[] = [{ label: 'General' }, { label: 'Total' }];

onMounted(async () => {
  await fetchConversations();
});
const supabase = useSupabaseClient();

const loadingConversations = ref(false);
const conversations = ref<IConversation[]>([]);
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

  if (!data) return;
  conversations.value = data.map((conv: any, idx: number) => ({
    id: conv.conversation_id,
    name: 'user ' + ++idx,
    avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg',
    preview: conv.last_message,
    last_message_at: formatDateTime(conv.last_message_time),
    unread: 0,
  }));

  if (conversations.value) selectActiveConversation(conversations.value[0]);
  loadingConversations.value = false;
}

const activeConversation = ref<IConversation | null>(null);
function selectActiveConversation(conv: IConversation) {
  if (activeConversation.value?.id === conv.id) return;

  activeConversation.value = conv;
}

// function getMessageConversation(conv: IConversation) {
//   const { data, error } = await supabase.rpc('get_message_conversation', {
//     conversation_id: conv.id,
//   })
// }

function formatDateTime(date: string) {
  const today = new Date();
  const inputDate = new Date(date);

  const isToday = today.toDateString() === inputDate.toDateString();

  if (isToday) {
    return (
      'Today, ' +
      inputDate
        .toLocaleString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/\./g, ':')
    );
  }

  return inputDate
    .toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\./g, ':');
}

const messages: IMessage[] = [
  { id: 1, from: 'me', type: 'text', text: 'Hello!' },
  { id: 2, from: 'them', type: 'audio', duration: '00:16' },
  { id: 3, from: 'them', type: 'text', text: 'Hi 👋' },
  { id: 4, from: 'me', type: 'audio', duration: '00:08' },
  {
    id: 5,
    from: 'me',
    type: 'text',
    text: 'Okay, thank you very much for the speed',
  },
  {
    id: 6,
    from: 'them',
    type: 'file',
    fileName: 'Brief.doc',
    fileSize: '148 KB',
  },
];
</script>
