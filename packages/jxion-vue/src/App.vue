<template>
  <div class="app">
    <Hero
      title="Jxion Framework"
      subtitle="Vue Integration"
      description="Build scalable applications with our professional component library. Now with Vue support and tRPC backend integration."
      cta-text="Start Building"
      stats-value="100%"
      stats-label="Type Safe"
      card-subtitle="Trusted by developers worldwide"
      :on-cta-click="handleCtaClick"
    />

    <div class="backend-demo">
      <h2>Backend Integration Demo</h2>

      <div v-if="isLoading" class="loading">Loading...</div>

      <div v-if="error" class="error">Error: {{ error }}</div>

      <div v-if="greeting" class="greetings">
        <h3>Greetings from Backend:</h3>
        <p>{{ greeting.message }}</p>
      </div>

      <div class="messages-section">
        <h3>Messages ({{ messages.length }})</h3>
        <div class="messages">
          <div v-for="message in messages" :key="message.id" class="message">
            <strong>{{ message.user }}:</strong> {{ message.message }}
          </div>
        </div>

        <div class="add-message">
          <h4>Add New Message</h4>
          <input
            v-model="newMessage.user"
            placeholder="User name"
            class="input"
          />
          <textarea
            v-model="newMessage.message"
            placeholder="Message"
            class="textarea"
          ></textarea>
          <button @click="handleAddMessage" class="button">Add Message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Hero from "./components/Hero.vue";
import { messageService, greetingService } from "@jxion/core";

const messages = ref<Array<{ id: string; user: string; message: string }>>([]);
const greeting = ref<{ message: string } | null>(null);
const isLoadingMessages = ref(false);
const isLoadingGreeting = ref(false);
const messagesError = ref<string | null>(null);
const greetingError = ref<string | null>(null);

const newMessage = ref({ user: "", message: "" });

const fetchMessages = async () => {
  try {
    isLoadingMessages.value = true;
    messagesError.value = null;
    const data = await messageService.getMessages();
    messages.value = data;
  } catch (err: any) {
    messagesError.value = err?.message ?? "Failed to fetch messages";
  } finally {
    isLoadingMessages.value = false;
  }
};

const fetchGreeting = async () => {
  try {
    isLoadingGreeting.value = true;
    greetingError.value = null;
    const data = await greetingService.getGreeting();
    greeting.value = data;
  } catch (err: any) {
    greetingError.value = err?.message ?? "Failed to fetch greeting";
  } finally {
    isLoadingGreeting.value = false;
  }
};

const addMessage = async (user: string, message: string) => {
  await messageService.addMessage(user, message);
  await fetchMessages();
};

const handleAddMessage = async () => {
  if (!newMessage.value.user || !newMessage.value.message) return;
  await addMessage(newMessage.value.user, newMessage.value.message);
  newMessage.value = { user: "", message: "" };
};

const handleCtaClick = () => {
  console.log("CTA clicked!");
};

onMounted(() => {
  fetchGreeting();
  fetchMessages();
});

const isLoading = computed(
  () => isLoadingMessages.value || isLoadingGreeting.value
);
const error = computed(() => messagesError.value || greetingError.value);
</script>

<style scoped>
/* All styling comes from @jxion-design SCSS modules. */
</style>
