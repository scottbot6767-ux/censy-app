'use client'

import { useState } from 'react'
import { SURVEY_TEMPLATES } from '@/lib/mock-data'
import { ArrowLeft, Plus, GripVertical, Trash2, Eye, Layers, ChevronDown, ChevronUp, X } from 'lucide-react'
import Link from 'next/link'

const QUESTION_TYPES = [
  { value: 'rating', label: 'Rating (1–5)' },
  { value: 'nps', label: 'NPS (0–10)' },
  { value: 'single_choice', label: 'Single Choice' },
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'open_text', label: 'Open Text' },
  { value: 'boolean', label: 'Yes / No' },
]

const CATEGORIES = ['product', 'pricing', 'sales_experience', 'competitor', 'support', 'other']

interface Question {
  id: string; question_text: string; question_type: string; options: string[]
  is_required: boolean; category: string; expanded?: boolean
}

export default function NewSurveyPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('custom')
  const [displayMode, setDisplayMode] = useState<'one_per_page' | 'all_at_once'>('one_per_page')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [activeTab, setActiveTab] = useState<'questions' | 'branding'>('questions')

  const addQuestion = (type = 'open_text') => {
    setQuestions(q => [...q, {
      id: Math.random().toString(36).slice(2),
      question_text: '',
      question_type: type,
      options: [],
      is_required: true,
      category: 'other',
      expanded: true,
    }])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(q => q.map(item => item.id === id ? { ...item, ...updates } : item))
  }

  const removeQuestion = (id: string) => {
    setQuestions(q => q.filter(item => item.id !== id))
  }

  const loadTemplate = (template: typeof SURVEY_TEMPLATES[0]) => {
    setName(template.name)
    setDescription(template.description)
    setType(template.type)
    setQuestions(template.questions.map(q => ({ ...q, id: Math.random().toString(36).slice(2), expanded: false })))
    setShowTemplates(false)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="h-12 flex items-center gap-3 px-6 border-b border-slate-200 bg-white shrink-0">
        <Link href="/dashboard/surveys" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={14} /> Surveys
        </Link>
        <span className="text-slate-300">/</span>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Untitled Survey" className="text-sm font-medium text-slate-900 outline-none border-b border-transparent focus:border-slate-300 pb-0.5" />
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setShowTemplates(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
            <Layers size={13} /> Templates
          </button>
          <button className="px-3 py-1.5 text-sm text-white bg-[#1e2a4a] rounded-md hover:bg-[#2a3a5e]">Save Survey</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Settings */}
        <div className="w-64 border-r border-slate-200 bg-white p-4 overflow-y-auto shrink-0">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Survey Settings</h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="What is this survey for?" className="w-full text-xs border border-slate-200 rounded-md p-2 outline-none focus:border-indigo-300 resize-none" />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Survey Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full text-xs border border-slate-200 rounded-md p-2 outline-none cursor-pointer">
                <option value="win">Win Analysis</option>
                <option value="loss">Loss Analysis</option>
                <option value="product_feedback">Product Feedback</option>
                <option value="nps">NPS</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Display Mode</label>
              <div className="flex rounded-md border border-slate-200 overflow-hidden text-xs">
                {(['one_per_page', 'all_at_once'] as const).map(m => (
                  <button key={m} onClick={() => setDisplayMode(m)} className={`flex-1 py-1.5 ${displayMode === m ? 'bg-[#1e2a4a] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                    {m === 'one_per_page' ? 'One / page' : 'All at once'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-600">Anonymous responses</label>
              <button onClick={() => setIsAnonymous(!isAnonymous)} className={`w-8 h-4 rounded-full transition-colors relative ${isAnonymous ? 'bg-teal-500' : 'bg-slate-200'}`}>
                <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${isAnonymous ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel — Questions */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {/* Tab bar */}
          <div className="flex gap-1 mb-4 border-b border-slate-200">
            {(['questions', 'branding'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? 'border-[#1e2a4a] text-[#1e2a4a]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'questions' ? (
            <div className="space-y-3 max-w-2xl">
              {questions.map((q, i) => (
                <div key={q.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 cursor-pointer" onClick={() => updateQuestion(q.id, { expanded: !q.expanded })}>
                    <GripVertical size={14} className="text-slate-300 shrink-0" />
                    <span className="text-xs text-slate-400 w-5 shrink-0">{i + 1}.</span>
                    <p className="text-sm text-slate-700 flex-1 truncate">{q.question_text || <span className="text-slate-400 italic">Empty question</span>}</p>
                    <span className="text-xs text-slate-400 shrink-0">{QUESTION_TYPES.find(t => t.value === q.question_type)?.label}</span>
                    {q.expanded ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
                    <button onClick={(e) => { e.stopPropagation(); removeQuestion(q.id) }} className="text-slate-300 hover:text-red-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {q.expanded && (
                    <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Question text</label>
                        <input value={q.question_text} onChange={e => updateQuestion(q.id, { question_text: e.target.value })} placeholder="Type your question..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-500 mb-1 block">Type</label>
                          <select value={q.question_type} onChange={e => updateQuestion(q.id, { question_type: e.target.value })} className="w-full text-xs border border-slate-200 rounded-md p-2 outline-none cursor-pointer">
                            {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 mb-1 block">Category</label>
                          <select value={q.category} onChange={e => updateQuestion(q.id, { category: e.target.value })} className="w-full text-xs border border-slate-200 rounded-md p-2 outline-none cursor-pointer capitalize">
                            {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c.replace('_', ' ')}</option>)}
                          </select>
                        </div>
                      </div>
                      {['single_choice', 'multiple_choice'].includes(q.question_type) && (
                        <div>
                          <label className="text-xs text-slate-500 mb-1 block">Options (one per line)</label>
                          <textarea value={q.options.join('\n')} onChange={e => updateQuestion(q.id, { options: e.target.value.split('\n').filter(Boolean) })} rows={4} className="w-full text-xs border border-slate-200 rounded-md p-2 outline-none focus:border-indigo-300 resize-none" placeholder="Option A&#10;Option B&#10;Option C" />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id={`req-${q.id}`} checked={q.is_required} onChange={e => updateQuestion(q.id, { is_required: e.target.checked })} className="rounded" />
                        <label htmlFor={`req-${q.id}`} className="text-xs text-slate-500">Required</label>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-2">
                <button onClick={() => addQuestion()} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 border-2 border-dashed border-slate-200 rounded-lg hover:border-slate-300 hover:bg-white transition-all w-full justify-center">
                  <Plus size={14} /> Add Question
                </button>
              </div>

              {questions.length === 0 && (
                <div className="text-center py-16 text-slate-400 text-sm">
                  <Layers size={32} className="mx-auto mb-3 opacity-30" />
                  <p>Start by adding questions or loading a template</p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-lg space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-medium text-slate-900">Branding</h3>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Logo URL</label>
                  <input type="url" placeholder="https://..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Brand Color</label>
                  <input type="color" defaultValue="#1e2a4a" className="w-10 h-8 rounded border border-slate-200 cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Intro text</label>
                  <textarea rows={2} placeholder="Hi there! We'd love your feedback..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 resize-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Thank you text</label>
                  <textarea rows={2} placeholder="Thank you! Your response means a lot." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-indigo-300 resize-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel — Preview */}
        <div className="w-72 border-l border-slate-200 bg-white p-4 overflow-y-auto shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={13} className="text-slate-400" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Preview</h3>
          </div>
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 min-h-40">
            <p className="text-xs font-semibold text-[#1e2a4a] mb-3">{name || 'Untitled Survey'}</p>
            {questions.slice(0, 3).map((q, i) => (
              <div key={q.id} className="mb-3 pb-3 border-b border-slate-200 last:border-0">
                <p className="text-xs text-slate-600 mb-1">{i + 1}. {q.question_text || 'Empty question'}</p>
                {q.question_type === 'rating' && (
                  <div className="flex gap-1">{[1,2,3,4,5].map(n => <div key={n} className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center text-xs text-slate-400">{n}</div>)}</div>
                )}
                {q.question_type === 'nps' && (
                  <div className="flex gap-0.5">{Array.from({length: 11}, (_, n) => <div key={n} className="flex-1 text-center py-1 rounded text-xs border border-slate-200" style={{fontSize:'9px'}}>{n}</div>)}</div>
                )}
                {q.question_type === 'boolean' && (
                  <div className="flex gap-2"><div className="flex-1 text-center py-1 bg-teal-50 text-teal-700 rounded text-xs border border-teal-200">Yes</div><div className="flex-1 text-center py-1 bg-red-50 text-red-600 rounded text-xs border border-red-200">No</div></div>
                )}
                {['single_choice', 'multiple_choice'].includes(q.question_type) && q.options.slice(0,3).map(opt => (
                  <div key={opt} className="flex items-center gap-1.5 mb-1"><div className="w-3 h-3 rounded-full border border-slate-300" /><span className="text-xs text-slate-500">{opt}</span></div>
                ))}
                {q.question_type === 'open_text' && <div className="h-8 rounded border border-slate-200 bg-white text-xs text-slate-400 px-2 flex items-center">Your answer...</div>}
              </div>
            ))}
            {questions.length === 0 && <p className="text-xs text-slate-400 text-center py-8">Add questions to see a preview</p>}
            {questions.length > 3 && <p className="text-xs text-slate-400 text-center">+{questions.length - 3} more questions</p>}
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">Survey Templates</h2>
              <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto p-5 space-y-3">
              {SURVEY_TEMPLATES.map(template => (
                <button key={template.name} onClick={() => loadTemplate(template)} className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                  <p className="font-medium text-slate-900 text-sm mb-0.5">{template.name}</p>
                  <p className="text-xs text-slate-500 mb-2">{template.description}</p>
                  <p className="text-xs text-slate-400">{template.questions.length} questions</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
