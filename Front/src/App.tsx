
import { Box } from "./Component/Box";
import { useState } from "react";
import {socket} from "../Module/ioInstance/ioInstance"

import { ClientJS } from 'clientjs';


const client = new ClientJS()
export const fingerprint = client.getFingerprint()
console.log(window.navigator.maxTouchPoints)


export function App() {

  const [msgFromServer, setMsgFromServer] = useState()

  console.log(msgFromServer)

  socket.on(fingerprint.toString(),(msg)=> {
    setMsgFromServer(msg)
  })

  return (
    <>
    <p>{fingerprint}</p>
      <Box/>
    </>
  )
}

