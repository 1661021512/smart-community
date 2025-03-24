import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {County} from '../entity/county';
import {randomString} from '@yunzhi/utils';
import {Town} from '../entity/town';
import {Community} from '../entity/community';
import {Village} from '../entity/village';
import {Building} from '../entity/building';
import {Duty} from '../entity/duty';

/**
 * 区域
 */
export class DistrictApi implements MockApiInterface {
  protected url = 'district';

  /**
   * 获取县的区域信息
   * @param townCount 乡镇数
   * @param communityCount 社区数
   * @param villageCount 小区数
   * @param buildingCount 楼栋数
   */
  static getCounty(townCount = 5, communityCount = 8, villageCount = 10, buildingCount = 20): County {
    let id = 1;
    const county = {
      id: id++,
      name: '尚义县',
      geoJson: {
        file: {
          path: '/assets/geojson',
          name: 'shangyi.json'
        }
      },
      secondaryGeoJson: {
        file: {
          path: '/assets/geojson',
          // AssetsAPI正则表达式的原因，这里不使用 - 连接两个单词
          name: 'shangyisecondary.json'
        }
      },
      towns: [],
    } as County;

    for (let i = 0; i < townCount; i++) {
      const town = {
        id: id++,
        name: randomString('乡镇'),
        geoJson: {
          file: {
            path: '/assets/geojson',
            name: 'nanhaoqian.json'
          }
        },
        communities: [],
      } as Town;
      county.towns.push(town);
      // console.log(id, 'town-----------------------------------------------');

      for (let j = 0; j < communityCount; j++) {
        const community = {
          id: id++,
          name: randomString('社区'),
          geoJson: {
            file: {
              path: '/assets/geojson',
              name: 'shangyi.json'
            }
          },
          villages: []
        } as Community;
        town.communities.push(community);
        // console.log(id, 'community-------------------');

        for (let k = 0; k < villageCount; k++) {
          const village = {
            id: id++,
            name: randomString('小区'),
            geoJson: {
              file: {
                path: '/assets/geojson',
                name: 'shangyi.json'
              }
            },
            buildings: []
          } as Village;
          community.villages.push(village);
          // console.log(id, 'village---------');

          for (let l = 0; l < buildingCount; l++) {
            const building = {
              id: id++,
              name: randomString('楼栋'),
              geoJson: {
                file: {
                  path: '/assets/geojson',
                  name: 'shangyi.json'
                }
              },
            } as Building;
            village.buildings.push(building);
            // console.log(id, 'Building');
          }
        }
      }
    }
    return county;
  }

  getInjectors(): ApiInjector[] {
    return [{
      url: `${this.url}/clearCache`,
      description: '清除服务器缓存'
    }, {
      description: '获取系统内的县的信息，该接口由system.api.ts迁移至此',
      url: `${this.url}/county`,
      result: () => {
        return DistrictApi.getCounty();
      }
    },
      {
        method: 'GET',
        url: `${this.url}/(\\d+)`,
        description: 'getById 根据id获取区域',
        result: (urlMatches: any) => {
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id must be number');
          return {
            id,
            name: randomString('区域')
          } as Duty;
        }
      },
    ];
  }

}
