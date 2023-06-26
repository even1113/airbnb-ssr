<template>
  <div class="homeLists">
    <div class="home-title">
      <h2 class="title">主标题</h2>
      <p class="sub-title">副标题</p>
    </div>
    <ul class="home-list">
      <!-- <li v-for="(item, index) in store.state.roomList" :key="index">
        <img :src="item.pictureUrl" :alt="item.title" />
        <p class="list-title">{{ item.title }}</p>
        <p class="list-price">￥{{ item.price }}</p>
      </li> -->
      <li v-for="(item, index) in 6" :key="index">
        <img src="@/assets/images/login/changeLang.png" alt="" />
        <p class="list-title">qwe</p>
        <p class="list-price">qwe</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store/auth'

export default defineComponent({
  setup() {
    const store = useStore()
    console.log('homelist-----------')
    return { store }
  },

  // asyncData({ store, route }: any) {
  //   console.log('asyncData---', store, route)
  //   return store.dispatch('getRoomList')
  // },
  asyncData() {},
})
</script>

<style lang="scss" scoped></style>
