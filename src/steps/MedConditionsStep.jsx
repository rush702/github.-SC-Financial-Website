import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const CONDITION_GROUPS = [
  {
    label: 'â¤ï¸ Cardiovascular',
    conditions: ['Heart Disease / Heart Attack', 'High Blood Pressure', 'High Cholesterol', 'Irregular Heartbeat / Arrhythmia', 'Congestive Heart Failure', 'Stroke / TIA', 'Blood Clots / DVT'],
  },
  {
    label: 'ðï¸ Cancer',
    conditions: ['Cancer (any type)', 'Currently in Remission'],
  },
  {
    label: 'ð©¸ Metabolic',
    conditions: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Thyroid Disorder', 'Obesity (BMI â¥ 40)'],
  },
  {
    label: 'ð« Respiratory',
    conditions: ['Asthma', 'COPD / Emphysema', 'Sleep Apnea', 'Pulmonary Fibrosis'],
  },
  {
    label: 'ð§  Mental Health',
    conditions: ['Depression', 'Anxiety Disorder', 'Bipolar Disorder', 'PTSD', 'Schizophrenia', 'Substance Abuse / Addiction'],
  },
  {
    label: 'â¡ Neurological',
    conditions: ['Epilepsy / Seizures', 'Multiple Sclerosis', 'Parkinson\'s Disease', 'Dementia / Alzheimer\'s'],
  },
  {
    label: 'ð¬ Other',
    conditions: ['HIV / AIDS', 'Kidney Disease', 'Liver Disease / Hepatitis', 'Lupus / Autoimmune', 'Crohn\'s / Colitis', 'Rheumatoid Arthritis'],
  },
]

export default function MedConditionsStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.conditions || [])
  const [noneFlag, setNoneFlag] = useState(selected.length === 0 && formData.conditions !== undefined)

  const toggle = (c) => {
    setNoneFlag(false)
    setSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const selectNone = () => {
    setSelected([])
    setNoneFlag(true)
  }

  const submit = () => onNext({ conditions: selected })

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">Any medical conditions?</h2>
      <p className="step-hint">Select all that apply. These are verified against your medical records during underwriting. Omissions may result in claim denial.</p>

      {CONDITION_GROUPS.map(group => (
        <div key={group.label} className="chip-section">
          <div className="chip-section-label">{group.label}</div>
          <div className="chip-wrap">
            {group.conditions.map(c => (
              <button
                key={c}
                className={`chip${selected.includes(c) ? ' selected' : ''}`}
                onClick={() => toggle(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="chip-wrap" style={{ marginTop: 8 }}>
        <button
          className={`chip none-chip${noneFlag ? ' selected' : ''}`}
          onClick={selectNone}
        >
          â None of the Above
        </button>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button
          className="btn-primary"
          onClick={submit}
          disabled={selected.length === 0 && !noneFlag}
        >
          Continue â
        </button>
      </div>
    </div>
  )
}
