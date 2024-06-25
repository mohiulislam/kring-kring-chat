import { Group } from "@/interfaces/interfaces";
import { toast } from "react-hot-toast";
import create from "zustand";

type GroupState = {
  group: Group;
  setGroup: (group: Group) => void;
};

export const useGroupStore = create<GroupState>((set) => ({
  group: undefined,
  setGroup: (group: Group) => set({ group }),
}));

type AuthState = {
  userAuthInfo: {
    access_token: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      contactInfo: {
        email: string;
        phone: string;
      };
    };
  };
  logOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userAuthInfo: JSON.parse(sessionStorage.getItem("userAuthInfo") || "null"),
  logOut: () => {
    sessionStorage.removeItem("userAuthInfo");
    set({ userAuthInfo: undefined });
    toast.success("Logged out successfully");
  },
}));

interface OpenCloseState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAddToContactModalStore = create<OpenCloseState>((set) => ({
  isOpen: false,
  open() {
    set({ isOpen: true });
  },
  close() {
    set({ isOpen: false });
  },
}));
