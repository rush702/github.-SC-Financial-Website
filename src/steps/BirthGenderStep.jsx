import { useState, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const GENDERS = [
  { value: 'Male',            icon: 'âï¸', sub: '' },
  { value: 'Female',          icon: 'âï¸', sub: '' },
  { value: 'Non-binary',      icon: 'â§ï¸', sub: '' },
  { value: 'Prefer not to say', icon: 'ð¤', sub: '' },
]

function getYears() {
  const now = new Date().getFullYear()
  const years = []
  for (let y = now - 18; y >= now - 100; y--) years.push(y)
  return years
}

export default function BirthGenderStep({ formData, onNext, onBack }) {
  const parts = formData.dob ? formData.dob.split('-') : ['', '', '']
  const [month,   setMonth]   = useState(parts[1] || '')
  const [day,     setDay]     = useState(parts[2] || '')
  const [year,    setYear]    = useState(parts[0] || '')
  const [gender,  setGender]  = useState(formData.gender)
  const [err,     setErr]     = useState('')

  const selectGender = (g) => {
    setGender(g)
    setErr('')
  }

  const submit = () => {
    if (!month || !day || !year) { setErr('Please complete your date of birth.'); return }
    if (!gender) { setErr('Please select your gender.'); return }
    const dob = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`
    const age = new Date().getFullYear() - parseInt(year)
    if (age < 18) { setErr('Applicant must be at least 18 years old.'); return }
    if (age > 85) { setErr('Applicant must be 85 years or younger.'); return }
    onNext({ dob, gender })
  }

  useEffect(() => {
    const h = (e) => { if (e.key === 'Enter') submit() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="step">
      <SectionBadge section="A" label="About You" />
      <h2 className="step-question">When were you born?</h2>
      <p className="step-hint">We need this to calculate your premium. You must be 18â85 years old to apply.</p>

      <div className="field-row three" style={{ marginBottom: 32 }}>
        <div className="field-group">
          <label className="field-label">Month</label>
          <select className="input" value={month} onChange={e => { setMonth(e.target.value); setErr('') }}>
            <option value="">Month</option>
            {MONTHS.map((m, i) => <option key={m} value={String(i+1).padStart(2,'0')}>{m}</option>)}
          </select>
        </div>
        <div className="field-group">
          <label className="field-label">Day</label>
          <select className="input" value={day} onChange={e => { setDay(e.target.value); setErr('') }}>
            <option value="">Day</option>
            {days.map(d => <option key={d} value={String(d).padStart(2,'0')}>{d}</option>)}
          </select>
        </div>
        <div className="field-group">
          <label className="field-label">Year</label>
          <select className="input" value={year} onChange={e => { setYear(e.target.value); setErr('') }}>
            <option value="">Year</option>
            {getYears().map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <h2 className="step-question" style={{ fontSize: 'clamp(1.4rem,3.5vw,2rem)', marginBottom: 8 }}>
        How do you identify?
      </h2>
      <p className="step-hint" style={{ marginBottom: 20 }}>Used for actuarial calculations. Required by insurers.</p>

      <div className="cards-grid four" style={{ marginBottom: 24 }}>
        {GENDERS.map(g => (
          <div
            key={g.value}
            className={`option-card${gender === g.value ? ' selected' : ''}`}
            onClick={() => selectGender(g.value)}
          >
            <span className="card-icon">{g.icon}</span>
            <span className="card-label">{g.value}</span>
          </div>
        ))}
      </div>

      {err && <div className="field-error">â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={submit} disabled={!month || !day || !year || !gender}>Continue â</button>
      </div>
    </div>
  )
}
