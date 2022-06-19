<template>
    <div class = "list">
        <div class = "list__title">
            Прогноз
        </div>
        <div class="list__items">
            <div v-for="item in listForecast" v-bind:key = "item.date" class = "item">
                <span class = "item__date">{{ getDayWeek(item.date) }}</span>
    
                <div class = "item__info">
                    <img class = "item__icon" :src = "getImgSrcIcon(item.icon)"/>
                    <span class="item__temp">{{ item.temp.toFixed(0) }}&deg;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { getImgSrcIcon } from "@/Utils/getImgSrcIcon"
import { getDayWeek } from "@/Utils/getDayWeek"


export default {
    methods: {
        getImgSrcIcon,getDayWeek
    },
    computed: {
        ...mapState({
            listForecast: state => state.forecast
        }),

    }
}
</script>

<style lang = "scss" scope>
    @import "./ListWeather.scss"
</style>