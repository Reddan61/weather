<template>
    <div class="app">
        <div class="app__container">
            <div v-if = "isLoading">
                is loading....
            </div>
            <div class = "app__body" v-else>
                <SelfWeather class = "app__today"/>
                <ListWeather class = "app__forecast"/>
                <Chart class="app__chart"/>
            </div>
        </div>
    </div>
</template>

<script>
import SelfWeather from "./components/SelfWeather/SelfWeather.vue"
import ListWeather from "./components/ListWeather/ListWeather.vue"
import Chart from "./components/Chart/Chart.vue"


export default {
    components: {
        SelfWeather,
        ListWeather,
        Chart
    },
    methods: {
        async getDataWeather() {
            await this.$store.dispatch({ type: "getWeatherData"})
            setTimeout(this.getDataWeather, 60 * 1000)
        }
    },
    data() {
        return {
            isLoading:true
        }
    },
    async mounted() {
        await this.getDataWeather()
        this.isLoading = false
    }
}
</script>

<style lang="scss" scoped>
    @import "./App.scss";
</style>