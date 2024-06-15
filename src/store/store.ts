import create from "zustand";

type GroupState = {
  groupId: string;
  setGroupId: (groupId: string) => void;
};

export const useGroupStore = create<GroupState>((set) => ({
  groupId: "",
  setGroupId: (groupId) => set({ groupId }),
}));

type AuthState = {
  userAuthInfo: {
    access_token: string;
    user: {
      username: string;
      _id: string;
      firstName: string;
      lastName: string;
    };
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  userAuthInfo: JSON.parse(localStorage.getItem("userAuthInfo") || "null"),
}));
