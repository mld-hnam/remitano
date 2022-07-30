import "numeral/locales";

import moment from "moment";
import numeral from "numeral";

/**
 * Ceiling
 * @param {number} term
 */
export const ceilTerm = (term) => Math.ceil(term);

/**
 * Flooring term
 * @param {number|string} term
 */
export const floorTerm = (term) => Math.floor(term);

/**
 * Format date
 * @param {string|number|moment} m
 * @param {string} format
 */
export const formatDate = (m, format = "DD/MM/YYYY") => {
  // Assume 0 is null due to limitation of gRPC
  if (!m || Number(m) === 0) return null;

  let momentObj = m;
  if (typeof m === "string" && /^-?\d+$/.test(m)) {
    momentObj = moment(Number(m));
  } else if (Number.isInteger(m)) {
    momentObj = moment(m);
  }
  return momentObj?.format && momentObj.format(format);
};

/**
 * Format time
 * @param {number} hh number of hour
 * @param {number} mm number of minutes
 * @param {number} ss number of seconds
 * @param {string} f format default HH:mm
 */
export const formatTime = (hh, mm, ss = 0, f = "HH:mm") => {
  const d = moment().set("hour", hh).set("minute", mm).set("second", ss);
  return d.format(f);
};

/**
 * Get epoch value from date
 * @param {moment|string|number} m
 */
export const getEpoch = (m) => {
  if (!m) return null;

  if (moment.isMoment(m)) return m.valueOf();

  if (typeof m === "string" && /^-?\d+$/.test(m)) {
    return Number(m);
  }

  return m;
};

/**
 * Epoch to moment
 * @param {number|string} e epoch
 */
export const epochToMoment = (e) => {
  // Assume 0 is null due to limitation of gRPC
  if (!e || Number(e) === 0) return null;

  if (typeof e === "string" && /^-?\d+$/.test(e)) {
    return moment(Number(e));
  }

  return moment(e);
};

export const dateStringToMoment = (str, format = "DD/MM/YYYY") => {
  if (!str) return null;
  return moment(str, format);
};

/**
 * Check 2 given epoch have a same date or not
 * @param {Number} epoch1
 * @param {Number} epoch2
 */
export const isSameDate = (epoch1, epoch2) => {
  const m1 = epochToMoment(epoch1);
  const m2 = epochToMoment(epoch2);
  if (!m1 || !m2) return false;
  return m1.isSame(m2, "days");
};

export const parsePercentage = (double, digits = 6) => {
  return (double * 100).toFixed(digits);
};

export const toPercentageDouble = (p, digits = 6) => {
  if (p === undefined || p === null) return null;
  return Number((Number(p) / 100).toFixed(digits));
};
/**
 * Normalize form number field item
 */

export const formatCurrency = (num, locale) => {
  numeral.locale(numeral.locales[locale] ? locale : "vi");
  return numeral(num).format("0.00 a");
};

/**
 * Get epoch value from begin of date
 * @param {moment|string|number} m
 */
export const getEpochBeginDate = (m) => {
  if (!m) return null;

  if (moment.isMoment(m)) return m.startOf("day").valueOf();

  return epochToMoment(m).startOf("day").valueOf();
};

/**
 * Get epoch value from end of date
 * @param {moment|string|number} m
 */
export const getEpochEndDate = (m) => {
  if (!m) return null;

  if (moment.isMoment(m)) return m.endOf("day").valueOf();

  return epochToMoment(m).endOf("day").valueOf();
};

/**
 * @param {string} str
 */
export const replaceSpecialCharacters = (str) => {
  if (typeof str !== "string" || !str) return str;
  return str.replace(/[^A-Za-z0-9]*/g, "");
};
