import React from 'react'

type SortParam = {
  data: any
  handleInput: (event: any) => void
}

function Sort({
  data,
  handleInput = () => null
}: SortParam) {
  return (
    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] mr-5">
      <input
        type="checkbox"
        value={data.isChecked}
        checked={data.isChecked}
        id={data.id} 
        onChange={handleInput}/>
      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor={data.id}>
        {data.name}
      </label>
    </div>
  )
}

export default React.memo(Sort)