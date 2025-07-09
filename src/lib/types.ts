export interface Peer {
  name: string;
  avatar: string;
  specialty: string;
  tags: string[];
}

export interface Milestone {
  type: "course" | "project" | "achievement";
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

export interface Project {
    title: string;
    author: string;
    imageUrl: string;
    likes: number;
    comments: number;
    "data-ai-hint": string;
}
