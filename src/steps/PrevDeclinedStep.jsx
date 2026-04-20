import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function PrevDeclinedStep({ formData, onNext, onBack }) {
  const [answer, setAnswer] = useState(formData.prevDeclined)

  const choose = (v) => {
    setAnswer(v)
    setTimeout(() => onNext({ prevDeclined: v }), 380)
  }

  return (
    <div className="step">
      <SectionBadge section="E" label="Current Coverage" />
      <h2 className="step-question">Ever been declined for life insurance?</h2>
      <p className="step-hint">
        Have you ever been declined, rated up, or had an application withdrawn by a life insurance company? This is reported to the <strong>MIB (Medical Information Bureau)</strong> and will be cross-checked.
      </p>

      <div className="info-box">
        <span className="info-box-icon">â¹ï¸</span>
        <span>A previous decline does not automatically disqualify you from this application. Your history is reviewed holistically.</span>
      </div>

      <div className="cards-grid two">
        {['Yes', 'No'].map(v => (
          <div
            key={v}
            className={`option-card large${answer === v ? ' selected' : ''}`}
            onClick={() => choose(v)}
          >
            <span className="card-icon">{v === 'Yes' ? 'ð' : 'â'}</span>
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
