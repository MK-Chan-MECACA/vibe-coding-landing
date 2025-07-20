export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      interest_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subscribed_newsletter: boolean
          submitted_at: string
          source: string
          message?: string
          company?: string
          phone?: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subscribed_newsletter?: boolean
          submitted_at?: string
          source?: string
          message?: string
          company?: string
          phone?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subscribed_newsletter?: boolean
          submitted_at?: string
          source?: string
          message?: string
          company?: string
          phone?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string
          avatar?: string
          testimonial: string
          rating: number
          verified: boolean
          created_at: string
          featured?: boolean
        }
        Insert: {
          id?: string
          name: string
          role: string
          company: string
          avatar?: string
          testimonial: string
          rating: number
          verified?: boolean
          created_at?: string
          featured?: boolean
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company?: string
          avatar?: string
          testimonial?: string
          rating?: number
          verified?: boolean
          created_at?: string
          featured?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 