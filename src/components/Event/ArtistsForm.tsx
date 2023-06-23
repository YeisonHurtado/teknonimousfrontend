import React from 'react'
import GridArtist from './GridArtist'
import { DataDJ } from '../../interfaces/EventInterface'

interface Props {
  rows: DataDJ[],
  errorValidation: string,
  handleInputChange : (name: string, value: string, index?: number) => void,
  addRow: () => void,
  onRemove: (index:number) => void
}

const ArtistsForm = ({ rows, errorValidation, handleInputChange,  addRow,  onRemove }: Props) => {
  return (
    <div className="form-01-control">
      <div className="form-djs">
        <div className="title-form">
          <strong>Lineup</strong>
        </div>
        <div id='generated-dynamic'>
          {rows.map((row, index) => (
            <GridArtist
              {...row}
              index={index}
              onChange={(name, e) => handleInputChange(name, e, index)}
              onRemove={() => onRemove(index)}
              key={index}
            />
          ))}
        </div>
        {errorValidation && <span className='validationError'>{errorValidation}</span>}
        <div className="plus" onClick={addRow}>
          <strong>+</strong>
        </div>
      </div>
    </div>
  )
}
export default ArtistsForm