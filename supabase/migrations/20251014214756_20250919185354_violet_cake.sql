/*
  # Create Portfolio Database Schema

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `title` (text, required)
      - `bio` (text, required)
      - `email` (text, required, unique)
      - `phone` (text, optional)
      - `location` (text, optional)
      - `linkedin_url` (text, optional)
      - `github_url` (text, optional)
      - `profile_image_url` (text, optional)
      - `cv_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects` - Portfolio projects
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `technologies` (text array, required)
      - `category` (text, required)
      - `image_url` (text, optional)
      - `demo_url` (text, optional)
      - `github_url` (text, optional)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `certificates` - Professional certificates
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `institution` (text, required)
      - `date` (date, required)
      - `image_url` (text, required)
      - `description` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `experiences` - Work experience
      - `id` (uuid, primary key)
      - `company` (text, required)
      - `position` (text, required)
      - `description` (text, required)
      - `start_date` (date, required)
      - `end_date` (date, optional)
      - `technologies` (text array, required)
      - `achievements` (text array, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated user write access
    - Create updated_at trigger function

  3. Extensions
    - Enable uuid-ossp extension for UUID generation
*/

-- Enable the "uuid-ossp" extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to automatically update 'updated_at' column
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  location text,
  linkedin_url text,
  github_url text,
  profile_image_url text,
  cv_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update profiles"
  ON public.profiles
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Trigger for profiles table
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  image_url text,
  demo_url text,
  github_url text,
  featured boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Set up RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Projects are viewable by everyone"
  ON public.projects
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
  ON public.projects
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Trigger for projects table
DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Table: certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  institution text NOT NULL,
  date date NOT NULL,
  image_url text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Set up RLS for certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies for certificates
CREATE POLICY "Certificates are viewable by everyone"
  ON public.certificates
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert certificates"
  ON public.certificates
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update certificates"
  ON public.certificates
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete certificates"
  ON public.certificates
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Trigger for certificates table
DROP TRIGGER IF EXISTS set_certificates_updated_at ON public.certificates;
CREATE TRIGGER set_certificates_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Table: experiences
CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  technologies text[] NOT NULL DEFAULT '{}',
  achievements text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Set up RLS for experiences
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Policies for experiences
CREATE POLICY "Experiences are viewable by everyone"
  ON public.experiences
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert experiences"
  ON public.experiences
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update experiences"
  ON public.experiences
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete experiences"
  ON public.experiences
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Trigger for experiences table
DROP TRIGGER IF EXISTS set_experiences_updated_at ON public.experiences;
CREATE TRIGGER set_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();