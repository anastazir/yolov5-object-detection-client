/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from                  "react";
import { useSelector } from               'react-redux';
import { AnimatePresence, motion } from   "framer-motion";
import validator from                     'validator';

import Input from                         "./components/Input";
import ImageShow from                     "./components/ImageShow/ImageShow";
import ThreeDotsWave from                 "./components/Loading/ThreeDotsWave";
import Header from                        "./components/Header/Header";
import { randomImages } from              "./helper/randomImages";
import { useDispatch } from               "react-redux";
import { updateImage } from               "./actions/image";
import { compressFile } from              "./helper/compressFile";
import { predictFile, predictImage } from "./actions/canvas";
import Canvas from                        "./components/Canvas/Canvas";
import ResultDiv from                     "./components/ResultDiv/ResultDiv";
import RadioButtons from                  "./components/RadioButtons/RadioButtons";

function App() {
  const dispatch = useDispatch();

  const [base64, setbase64] = useState(null)
  const [inference, setInference] = useState(false)
  const [model, setModel] = useState(1)
  const loading = useSelector((state) => state.canvasReducer.loading);
  const openCanvas = useSelector((state) => state.canvasReducer.openCanvas);
  const [text, setText] = useState("");
  const [score, setscore] = useState("65")

  let uploadedImage= null

  const handleText = (e) =>{
    dispatch({type : "CLOSE"})
    setText(e.target.value)
    dispatch(updateImage(e.target.value))
  };

  const onImageFileChange= async (e) =>{
    dispatch({type : "CLOSE"})
    if((e.target.files && e.target.files[0])) {
      uploadedImage= e.target.files[0]

      dispatch(updateImage(URL.createObjectURL(e.target.files[0])))

      const file = await compressFile(uploadedImage)
      setbase64(file[0].data);
    }
  }

  const predictImageFile = async () =>{
    dispatch({type: "CLOSE"})
    console.log(base64.slice(0, 5));
    const formData = {
      "type": model,
      "base64": base64,
      "int8": "false",
      "int16": inference,
      "model": model,
      "score": score
    }
    dispatch(predictFile(formData))
  }

  const readFromClipboard = async ()=>{
    const clipboardText = await navigator.clipboard.readText();
    dispatch({type : "CLOSE"})
    setText(clipboardText)
    dispatch(updateImage(clipboardText))
  }

  const validateUrl = () =>{
    dispatch({type : "CLOSE"})
    if(text){
      if (validator.isURL(text)){
        if(!loading){
          const formData = {
            "url" : text,
            "int8" :"false",
            "type": model,
            "int16": inference,
            "score": score
          }
          dispatch(predictImage(formData))
        }
      }
      else{
        dispatch({type : "OPEN"})
      }
    }else{
      dispatch({type : "OPEN"})
    }
  }
  const download = () =>{
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'yolo.png');
    let canvas = document.getElementById('canvas');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href',url);
    downloadLink.click();
  }
  return (
  <>
    <Header />
    <div>
    <div id="left">
      <motion.main>
        <SubHeader text="Configuration" />
        <RadioButtons setModel = {setModel} setInference = {setInference} />
        <br />
        <SubHeader text="Score Threshold" />
        <Input
          type="number"
          placeHolder="Add Score Threshold"
          value={score}
          onChange={(e)=> setscore(e.target.value)}
          />
        <br />
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
                  dispatch({type : "CLOSE"})
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
              {openCanvas && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="download-button"
                onClick={download}>
                Download Image
              </motion.button>
              )}
            </>
          }
        </div>
      </motion.main>
    </div>
    <div id='right'>
      {openCanvas ? <Canvas/> : <ImageShow />}
    </div>
    </div>
    <AnimatePresence exitBeforeEnter={true} initial={false}>
      {!openCanvas && (<Message />)}
      {openCanvas && (<ResultDiv />)}
    </AnimatePresence>
  </>
  );
}

const SubHeader = ({ text }) => <motion.h2 className="sub-header">{text}</motion.h2>;

const Message = () => <motion.div style={{minHeight:"300px", textAlign:"center", color:"white", verticalAlign:"middle"}}>
                        <motion.h2 className="sub-header" style={{paddingTop: "100px"}}>
                          Result table will appear here when you click the Predict button
                        </motion.h2>
                      </motion.div>


export default App;