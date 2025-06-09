declare module "node-muid" {
  /**
   * Converts a UUID string to a 22-character MUID.
   * @param uuid - A 32-character hexadecimal UUID (dashes optional, case-insensitive).
   * @returns A 22-character base64 URL-safe MUID.
   * @throws RangeError if input is not a valid 32-character UUID.
   */
  export function fromUuid(uuid: string): string;

  /**
   * Converts a 22-character MUID back to a UUID string.
   * @param muid - A 22-character base64 URL-safe string.
   * @returns A UUID string in the canonical 8-4-4-4-12 format.
   * @throws RangeError if input is not a valid 22-character MUID.
   */
  export function toUuid(muid: string): string;

  /**
   * The Muid object for module-style and browser global access.
   */
  export const Muid: {
    fromUuid: typeof fromUuid;
    toUuid: typeof toUuid;
  };
}
