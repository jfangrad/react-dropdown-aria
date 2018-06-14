export function createStyleObject(width, height, maxHeight) {
  const style = {};
  if(!!width) {
    style.width = width;
  }
  if (!!height) {
    style.height = height;
  }
  if(!!maxHeight) {
    style.maxHeight = maxHeight;
    style.overflowY = 'scroll';
  }
  return style;
}
