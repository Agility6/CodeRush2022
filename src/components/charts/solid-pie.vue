<template>
    <div class="chart-container">
        <div ref="solidPie" v-loading="loading" class="chart" />
        <p class="title">{{ title }}</p>
    </div>
</template>

<script>
export default {
    props: {
        pieData: {
            type: Array,
            default: function() {
                return [];
            }
        },
        title: {
            type: String,
            default: ""
        },
        isLoading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            loading: true,
            chartDom: {},
            mockList: [],
            name: ""
        };
    },
    watch: {
        isLoading: {
            handler() {
                //  用于设置子组件为 Loading 状态
                this.loading = true;
            }
        }
    },
    created() {
        var dateList = ["date"];
        var typeList = [];
        var valueList = [];
        this.pieData.map((item, index) => {
            valueList.push(item.value);
            if (!dateList.includes(item.date)) {
                dateList.push(item.date);
            }
            if (!typeList.includes(item.type)) {
                typeList.push(item.type);
            }
        });
        for (let i = 0; i < typeList.length; i++) {
            if (i === 0) {
                this.mockList.push(dateList);
            }
            var currArr = valueList.slice(i * 7, i * 7 + 7);
            currArr.unshift(typeList[i]);
            this.mockList.push(currArr);
        }
        console.log(this.mockList);
    },
    mounted() {
        this.chartDom = this.$echarts.init(this.$refs.solidPie);
        this.initPie();
        this.upLoad();
    },
    methods: {
        upLoad() {
            this.$emit("fromSonComp", this.chartDom);
        },
        initPie() {
            // 300毫秒延迟会使动画看起来更人性化（其实就是看起来得到结果更快）
            setTimeout(() => {
                this.loading = false;
            }, 300);
            // const _this = this
            const color = [
                "#0E7CE2",
                "#67C23A",
                "#FF8352",
                "#E271DE",
                "#409EFF",
                "#F8456B",
                "#00FFFF",
                "#4AEAB0"
            ];
            const option = {
                color:color,
                legend: {
                    right: 20,
                    top: 5
                },
                tooltip: {
                    trigger: "axis",
                    showContent: false
                },
                dataset: {
                    source: this.mockList
                },
                xAxis: {
                    type: "category",
                    axisTick: false,
                    axisLine: {
                        lineStyle: {
                            // color: 'FFF'
                        }
                    }
                },
                yAxis: {
                    gridIndex: 0,
                    axisTick: false,
                    axisLine: {
                        lineStyle: {
                            // color: 'FFF'
                        }
                    }
                },
                grid: { top: "55%" },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        markPoint: {
                            data: [
                                { type: "max", name: "Max" },
                                { type: "min", name: "Min" }
                            ]
                        }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        markPoint: {
                            data: [
                                { type: "max", name: "Max" },
                                { type: "min", name: "Min" }
                            ]
                        }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        markPoint: {
                            data: [
                                { type: "max", name: "Max" },
                                { type: "min", name: "Min" }
                            ]
                        }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        markPoint: {
                            data: [
                                { type: "max", name: "Max" },
                                { type: "min", name: "Min" }
                            ]
                        }
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        markPoint: {
                            data: [
                                { type: "max", name: "Max" },
                                { type: "min", name: "Min" }
                            ]
                        }
                    },
                    {
                        type: "pie",
                        id: "pie",
                        itemStyle: {
                            borderWidth: 9
                        },
                        radius: 100,
                        center: ["50%", "30%"],
                        label: {
                            formatter: "{b}: {@2020/3/23} ({d}%)"
                        },
                        //饼图起始位置
                        encode: {
                            itemName: "date",
                            value: "2020/3/23",
                            tooltip: "2020/3/23"
                        }
                    }
                ]
            };

            this.chartDom.on("updateAxisPointer", event => {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    this.chartDom.setOption({
                        series: {
                            id: "pie",
                            label: {
                                formatter: "{b}: ({d}%)"
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });

            this.chartDom.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
// $main-text-color: red;
.chart-container {
    width: 100%;
    height: 100%;
    position: relative;
    .chart {
        width: 100%;
        height: 100%;
    }
    .title {
        @include title-line($pos-top: 10px, $pos-left: 30px);
    }
}
</style>
