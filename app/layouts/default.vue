<script setup lang="ts">
const { data: navigation } = await useAsyncData('nav', () => {
  return queryCollectionNavigation('content')
})

const searchTerm = ref('')
const isSearchOpen = ref(false)
const searchResults = ref<any[]>([])

const router = useRouter()

const allItems = computed(() => {
  const root = navigation.value ?? []
  const flat: any[] = []

  const walk = (items: any[]) => {
    for (const item of items) {
      flat.push({
        ...item,
        isFolder: item.children && item.children.length > 0,
    
        effectivePath: item._path || item.path || (item.children?.[0]?._path) || '/'
      })
      
    
      if (item.children && item.children.length > 0) {
        walk(item.children)
      }
    }
  }

  walk(root as any[])
  return flat
})

const onSearchKey = (event: KeyboardEvent) => {
  const term = searchTerm.value.toLowerCase().trim()

  if (!term) {
    searchResults.value = []
    isSearchOpen.value = false
    return
  }

  isSearchOpen.value = true

  
  searchResults.value = allItems.value.filter((item) => {
    return item.title?.toLowerCase().includes(term)
  })

  
  if (event.key === 'Enter' && searchResults.value[0]) {
    goToResult(searchResults.value[0])
  }
}

const goToResult = (item: any) => {
  // Don't navigate if it's a folder
  if (item.isFolder) {
    return
  }
  
  isSearchOpen.value = false
  searchTerm.value = ''
  
  
  const targetPath = item.effectivePath || item._path || item.path || '/'
  router.push(targetPath)
}

const onSearchBlur = () => {
  setTimeout(() => {
    isSearchOpen.value = false
  }, 150)
}
</script>

<template>
  <UDashboardGroup class="min-h-screen gap-x-4">
    <UDashboardSidebar
      collapsible
      class="w-64 sidebar-scroll border-r border-gray-800 pr-2"
    >
      <template #header="{ collapsed }">
        <NuxtLink to="/introduction" class="logo-link">
          <img
            v-if="!collapsed"
            src="/images/Wiz global.jpg"
            alt="Unit Master logo"
            class="h-8 w-auto rounded-md logo-image"
          />
          <span v-if="!collapsed" class="font-semibold text-sm logo-text">
            Unit Master
          </span>
        </NuxtLink>
      </template>

      <UContentNavigation :navigation="navigation" :default-open="false" />

      <template #footer>
        <div class="p-3">
          <a
            href="https://tickets.wizglobal.co.ke/login"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <UButton block color="primary" class="support-btn">
              Support Ticket System
            </UButton>
          </a>
        </div>
      </template>
    </UDashboardSidebar>
    
    <UDashboardPanel class="flex flex-col flex-1 pl-4 dashboard-panel">
      <UDashboardNavbar class="pb-3 mb-2 border-b border-gray-800 navbar-improved">
        <template #left>
          <span class="font-semibold text-5xl tracking-tight">
            Unit Master - Documentation
          </span>
        </template>

        <template #right>
          <div class="relative w-64 search-input">
            <UInput
              v-model="searchTerm"
              icon="i-lucide-search"
              placeholder="Search pages..."
              class="w-full"
              @focus="isSearchOpen = true"
              @keydown="onSearchKey"
              @blur="onSearchBlur"
            />

            <div
              v-if="isSearchOpen && searchResults.length"
              class="absolute left-0 mt-2 w-full max-h-80 overflow-y-auto search-dropdown"
            >
              <button
                v-for="item in searchResults"
                :key="item._path || item.title"
                class="search-result-item w-full text-left"
                :class="{ 'disabled': item.isFolder }"
                @mousedown.prevent="goToResult(item)"
              >
                <UIcon
                  v-if="item.isFolder"
                  name="i-lucide-folder"
                  class="result-icon result-icon-folder w-4 h-4"
                />
                <UIcon
                  v-else
                  name="i-lucide-file-text"
                  class="result-icon result-icon-file w-4 h-4"
                />
                <span class="result-title text-sm">{{ item.title }}</span>
                <span v-if="item.isFolder" class="result-badge">
                  Folder
                </span>
              </button>
            </div>
            
            <!-- Message when no results -->
            <div
              v-if="isSearchOpen && searchTerm && !searchResults.length"
              class="absolute left-0 mt-2 w-full rounded-xl border border-gray-700 bg-slate-900 shadow-xl z-50 p-4"
            >
              <p class="text-sm text-gray-400">No results found for "{{ searchTerm }}"</p>
            </div>
          </div>
        </template>
      </UDashboardNavbar>

      <UDashboardBody class="flex-1 overflow-y-auto py-8">
        <slot />
      </UDashboardBody>
    </UDashboardPanel>
  </UDashboardGroup>
</template>