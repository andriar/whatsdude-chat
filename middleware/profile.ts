import { useProfileStore } from '~/stores/profile';

export default defineNuxtRouteMiddleware(async to => {
  const profileStore = useProfileStore();

  // Skip middleware for login and profile-setup routes
  if (to.path === '/login' || to.path === '/profile-setup') {
    return;
  }

  if (profileStore.profile) {
    return;
  }

  await profileStore.fetchProfile();

  if (!profileStore.profile) {
    return navigateTo('/profile-setup');
  }
});
