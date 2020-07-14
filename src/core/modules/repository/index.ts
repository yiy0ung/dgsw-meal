import axios from "axios";
import { neisDgInfo, dgswData } from "../../libs/env";
import { fullZero } from "../../libs/utils";

// Get Session Id from EDU
export async function getSessionId() {
  return axios.get(`https://${neisDgInfo.host}/${neisDgInfo.main}`, {
    withCredentials: true,
  }).then((res) => {
    const cookie = res.headers['set-cookie'];
  
    if (!cookie && !Array.isArray(cookie)) {
      return [new Error('Cannot find permission'), null] as [Error, null];
    }

    // Find session id from Cookie
    const jsessionId = cookie.join('').match(/JSESSIONID=(.*?);/);

    if (!jsessionId) {
      return [new Error('Cannot find json session id'), null] as [Error, null];
    }

    return [null, jsessionId[0]] as [null, string];
  }).catch(error => [error, null] as [Error, null]);
}


// Get meal row data
type GetMealRowResult = {
  error: (Error|null);
  mealRow: (any|null);
};
export function getMealRow(
  jsessionId: string, 
  year: number, 
  month: number
): Promise<GetMealRowResult> {
  return axios.post(`https://${neisDgInfo.host}/${neisDgInfo.mealUrl}`, {
    ay: year,
    mm: fullZero(month, 2),
    schulCode: dgswData.schulCode,
    schulCrseScCode: dgswData.schulCrseScCode,
    schulKndScCode: fullZero(dgswData.schulCrseScCode, 2),
  }, {
    headers: {
      Cookie: jsessionId,
    },
  }).then(resp => {
    const { data } = resp;
    if (data.result?.status !== 'success') {
      return {
        error: new Error('Meal Data is not normal response'),
        mealRow: null,
      };
    }

    return {
      error: null,
      mealRow: data.resultSVO,
    };
  }).catch(error => {
    return {
      error,
      mealRow: null,
    };
  });
}
