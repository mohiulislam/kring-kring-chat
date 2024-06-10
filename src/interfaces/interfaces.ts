// Interfaces for basic enums
export interface MediaType {
  photo: "photo";
  video: "video";
  audio: "audio";
}

export interface GroupRole {
  admin: "admin";
  member: "member";
}

// Interface for ContactInfo
export interface ContactInfo {
  email?: string;
  phone?: string;
}

// Interface for User
export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  isOnline: boolean;
  messages: Message[];
  groups: Group[];
  contactInfo: ContactInfo;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Group
export interface Group {
  _id: string;
  name?: string;
  users: User[];
  messages: Message[];
  lastMessage: Message;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for GroupUser
export interface GroupUser {
  user: User;
  group: Group;
  role: GroupRole;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Media
export interface Media {
  url?: string;
  mediaType?: string;
}

// Interface for Message
export interface Message {
  user: User;
  group?: Group;
  content: string;
  media?: Media;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Login {
  username: string;
  password: string;
}

export interface Register {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
  email: string;
}
export interface LoginResponse {
  access_token: string;
  user: {
    username: string;
    _id: string;
    firstName: string;
    lastName: string;
    contactInfo: ContactInfo;
  };
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export interface VerifyEmail {
  code: string;
  email: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  acsess_token: string;
  usernmae: string;
  message: string;
}
