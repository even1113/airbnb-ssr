import { fetchRoomDetailsAPI, fetchRoomListAPI } from '@/api/rooms'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    rooms: [
      {
        id: 0,
        cityCode: '',
        detail: {},
        pictureUrl: '',
        price: 0,
        title: '',
      },
    ],
    roomDetails: {
      imgs: [],
      title: '',
      info: {
        room: 0,
        bed: 0,
        toilet: 0,
        liveNumber: 0,
        remarks: 0,
        metro: false,
        parking: false,
        luggage: false,
        goodOwner: false,
      },
      owner: {
        avatar: '',
        name: '',
        introduce: '',
        certify: false,
      },
      price: 0,
    },
    cityCode: 'hz',
    currentPage: 1,
    pageSize: 6,
    total: 100,
    form: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    dropdownVisible: false,
    sharePopupVisible: false,
  }),
  getters: {},
  actions: {
    async getRooms() {},
  },
})
