import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<{ error?: string; success?: boolean }>;
  signInWithPhone: (phone: string) => Promise<{ error?: string; success?: boolean }>;
  verifyOtp: (phone: string, token: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null, user: null, isLoading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => ({}),
  signInWithPhone: async () => ({}),
  verifyOtp: async () => ({}),
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser]       = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setUser(session?.user ?? null); setIsLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session); setUser(session?.user ?? null); setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const redirectTo = `${window.location.origin}/dashboard`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) {
        console.error('❌ VERBOSE GOOGLE AUTH ERROR DETAILS:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          status: (error as any).status
        });
        throw error;
      }
      if (data.url) window.location.href = data.url;
    } catch (error: any) {
      console.error('❌ GOOGLE AUTH ERROR:', error);
      const msg = error.message || 'Unknown Google Auth Error';
      alert(`Google Sign-In failed: ${msg}. Check Supabase Dashboard Redirect URLs.`);
    }
  };

  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      console.error('❌ EMAIL AUTH ERROR:', error);
      return { error: error.message };
    }
    return { success: true };
  };

  const signInWithPhone = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      console.error('❌ PHONE AUTH ERROR:', error);
      return { error: error.message };
    }
    return { success: true };
  };

  const verifyOtp = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signInWithGoogle, signInWithEmail, signInWithPhone, verifyOtp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
