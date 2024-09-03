export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  class: string;
  eduIfa: string | null;
  createdAt: string;
  updatedAt: string;
}

export function getUserFromLocalStorage(): User | null {
  if (typeof window === "undefined") {
    console.warn("Local storage is not available. Window is undefined.");
    return null;
  }

  try {
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      const fetched_user = user.user as User;

      return fetched_user;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user from local storage:", error);
    return null;
  }
}
