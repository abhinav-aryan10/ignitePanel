/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
// import exploreWPSUsefulData1 from '../services/';
import { baseURL, version } from './BaseUrl'
// import { version as applicationVersion } from '../../../release/app/package.json';

// const Baseurl = 'http:/localhost:3000/' ;

// const etag = localStorage.getItem('Etag');

// const options = {
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// };

let option: any

export default function getExploreWpsDetails() {
  // if (serveFromMockoon) {
  //   return BaseUrl.get('api/v3/explorewps', options).then((res) =>
  //     exploreWPSUsefulData1(res.data)
  //   );
  // }
  option = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'security-code': 'hatch_development',
      // 'app-version': applicationVersion,
      'product-short-name': 'IGT'
      // 'If-None-Match': `${etag}`,
    }
  }
  return axios.get(`${baseURL}/${version}/explorewps`, option)
  // .then((res) => exploreWPSUsefulData1(res.data));

  // return res = await axios.get(`${baseURL}/${version}/explorewps`, option);
  // // if (res.status === 200) {
  // //   localStorage.setItem('Etag', res.headers.etag);
  // // }
  // return exploreWPSUsefulData1(res.data);
}
