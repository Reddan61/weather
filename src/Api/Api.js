import axios from "axios"
import { getDateFormat } from "@/Utils/getDateFormat"

const config = {
    apiKeyOpenWeatherMap: "a78ecbc66effb34f9206dba343b2e0ed",
    apiKeyVisualcrossing:"K3BPFPWWXFYEYBE2VJ884RMRJ",
    latitude: 47.226724,
    longitude: 39.698338,
}


export class API {
    static async getCurrentWeatherData() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: config.latitude,
                    lon: config.longitude,
                    appid: config.apiKeyOpenWeatherMap,
                    units: "metric"
                }
            })

            const data = response.data
            
            return {
                message:"success",
                data
            }
        } catch(e) {
            return {
                message:"error",
                data:e.response.data
            }
        }
    }
    static async getForeCastWeatherData() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    lat: config.latitude,
                    lon: config.longitude,
                    appid: config.apiKeyOpenWeatherMap,
                    units: "metric"
                }
            })

            const data = response.data
            return {
                message:"success",
                data
            }
        } catch(e) {
            return {
                message:"error",
                data:e.response.data
            }
        }
    }
    static async getHistoryWeather() {
        try {
            const yesterday = new Date()

            yesterday.setDate(yesterday.getDate() - 1)

            
            const end = getDateFormat(yesterday)
            
            const daysAgo = new Date()

            daysAgo.setDate(yesterday.getDate() - 3)
            
            const start =  getDateFormat(daysAgo)

            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${config.latitude}%2C${config.longitude}/${start}/${end}`,
                {
                    params: {
                        unitGroup:"metric",
                        include:"days",
                        key: config.apiKeyVisualcrossing,
                        contentType:"json"
                    }
                }
            )

            return {
                message:"success",
                data:response.data
            }
        } catch(e) {
            return {
                message:"error",
                data:e.response.data
            }
        }
    }
}