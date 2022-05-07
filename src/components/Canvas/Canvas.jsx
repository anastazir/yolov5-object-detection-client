/* eslint-disable-next-line react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React, { useRef, useEffect } from "react";
import { useSelector } from 'react-redux';

const Canvas = () => {
  const result = useSelector((state) => state.canvasReducer.result);
  const image = useSelector((state) => state.imageReducer.image)
  const previewCanvasRef = useRef(null);
  const base_image = new Image();
  base_image.setAttribute('crossOrigin', 'anonymous');
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    var ctx = canvas.getContext("2d");
    base_image.src = image;
    base_image.onload = function(){
      canvas.width = base_image.width;
      canvas.height = base_image.height;
      ctx.drawImage(base_image,  0, 0, base_image.width,  base_image.height);
      ctx.beginPath();
      console.log("===================result", result);
      for (let[[a, b, c, d], score, className] of result){
        ctx.strokeRect(a, b, c-a, d-b);
        ctx.fillStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
        ctx.font = "20pt Calibri";
        ctx.fillText(`${className} ${score}%`, a, b);
      }
    }
  }, [image])


  return (
    <>
      <canvas
      className="canvas"
      id = "canvas"
      ref={previewCanvasRef}
      style={{
        maxHeight:"500px",
        maxWidth:"500px",
        marginBottom: '2rem'}}/>
    </>
  )
}

export default Canvas