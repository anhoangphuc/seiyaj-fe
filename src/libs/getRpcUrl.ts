import sample from "lodash/sample";
/* eslint-disable no-undef */

// Array of available nodes to connect to
export const nodes = [
  process.env.PUBLIC_NODE,
];

const getNodeUrl = () => sample(nodes);

export default getNodeUrl;
