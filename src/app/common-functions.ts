
export function countDuplicate(array: string[], element: any) {
  let i = 0;
  let count = 0;

  while (i < array.length) {
    if (array[i] == element) count++;

    i++;
  }

  return count;
}



export function objectLength(obj: any) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export async function intersection(a: any, b: any) {
  var t;
  if (b.length > a.length) (t = b), (b = a), (a = t); // indexOf to loop over shorter
  return a
    .filter(function (e: any) {
      return b.indexOf(e) > -1;
    })
    .filter(function (e: any, i: any, c: any) {
      // extra step to remove duplicates
      return c.indexOf(e) === i;
    });
}

export async function randomString(length: number, chars: string) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}



export async function generateRandomPassword() {
  return await randomString(
    8,
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  );
}

export function getRandomIdBetween(min: number, max: number) {
  return parseInt((Math.random() * (max - min) + min).toString());
}

export function floatWith2Decimalsfn(amount: number) {
  return parseFloat(Number(amount).toFixed(2));
}

export const btoa = function (str: string) {
  // return Buffer.from(str).toString('base64');
};
export const atob = function (b64Encoded: string) {
  // return Buffer.from(b64Encoded, 'base64').toString();
};

export const floatWith2Decimals = (amount: number) =>
  parseFloat(amount.toFixed(2));
 
  export const sumBy = (items: Array<any>, prop: string) =>
  items.reduce((a, b) => +a + +parseFloat(b[prop]), 0);
 
  export const sumByV2 = (items: Array<any>, prop1: string, prop2: string) =>
  items.reduce((a, b) => +a + (b[prop1].reduce((c: any, d: any) => +c + +parseFloat(d[prop2]), 0)), 0)
 
  export const adjustWith2DecimalsForUI = (amount: number | string) =>
  +parseFloat(amount.toString()).toFixed(2);

  export function groupBy(xs, prop) {
    var grouped = {};
    for (var i=0; i<xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) { grouped[p] = []; }
      grouped[p].push(xs[i]);
    }
    return grouped;
  }
