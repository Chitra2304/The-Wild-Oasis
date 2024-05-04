import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://grpldaslcbtugjsrkhly.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdycGxkYXNsY2J0dWdqc3JraGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjEyNzUsImV4cCI6MjAyNTEzNzI3NX0.pMZSu9THq-VUSkh5SeMlVFwkxJtEaQgaYj7SmCIhP80";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
