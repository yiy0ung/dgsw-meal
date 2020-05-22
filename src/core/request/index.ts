import Axios, { AxiosInstance } from 'axios';
import { fullZero } from '../utils';
import { neisDgInfo, dgswData } from '../seed/data';

export function generateEndpoint(cors: boolean = false) {
  const url = cors ? '' : `https://${neisDgInfo.host}`;

  return Axios.create({
    baseURL: url,
  });
}

export function getSessionId(axios: AxiosInstance) {
  return axios.get(`/${neisDgInfo.main}`, {
    withCredentials: true,
  }).then((res) => {
    const cookie = res.headers['set-cookie'];
  
    if (!cookie && !Array.isArray(cookie)) {
      throw new Error('Cannot find permission');
    }

    const jsessionId = cookie.join('').match(/JSESSIONID=(.*?);/);

    if (!jsessionId) {
      throw new Error('Cannot find json session id');
    }

    return {
      status: 'success',
      message: null,
      data: jsessionId[0],
    };
  }).catch(error => ({
    status: 'error',
    message: error.message,
    data: null,
  }));
}

export async function getMealRow(axios: AxiosInstance, {
  jsessionId, year, month,
}: { jsessionId: string, year: number, month: number }) {
  try {
    const { data } = await axios.post(`/${neisDgInfo.mealUrl}`, {
      ay: year,
      mm: fullZero(month, 2),
      schulCode: dgswData.schulCode,
      schulCrseScCode: dgswData.schulCrseScCode,
      schulKndScCode: fullZero(dgswData.schulCrseScCode, 2),
    }, {
      headers: {
        Cookie: jsessionId,
      },
    });

    if (data.result?.status !== 'success') {
      return null;
    }

    return data.resultSVO;
  } catch (error) {
    throw error;
  }
}
