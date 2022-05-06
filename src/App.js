/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from                  "react";
import { useSelector } from               'react-redux';
import { AnimatePresence, motion } from   "framer-motion";
import validator from                     'validator';
import Input from                         "./components/Input";
import Modal from                         "./components/Modal";
import ImageShow from                     "./components/ImageShow/ImageShow";
import ThreeDotsWave from                 "./components/Loading/ThreeDotsWave";
import Header from                        "./components/Header/Header";
import { randomImages } from              "./helper/randomImages";
import { useDispatch } from               "react-redux";
import { updateImage } from               "./actions/image";
import { compressFile } from              "./helper/compressFile";
import { predictFile, predictImage } from "./actions/modal";

function App() {
  const dispatch = useDispatch();
  const [base64, setbase64] = useState(null)
  const loading = useSelector((state) => state.modalReducer.loading);
  const openModal = useSelector((state) => state.modalReducer.openModal);
  let uploadedImage= null
  // Modal type
  const [modalType, setModalType] = useState("dropIn");

  // Notification text
  const [text, setText] = useState("");
  const handleText = (e) =>{
    setText(e.target.value)
    dispatch(updateImage(e.target.value))
  };

  const onImageFileChange= async (e) =>{

    if((e.target.files && e.target.files[0])) {
      uploadedImage= e.target.files[0]

      dispatch(updateImage(URL.createObjectURL(e.target.files[0])))

      const file = await compressFile(uploadedImage)
      setbase64(file[0].data);
    }
  }
  
  const predictImageFile = async () =>{
    console.log(base64.slice(0, 5));
    const formData = {
      "type": "1",
      "base64": base64,
      "int8": "false"
    }
    setModalType('result')
    dispatch(predictFile(formData))
  }

  const readFromClipboard = async ()=>{
    const clipboardText = await navigator.clipboard.readText();
    setText(clipboardText)
    dispatch(updateImage(clipboardText))
  }

  const validateUrl = () =>{
    if(text){
      if (validator.isURL(text)){
        if(!loading){
          const formData = {
            "url" : text,
            "int8" :"false",
            "type": "1"
          }
          setModalType('result')
          dispatch(predictImage(formData))
        }
      }
      else{
        setModalType('invalid')
        dispatch({type : "OPEN"})
      }
    }else{
      setModalType('emptyInput')
      dispatch({type : "OPEN"})
    }
  }

  return (
  <>
    <Header />
    <div id="left">
      <motion.main>
        <SubHeader text="Select File from local directory" />
        <input type="file" name="file" accept="image/*" className="input" onChange={onImageFileChange} /> 
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          onClick={predictImageFile}>
          Predict Local Image
        </motion.button> 
        <br />
        <SubHeader text="Enter image URL" />
        <Input
          placeHolder="Add image URL 🚀"
          value={text}
          onChange={handleText}
        />
        <br />
        <div className="predict-random">
          {  loading ? 
            <ThreeDotsWave/> :
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="add-button"
                onClick={validateUrl}>
                Predict
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="random-button"
                onClick={()=>{
                  var url=randomImages()
                  setText(url)
                  dispatch(updateImage(url))}}>
                Random Image
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="copy-button"
                onClick={readFromClipboard}>
                Copy From Clipboard
              </motion.button> 
            </>
          }
        </div>
      </motion.main>

      <ModalContainer>
        {openModal && (
          <Modal text={modalType} type = {modalType}/>
        )}
      </ModalContainer>

    </div>
    <div id='right'>
      <ImageShow />
    </div>
  </>
  );
}

const SubHeader = ({ text }) => <motion.h2 className="sub-header">{text}</motion.h2>;

const ModalContainer = ({ children }) => (
  <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
  >
    {children}
  </AnimatePresence>
);

export default App;