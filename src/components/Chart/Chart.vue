<template>
    <div class="chart">
        <div class="chart__title">История</div>
        <div class="chart__noData" v-if = "!historyChartData || !historyChartData.labels || !historyChartData.data">
            No Data
        </div>
        <Line v-else 
            :chart-data="getChartData" 
            :chart-options="{ 
                responsive:true,
                maintainAspectRatio: false,   
                plugins: {
                    legend: {
                        display: false
                    }
                }     
            }" 
        />
    </div>
</template>

<script>
import { Line } from "vue-chartjs"
import {  
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale 
} from 'chart.js'
import { mapState } from "vuex"

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
)

export default {
    components: {
        Line
    },
    computed: {
        ...mapState({
           historyChartData: state => state.historyChartData 
        }),
        getChartData() {
            const data = {
                labels:this.historyChartData.labels,
                datasets: [
                    {
                        data: this.historyChartData.data,
                        backgroundColor: '#f87979',
                    }
                ]
            }
            return data
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./Chart.scss"
</style>