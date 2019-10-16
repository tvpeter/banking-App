"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @class Response
 */
class Response {
  /**
   * @param {Boolean} success true/false
   * @param {number} code response code
   * @param {string} message addition message
   * @param {object} data response data
   */
  constructor(success, code, message, data) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

exports.default = Response;