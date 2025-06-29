import { Muid } from "../muid.js";

describe("Muid", function () {
  describe("randomMuid", () => {
    it("should generate a random muid", function () {
      const muid = Muid.randomMuid();
      expect(muid).toMatch(/^[A-Za-z0-9_-]{22}$/);
      const toUuid = Muid.toUuid(muid);
      const fromUuid = Muid.fromUuid(toUuid);
      expect(fromUuid).toBe(muid);
    });
  });
  describe("fromUuid", () => {
    it("should convert a lowercase, dashed UUID to a muid", function () {
      var uuid = "19ab5c32-038b-4ba3-841f-b427f65e1943";
      var muid = Muid.fromUuid(uuid);
      expect(muid).toBe("hB-0J_ZeGUMZq1wyA4tLow");
    });

    it("should convert an uppercase, dashed UUID to a muid", function () {
      var uuid = "19AB5C32-038B-4BA3-841F-B427F65E1943";
      var muid = Muid.fromUuid(uuid);
      expect(muid).toBe("hB-0J_ZeGUMZq1wyA4tLow");
    });

    it("should convert a lowercase, non-dashed UUID to a muid", function () {
      var uuid = "19ab5c32038b4ba3841fb427f65e1943";
      var muid = Muid.fromUuid(uuid);
      expect(muid).toBe("hB-0J_ZeGUMZq1wyA4tLow");
    });

    it("should convert an uppercase, non-dashed UUID to a muid", function () {
      var uuid = "19AB5C32038B4BA3841FB427F65E1943";
      var muid = Muid.fromUuid(uuid);
      expect(muid).toBe("hB-0J_ZeGUMZq1wyA4tLow");
    });

    it("should throw a RangeError for undefined UUID", function () {
      expect(function () {
        Muid.fromUuid();
      }).toThrowError(RangeError);
    });

    it("should throw a RangeError for too short UUID", function () {
      expect(function () {
        Muid.fromUuid("19ab5c32-038b-4ba3-841f-b427f65e194");
      }).toThrowError(RangeError);
    });

    it("should throw a RangeError for too long UUID", function () {
      expect(function () {
        Muid.fromUuid("19ab5c32-038b-4ba3-841f-b427f65e19430");
      }).toThrowError(RangeError);
    });
  });

  describe("toUuid", () => {
    it("should convert an muid to a lowercase, non-dashed UUID", function () {
      var muid = "hB-0J_ZeGUMZq1wyA4tLow";
      var uuid = Muid.toUuid(muid);
      expect(uuid).toBe("19ab5c32-038b-4ba3-841f-b427f65e1943");
    });

    it("should throw a RangeError for undefined muid", function () {
      expect(function () {
        Muid.toUuid();
      }).toThrowError(RangeError);
    });

    it("should throw a RangeError for too short muid", function () {
      expect(function () {
        Muid.toUuid("hB-0J_ZeGUMZq1wyA4tLo");
      }).toThrowError(RangeError);
    });

    it("should throw a RangeError for too long muid", function () {
      expect(function () {
        Muid.toUuid("hB-0J_ZeGUMZq1wyA4tLowa");
      }).toThrowError(RangeError);
    });
  });
});
