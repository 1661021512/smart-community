import {VehicleBrand} from './vehicle-brand';
import {VehicleType} from './vehicle-type';
import {Resident} from './resident';
import {VehicleColour} from './enum/vehicle-colour';
import {ParkingSpaceType} from './enum/parking-space-type';
import {User} from './user';

/**
 * 车辆实体
 */
export interface Vehicle {
  id: number;
  /**
   * 车主
   */
  owner: Resident;
  /**
   * 车牌号
   */
  plateNumber: string;
  /**
   * 车辆品牌
   */
  brand: VehicleBrand;
  /**
   * 车辆类型
   */
  type: VehicleType
  /**
   * 车辆颜色
   */
  colour: VehicleColour;
  /**
   * 停车位号码
   */
  parkingSpaceNumber: string;
  /**
   * 停车位使用类型
   */
  parkingSpaceType: ParkingSpaceType;
  /**
   * 登记时间
   */
  createTime: number
}
