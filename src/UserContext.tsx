import React, { createContext, useState, ReactNode, FunctionComponent } from "react";

interface UserContextType {
  user: { name: string; email: string; userId: string }; // Add userId to user object
  setUser: (user: { name: string; email: string; userId: string }) => void; // Update setUser function signature
}

export const UserContext = createContext<UserContextType>({
  user: { name: "", email: "", userId: "" }, // Initialize with userId as empty string
  setUser: () => {},
});

export const UserProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", userId: "" }); // Initialize userId in state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
