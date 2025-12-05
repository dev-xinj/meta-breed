import http from "@/components/lib/http";
import { AccountCreate } from "../types/account-create.type";
import {
  ResponseData,
  ResponseDataSchema,
} from "@/app/fanpages/schemas/response.schema";
import { AccountUpdate } from "../types/account-update.type";
const BASE_URL = "http://localhost:3000/account";
export const saveAccount = async (
  accountCreate: AccountCreate
): Promise<ResponseData> => {
  const response = await http.post(BASE_URL, accountCreate);
  return ResponseDataSchema.parse(response.payload);
};

export const updateAccount = async (
  id: number,
  accountUpdate: AccountUpdate
): Promise<ResponseData> => {
  const response = await http.post(`${BASE_URL}/update/${id}`, accountUpdate);
  return ResponseDataSchema.parse(response.payload);
};

export const findAllAccount = async (): Promise<ResponseData> => {
  const response = await http.get(`${BASE_URL}/list`);
  return ResponseDataSchema.parse(response.payload);
};

export const findOneAccount = async (id: number): Promise<ResponseData> => {
  const response = await http.get(`${BASE_URL}/detail/${id}`);
  return ResponseDataSchema.parse(response.payload);
};
