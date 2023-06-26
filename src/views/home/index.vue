<template>
  <div class="home">
    <img class="bg" src="@/assets/images/home/bannerImg.jpg" alt="" />
    <!-- 房屋列表   -->
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const roomList = storeToRefs(userStore)
    console.log(roomList)

    return { userStore }
  },

  asyncData({ pinia, route }: any) {
    // 这里实际返回的是个promise
    return pinia.dispatch('getRoomList')
  },
})
</script>

<style lang="scss" scoped>
.home {
  img {
    width: 100%;
    height: 100%;
  }

  .homeLists {
    .home-title {
      @include main-wapper();
    }
    .home-list {
      @include main-wapper();
      @include flex-layout(row, flex-start, center);
    }
  }
}
</style>
