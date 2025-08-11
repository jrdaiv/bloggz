// src/types/index.ts
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// /src/types/index.ts
export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
