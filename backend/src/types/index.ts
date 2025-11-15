// src/types/index.ts

// Define the shared types
export type UserRole = "fan" | "player" | "admin";
export type PaymentStatus = "pending" | "verified" | "failed";
export type MatchStatus = "upcoming" | "live" | "finished";
export type EventType = "goal" | "assist" | "yellow_card" | "red_card";
export type MatchGroup = "A" | "B" | "final";