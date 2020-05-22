
export function checkNum(val: any) {
  return (typeof val === 'number');
}

export function fullZero(num: number|string, zeroNum: number) {
  let numStr = '' + num;

  for (let i = numStr.length; i < zeroNum; i++) {
    numStr = '0' + numStr;
  }

  return numStr;
}
