/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BaseUrl, serveFromMockoon, baseURL, version } from '../services/BaseUrl';
// import { version as applicationVersion } from '../../../release/app/package.json';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
// const userIdToken = localStorage.getItem('userIdToken');
let option: any;

export default function getClassList() {
  if (serveFromMockoon) {
    return BaseUrl.get('/api/v3/getAllClasses/3', options).then(
      (res: any) => res.data
    );
  }
  option = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'security-code': 'hatch_development',
      'product-short-name': 'IGT',
      // 'app-version': applicationVersion,
    },
  };
  return axios
    .get(`${baseURL}/${version}/getAllClasses`, option)
    .then((res) => res.data);
}

export function getClassDetails(classroomId: any) {
  if (serveFromMockoon) {
    return BaseUrl.get('/api/v3/classroom/1', options).then((res: any) => res.data);
  }
  option = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'security-code': 'hatch_development',
      'product-short-name': 'IGT',
      // 'app-version': applicationVersion,
    },
  };
  return axios
    .get(`${baseURL}/${version}/classroom/${classroomId}`, option)
    .then((res) => res.data);
}
