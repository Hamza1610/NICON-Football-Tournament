import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // keep secret
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function verifySupabaseAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Missing authorization header" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // supabaseAdmin.auth.getUser(token) returns user data for that token
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ message: "Invalid token" });

    // attach user to request
    (req as any).authUser = data.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Auth verification failed" });
  }
}

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).authUser;
  if (!user) return res.status(403).json({ message: "Forbidden" });

  // Your users table has role. Query Postgres users table to check role OR use Supabase function is_user_admin
  // For simplicity, we check via supabaseAdmin.rpc is_user_admin if you have that function, else query users table.
  const { data: dbUser, error } = await supabaseAdmin.from("users").select("role").eq("id", user.id).single();
  if (error || !dbUser) return res.status(403).json({ message: "Forbidden" });
  if (dbUser.role !== "admin") return res.status(403).json({ message: "Requires admin role" });

  next();
}
