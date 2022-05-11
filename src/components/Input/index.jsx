const Input = ({ onChange, value, placeHolder, type="text" }) => {

  if (type === "text"){
    return (
      <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      className="input"
    />
    )
  }

  return (
    <input
    type="number"
    min={0}
    max={100}
    step={5}
    value={value}
    onChange={onChange}
    placeholder={placeHolder}
    className="input"
  />
  )

}

export default Input;
