import { http } from "./axiosInstance"

export type data = {
    name: string,
    quantity: number
    fingerPrint?: string
}

export const sendData = async (data:data) => {
    const response = await http.post('/cook',data)
    console.log(response)
    return response
} 