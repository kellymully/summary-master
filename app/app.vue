
<!-- <template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template> -->


<template>
  <Html class="dark">
    <Body class="bg-background text-foreground">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>


<!-- searchabr -->
<script setup lang="ts">
const { data: navigation } = await useAsyncData('nav', () => {
  return queryCollectionNavigation('content')
})

const searchTerm = ref('')            
const isSearchOpen = ref(false)         
const searchResults = ref<any[]>([])    

const router = useRouter()


const allPages = computed(() => {
  const items = navigation.value ?? []
  const flat: any[] = []

  const walk = (list: any[]) => {
    for (const item of list) {
      flat.push(item)
      if (item.children) {
        walk(item.children)
      }
    }
  }

  walk(items as any[])
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

  
  searchResults.value = allPages.value.filter((item) =>
    item.title?.toLowerCase().includes(term)
  )

  
  if (event.key === 'Enter' && searchResults.value[0]) {
    goToResult(searchResults.value[0])
  }
}


const goToResult = (item: any) => {
  isSearchOpen.value = false
  searchTerm.value = ''
  router.push(item._path || item.path || '/')
}


const onSearchBlur = () => {
  setTimeout(() => {
    isSearchOpen.value = false
  }, 150)
}
</script>


