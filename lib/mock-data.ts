import { Deal, Survey, SurveyResponse } from './supabase'

export const mockDeals: Deal[] = [
  { id: '1', organization_id: 'org1', deal_name: 'Acme Corp Enterprise', contact_name: 'Sarah Chen', contact_email: 'sarah@acme.com', stage: 'closed_won', value: 48000, competitor: 'Gong', source: 'Outbound', owner_id: 'u1', custom_fields: {}, created_at: '2026-01-10T10:00:00Z', updated_at: '2026-02-01T10:00:00Z', closed_at: '2026-02-01T10:00:00Z' },
  { id: '2', organization_id: 'org1', deal_name: 'BrightPath Solutions', contact_name: 'Marcus Rivera', contact_email: 'mrivera@brightpath.io', stage: 'closed_lost', value: 22000, competitor: 'Chorus', loss_reason: 'Pricing', source: 'Inbound', owner_id: 'u2', custom_fields: {}, created_at: '2026-01-15T10:00:00Z', updated_at: '2026-02-05T10:00:00Z', closed_at: '2026-02-05T10:00:00Z' },
  { id: '3', organization_id: 'org1', deal_name: 'TechNova Industries', contact_name: 'Jordan Blake', contact_email: 'jblake@technova.com', stage: 'negotiation', value: 95000, competitor: '', source: 'Partner', owner_id: 'u1', custom_fields: {}, created_at: '2026-01-20T10:00:00Z', updated_at: '2026-02-20T10:00:00Z' },
  { id: '4', organization_id: 'org1', deal_name: 'Vertex Dynamics', contact_name: 'Emma Schulz', contact_email: 'emma@vertexdyn.com', stage: 'proposal', value: 31000, competitor: 'Clari', source: 'Outbound', owner_id: 'u3', custom_fields: {}, created_at: '2026-01-25T10:00:00Z', updated_at: '2026-02-18T10:00:00Z' },
  { id: '5', organization_id: 'org1', deal_name: 'Meridian Health', contact_name: 'Tom Nguyen', contact_email: 'tnguyen@meridianhealth.org', stage: 'demo', value: 67000, competitor: '', source: 'Inbound', owner_id: 'u2', custom_fields: {}, created_at: '2026-02-01T10:00:00Z', updated_at: '2026-02-22T10:00:00Z' },
  { id: '6', organization_id: 'org1', deal_name: 'Summit Retail Group', contact_name: 'Priya Patel', contact_email: 'priya@summitretail.com', stage: 'closed_lost', value: 18000, competitor: 'Gong', loss_reason: 'Product Fit', source: 'Outbound', owner_id: 'u3', custom_fields: {}, created_at: '2026-01-05T10:00:00Z', updated_at: '2026-01-28T10:00:00Z', closed_at: '2026-01-28T10:00:00Z' },
  { id: '7', organization_id: 'org1', deal_name: 'Cascade Logistics', contact_name: 'Alex Kim', contact_email: 'akim@cascadelogistics.com', stage: 'closed_won', value: 54000, competitor: 'Salesloft', source: 'Referral', owner_id: 'u1', custom_fields: {}, created_at: '2026-01-08T10:00:00Z', updated_at: '2026-02-10T10:00:00Z', closed_at: '2026-02-10T10:00:00Z' },
  { id: '8', organization_id: 'org1', deal_name: 'BlueSky Financial', contact_name: 'Rachel Moore', contact_email: 'rmoore@bluesky.finance', stage: 'qualification', value: 28000, source: 'Inbound', owner_id: 'u2', custom_fields: {}, created_at: '2026-02-10T10:00:00Z', updated_at: '2026-02-25T10:00:00Z' },
  { id: '9', organization_id: 'org1', deal_name: 'Pinnacle Software', contact_name: 'David Torres', contact_email: 'dtorres@pinnaclesoft.com', stage: 'closed_won', value: 112000, competitor: 'Outreach', source: 'Partner', owner_id: 'u1', custom_fields: {}, created_at: '2025-12-01T10:00:00Z', updated_at: '2026-01-20T10:00:00Z', closed_at: '2026-01-20T10:00:00Z' },
  { id: '10', organization_id: 'org1', deal_name: 'NorthStar Analytics', contact_name: 'Lisa Chang', contact_email: 'lchang@northstar.ai', stage: 'prospecting', value: 42000, source: 'Outbound', owner_id: 'u3', custom_fields: {}, created_at: '2026-02-20T10:00:00Z', updated_at: '2026-02-26T10:00:00Z' },
]

export const mockSurveys: Survey[] = [
  { id: 's1', organization_id: 'org1', name: 'Closed Lost Analysis', description: 'Understand why deals are lost', status: 'active', type: 'loss', display_mode: 'one_per_page', branding: {}, is_anonymous: false, created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z' },
  { id: 's2', organization_id: 'org1', name: 'Closed Won Analysis', description: 'Learn what drives wins', status: 'active', type: 'win', display_mode: 'one_per_page', branding: {}, is_anonymous: false, created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z' },
  { id: 's3', organization_id: 'org1', name: 'Product Feedback', description: 'Collect product impressions', status: 'active', type: 'product_feedback', display_mode: 'all_at_once', branding: {}, is_anonymous: false, created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-15T10:00:00Z' },
  { id: 's4', organization_id: 'org1', name: 'NPS Quick Survey', description: 'Net Promoter Score check-in', status: 'draft', type: 'nps', display_mode: 'all_at_once', branding: {}, is_anonymous: true, created_at: '2026-01-10T10:00:00Z', updated_at: '2026-01-10T10:00:00Z' },
  { id: 's5', organization_id: 'org1', name: 'Sales Experience', description: 'Rate the buying experience', status: 'draft', type: 'custom', display_mode: 'one_per_page', branding: {}, is_anonymous: false, created_at: '2026-02-01T10:00:00Z', updated_at: '2026-02-01T10:00:00Z' },
]

export const mockResponses: SurveyResponse[] = [
  { id: 'r1', survey_id: 's1', deal_id: '2', organization_id: 'org1', respondent_email: 'mrivera@brightpath.io', respondent_name: 'Marcus Rivera', status: 'completed', token: 'tok1', sent_at: '2026-02-05T10:00:00Z', started_at: '2026-02-06T09:00:00Z', completed_at: '2026-02-06T09:08:00Z' },
  { id: 'r2', survey_id: 's1', deal_id: '6', organization_id: 'org1', respondent_email: 'priya@summitretail.com', respondent_name: 'Priya Patel', status: 'completed', token: 'tok2', sent_at: '2026-01-28T10:00:00Z', started_at: '2026-01-29T14:00:00Z', completed_at: '2026-01-29T14:12:00Z' },
  { id: 'r3', survey_id: 's2', deal_id: '1', organization_id: 'org1', respondent_email: 'sarah@acme.com', respondent_name: 'Sarah Chen', status: 'completed', token: 'tok3', sent_at: '2026-02-01T10:00:00Z', started_at: '2026-02-02T11:00:00Z', completed_at: '2026-02-02T11:09:00Z' },
  { id: 'r4', survey_id: 's2', deal_id: '7', organization_id: 'org1', respondent_email: 'akim@cascadelogistics.com', respondent_name: 'Alex Kim', status: 'pending', token: 'tok4', sent_at: '2026-02-10T10:00:00Z' },
  { id: 'r5', survey_id: 's3', deal_id: '9', organization_id: 'org1', respondent_email: 'dtorres@pinnaclesoft.com', respondent_name: 'David Torres', status: 'started', token: 'tok5', sent_at: '2026-01-20T10:00:00Z', started_at: '2026-01-21T16:00:00Z' },
  { id: 'r6', survey_id: 's1', deal_id: '2', organization_id: 'org1', respondent_email: 'mrivera@brightpath.io', respondent_name: 'Marcus Rivera', status: 'completed', token: 'tok6', sent_at: '2026-02-12T10:00:00Z', started_at: '2026-02-13T08:00:00Z', completed_at: '2026-02-13T08:07:00Z' },
]

export const mockWinRateData = [
  { month: 'Sep', winRate: 48, total: 21, won: 10 },
  { month: 'Oct', winRate: 52, total: 25, won: 13 },
  { month: 'Nov', winRate: 44, total: 18, won: 8 },
  { month: 'Dec', winRate: 58, total: 24, won: 14 },
  { month: 'Jan', winRate: 63, total: 27, won: 17 },
  { month: 'Feb', winRate: 60, total: 15, won: 9 },
]

export const mockLossReasons = [
  { reason: 'Pricing', count: 12, pct: 34 },
  { reason: 'Product Fit', count: 9, pct: 26 },
  { reason: 'Competitor', count: 7, pct: 20 },
  { reason: 'Timing / Budget', count: 5, pct: 14 },
  { reason: 'Other', count: 2, pct: 6 },
]

export const mockCompetitorData = [
  { competitor: 'Gong', wins: 4, losses: 6, winRate: 40 },
  { competitor: 'Chorus', wins: 5, losses: 3, winRate: 63 },
  { competitor: 'Clari', wins: 6, losses: 2, winRate: 75 },
  { competitor: 'Salesloft', wins: 3, losses: 4, winRate: 43 },
  { competitor: 'Outreach', wins: 7, losses: 1, winRate: 88 },
]

export const mockResponsesOverTime = [
  { month: 'Sep', responses: 8 },
  { month: 'Oct', responses: 14 },
  { month: 'Nov', responses: 11 },
  { month: 'Dec', responses: 19 },
  { month: 'Jan', responses: 24 },
  { month: 'Feb', responses: 16 },
]

export const mockTeamMembers = [
  { id: 'u1', full_name: 'Alex Johnson', email: 'alex@company.com', role: 'owner' as const, created_at: '2025-11-01T10:00:00Z' },
  { id: 'u2', full_name: 'Sam Patel', email: 'sam@company.com', role: 'admin' as const, created_at: '2025-11-15T10:00:00Z' },
  { id: 'u3', full_name: 'Taylor Kim', email: 'taylor@company.com', role: 'member' as const, created_at: '2025-12-01T10:00:00Z' },
]

export const SURVEY_TEMPLATES = [
  {
    name: 'Closed Lost Analysis',
    type: 'loss' as const,
    description: 'Understand why prospects chose a competitor or walked away',
    questions: [
      { question_text: 'What was the primary reason you chose not to move forward with us?', question_type: 'single_choice' as const, options: ['Pricing', 'Product Fit', 'Competitor', 'Timing / Budget', 'Internal Decision', 'Other'], is_required: true, category: 'other' as const },
      { question_text: 'Which competitor did you choose, if any?', question_type: 'open_text' as const, options: [], is_required: false, category: 'competitor' as const },
      { question_text: 'How would you rate your overall sales experience with us?', question_type: 'rating' as const, options: [], is_required: true, category: 'sales_experience' as const },
      { question_text: 'Any other insights you can share with our team?', question_type: 'open_text' as const, options: [], is_required: false, category: 'other' as const },
    ]
  },
  {
    name: 'Closed Won Analysis',
    type: 'win' as const,
    description: 'Learn what drove a prospect to choose you',
    questions: [
      { question_text: 'What was the primary reason you chose us?', question_type: 'single_choice' as const, options: ['Product Capabilities', 'Pricing', 'Sales Team', 'Reputation / Brand', 'Integrations', 'Other'], is_required: true, category: 'other' as const },
      { question_text: 'How would you rate your overall buying experience?', question_type: 'rating' as const, options: [], is_required: true, category: 'sales_experience' as const },
      { question_text: 'How likely are you to recommend us to a colleague?', question_type: 'nps' as const, options: [], is_required: true, category: 'other' as const },
      { question_text: 'What could we have done better during the sales process?', question_type: 'open_text' as const, options: [], is_required: false, category: 'sales_experience' as const },
    ]
  },
  {
    name: 'Product Feedback',
    type: 'product_feedback' as const,
    description: 'Gather structured product impressions and feature requests',
    questions: [
      { question_text: 'Rate your general impression of our product', question_type: 'rating' as const, options: [], is_required: true, category: 'product' as const },
      { question_text: 'Which features do you use most frequently?', question_type: 'multiple_choice' as const, options: ['Reporting', 'Integrations', 'Automation', 'API', 'Dashboard', 'Alerts'], is_required: true, category: 'product' as const },
      { question_text: 'What feature would you most like to see improved or added?', question_type: 'open_text' as const, options: [], is_required: true, category: 'product' as const },
      { question_text: 'How likely are you to recommend our product to others?', question_type: 'nps' as const, options: [], is_required: true, category: 'other' as const },
      { question_text: 'Any other insights you\'d like to share?', question_type: 'open_text' as const, options: [], is_required: false, category: 'other' as const },
    ]
  },
  {
    name: 'NPS Quick Survey',
    type: 'nps' as const,
    description: 'Fast net promoter score with context',
    questions: [
      { question_text: 'How likely are you to recommend us to a friend or colleague?', question_type: 'nps' as const, options: [], is_required: true, category: 'other' as const },
      { question_text: 'What\'s the main reason for your score?', question_type: 'open_text' as const, options: [], is_required: false, category: 'other' as const },
    ]
  },
  {
    name: 'Sales Experience',
    type: 'custom' as const,
    description: 'Evaluate the quality of the buying process',
    questions: [
      { question_text: 'How responsive was our sales team?', question_type: 'rating' as const, options: [], is_required: true, category: 'sales_experience' as const },
      { question_text: 'How well did we understand your needs?', question_type: 'rating' as const, options: [], is_required: true, category: 'sales_experience' as const },
      { question_text: 'Was the information provided during the sales process clear and helpful?', question_type: 'boolean' as const, options: [], is_required: true, category: 'sales_experience' as const },
      { question_text: 'What could we improve about the sales experience?', question_type: 'open_text' as const, options: [], is_required: false, category: 'sales_experience' as const },
    ]
  },
]
