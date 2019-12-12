'use strict';

const xss = require('xss');

const sanitizeFields = obj => {
  const filtered = {};
  for (const [key, value] of Object.entries(obj)) {
    filtered[key] = xss(value);
  }
  return filtered;
};

module.exports = {
  sanitizeFields
};