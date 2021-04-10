import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GlobeComponent } from 'echarts-gl/components';
import { useEffect } from 'react'
echarts.use([GlobeComponent, CanvasRenderer]);
const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

const myChart = () => {
  const chartDom = document.getElementById('earth');
  return echarts.init(chartDom);
}
const option = {
  globe: {
    baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
    heightTexture: ROOT_PATH + "/data-gl/asset/bathymetry_bw_composite_4k.jpg",
    // displacementScale: 0.2,
    shading: 'realistic',
    environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
    realisticMaterial: {
      roughness: ROOT_PATH + '/asset/get/s/data-1497599804873-H1SHkG-mZ.jpg',
      metalness: ROOT_PATH + '/asset/get/s/data-1497599800643-BJbHyGWQW.jpg',
      textureTiling: [8, 4]
    },
    // left: -200,
    // globeRadius: 80,
    postEffect: {
      enable: true
    },
    viewControl: {
      autoRotate: true
    },
    light: {
      main: {
        intensity: 2,
        shadow: true
      },
      ambientCubemap: {
        texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
        exposure: 2,
        diffuseIntensity: 2,
        specularIntensity: 2
      }
    }
  }
};
export default function Earth(){
  useEffect(()=>{
    option && myChart().setOption(option);
  },[]);

  return <div id="earth" style={{ width: '100%', height: '100%' }}></div>
}