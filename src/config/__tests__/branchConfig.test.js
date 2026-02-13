import {
  branchConfig,
  getBranchInfo,
  getBranchAddress,
  getBranchName,
  getBranchShortAddress,
} from "../branchConfig";

describe("Branch Configuration", () => {
  describe("branchConfig object", () => {
    it("should have branch1 and branch2 configurations", () => {
      expect(branchConfig.branch1).toBeDefined();
      expect(branchConfig.branch2).toBeDefined();
    });

    it("should have all required fields for branch1", () => {
      const branch1 = branchConfig.branch1;
      expect(branch1.id).toBe("branch1");
      expect(branch1.name).toBeDefined();
      expect(branch1.address).toBeDefined();
      expect(branch1.shortAddress).toBeDefined();
      expect(branch1.phone).toBeDefined();
      expect(branch1.mapLink).toBeDefined();
    });

    it("should have all required fields for branch2", () => {
      const branch2 = branchConfig.branch2;
      expect(branch2.id).toBe("branch2");
      expect(branch2.name).toBeDefined();
      expect(branch2.address).toBeDefined();
      expect(branch2.shortAddress).toBeDefined();
      expect(branch2.phone).toBeDefined();
      expect(branch2.mapLink).toBeDefined();
    });

    it("should have correct branch1 address format", () => {
      expect(branchConfig.branch1.address).toContain("Mugalivakkam");
      expect(branchConfig.branch1.address).toContain("Chennai");
    });

    it("should have correct branch2 address format", () => {
      expect(branchConfig.branch2.address).toContain("Kumananchavadi");
      expect(branchConfig.branch2.address).toContain("Chennai");
    });
  });

  describe("getBranchInfo", () => {
    it("should return branch1 info when branch1 is passed", () => {
      const info = getBranchInfo("branch1");
      expect(info.id).toBe("branch1");
      expect(info.name).toBe("Mugalivakkam");
    });

    it("should return branch2 info when branch2 is passed", () => {
      const info = getBranchInfo("branch2");
      expect(info.id).toBe("branch2");
      expect(info.name).toBe("Kumananchavadi");
    });

    it("should return branch1 as default for invalid branch ID", () => {
      const info = getBranchInfo("invalid");
      expect(info.id).toBe("branch1");
    });

    it("should return branch1 as default for undefined", () => {
      const info = getBranchInfo(undefined);
      expect(info.id).toBe("branch1");
    });

    it("should return branch1 as default for null", () => {
      const info = getBranchInfo(null);
      expect(info.id).toBe("branch1");
    });
  });

  describe("getBranchAddress", () => {
    it("should return correct address for branch1", () => {
      const address = getBranchAddress("branch1");
      expect(address).toBe(branchConfig.branch1.address);
      expect(address).toContain("Mugalivakkam");
    });

    it("should return correct address for branch2", () => {
      const address = getBranchAddress("branch2");
      expect(address).toBe(branchConfig.branch2.address);
      expect(address).toContain("Kumananchavadi");
    });

    it("should return branch1 address as default for invalid branch", () => {
      const address = getBranchAddress("invalid");
      expect(address).toBe(branchConfig.branch1.address);
    });
  });

  describe("getBranchName", () => {
    it("should return correct name for branch1", () => {
      const name = getBranchName("branch1");
      expect(name).toBe("Mugalivakkam");
    });

    it("should return correct name for branch2", () => {
      const name = getBranchName("branch2");
      expect(name).toBe("Kumananchavadi");
    });

    it("should return branch1 name as default for invalid branch", () => {
      const name = getBranchName("invalid");
      expect(name).toBe("Mugalivakkam");
    });
  });

  describe("getBranchShortAddress", () => {
    it("should return correct short address for branch1", () => {
      const shortAddress = getBranchShortAddress("branch1");
      expect(shortAddress).toBe("Mugalivakkam, Chennai");
    });

    it("should return correct short address for branch2", () => {
      const shortAddress = getBranchShortAddress("branch2");
      expect(shortAddress).toBe("Kumananchavadi, Chennai");
    });

    it("should return branch1 short address as default for invalid branch", () => {
      const shortAddress = getBranchShortAddress("invalid");
      expect(shortAddress).toBe("Mugalivakkam, Chennai");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty string", () => {
      const info = getBranchInfo("");
      expect(info.id).toBe("branch1");
    });

    it("should handle case sensitivity", () => {
      const info1 = getBranchInfo("BRANCH1");
      const info2 = getBranchInfo("Branch1");
      expect(info1.id).toBe("branch1");
      expect(info2.id).toBe("branch1");
    });
  });
});
