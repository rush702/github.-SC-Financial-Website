import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function CriminalStep({ formData, onNext, onBack }) {
  const [answer, setAnswer] = useState(formData.felony)

  const choose = (v) => {
    setAnswer(v)
    setTimeout(() => onNext({ felony: v }), 380)
  }

  return (
    <div className="step">
      <SectionBadge section="D" label="Lifestyle" />
      <h2 className="step-question">Any felony convictions?</h2>
      <p className="step-hint">
        Have you been convicted of a felony in the last 10 years? This is required by most insurers and is verified through background screening. Answering honestly will not automatically disqualify you.
      </p>

      <div className="info-box">
        <span className="info-box-icon">â¹ï¸</span>
        <span>A prior felony does not automatically disqualify you. Each case is reviewed individually during underwriting.</span>
      </div>

      <div className="cards-grid two">
        {['Yes', 'No'].map(v => (
          <div
            key={v}
            className={`option-card large${answer === v ? ' selected' : ''}`}
            onClick={() => choose(v)}
          >
            <span className="card-icon">{v === 'Yes' ? 'âï¸' : 'â'}</span>
            <span className="card-label">{v}</span>
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
      </div>
    </div>
  )
}
