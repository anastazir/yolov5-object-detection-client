import React from 'react'
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion'

const ResultDiv = () => {
    const result = useSelector((state) => state.canvasReducer.result);
    return (
      <motion.div
      className="canvas-container"
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, height: "auto" },
        collapsed: { opacity: 0, height: 0 }
      }}
      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <table style={{minHeight:"200px"}}>
        <tr style={{height:"40%"}}>
          <th>Score</th>
          <th>Class Name</th>
          <th>X Min</th>
          <th>Y Min</th>
          <th>X Max</th>
          <th>Y Max</th>
        </tr>
          {result.map(([[a, b, c, d], score, className], key) => {
            return (
              <tr key={key}>
                <td>{score}</td>
                <td>{className}</td>
                <td>{a}</td>
                <td>{b}</td>
                <td>{c}</td>
                <td>{d}</td>
              </tr>
            )
          })}
        </table>
      </motion.div>
    )
  }

export default ResultDiv