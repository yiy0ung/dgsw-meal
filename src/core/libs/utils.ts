
type JSDataType = 'bigint'|'boolean'|'function'|'number'|'object'|'string'|'symbol'|'undifined';
export function checkType(val: any, type: JSDataType) {
  return (typeof val === type);
}

export function fullZero(num: number|string, zeroNum: number) {
  let numStr = '' + num;

  for (let i = numStr.length; i < zeroNum; i++) {
    numStr = '0' + numStr;
  }

  return numStr;
}
