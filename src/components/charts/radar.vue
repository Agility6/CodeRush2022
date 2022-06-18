<template>
    <div class="chart-container">
        <div ref="radar" v-loading="loading" class="chart"></div>
        <p class="title">{{ title }}</p>
    </div>
</template>

<script>
// const region = [
//     "BeiJing",
//     "ShangHai",
//     "TianJin",
//     "ChongQing",
//     "XiangGang",
//     "Aomen",
//     "AnHui",
//     "FuJian",
//     "GuangDong",
//     "GuangXi",
//     "GuiZhou",
//     "GanSu",
//     "HaiNan",
//     "HeBei",
//     "HeNan",
//     "HeiLongJiang",
//     "HuBei",
//     "HuNan",
//     "JiLin",
//     "JiangSu",
//     "JiangXi",
//     "LiaoNing",
//     "NeiMengGu",
//     "NingXia",
//     "QingHai",
//     "ShanXi",
//     "ShanXi",
//     "ShanDong",
//     "SiChuan",
//     "TaiWan",
//     "XiZang",
//     "XinJiang",
//     "YunNan",
//     "ZheJiang"
// ];
// 引入待优化
import "echarts/map/js/province/anhui";
import "echarts/map/js/province/aomen";
import "echarts/map/js/province/beijing";
import "echarts/map/js/province/chongqing";
import "echarts/map/js/province/fujian";
import "echarts/map/js/province/gansu";
import "echarts/map/js/province/guangdong";
import "echarts/map/js/province/guangxi";
import "echarts/map/js/province/guizhou";
import "echarts/map/js/province/hainan";
import "echarts/map/js/province/hebei";
import "echarts/map/js/province/heilongjiang";
import "echarts/map/js/province/henan";
import "echarts/map/js/province/jiangsu";

export default {
    props: {
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
            data: []
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
    mounted() {
        this.chartDom = this.$echarts.init(this.$refs.radar);

        this.initChart();
        this.upLoad();
    },
    methods: {
        upLoad() {
            this.$emit("fromSonComp", this.chartDom);
        },
        async initChart() {
            setTimeout(() => {
                this.loading = false;
            }, 300);
            const colors = ["#5bc3f0", "#1ca2dc", "#0087dc"];
            const option = {
                color: colors,
                tooltip: {
                    show: true
                    // 数据暂时没有
                    // formatter: function(params) {
                    //     return `${params.data.name}： ${params.data.value} 条`;
                    // }
                },
                legend: false,
                visualMap: {
                    // show: false,
                    type: "continuous",
                    orient: "horizontal",
                    orient: "vertical",
                    itemWidth: 10,
                    itemHeight: 80,
                    text: ["高", "低"],
                    showLabel: true,
                    seriesIndex: [0],
                    inRange: {
                        color: colors
                    },
                    textStyle: {
                        color: "#303133",
                        fontSize: "10"
                        // textShadowOffsetY: 10
                    },
                    bottom: "10%",
                    left: "4%"
                },
                series: [
                    {
                        zoom: "1.2",
                        type: "map",
                        mapType: this.$store.state.region,
                        itemStyle: {
                            areaColor: "#f6851b",
                            borderWidth: 0.7,
                            borderColor: "black"
                        },
                        label: {
                            show: true,
                            color: '#606266',
                            fontSize: 10
                        },
                        emphasis: {
                            label: {
                                show: true,
                                color: "#fff",
                                fontSize:"120%",
                            },
                            itemStyle: {
                                areaColor: "#ff8454"
                            }
                        },
                        textStyle: {
                            color: "#303133",
                            fontSize: "10"
                        },
                        data: this.data
                    }
                ]
            };
            this.chartDom.setOption(option);
            console.log(option);
        }
    }
};
</script>

<style lang="scss">
@import "~@/styles/index.scss";
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
