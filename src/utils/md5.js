import md5 from 'blueimp-md5';

export function hashStringWithMD5(str) {
  return md5(str);
}