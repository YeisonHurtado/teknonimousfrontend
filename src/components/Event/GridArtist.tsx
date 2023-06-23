import React from 'react'

interface Props {
    name_dj: string,
    stage_name: string
    onChange: (name: string, e: string) => void,
    onRemove: () => void,
    index:  number
}

const GridArtist = ({onChange, onRemove, name_dj, stage_name, index}: Props) => {
  return (
    <div className="form-grid">
    <div className="form-01-grid">
        <input 
        value={name_dj}
        placeholder='Artist name'
        onChange={e => onChange("name_dj", e.target.value)}
        className='form-01-input'
        id=''
        name={`artist_name_${index}`}
        
        />
    </div>
    <div className="form-01-grid">
        <input
        value={stage_name}
        placeholder='Stage name'
        className='form-01-input'
        onChange={(e)=>onChange("stage_name", e.target.value)}
        type="text"
        id=''
        name={`stage_name_${index}`}
        />
    </div>
    <div className="less" onClick={onRemove}>
        <strong>-</strong>
    </div>
</div>
  )
}

export default GridArtist