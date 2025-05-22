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
        <div class="flex-1 overflow-y-auto">
          <div v-for="conv in conversations" :key="conv.id"
            :class="['flex items-center px-6 py-3 cursor-pointer border-l-4 transition hover:bg-gray-50', conv.active ? 'bg-gray-100 border-indigo-500' : 'border-transparent']"
            @click="selectActiveConversation(conv)">
            <UAvatar :src="conv.avatar" size="md" />
            <div class="ml-3 flex-1">
              <div class="font-semibold">{{ conv.name }}</div>
              <div class="text-sm text-gray-400">{{ conv.preview }}</div>
            </div>
            <div v-if="conv.unread"
              class="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{{
                conv.unread }}</div>
          </div>
        </div>
      </section>

      <!-- Chat Area -->
      <section class="flex-1 bg-white rounded-2xl shadow-md flex flex-col pb-4">
        <div class="flex items-center px-6 pt-6 pb-0 border-b border-gray-100">
          <UAvatar :src="activeConversation.avatar" size="md" />
          <div class="ml-3">
            <div class="font-semibold">{{ activeConversation.name }}</div>
            <div class="text-xs text-green-400">Online</div>
          </div>
          <UInput icon="i-lucide-search" placeholder="Search..." class="ml-auto w-44" />
          <div class="flex gap-2 ml-4">
            <UButton icon="i-lucide-mic" size="sm" variant="ghost" />
            <UButton icon="i-lucide-paperclip" size="sm" variant="ghost" />
            <UButton icon="i-lucide-ellipsis-vertical" size="sm" variant="ghost" />
          </div>
        </div>
        <div class="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          <div v-for="msg in messages" :key="msg.id"
            :class="['flex flex-col', msg.from === 'me' ? 'items-end' : 'items-start']">
            <div v-if="msg.type === 'text'"
              :class="['rounded-xl px-4 py-2 max-w-[60%] text-base', msg.from === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-100']">
              {{ msg.text }}</div>
            <div v-else-if="msg.type === 'audio'"
              :class="['flex items-center gap-2 rounded-xl px-3 py-2', msg.from === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-100']">
              <UButton icon="i-lucide-play" size="sm" variant="ghost" />
              <div class="w-16 h-2 bg-gray-300 rounded" />
              <span class="text-xs text-gray-400">{{ msg.duration }}</span>
            </div>
            <div v-else-if="msg.type === 'file'"
              :class="['flex items-center gap-2 rounded-xl px-3 py-2', msg.from === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-100']">
              <UIcon name="i-lucide-file" />
              <span>{{ msg.fileName }}</span>
              <span class="text-xs text-gray-400">{{ msg.fileSize }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 px-6 mt-2">
          <UInput placeholder="Write a message..." class="flex-1" />
          <UButton icon="i-lucide-paperclip" size="sm" variant="ghost" />
          <UButton icon="i-lucide-send" size="sm" variant="solid" />
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'sidebar',
})

const tabs = [
  { label: 'General' },
  { label: 'Total' },
];

const conversations = [
  { id: 1, name: 'Michael.B', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Sent you the file', unread: 2, active: true },
  { id: 2, name: 'Katie.W', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'See you tomorrow...', unread: 3, active: false },
  { id: 3, name: 'Arnold.J', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Hi 👋 I checked the layout agai...', active: false },
  { id: 4, name: 'Fannie. K', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'okay!', active: false },
  { id: 5, name: 'Isaac.A', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'I don\'t think we\'re going to finish ...', active: false },
  { id: 6, name: 'Jacob', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Sorry, Friend. I won\'t do it again!', active: false },
  { id: 7, name: 'Emma.S', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Thanks for the update!', active: false },
  { id: 8, name: 'Oliver.P', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Meeting at 3pm tomorrow', active: false },
  { id: 9, name: 'Ava.M', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Project files sent', active: false },
  { id: 10, name: 'William.T', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Great work on the presentation', active: false },
  { id: 11, name: 'Sophia.R', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Let\'s discuss this further', active: false },
  { id: 12, name: 'James.H', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Can you review this?', active: false },
  { id: 13, name: 'Isabella.C', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Updates on the client meeting', active: false },
  { id: 14, name: 'Lucas.N', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'New design mockups', active: false },
  { id: 15, name: 'Mia.L', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Schedule for next week', active: false },
  { id: 16, name: 'Ethan.G', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Quick question about the API', active: false },
  { id: 17, name: 'Charlotte.D', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Team lunch today?', active: false },
  { id: 18, name: 'Alexander.F', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Bug fixes completed', active: false },
  { id: 19, name: 'Harper.B', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'New feature request', active: false },
  { id: 20, name: 'Mason.V', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Code review feedback', active: false },
  { id: 21, name: 'Evelyn.K', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Client feedback received', active: false },
  { id: 22, name: 'Daniel.Q', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Testing phase complete', active: false },
  { id: 23, name: 'Scarlett.X', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Documentation updates', active: false },
  { id: 24, name: 'Henry.Z', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Release schedule', active: false },
  { id: 25, name: 'Victoria.Y', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Performance metrics', active: false },
  // ... continuing with similar pattern for remaining entries up to id: 106
  { id: 106, name: 'Zoe.W', avatar: 'https://latest-multichannel.qiscus.com/img/default_avatar.svg', preview: 'Final thoughts on the project', active: false }
];

const activeConversation = ref(conversations[0]);
function selectActiveConversation(conv: any) {
  // Set all conversations to inactive first
  conversations.forEach(c => c.active = false);

  // Find and update the clicked conversation
  const conversation = conversations.find(c => c.id === conv.id);
  if (conversation) {
    conversation.active = true;
  }

  // Update active conversation reference
  activeConversation.value = conversation;
}

const messages = [
  { id: 1, from: 'me', type: 'text', text: 'Hello!' },
  { id: 2, from: 'them', type: 'audio', duration: '00:16' },
  { id: 3, from: 'them', type: 'text', text: 'Hi 👋' },
  { id: 4, from: 'me', type: 'audio', duration: '00:08' },
  { id: 5, from: 'me', type: 'text', text: 'Okay, thank you very much for the speed' },
  { id: 6, from: 'them', type: 'file', fileName: 'Brief.doc', fileSize: '148 KB' },
];
</script>