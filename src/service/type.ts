export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  room: Room | null;
}

export interface Room {
  id: number;
  title: string;
  users: User[];
  owner: User;
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
