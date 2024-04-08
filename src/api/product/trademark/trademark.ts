import request from "@/utils/request";
import type { TrademarkResponseData } from "@/api/product/model/trademarkModel";
enum API {
  TRAEDMARK_URL = "/admin/product/baseTrademark/",
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRAEDMARK_URL + `${page}/${limit}`,
  );
