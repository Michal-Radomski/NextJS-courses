"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

interface UnreadMessages {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

// Create context
const GlobalContext: React.Context<UnreadMessages> = React.createContext({} as UnreadMessages);

// Create a provider
export function GlobalProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  const { data: session } = useSession();

  React.useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext(): UnreadMessages {
  return React.useContext(GlobalContext);
}
