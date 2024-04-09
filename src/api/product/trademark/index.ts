import request from "@/utils/request";
import type {
  TrademarkResponseData,
  responseTrademark,
} from "@/api/product/trademark/type";
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  SAVE_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  );

//添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: responseTrademark) => { 
  //修改已有品牌的数据
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  } else {
    //新增品牌
    return request.post<any, any>(API.SAVE_TRADEMARK_URL, data);
  }
};
