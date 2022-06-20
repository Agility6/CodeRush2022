<template>
  <div class="chart-container">
    <div ref="radar" v-loading="loading" class="chart"></div>
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: true,
      chartDom: {},
      data: [],
      provinceData: {
        上海: "shanghai",
        河北: "hebei",
        山西: "shanxi",
        内蒙古: "neimenggu",
        辽宁: "liaoning",
        吉林: "jilin",
        黑龙江: "heilongjiang",
        江苏: "jiangsu",
        浙江: "zhejiang",
        安徽: "anhui",
        福建: "fujian",
        江西: "jiangxi",
        山东: "shandong",
        河南: "henan",
        湖北: "hubei",
        湖南: "hunan",
        广东: "guangdong",
        广西: "guangxi",
        海南: "hainan",
        四川: "sichuan",
        贵州: "guizhou",
        云南: "yunnan",
        西藏: "xizang",
        陕西: "shanxi1",
        甘肃: "gansu",
        青海: "qinghai",
        宁夏: "ningxia",
        新疆: "xinjiang",
        北京: "beijing",
        天津: "tianjin",
        重庆: "chongqing",
        香港: "xianggang",
        澳门: "aomen",
        台湾: "taiwan",
      },
    };
  },
  watch: {
    isLoading: {
      handler() {
        //  用于设置子组件为 Loading 状态
        this.loading = true;
      },
    },
  },
  mounted() {
    // 动态引入省份地图
    this.loadMap();
    this.chartDom = this.$echarts.init(this.$refs.radar);
    this.initChart();
    this.upLoad();
  },
  methods: {
    upLoad() {
      this.$emit("fromSonComp", this.chartDom);
    },
    loadMap() {
      const chinaName = this.$route.query.name;
      // 获取拼音
      const provinceName = this.provinceData[chinaName];
      // 按需引入
      const currentMap = require(`echarts/map/js/province/${provinceName}`);
    },
    async initChart() {
      // 引入地图

      setTimeout(() => {
        this.loading = false;
      }, 300);
      const colors = ["#5bc3f0", "#1ca2dc", "#0087dc"];
      const option = {
        color: colors,
        tooltip: {
          show: true,
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
          itemWidth: 10,
          itemHeight: 80,
          text: ["高", "低"],
          showLabel: true,
          seriesIndex: [0],
          inRange: {
            color: colors,
          },
          textStyle: {
            color: "#303133",
            fontSize: "10",
            // textShadowOffsetY: 10
          },
          bottom: "10%",
          left: "4%",
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            zoom: '0.9',
            type: 'map',
            mapType: this.$route.query.name,
            width: '500px',
            // height: '100%',
            roam: false,
            itemStyle: {
              // areaColor: '#F00',
              borderWidth: 0.7,
              borderColor: '#e3e6ec'
            },
            label: {
              show: true,
              color: '#606266',
              fontSize: 10,
              
            },
            data: this.data,
            emphasis: {
              label: {
                show: true,
                color: '#fff'
              },
              itemStyle: {
                areaColor: '#ff8454'
              }
            }
          }
        ]
      };
      this.chartDom.setOption(option);
      // console.log(option);
    },
  },
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
