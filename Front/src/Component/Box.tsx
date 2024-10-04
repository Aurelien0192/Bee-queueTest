import { useState } from "react"
import { data, sendData } from "../../Module/AxiosInstance/axios.service"
import { fingerprint } from "../App"

export const Box:React.FC = () => {

    type response = {
        msg: string
      }
      


    async function sendIngredient(ingredients:Array<data>){
        for(let i=0; i<10; i++){
            ingredients[i].fingerPrint= fingerprint.toString()
            const response = await sendData(ingredients[i])
            setResponse(response.data)
        }
      }
    
      const [response, setResponse] = useState<response>()
    
      console.log(response)
    
    return(
        <>
      <div className="flex flex-col items-center gap-20">
        <h1 className="mt-10 text-3xl font-bold">Restaurant</h1>
        <button onClick={()=>{sendIngredient(ingredients)}} className="border p-2 rounded bg-yellow-300 hover:bg-yellow-600">commander</button>
        <div className="border w-1/2 h-[500px]">
          {(response && response.msg)? response.msg: ""}
        </div>
      </div>
    </>
    )
}


const ingredients=[
  {name: "pomme",
    quantity:21
  },
  {name: "poire",
    quantity:154
  },
  {name: "orange",
    quantity:11
  },
  {name: "pomme de terre",
    quantity:12
  },
  {name: "poireau",
    quantity:25
  },
  {name: "banane",
    quantity:74
  },
  {name: "fuit de la passion",
    quantity:2
  },
  {name: "fraise",
    quantity:10
  },
  {name: "jambon",
    quantity:75
  }
]