export const randomKorean = num => {
  let korean = "";
  const unicode = "\uAC00";
  var first = [0, 2, 3, 5, 6, 7, 9, 11, 12, 14, 15, 16, 17, 18];
  var middle = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 17, 18, 20];
  var end = [1, 0, 4, 0, 8, 0, 16, 0, 17, 0, 19, 0, 20, 0, 21];
  var i;
  for (i = 0; i < num; i++) {
    const f = first[Math.floor(Math.random() * first.length)];
    const m = middle[Math.floor(Math.random() * middle.length)];
    const e = end[Math.floor(Math.random() * end.length)];
    const iUniCode = unicode.charCodeAt(0) + (f * 21 + m) * 28 + e;
    korean += String.fromCodePoint(iUniCode);
  }
  return korean;
};
