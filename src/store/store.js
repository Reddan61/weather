import { createStore } from "vuex"
import { API } from "@/Api/Api"
import { isSingleDay } from "@/Utils/isSingleDay"
import { addToArrArrays } from "@/Utils/addToArrArrays"
import { getDayWeek } from "@/Utils/getDayWeek"


export const store = createStore({
    state: {
        currentWeather: null,
        forecast: null,
        historyChartData: null
    },
    mutations: {
        setCurrentWeather(state,payload) {
            state.currentWeather = payload
        },
        setForecast(state,payload) {
            state.forecast = payload
        },
        setHistoryChartData(state,payload) {
            state.historyChartData = payload
        }
    },
    actions: {
        async getCurrentWeather({ commit }) {
            const currentWeather = await API.getCurrentWeatherData()
            commit("setCurrentWeather",currentWeather.data)
        },
        async getForeCast({ commit }) {
            const forecast = await API.getForeCastWeatherData()

            const list = forecast.data.list

            const tempsArr = [[list[0].main.temp]]
            const weatherList = [[list[0].weather[0].icon]]

            let currentDay = list[0].dt_txt
            let currentIndex = 0
            const daysPortals = [0]

            for(let i = 1; i < list.length; i++) {
                const temp = list[i].main.temp
                if(!isSingleDay(currentDay,list[i].dt_txt)) {
                    currentDay = list[i].dt_txt
                    currentIndex++
                    daysPortals.push(i)
                }

                addToArrArrays(tempsArr,currentIndex,temp)
                addToArrArrays(weatherList,currentIndex,list[i].weather[0].icon)
            }

            const newList = []

            for(let i = 0; i < tempsArr.length; i++) {
                const sum = tempsArr[i].reduce((sum,el) => {
                    return sum + el
                },0)
                
                const averageSum = sum / tempsArr[i].length

                newList.push({
                    averageTemp: averageSum,
                    icon: weatherList[i][Math.floor(weatherList[i].length / 2)],
                    date: list[daysPortals[i]].dt_txt
                })

            }

            commit("setForecast",newList.slice(1,4))
        },
        async getHistory({ commit }) {
            const history = await API.getHistoryWeather()

            const historyDays = history.data.days
            const newHistoryChartData = {
                labels: [],
                data: []
            }

            for(let i = 0; i < historyDays.length; i++) {
                const date = new Date(historyDays[i].datetime)

                newHistoryChartData.labels.push(getDayWeek(date))
                newHistoryChartData.data.push(historyDays[i].temp)
            }


            commit("setHistoryChartData",newHistoryChartData)
        },
        async getWeatherData({ commit, dispatch }) {
            await dispatch({ type: "getCurrentWeather" })
            await dispatch({ type: "getForeCast" })
            await dispatch({ type: "getHistory" })
        }
    }
})


