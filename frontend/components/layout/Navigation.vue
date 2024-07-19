<template>
  <div class="border-b border-b-accent-1">
    <nav
      class="container bg-primary flex items-center justify-between flex-wrap bg-teal p-6 text-accent-1"
    >
      <div class="flex items-center flex-no-shrink">
        <nuxt-link to="/">
          <img src="~/assets/logo.svg" alt="BPM Logo" class="h-8 mr-2" />
        </nuxt-link>
      </div>
      <div class="block md:hidden">
        <button
          @click="showResponsiveMenu = !showResponsiveMenu"
          class="flex items-center px-2 py-2 border text-teal-lighter border-teal-light hover:text-white hover:border-white"
        >
          <svg
            class="h-3 w-3 stroke-current fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        v-if="showResponsiveMenu || isMedium"
        class="w-full block flex-grow md:flex md:items-center md:w-auto"
      >
        <div class="text-sm md:flex-grow">
          <nuxt-link
            to="/projects"
            class="border-x border-accent-1 block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white px-2"
          >
            Projects
          </nuxt-link>
          <nuxt-link
            to="/blog"
            class="border-r border-accent-1 px-2 block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white"
          >
            Blog
          </nuxt-link>
        </div>
        <div>
          <a
            href="https://wug.ge"
            @click="showContactModal = true"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 md:mt-0"
            >Contact</a
          >
          <index-contact-modal
            :hidden="!showContactModal"
            @close="showContactModal = false"
          >
            <template #header> Contact me </template>
            <index-contact-form />
          </index-contact-modal>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const showResponsiveMenu = ref(false);
const isMedium = ref(true);
const showContactModal = ref(false);

onMounted(() => {
  if (process.client) {
    window.addEventListener("resize", checkIsWindowMedium);
    checkIsWindowMedium();
  }
});

const checkIsWindowMedium = () => {
  isMedium.value = window.outerWidth >= 768;
};
</script>
