function isArray(obj) {
  return Array.isArray(obj);
}

function isObject(obj) {
  return typeof obj === 'object' && !isArray(obj);
}

function mergeArrays(target, src) {
  return [].concat(target || []).concat(src || []);
}

function mergeObjects(target, src) {
  var dst = {};

  Object.keys(target).forEach(function(key) {
    dst[key] = target[key];
  });

  Object.keys(src).forEach(function(key) {
    if (dst[key] == null) {
      dst[key] = src[key];
    } else {
      dst[key] = deepmerge(dst[key], src[key]);
    }
  });

  return dst;
}

function mergePrimitives(target, src) {
  return src;
}

function deepmerge(target, src) {
  var f;

  if (isArray(target) && isArray(src)) {
    f = mergeArrays;
  } else if (isObject(target) && isObject(src)) {
    f = mergeObjects;
  } else {
    f = mergePrimitives;
  }

  return f(target, src);
}

module.exports = deepmerge;
