export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  room: Room | null;
}

export interface Room {
  id: string;
  title: string;
  numOfUsers: number;
  ownerUsername: string;
  ownerAvatar: string;
  messages: Message[];
  updatedAt: Date;
}

export interface Message {
  id: number;
  content: string;
  createdAt: number;
  user: User;
  room: Room;
}
