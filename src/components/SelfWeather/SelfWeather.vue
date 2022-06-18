<template>
    <div class="selfWeather">
        <div class="selfWeather__header">
            <span class="selfWeather__city">
                Погода в Ростове-на-Дону
            </span>
            <span class="selfWeather__date">
                сегодня {{ getDayWeek().toLowerCase() }}
            </span>
        </div>
        <div class = "selfWeather__info">
            <img :src = "getImgSrcIcon(this.currentWeather.weather[0].icon)" class = "selfWeather__icon"/>
            <span class="selfWeather__temp"> {{ 
               this.currentWeather.main.temp.toFixed(0)
            }}&deg;</span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { getDayWeek } from "@/Utils/getDayWeek"
import { getImgSrcIcon } from "@/Utils/getImgSrcIcon"


export default {
    methods: {
        getDayWeek,getImgSrcIcon
    },
    computed: {
        ...mapState({
            currentWeather: state => state.currentWeather
        })
    }
}
</script>

<style lang="scss" scoped>
    @import "./SelfWeather.scss"
</style>