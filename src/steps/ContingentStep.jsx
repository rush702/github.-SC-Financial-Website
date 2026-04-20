import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

const RELATIONS = ['Spouse / Partner', 'Child', 'Parent', 'Sibling', 'Grandchild', 'Friend', 'Trust', 'Estate', 'Charity', 'Other']

export default function ContingentStep({ formData, onNext, onBack }) {
  const [skip,     setSkip]     = useState(!formData.contingentName)
  const [name,     setName]     = useState(formData.contingentName)
  const [relation, setRelation] = useState(formData.contingentRelation)
  const [dob,      setDob]      = useState(formData.contingentDob)
  const [pct,      setPct]      = useState(formData.contingentPercent || '')
  const ref = useRef(null)

  useEffect(() => { if (!skip) ref.current?.focus() }, [skip])

  const skipStep = () =>
    onNext({ contingentName: '', contingentRelation: '', contingentDob: '', contingentPercent: '' })

  const submit = () => {
    if (!name.trim() || !relation) return
    onNext({ contingentName: name.trim(), contingentRelation: relation, contingentDob: dob, contingentPercent: pct })
  }

  return (
    <div className="step">
      <SectionBadge section="F" label="Beneficiaries" />
      <h2 className="step-question">Add a contingent beneficiary?</h2>
      <p className="step-hint">A contingent (backup) beneficiary receives the benefit if your primary predeceases you. Optional.</p>

      {skip ? (
        <div className="info-box">
          <span className="info-box-icon">ð¡</span>
          <span>Adding a contingent beneficiary is strongly recommended to ensure your benefit always reaches the right person.</span>
        </div>
      ) : (
        <>
          <div className="field-group">
            <label className="field-label">Full Legal Name <span className="req">*</span></label>
            <input ref={ref} className="input large" placeholder="John Smith" value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submit() }} />
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="field-label">Relationship <span className="req">*</span></label>
              <select className="input" value={relation} onChange={e => setRelation(e.target.value)}>
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
          </div>
        </>
      )}

      {/* single action bar â always rendered once */}
      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        {skip ? (
          <>
            <button className="btn-secondary" onClick={() => setSkip(false)}>Add Beneficiary</button>
            <button className="btn-primary" onClick={skipStep}>Skip â</button>
          </>
        ) : (
          <>
            <button className="btn-secondary" onClick={skipStep}>Skip</button>
            <button className="btn-primary" onClick={submit} disabled={!name.trim() || !relation}>Continue â</button>
          </>
        )}
      </div>
    </div>
  )
}
