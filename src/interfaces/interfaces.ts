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
  admin: string;
  users: {
    firstName: string;
    lastName: string;
    isOnline: boolean;
    _id: string;
  }[];
  messages: Message[];
  lastMessage: Message;
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
  _id?: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  group: string;
  content: string;
  media?: Media;
  createdAt: Date;
  updatedAt?: Date;
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
  access_token: string;
  userName: string;
  message: string;
}
