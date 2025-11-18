// TODO: integrate health entry save
export const addHealthEntry = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Adding health entry:", data);
      resolve({ success: true });
    }, 800);
  });
};

// TODO: integrate health entries fetch
export const getHealthEntries = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetching health entries");
      resolve([]);
    }, 800);
  });
};
