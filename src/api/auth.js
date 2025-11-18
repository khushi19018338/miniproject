// TODO: integrate signup API
export const signup = async (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Signup called with:", { name, email, password });
      resolve({ success: true });
    }, 1000);
  });
};

// TODO: integrate login API
export const login = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Login called with:", { email, password });
      resolve({ success: true });
    }, 1000);
  });
};

export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Logout called");
      resolve({ success: true });
    }, 500);
  });
};
