export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'guest';
  createdAt: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

export interface Template {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'web' | 'automation' | 'other';
  files?: string;
  createdAt: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  author: {
    name: string;
  };
}

export interface Purchase {
  id: number;
  userId: number;
  courseId: number;
  createdAt: string;
  course: Course;
}

export interface TemplatePurchase {
  id: number;
  userId: number;
  templateId: number;
  createdAt: string;
  template: Template;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
