import * as React from "react";

import styled from "styled-components";

import {
  AnimateSharedLayout,
  motion
} from "framer-motion";

const inferenceOptions = [
    { name: "fp-16", value: "False", default: true },
    { name: "int8", value: "True" },
];

const modelOptions = [
  { name: "Custom Model 1", value: "1", default: true },
  { name: "Custom Model 2", value: "2" },
  { name: "Custom Model 3", value: "3" },
  { name: "Yolov5s", value: "4" }
];

function ButtonGroup({ options, onChange, name, labelId }) {
  const [isSelected, setSelected] = React.useState(
    options.find((o) => o.default).value
  );
  function onChangeRadio(e) {
    setSelected(e.target.value);
    onChange(e);
  }
  return (
    <ButtonContainer id={labelId} onChange={(e) => onChangeRadio(e)}>
      <AnimateSharedLayout>
        {options.map((option) => (
          <React.Fragment key={option.name}>
            <motion.input
              className="radio-input"
              type="radio"
              id={option.value}
              value={option.value}
              name={name}
              defaultChecked={option.default}
            />
            <motion.label
              className="motion-label"
              htmlFor={option.value}
              key={option.value}
              initial={false}
              animate={{
                visibility: "visible"
              }}
            >
              {isSelected === option.value && (
                <motion.div
                  className="radio-div"
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
            </motion.label>
          </React.Fragment>
        ))}
      </AnimateSharedLayout>
    </ButtonContainer>
  );
}

export default function RadioButtons ({setModel, setInference}) {
  function onChangeInference(e) {
    setInference(e.target.value);
  }
  function onChangeModel(e) {
    setModel(e.target.value);
  }

  return (
    <>
      <ButtonGroup onChange={onChangeInference} options={inferenceOptions} name="inference" />
      <br/>
      <ButtonGroup
        onChange={onChangeModel}
        options={modelOptions}
        name="model"
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
  background-color: linear-gradient(10deg, #ffaa00, #ff6a00);
  border: 2px solid linear-gradient(15deg, #04ea00, #00d17d);
  backdrop-filter: blur(30px);
  justify-content: space-around;
  align-items: center;
  input:checked + label {
    color: #25b84f;
  }
  input:disabled + label {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    transition: all 0.6s ease-in-out;
    color: red;
    border: 2px 1px solid white;
    cursor: not-allowed;
  }
  @media (min-width: 768px) {
    height: 3.5rem;
  }
`;

