import axios from 'axios';
import { Toast } from '../../util/Toast';

import { GET_REPORTED_USER } from './types';
import { apiInstanceFetch } from '../../util/api';

export const getReportedUser =
  ({ start, limit }) =>
  (dispatch) => {
    apiInstanceFetch
      .get(`report?start=${start}&limit=${limit}`)
      .then((res) => {
        if (res.status) {
          dispatch({
            type: GET_REPORTED_USER,
            payload: { report: res.report, total: res.total },
          });
        } else {
          Toast('error', res.message);
        }
      })
      .catch((error) => Toast('error', error.message));
  };
