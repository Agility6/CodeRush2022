import request from './request'

export function getProvTrend(region) {
  return request({
    url: '/provTrend',
    method: 'get',
    params: {
      region
    }
  })
}

export function getStandard(region) {
  return request({
    url: '/getStandard',
    method: 'get',
    params: {
      region
    }
  })
}
export function getScatter(region) {
  return request({
    url: '/getScatter',
    method: 'get',
    params: {
      region
    }
  })
}

export function getAllCityData(province) {
  return request({
    url: '../mock/province/gd.json',
    method: 'get',
    params:{
      province:province
    }
  })
}