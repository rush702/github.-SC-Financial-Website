import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function MedicationsStep({ formData, onNext, onBack }) {
  const [hasMeds, setHasMeds] = useState(formData.medications)
  const [list,    setList]    = useState(formData.medicationsList)

  const choose = (v) => {
    setHasMeds(v)
    if (v === 'No') {
      setTimeout(() => onNext({ medications: 'No', medicationsList: '' }), 380)
    }
  }

  const submit = () => onNext({ medications: hasMeds, medicationsList: list })

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">Are you on any prescriptions?</h2>
      <p className="step-hint">
        Current prescription medications are cross-verified with <strong>Milliman IntelliScript</strong> (prescription database). Please be complete and accurate.
      </p>

      <div className="cards-grid two" style={{ marginBottom: 24 }}>
        {['Yes', 'No'].map(v => (
          <div
            key={v}
            className={`option-card large${hasMeds === v ? ' selected' : ''}`}
            onClick={() => choose(v)}
          >
            <span className="card-icon">{v === 'Yes' ? 'ð' : 'â'}</span>
            <span className="card-label">{v}</span>
          </div>
        ))}
      </div>

      {hasMeds === 'Yes' && (
        <div className="reveal-panel">
          <label className="field-label">List your current medications</label>
          <p className="field-hint" style={{ marginBottom: 10 }}>
            Include medication name, dosage, and what it's prescribed for (e.g., "Metformin 500mg â Type 2 Diabetes").
          </p>
          <textarea
            className="input"
            rows={5}
            placeholder={"Metformin 500mg â Type 2 Diabetes\nLisinopril 10mg â High blood pressure\n..."}
            value={list}
            onChange={e => setList(e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        {hasMeds === 'Yes' && (
          <button className="btn-primary" onClick={submit}>Continue â</button>
        )}
      </div>
    </div>
  )
}
