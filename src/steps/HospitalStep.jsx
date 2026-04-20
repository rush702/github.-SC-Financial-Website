import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function HospitalStep({ formData, onNext, onBack }) {
  const [hosp,    setHosp]    = useState(formData.hospitalized)
  const [details, setDetails] = useState(formData.hospitalDetails)

  const choose = (v) => {
    setHosp(v)
    if (v === 'No') {
      setTimeout(() => onNext({ hospitalized: 'No', hospitalDetails: '' }), 380)
    }
  }

  const submit = () => onNext({ hospitalized: hosp, hospitalDetails: details })

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">Any hospitalizations in the last 5 years?</h2>
      <p className="step-hint">Includes overnight stays, surgeries, ER visits resulting in admission, or inpatient treatment.</p>

      <div className="cards-grid two" style={{ marginBottom: 24 }}>
        {['Yes', 'No'].map(v => (
          <div
            key={v}
            className={`option-card large${hosp === v ? ' selected' : ''}`}
            onClick={() => choose(v)}
          >
            <span className="card-icon">{v === 'Yes' ? 'ð¥' : 'â'}</span>
            <span className="card-label">{v}</span>
          </div>
        ))}
      </div>

      {hosp === 'Yes' && (
        <div className="reveal-panel">
          <label className="field-label">Please describe each hospitalization</label>
          <p className="field-hint" style={{ marginBottom: 10 }}>
            Include approximate date, reason/diagnosis, and treatment received (e.g., "March 2023 â Appendectomy, 2-day stay").
          </p>
          <textarea
            className="input"
            rows={4}
            placeholder={"March 2023 â Appendectomy, 2-day stay\nJuly 2022 â Chest pain evaluation, discharged same day\n..."}
            value={details}
            onChange={e => setDetails(e.target.value)}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        {hosp === 'Yes' && (
          <button className="btn-primary" onClick={submit}>Continue â</button>
        )}
      </div>
    </div>
  )
}
