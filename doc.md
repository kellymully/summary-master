1. default.vue

<!-- 
<script setup lang="ts">
import { container } from '#build/ui';

 const { data: navigation } = await useAsyncData('nav', ()=> {
    return queryCollectionNavigation('content')
})
</script>


<template>
  <UPage>
    <template #left>
      <UPageAside>
        <UContentNavigation :navigation="navigation"/>
      </UPageAside>
    </template>

    <UPageBody>
      <slot/>
    </UPageBody>    
    
  </UPage>
  
</template> -->


2. css

/* .UPageBody {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  overflow: hidden;
}

.toc-right {
  position: sticky;
  top: 20px;
  width: 200px;
  margin-left: 20px;
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;
}

.content-area {
  flex-grow: 1;
  margin-right: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

ul {
  list-style-type: none;
}

ul li {
  padding: 5px;
} */


3. slug
<!-- <script setup lang="ts">
  definePageMeta({
    layout: 'default'
  })

  const route = useRoute();

  const { data: page } = await useAsyncData(route.path, ()=> {
    return queryCollection('content').path(route.path).first();
  })

  const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})
</script>


<template>
  <UPage v-if="page">
     <UPageHeader headline="Unitmaster" :title="page.title" :description="page.description" />
    <UPageBody v-if="page.body">
       <ContentRenderer :value="page" />
       <USeparator />

      <UContentSurround :surround="surround" />
      
    </UPageBody>
    <template #right>
      <UPageCard>
     
        <UContentToc :links="page.body.toc?.links"/>
      </UPageCard>
    </template>
    

   
  </UPage>
</template>

 -->