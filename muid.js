const UUID_DIGITS = 32;
const MUID_DIGITS = 22;
const URL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";

function fromUuid(uuid) {
  const normalizedUuid = uuid && uuid.split("-").join("").toLowerCase();
  if (!normalizedUuid || normalizedUuid.length !== UUID_DIGITS) {
    throw new RangeError("UUID must have 32 hexadecimal digits (case insensitive, optional dashes)");
  }

  const bytes = [];
  let j = 0;

  for (let i = 0; i < UUID_DIGITS; i += 2) {
    const hex1 = parseInt(normalizedUuid.charAt(j++), 16);
    const hex2 = parseInt(normalizedUuid.charAt(j++), 16);
    const byte = parseInt(hex1.toString(16) + hex2.toString(16), 16);
    bytes.push(byte);
  }

  return encode64(flip(bytes), URL_ALPHABET).replace(/=+$/, "");
}

function toUuid(muid) {
  if (!muid || muid.length !== MUID_DIGITS) {
    throw new RangeError("muid must have 22 URL-safe base64 digits");
  }

  const bytes = flip(decode64(muid, URL_ALPHABET).slice(0, 16));
  const hexes = bytes.map(b => ("00" + b.toString(16)).slice(-2));

  hexes.splice(10, 0, "-");
  hexes.splice(8, 0, "-");
  hexes.splice(6, 0, "-");
  hexes.splice(4, 0, "-");

  return hexes.join("");
}

function flip(bytes) {
  const mid = bytes.length / 2;
  return bytes.slice(mid).concat(bytes.slice(0, mid));
}

function decode64(str, alphabet) {
  const length = (str.length / 4) * 3 - (str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0);
  const bytes = [];
  let j = 0;

  for (let i = 0; i < length; i += 3) {
    const enc1 = alphabet.indexOf(str.charAt(j++));
    const enc2 = alphabet.indexOf(str.charAt(j++));
    const enc3 = alphabet.indexOf(str.charAt(j++));
    const enc4 = alphabet.indexOf(str.charAt(j++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    bytes.push(chr1);
    if (enc3 !== 64) bytes.push(chr2);
    if (enc4 !== 64) bytes.push(chr3);
  }

  return bytes;
}

function encode64(bytes, alphabet) {
  let str = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const chr1 = bytes[i];
    const chr2 = bytes[i + 1];
    const chr3 = bytes[i + 2];

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    const enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    const enc4 = chr3 & 63;

    str += alphabet.charAt(enc1);
    str += alphabet.charAt(enc2);
    str += isNaN(chr2) ? "=" : alphabet.charAt(enc3);
    str += isNaN(chr3) ? "=" : alphabet.charAt(enc4);
  }
  return str;
}

// Export the public API
export const Muid = { fromUuid, toUuid };
export { fromUuid, toUuid };
export default Muid;
