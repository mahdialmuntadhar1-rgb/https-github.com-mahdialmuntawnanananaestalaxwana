declare module '@supabase/supabase-js' {
  export type User = {
    id: string;
    email?: string;
    email_confirmed_at?: string | null;
    user_metadata?: Record<string, unknown>;
  };

  export function createClient(url: string, key: string): {
    auth: {
      getSession: () => Promise<any>;
      onAuthStateChange: (callback: (event: string, session: any) => void | Promise<void>) => {
        data: { subscription: { unsubscribe: () => void } };
      };
      signOut: () => Promise<any>;
      signInWithOAuth: (params: any) => Promise<any>;
    };
  };
}
