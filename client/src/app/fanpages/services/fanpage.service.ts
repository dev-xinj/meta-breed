import http from "@/components/lib/http";
import { ResponseData, ResponseDataSchema } from "../schemas/response.schema";
import { FanpageCreate } from "../types/fanpage-create.type";
import { FanpageUpdate } from "../types/fanpage-update.type";
const BASE_URL = "http://localhost:3000/page";

export const findAllFanpage = async () => {
  const response = await http.get(`${BASE_URL}/list`);
  const fanpages = ResponseDataSchema.parse(response.payload);
  return fanpages;
};

export const findOneFanpage = (fanpageId: number) => {
  http
    .get(`${BASE_URL}/detail/${fanpageId}`)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const saveFanpage = async (
  fanpageCreate: FanpageCreate
): Promise<ResponseData> => {
  const response = await http.post(BASE_URL, fanpageCreate);
  return ResponseDataSchema.parse(response.payload);
};

export const updateFanpage = async (
  fanpageId: number,
  fanpageUpdate: FanpageUpdate
): Promise<ResponseData> => {
  const response = await http.patch(
    `${BASE_URL}/update/${fanpageId}`,
    fanpageUpdate
  );
  return ResponseDataSchema.parse(response.payload);
};
export const deleteFanpage = async (
  fanpageId: number
): Promise<ResponseData> => {
  const response = await http.delete(`${BASE_URL}/delete/${fanpageId}`);
  return ResponseDataSchema.parse(response.payload);
};
