import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const TOBACCO_TYPES = ['Cigarettes', 'Cigars', 'Pipe', 'Chewing Tobacco', 'Vaping/E-Cigarettes', 'Nicotine Patch/Gum', 'Other']
const FREQS = ['Daily', 'Several times/week', 'Occasionally', 'Rarely']

export default function TobaccoStep({ formData, onNext, onBack }) {
  const [use,   setUse]   = useState(formData.tobacco)
  const [type,  setType]  = useState(formData.tobaccoType)
  const [freq,  setFreq]  = useState(formData.tobaccoFreq)
  const [quit,  setQuit]  = useState(formData.tobaccoQuit)

  const choose = (v) => {
    setUse(v)
    if (v === 'No') {
      setTimeout(() => onNext({ tobacco: 'No', tobaccoType: '', tobaccoFreq: '', tobaccoQuit: '' }), 380)
    }
  }

  const submit = () => {
    onNext({ tobacco: use, tobaccoType: type, tobaccoFreq: freq, tobaccoQuit: quit })
  }

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">Do you use tobacco or nicotine?</h2>
      <p className="step-hint">Includes cigarettes, cigars, vaping, chewing tobacco, or any nicotine products in the last 5 years. Honest answers matter â misrepresentation can void your policy.</p>

      <div className="cards-grid two" style={{ marginBottom: 24 }}>
        {['Yes', 'No'].map(v => (
          <div
            key={v}
            className={`option-card large${use === v ? ' selected' : ''}`}
            onClick={() => choose(v)}
          >
            <span className="card-icon">{v === 'Yes' ? 'ð¬' : 'â'}</span>
            <span className="card-label">{v}</span>
          </div>
        ))}
      </div>

      {use === 'Yes' && (
        <div className="reveal-panel">
          <div className="field-group">
            <label className="field-label">Type of Tobacco/Nicotine</label>
            <div className="chip-wrap">
              {TOBACCO_TYPES.map(t => (
                <button key={t} className={`chip${type === t ? ' selected' : ''}`} onClick={() => setType(t)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">How often?</label>
            <div className="chip-wrap">
              {FREQS.map(f => (
                <button key={f} className={`chip${freq === f ? ' selected' : ''}`} onClick={() => setFreq(f)}>{f}</button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Quit Date (if former user)</label>
            <input className="input" type="month" value={quit}
              onChange={e => setQuit(e.target.value)}
              style={{ maxWidth: 240 }} />
            <p className="field-hint">Leave blank if you are still an active user.</p>
          </div>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        {use && use !== 'No' && (
          <button className="btn-primary" onClick={submit}>Continue â</button>
        )}
      </div>
    </div>
  )
}
