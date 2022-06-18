<template>
    <div class="chart">
        <div class="chart__title">История</div>
        <Line 
        :chart-data="getChartData" 
            :chart-options="{ 
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
                        label: 'Последнии дни',
                        data: this.historyChartData.data,
                        borderColor: "blue",
                        backgroundColor: "white",
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