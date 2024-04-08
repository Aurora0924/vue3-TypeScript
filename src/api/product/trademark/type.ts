export interface responseData {
  message: string;
  code: number;
  ok: boolean;
}

export interface responseTrademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}
export type responseTrademarkList = responseTrademark[];

export interface TrademarkResponseData extends responseData {
  data: {
    records: responseTrademarkList;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
