import http from "@/components/lib/http";
import { FanpageCreate } from "../types/fanpage-create.type";
import { FanpageUpdate } from "../types/fanpage-update.type";
const BASE_URL = "http://localhost:3000/page";

export const findAllFanpage = async () => {
  const response = await http.get(`${BASE_URL}/list`);
  return response.payload;
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

export const saveFanpage = (fanpageCreate: FanpageCreate) => {
  http
    .post(BASE_URL, fanpageCreate)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateFanpage = (
  fanpageId: number,
  fanpageUpdate: FanpageUpdate
) => {
  http
    .put(`${BASE_URL}/update/${fanpageId}`, fanpageUpdate)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const deleteFanpage = (fanpageId: number) => {
  http
    .delete(`${BASE_URL}/delete/${fanpageId}`)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
