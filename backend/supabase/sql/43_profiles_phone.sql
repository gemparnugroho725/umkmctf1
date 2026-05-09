-- Migration: Add phone number support to public.profiles
-- Safely adds a phone column if it does not already exist.

alter table public.profiles
  add column if not exists phone text;

comment on column public.profiles.phone is 'User WhatsApp or phone number for direct contact';
