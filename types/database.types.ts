export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: number;
          is_group: boolean;
          name: string | null;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: number;
          is_group?: boolean;
          name?: string | null;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: number;
          is_group?: boolean;
          name?: string | null;
          created_at?: string;
          created_by?: string;
        };
      };
      conversation_participants: {
        Row: {
          id: number;
          conversation_id: number;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          conversation_id: number;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          conversation_id?: number;
          user_id?: string;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: number;
          content: string;
          conversation_id: number;
          sender_id: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          content: string;
          conversation_id: number;
          sender_id: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          content?: string;
          conversation_id?: number;
          sender_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
