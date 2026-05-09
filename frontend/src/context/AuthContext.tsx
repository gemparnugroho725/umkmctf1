import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string, role: 'buyer' | 'seller') => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
    updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const withTimeout = <T,>(promise: PromiseLike<T>, timeoutMs: number, message: string): Promise<T> => {
        return Promise.race([
            Promise.resolve(promise),
            new Promise<T>((_, reject) => setTimeout(() => reject(new Error(message)), timeoutMs))
        ]);
    };

    const getSessionWithTimeout = async (timeoutMs = 4000) => {
        return Promise.race([
            supabase.auth.getSession(),
            new Promise<{ data: { session: null }, error: null }>((resolve) => {
                setTimeout(() => resolve({ data: { session: null }, error: null }), timeoutMs);
            })
        ]);
    };

    const setUserFromSession = (session: Session) => {
        setUser({
            id: session.user.id,
            username: session.user.user_metadata?.username || 'User',
            role: session.user.user_metadata?.role || 'buyer',
            location: session.user.user_metadata?.location || '',
            phone: session.user.user_metadata?.phone || localStorage.getItem('juragan_ai_phone_' + session.user.id) || '',
            business_name: session.user.user_metadata?.business_name || null,
            business_address: session.user.user_metadata?.business_address || null,
            tax_id: session.user.user_metadata?.tax_id || null,
            is_verified: session.user.user_metadata?.is_verified ?? null
        });
    };

    const fetchProfile = async (id: string) => {
        try {
            const { data, error } = await withTimeout<any>(
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', id)
                    .single(),
                6000,
                'Profile fetch timeout'
            );

            if (data && !error) {
                setUser({
                    id: data.id,
                    username: data.username,
                    role: data.role,
                    location: data.location || '',
                    phone: data.phone || localStorage.getItem('juragan_ai_phone_' + data.id) || '',
                    business_name: data.business_name || null,
                    business_address: data.business_address || null,
                    tax_id: data.tax_id || null,
                    is_verified: (data as any).is_verified ?? null
                });
            }
        } catch (err) {
            console.error('Fetch profile error:', err);
        }
    };

    useEffect(() => {
        const initSession = async () => {
            try {
                const { data: { session } } = await getSessionWithTimeout();
                if (session) {
                    setUserFromSession(session);
                    setTimeout(() => {
                        void fetchProfile(session.user.id);
                    }, 0);
                }
            } catch (err: any) {
                console.error("Auth Init Error:", err.message);
            } finally {
                setLoading(false);
            }
        };
        initSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUserFromSession(session);
                setTimeout(() => {
                    void fetchProfile(session.user.id);
                }, 0);
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const { error } = await withTimeout(
            supabase.auth.signInWithPassword({ email, password }),
            10000,
            'Login timeout. Cek koneksi internet/Supabase.'
        );
        if (error) throw error;
    };

    const signUp = async (email: string, password: string, username: string, role: 'buyer' | 'seller') => {
        const { data: authData, error: authError } = await withTimeout(
            supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        role,
                        location: ''
                    }
                }
            }),
            10000,
            'Sign up timeout. Cek koneksi internet/Supabase.'
        );

        if (authError) throw authError;

        if (authData.user) {
            // Non-blocking upsert
            void (async () => {
                try {
                    const { error: profileError } = await supabase.from('profiles').upsert(
                        [
                            {
                                id: authData.user!.id,
                                username,
                                role,
                                location: ''
                            }
                        ],
                        { onConflict: 'id' }
                    );
                    if (profileError) {
                        console.warn('Profile upsert warning (handled by DB trigger):', profileError.message);
                    }
                } catch (err) {
                    console.warn('Profile manual upsert failed (trigger fallback will handle it):', err);
                }
            })();
        }
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) {
            throw new Error('Sesi login tidak ditemukan.');
        }

        // Try saving to Supabase profiles table
        let hasPhoneError = false;
        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);
            if (error) {
                // If it fails because of missing phone column, we catch it and set flag
                if (error.message.includes('phone') || error.message.includes('column') || error.code === 'PGRST204') {
                    hasPhoneError = true;
                } else {
                    throw error;
                }
            }
        } catch (err) {
            console.warn('DB profile update failed, will use fallback:', err);
            hasPhoneError = true;
        }

        // Save phone to localStorage if there's any phone property in updates
        if (updates.phone !== undefined) {
            if (updates.phone) {
                localStorage.setItem('juragan_ai_phone_' + user.id, updates.phone);
            } else {
                localStorage.removeItem('juragan_ai_phone_' + user.id);
            }
        }

        // If phone column didn't exist in Supabase table, update remaining fields in Supabase
        if (hasPhoneError) {
            const dbUpdates = { ...updates };
            delete dbUpdates.phone;
            if (Object.keys(dbUpdates).length > 0) {
                const { error: secondTryError } = await supabase
                    .from('profiles')
                    .update(dbUpdates)
                    .eq('id', user.id);
                if (secondTryError) throw secondTryError;
            }
        }

        const nextUser = { ...user, ...updates };
        const { error: updateUserError } = await supabase.auth.updateUser({
            data: {
                username: nextUser.username,
                role: nextUser.role,
                location: nextUser.location || '',
                phone: nextUser.phone || '',
                business_name: (nextUser as any).business_name ?? null,
                business_address: (nextUser as any).business_address ?? null,
                tax_id: (nextUser as any).tax_id ?? null,
                is_verified: (nextUser as any).is_verified ?? null
            }
        });

        if (updateUserError) throw updateUserError;

        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) throw refreshError;

        setUser(nextUser);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, isAuthenticated: !!user, loading, updateProfile }}>
            {loading ? (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
                    Memuat sesi aplikasi...
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
