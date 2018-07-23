export function createStyleObject(width, height, maxHeight) {
  const style = {};
  if (width) {
    style.width = width;
  }
  if (height) {
    style.height = height;
  }
  if (maxHeight) {
    style.maxHeight = maxHeight;
    style.overflowY = 'scroll';
  }
  return style;
}

export const KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  TAB: 9,
};

export const NAVIGATION_KEYS = [KEY_CODES.ESCAPE, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW];
