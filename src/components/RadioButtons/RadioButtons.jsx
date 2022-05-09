import * as React from "react";

import styled from "styled-components";

import {
  AnimateSharedLayout,
  motion
} from "framer-motion";

const coffeeOptions = [
    { name: "fp-16", value: "false", default: true },
    { name: "int8", value: "true" },
];

const rickOptions = [
  { name: "Custom Model 1", value: "1", default: true },
  { name: "Custom Model 2", value: "2" },
  { name: "Custom Model 3", value: "3" },
  { name: "Yolov5s", value: "4" }
];

function ButtonGroup(props) {
  const { options, onChange, name } = props;
  const [isSelected, setSelected] = React.useState(
    options.find((o) => o.default).value
  );
  function onChangeRadio(e) {
    setSelected(e.target.value);
    onChange(e);
  }
  return (
    <ButtonContainer id={props.labelId} onChange={(e) => onChangeRadio(e)}>
      <AnimateSharedLayout>
        {options.map((option) => (
          <React.Fragment key={option.name}>
            <Input
              type="radio"
              id={option.value}
              value={option.value}
              name={name}
              defaultChecked={option.default}
            />
            <InputLabel
              htmlFor={option.value}
              key={option.value}
              initial={false}
              animate={{
                visibility: "visible"
              }}
            >
              {isSelected === option.value && (
                <InputBackground
                  layoutId="radioBackground"
                  animate={{
                    backgroundColor: "#fff"
                  }}
                  transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    />
              )}
              {option.name}
            </InputLabel>
          </React.Fragment>
        ))}
      </AnimateSharedLayout>
    </ButtonContainer>
  );
}

export default function RadioButtons () {
  function onChange(e) {
    console.log(e.target.value);
  }
  return (
    <>
      <ButtonGroup onChange={onChange} options={coffeeOptions} name="coffee" />
      <br/>
      <ButtonGroup
        onChange={onChange}
        options={rickOptions}
        name="rickandmorty"
      />
    </>
  );
};
const ButtonContainer = styled(motion.div)`
position: relative;
grid-column: span 4;
display: flex;
width: 100%;
  height: 3rem;
  border-radius: 8px;
  border: 2px solid rgba(226, 53, 128, 0.5);
  background-color: rgba(226, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  justify-content: space-around;
  align-items: center;
  input:checked + label {
    color: #0a0a0a;
  }
  input:disabled + label {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    transition: all 0.6s ease-in-out;
    color: white;
    border: 2px 1px solid white;
    cursor: not-allowed;
  }
  @media (min-width: 768px) {
    height: 3.5rem;
  }
`;
const Input = styled(motion.input)`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;
`;
const InputLabel = styled(motion.label)`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
  text-align: center;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  z-index: 2;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  user-select: none;
  position: relative;
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
const InputBackground = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 3px;
  left: 1px;
  right: 1px;
  bottom: 3px;
  border-radius: 6px;
  z-index: -1;
`;
