import request from "@/utils/request";
enum API {
  TRAEDMARK_URL = "/admin/product/baseTrademark/",
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get(API.TRAEDMARK_URL + `${page}/${limit}`);
