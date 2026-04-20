import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

const RELATIONS = ['Spouse / Partner', 'Child', 'Parent', 'Sibling', 'Grandchild', 'Friend', 'Trust', 'Estate', 'Charity', 'Other']

export default function BeneficiaryStep({ formData, onNext, onBack }) {
  const [name,     setName]     = useState(formData.beneName)
  const [relation, setRelation] = useState(formData.beneRelation)
  const [dob,      setDob]      = useState(formData.beneDob)
  const [pct,      setPct]      = useState(formData.benePercent || '100')
  const [err,      setErr]      = useState('')
  const ref = useRef(null)

  useEffect(() => { ref.current?.focus() }, [])

  const submit = () => {
    if (!name.trim()) { setErr('Please enter the beneficiary\'s full name.'); return }
    if (!relation) { setErr('Please select the relationship.'); return }
    onNext({ beneName: name.trim(), beneRelation: relation, beneDob: dob, benePercent: pct })
  }

  return (
    <div className="step">
      <SectionBadge section="F" label="Beneficiaries" />
      <h2 className="step-question">Who is your primary beneficiary?</h2>
      <p className="step-hint">The primary beneficiary receives the death benefit. You can add a contingent (backup) beneficiary on the next screen.</p>

      <div className="field-group">
        <label className="field-label">Full Legal Name <span className="req">*</span></label>
        <input ref={ref} className="input large" placeholder="Jane Smith" value={name}
          onChange={e => { setName(e.target.value); setErr('') }}
          onKeyDown={e => { if (e.key === 'Enter') submit() }} />
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Relationship <span className="req">*</span></label>
          <select className="input" value={relation} onChange={e => { setRelation(e.target.value); setErr('') }}>
            <option value="">Selectâ¦</option>
            {RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="field-group">
          <label className="field-label">Date of Birth</label>
          <input className="input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
        </div>
      </div>

      <div className="field-group" style={{ maxWidth: 220 }}>
        <label className="field-label">Benefit Percentage</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input className="input" type="number" min={1} max={100} value={pct}
            onChange={e => setPct(e.target.value)} />
          <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '1.2rem' }}>%</span>
        </div>
        <p className="field-hint">Total across all beneficiaries must equal 100%.</p>
      </div>

      {err && <div className="field-error">â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <div className="step-actions-right">
          <span className="enter-hint">press <kbd>Enter</kbd></span>
          <button className="btn-primary" onClick={submit} disabled={!name.trim() || !relation}>Continue â</button>
        </div>
      </div>
    </div>
  )
}
