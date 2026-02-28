import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      organizations: { Row: Organization; Insert: Partial<Organization>; Update: Partial<Organization> }
      users: { Row: User; Insert: Partial<User>; Update: Partial<User> }
      deals: { Row: Deal; Insert: Partial<Deal>; Update: Partial<Deal> }
      surveys: { Row: Survey; Insert: Partial<Survey>; Update: Partial<Survey> }
      survey_questions: { Row: SurveyQuestion; Insert: Partial<SurveyQuestion>; Update: Partial<SurveyQuestion> }
      survey_responses: { Row: SurveyResponse; Insert: Partial<SurveyResponse>; Update: Partial<SurveyResponse> }
      response_answers: { Row: ResponseAnswer; Insert: Partial<ResponseAnswer>; Update: Partial<ResponseAnswer> }
    }
  }
}

export interface Organization {
  id: string
  name: string
  logo_url?: string
  brand_color: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  role: 'owner' | 'admin' | 'member'
  organization_id: string
  created_at: string
}

export interface Deal {
  id: string
  organization_id: string
  deal_name: string
  contact_name?: string
  contact_email?: string
  stage: 'prospecting' | 'qualification' | 'demo' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  value?: number
  competitor?: string
  loss_reason?: string
  source?: string
  owner_id?: string
  custom_fields: Record<string, unknown>
  created_at: string
  updated_at: string
  closed_at?: string
}

export interface Survey {
  id: string
  organization_id: string
  name: string
  description?: string
  status: 'draft' | 'active' | 'archived'
  type: 'win' | 'loss' | 'product_feedback' | 'nps' | 'custom'
  display_mode: 'one_per_page' | 'all_at_once'
  branding: Record<string, unknown>
  is_anonymous: boolean
  created_by?: string
  created_at: string
  updated_at: string
}

export interface SurveyQuestion {
  id: string
  survey_id: string
  sort_order: number
  question_text: string
  question_type: 'rating' | 'nps' | 'single_choice' | 'multiple_choice' | 'open_text' | 'boolean'
  options: string[]
  is_required: boolean
  category: 'product' | 'pricing' | 'sales_experience' | 'competitor' | 'support' | 'other'
}

export interface SurveyResponse {
  id: string
  survey_id: string
  deal_id?: string
  organization_id: string
  respondent_email?: string
  respondent_name?: string
  status: 'pending' | 'started' | 'completed'
  token: string
  sent_at: string
  started_at?: string
  completed_at?: string
}

export interface ResponseAnswer {
  id: string
  response_id: string
  question_id: string
  answer_text?: string
  answer_numeric?: number
  answer_json?: unknown
}
