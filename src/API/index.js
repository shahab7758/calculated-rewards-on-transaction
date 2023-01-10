import { data } from "./mockData.js";

const fetchRecord = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 10);
  });
};

export const fetchCustomersRecord = async () => {
  const result = await fetchRecord();
  return result || [];
};
