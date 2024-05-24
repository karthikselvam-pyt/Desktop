import { createContext } from "react";
import { UserResponseType } from "../Data/countries";

export const userContext = createContext<{
  user: UserResponseType[];
  totalUserCount: number;
} | null>(null);
