-- Censy Initial Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  brand_color text DEFAULT '#1e2a4a',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  role text CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
  organization_id uuid REFERENCES organizations(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  deal_name text NOT NULL,
  contact_name text,
  contact_email text,
  stage text CHECK (stage IN ('prospecting','qualification','demo','proposal','negotiation','closed_won','closed_lost')) DEFAULT 'prospecting',
  value numeric(12,2),
  competitor text,
  loss_reason text,
  source text,
  owner_id uuid REFERENCES users(id),
  custom_fields jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  closed_at timestamptz
);

CREATE TABLE surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  name text NOT NULL,
  description text,
  status text CHECK (status IN ('draft','active','archived')) DEFAULT 'draft',
  type text CHECK (type IN ('win','loss','product_feedback','nps','custom')) DEFAULT 'custom',
  display_mode text CHECK (display_mode IN ('one_per_page','all_at_once')) DEFAULT 'one_per_page',
  branding jsonb DEFAULT '{}',
  is_anonymous boolean DEFAULT false,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE survey_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE NOT NULL,
  sort_order integer NOT NULL,
  question_text text NOT NULL,
  question_type text CHECK (question_type IN ('rating','nps','single_choice','multiple_choice','open_text','boolean')) NOT NULL,
  options jsonb DEFAULT '[]',
  is_required boolean DEFAULT true,
  category text CHECK (category IN ('product','pricing','sales_experience','competitor','support','other')) DEFAULT 'other'
);

CREATE TABLE survey_triggers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) ON DELETE CASCADE NOT NULL,
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  trigger_type text CHECK (trigger_type IN ('stage_change','field_update','manual','webhook')) NOT NULL,
  trigger_config jsonb NOT NULL DEFAULT '{}',
  delay_minutes integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id uuid REFERENCES surveys(id) NOT NULL,
  deal_id uuid REFERENCES deals(id),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  respondent_email text,
  respondent_name text,
  status text CHECK (status IN ('pending','started','completed')) DEFAULT 'pending',
  token text UNIQUE NOT NULL,
  sent_at timestamptz DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

CREATE TABLE response_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid REFERENCES survey_responses(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES survey_questions(id) NOT NULL,
  answer_text text,
  answer_numeric numeric,
  answer_json jsonb
);

CREATE TABLE integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  provider text CHECK (provider IN ('salesforce','hubspot','webhook')) NOT NULL,
  status text CHECK (status IN ('connected','disconnected','error')) DEFAULT 'disconnected',
  config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  last_synced_at timestamptz
);

CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  key_hash text NOT NULL,
  name text NOT NULL,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- RLS Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Users can only see their own org's data
CREATE POLICY "org_isolation" ON deals FOR ALL USING (
  organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
);
CREATE POLICY "org_isolation" ON surveys FOR ALL USING (
  organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
);
CREATE POLICY "org_isolation" ON survey_responses FOR ALL USING (
  organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
);
-- Survey responses are readable by token (for public survey page)
CREATE POLICY "token_access" ON survey_responses FOR SELECT USING (true);
