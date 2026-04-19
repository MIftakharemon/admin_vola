import {
  GET_HOST,
  BLOCK_UNBLOCK_SWITCH
} from "./type";

//   import { baseURL, key } from "../../util/Config";
import { apiInstanceFetch } from "../../util/api";
import { Toast } from "../../util/Toast";
import axios from 'axios';


export const getHost = (start, limit, search, rcoin) => (dispatch) => {
  apiInstanceFetch
    .get(
      `host?start=${start}&limit=${limit}&search=${search}` + (rcoin ? `&rcoin=${rcoin}` : '')
    )
    .then((res) => {

      if (res.status) {

        dispatch({
          type: GET_HOST,
          payload: {
            data: res.user,
            total: res.total
          },
        });
      } else {
        Toast("error", res.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const handleBlockUnblockSwitch = (userId) => (dispatch) => {
  axios
    .patch(`user/blockUnblock/${userId}`)
    .then((res) => {
      if (res.status) {
        dispatch({ type: BLOCK_UNBLOCK_SWITCH, payload: res.host });
      } else {
        Toast("error", res.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};








