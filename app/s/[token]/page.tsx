'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

const DEMO_SURVEY = {
  name: 'Closed Lost Analysis',
  branding: { color: '#1e2a4a', intro_text: "Hi there — we'd love to understand your decision better. This takes about 3 minutes.", thank_you_text: "Thank you for your feedback. It genuinely helps us improve." },
  questions: [
    { id: 'q1', question_text: 'What was the primary reason you chose not to move forward with us?', question_type: 'single_choice', options: ['Pricing', 'Product Fit', 'Competitor', 'Timing / Budget', 'Internal Decision', 'Other'], is_required: true },
    { id: 'q2', question_text: 'Which competitor did you choose, if any?', question_type: 'open_text', options: [], is_required: false },
    { id: 'q3', question_text: 'How would you rate your overall sales experience with us?', question_type: 'rating', options: [], is_required: true },
    { id: 'q4', question_text: 'Any other insights you can share with our team?', question_type: 'open_text', options: [], is_required: false },
  ]
}

type Answers = Record<string, string | number | string[]>

function RatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className={`w-12 h-12 rounded-lg border-2 font-semibold text-sm transition-all ${
            n <= (hover || value)
              ? 'border-[#1e2a4a] bg-[#1e2a4a] text-white'
              : 'border-slate-200 text-slate-400 hover:border-slate-300'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

function NPSInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex gap-1 mb-2">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`flex-1 py-2.5 rounded text-xs font-semibold border transition-all ${
              value === i
                ? i <= 6 ? 'bg-red-500 border-red-500 text-white'
                  : i <= 8 ? 'bg-amber-400 border-amber-400 text-white'
                  : 'bg-teal-500 border-teal-500 text-white'
                : i <= 6 ? 'border-red-200 text-red-400 hover:bg-red-50'
                  : i <= 8 ? 'border-amber-200 text-amber-500 hover:bg-amber-50'
                  : 'border-teal-200 text-teal-500 hover:bg-teal-50'
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>Not likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  )
}

export default function SurveyPage({ params }: { params: { token: string } }) {
  const survey = DEMO_SURVEY
  const [current, setCurrent] = useState(-1) // -1 = intro
  const [answers, setAnswers] = useState<Answers>({})
  const [completed, setCompleted] = useState(false)

  const questions = survey.questions
  const q = questions[current]
  const progress = current < 0 ? 0 : Math.round(((current + 1) / questions.length) * 100)
  const color = survey.branding.color || '#1e2a4a'

  const setAnswer = (qid: string, val: string | number | string[]) => {
    setAnswers(a => ({ ...a, [qid]: val }))
  }

  const canAdvance = !q?.is_required || answers[q?.id] !== undefined

  const next = () => {
    if (current < questions.length - 1) setCurrent(c => c + 1)
    else setCompleted(true)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: color }}>
            <Check size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Thank you!</h1>
          <p className="text-slate-500">{survey.branding.thank_you_text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Progress bar */}
      {current >= 0 && (
        <div className="h-1 bg-slate-200">
          <div className="h-1 transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-8 h-8 rounded-md mx-auto mb-4 flex items-center justify-center" style={{ background: color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
            </div>
            <p className="text-sm font-semibold" style={{ color }}>{survey.name}</p>
          </div>

          {/* Intro */}
          {current === -1 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
              <h1 className="text-xl font-bold text-slate-900 mb-3">We'd love your feedback</h1>
              <p className="text-slate-500 mb-8 leading-relaxed">{survey.branding.intro_text}</p>
              <p className="text-xs text-slate-400 mb-6">{questions.length} questions &bull; ~3 minutes</p>
              <button onClick={() => setCurrent(0)} className="px-8 py-3 text-white font-semibold rounded-lg transition-colors" style={{ background: color }}>
                Start Survey
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Question {current + 1} of {questions.length}</span>
                {!q.is_required && <span className="text-xs text-slate-400">Optional</span>}
              </div>

              <h2 className="text-lg font-semibold text-slate-900 mb-6 leading-snug">{q.question_text}</h2>

              {/* Question types */}
              {q.question_type === 'single_choice' && (
                <div className="space-y-2">
                  {q.options.map(opt => (
                    <button key={opt} onClick={() => setAnswer(q.id, opt)} className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${answers[q.id] === opt ? 'border-[--c] bg-[--c]/5 font-medium' : 'border-slate-200 hover:border-slate-300'}`} style={answers[q.id] === opt ? { borderColor: color, backgroundColor: `${color}10` } : {}}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.question_type === 'multiple_choice' && (
                <div className="space-y-2">
                  {q.options.map(opt => {
                    const selected = ((answers[q.id] as string[]) || []).includes(opt)
                    return (
                      <button key={opt} onClick={() => {
                        const curr = (answers[q.id] as string[]) || []
                        setAnswer(q.id, selected ? curr.filter(o => o !== opt) : [...curr, opt])
                      }} className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all flex items-center gap-3 ${selected ? 'font-medium' : 'border-slate-200 hover:border-slate-300'}`} style={selected ? { borderColor: color, backgroundColor: `${color}10` } : {}}>
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selected ? 'border-current' : 'border-slate-300'}`} style={selected ? { borderColor: color, background: color } : {}}>
                          {selected && <Check size={10} className="text-white" />}
                        </div>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}

              {q.question_type === 'open_text' && (
                <textarea
                  value={(answers[q.id] as string) || ''}
                  onChange={e => setAnswer(q.id, e.target.value)}
                  rows={4}
                  placeholder="Share your thoughts..."
                  className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-slate-400 resize-none"
                />
              )}

              {q.question_type === 'rating' && (
                <RatingInput value={(answers[q.id] as number) || 0} onChange={v => setAnswer(q.id, v)} />
              )}

              {q.question_type === 'nps' && (
                <NPSInput value={answers[q.id] !== undefined ? (answers[q.id] as number) : -1} onChange={v => setAnswer(q.id, v)} />
              )}

              {q.question_type === 'boolean' && (
                <div className="flex gap-3">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} onClick={() => setAnswer(q.id, opt)} className={`flex-1 py-4 rounded-lg border-2 font-semibold text-sm transition-all ${answers[q.id] === opt ? '' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`} style={answers[q.id] === opt ? { borderColor: color, backgroundColor: `${color}15`, color } : {}}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button onClick={() => setCurrent(c => c - 1)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled={current === 0}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button onClick={next} disabled={!canAdvance} className="flex items-center gap-1.5 px-6 py-2.5 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-40" style={{ background: color }}>
                  {current === questions.length - 1 ? 'Submit' : 'Next'}
                  {current < questions.length - 1 && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
