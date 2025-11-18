// TODO: integrate profile fetch
export const fetchProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetching profile");
      resolve({
        name: "John Doe",
        age: "30",
        height: "175",
        weight: "70"
      });
    }, 800);
  });
};

// TODO: integrate profile update
export const updateProfile = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Updating profile with:", data);
      resolve({ success: true });
    }, 1000);
  });
};
