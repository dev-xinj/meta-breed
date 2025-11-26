export type Account = {
  id: string;
  accId: string;
  namePage: string;
  status: 'processing' | 'idle' | 'expired_access_token'
};