import { w as writable } from "./index.js";
function createUserStore() {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    login: (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password.length >= 6) {
            const user2 = {
              id: `user_${Date.now()}`,
              email,
              name: email.split("@")[0]
            };
            set(user2);
            resolve(user2);
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 500);
      });
    },
    register: (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password.length >= 6) {
            const user2 = {
              id: `user_${Date.now()}`,
              email,
              name: email.split("@")[0]
            };
            set(user2);
            resolve(user2);
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 500);
      });
    },
    logout: () => {
      set(null);
    },
    isAuthenticated: () => {
      let authenticated = false;
      const unsubscribe = subscribe((user2) => {
        authenticated = user2 !== null;
      });
      unsubscribe();
      return authenticated;
    }
  };
}
const user = createUserStore();
export {
  user as u
};
