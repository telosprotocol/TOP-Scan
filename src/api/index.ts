import { get, post } from "./request";

// punish list
export function punishPage(body: any) {
  return post("/v1/node/punish/page", { body });
}

// tx list
export function txPage(body: any) {
  return post("/v1/tx/page", { body });
}

// tx details
export function txDetails(txHash: string) {
  return get(`/v1/tx/${txHash}`);
}

export function accountPage(body: any) {
  return post("/v1/account/page", { body });
}

export function accountStat() {
  return get("/v1/account/stat");
}

export function accountDetail(address: string) {
  return get(`/v1/account/${address}`);
}

export function blockPage(body: any) {
  return post(`/v1/block/page?current=${body.current}&size=${body.size}`, { body });
}

export function blockStat() {
  return get("/v1/block/stat");
}

export function blockDetails(owner: string, height: string) {
  return get(`/v1/block/${owner}/${height}`);
}

export function shardList() {
  return get(`/v1/shard/list`);
}
export function globalData() {
  return get(`/v1/home/global`);
}
export function transactionStatistics() {
  return get(`/v1/tx/statistics`);
}
export function transactionStatisticsEVM() {
  return get(`/v1/tx/evm/statistics`);
}
export function accountStatistics() {
  return get(`/v1/account/statistics`);
}

export function nodeStatistics() {
  return get(`/v1/node/stake/stat`);
}

export function nodeDetail(address: string) {
  return get(`/v1/node/${address}`);
}
export function nodeRoleTypeList(){
  return get(`/v1/node/role_type_list`)
}

export function nodePage(body:any){
  return post(`/v1/node/page`,{body})
}


export function nodeDaliyStatics(body: any) {
  return post(`/v1/node/daily_datas`, { body });
}

export function nodeDaliyRewardStatics(body: any) {
  return post(`/v1/node/daily_reward_change`, { body });
}

export function nodeDaliyJobsStatics(body: any) {
  return post(`/v1/node/daily_workload_change`, { body });
}
