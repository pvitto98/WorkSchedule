import React, { createContext, useState, ReactNode, FunctionComponent } from "react";

interface User {
  name: string;
  email: string;
  userId: string;
  festiveDays?: number[]; // Optional because it might not be set initially
  workingHours?: number;  // Optional as well
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: { name: "", email: "", userId: "" }, // Initialize without festiveDays and workingHours
  setUser: () => {},
});

export const UserProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: "", email: "", userId: "" }); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
