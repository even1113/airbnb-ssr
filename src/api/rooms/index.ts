import { http } from '@/utils/http'
import { IResult, IRoomDetailParams, IRoomListParams } from '../interface'

// 真实接口：获取房源列表
export function fetchRoomListAPI(): Promise<IResult> {
  return http.httpRequestGet(
    'http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=3',
    {}
  )
}

// export function fetchRoomListAPI(params: IRoomListParams): Promise<IResult> {
//   return http.get('/api/room/room/getRoomList', { params })
// }

// 真实接口：获取单个房源
// export function fetchRoomDetailsAPI(
//   params: IRoomDetailParams
// ): Promise<IResult> {
//   return http.get('/api/room/room/getRoomDetail', { params })
// }
