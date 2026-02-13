/**
 * Branch Configuration
 * Maps branch IDs to their display information
 */

export const branchConfig = {
  branch1: {
    id: "branch1",
    name: "Mugalivakkam",
    address: "No:1/186, Mariamman Kovil Street, Mugalivakkam, Chennai 600125",
    shortAddress: "Mugalivakkam, Chennai",
    phone: "+91 63822 32050",
    mapLink: "https://goo.gl/maps/zg8zYVShCY2ywrZS6",
  },
  branch2: {
    id: "branch2",
    name: "Kumananchavadi",
    address: "NO:98/4, Kundrathur Main Road, Kumananchavadi, Chennai 56",
    shortAddress: "Kumananchavadi, Chennai",
    phone: "+91 91235 25358",
    mapLink: "https://maps.app.goo.gl/j8vHXf51KVPwDpsRA",
  },
};

/**
 * Get branch information by branch ID
 * @param {string} branchId - The branch ID (e.g., "branch1", "branch2")
 * @returns {Object} Branch configuration object
 */
export const getBranchInfo = (branchId) => {
  return branchConfig[branchId] || branchConfig.branch1;
};

/**
 * Get branch address by branch ID
 * @param {string} branchId - The branch ID
 * @returns {string} Branch address
 */
export const getBranchAddress = (branchId) => {
  const branch = getBranchInfo(branchId);
  return branch.address;
};

/**
 * Get branch name by branch ID
 * @param {string} branchId - The branch ID
 * @returns {string} Branch name/location
 */
export const getBranchName = (branchId) => {
  const branch = getBranchInfo(branchId);
  return branch.name;
};

/**
 * Get short branch address by branch ID
 * @param {string} branchId - The branch ID
 * @returns {string} Short branch address
 */
export const getBranchShortAddress = (branchId) => {
  const branch = getBranchInfo(branchId);
  return branch.shortAddress;
};
