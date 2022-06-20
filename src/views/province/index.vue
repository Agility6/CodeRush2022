<template>
  <div v-loading="!isShow" class="view-container">
    <div v-if="isShow" class="main-index">
      <div class="head-box">
        <!-- 多维度暂无分析 -->
        <radar class="radar box-left" title="多维度分析" @fromSonComp="getFromleida"></radar>
        <!-- <solidPie class="solid-pie box-right" title="职业数据分析" :pie-data="pieData" @fromSonComp="getFromPie"></solidPie> -->
      </div>
      <div class="tail-box">
        <point class="point box" title="散点数据" :point-data="pointData" @fromSonComp="getFromPoint"></point>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getProvTrend, getStandard, getScatter } from '@/api/province'
import radar from '@/components/charts/radar'
import solidPie from '@/components/charts/solid-pie'
import point from '@/components/charts/point'
export default {
  components: {
    radar,
    solidPie,
    point
  },
  data() {
    return {
      apiNum: 0,
      isShow: false,
      province: '',
      mapChart: {},
      pieData: [],
      pointData: []
    }
  },
  computed: {
    ...mapGetters(['changedPage'])
  },
  watch: {
    apiNum: {
      handler(val) {
        if (val === 3) {
          this.isShow = true
        }
      }
    }
  },
  activated() {
    this.province = this.$route.query.name
    // 暂时请求mock

    this.$store.dispatch('getName', ['prov-radar', 'prov-pie', 'prov-point'])
    if (this.changedPage.includes('prov')) {
      this.$store.dispatch('getShowingName')
      this.$store.dispatch('deleteChangePage', 'home')
    }
    this._getProvTrend(this.$route.query.name)
    this._getStandard(this.$route.query.name)
    this._getScatter(this.$route.query.name)
  },
  deactivated() {
    this.apiNum = 0
    this.isShow = false
  },
  methods: {
    async _getProvTrend(region) {
      const res = await getProvTrend(region)
      this.pieData = res.data
      this.apiNum++
    },
    async _getStandard(region) {
      const res = await getStandard(region)
      // console.log(res.data)
      this.apiNum++
    },
    async _getScatter(region) {
      const res = await getScatter(region)
      this.pointData = res.data
      this.apiNum++
    },
    getFromleida(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'prov-radar',
        chartDom: chartDom
      }])
    },
    getFromPie(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'prov-pie',
        chartDom: chartDom
      }])
    },
    getFromPoint(chartDom) {
      this.$store.dispatch('setChartDOM', [{
        name: 'prov-point',
        chartDom: chartDom
      }])
    }
  },
  mounted() {
    console.log(this.$route);
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
.view-container {
  width: auto;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  .main-index {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    // background: red;
    .head-box {
      display: flex;
      height: 600px;
      .radar {
        background-color: white;
        height: 100%;
        width: 100%;
      }
      .solid-pie {
        // flex: 1;
        background-color: white;
        height: 100%;
        width: 100%;
      }
    }
    .tail-box {
      margin: 15px 0;
      height: 500px;
      width: 100%;
      .point {
        background-color: white;
        height: 100%;
        width: 100%;
      }
    }
  }
  .box {
      border-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
  }
  .box-left {
      // border-top-left-radius: 20px;
      // border-bottom-left-radius: 20px;
      border-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
  }
  .box-right {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      box-shadow: 3px 3px 5px #c2c2d6;
  }
  .box:hover, .box-left:hover, .box-right:hover {
    box-shadow: 6px 10px 10px #c2c2d6;
  }
}
</style>
