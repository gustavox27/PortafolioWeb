import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  date: string;
  image_url: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  technologies: string[];
  achievements: string[];
  created_at: string;
  updated_at: string;
}

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  profile_image_url?: string;
  cv_url?: string;
  created_at: string;
  updated_at: string;
}