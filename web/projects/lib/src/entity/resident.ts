import {House} from './house';
import {NationalityType} from './enum/nationality-type';
import {ReligiousBelief} from './religious-belief';
import {Enterprise} from './enterprise';
import {isDefined} from '@yunzhi/utils';
import {EducationType} from './enum/education-type';
import {politicalType} from './enum/political-type';
import {JobType} from './jobType';
import {Skill} from './skill';
import {CrimedType} from './crimed-type';
import {Cult} from './cult';
import {MaritalType} from './enum/marital-type';
import {Checkbox} from '../modal/checkbox';

/**
 * 居民
 */
export class Resident implements Checkbox {
  _checked = false;
  /**是否显示删除住房按钮*/
  _showRemoveHouse = false;
  /**户编号*/
  accountNumber: string;
  /**是否有慢性病*/
  beChronicDisease: boolean;
  /**是否矫正人员*/
  beCrimed: boolean;
  /**是否参加了邪教组织*/
  beCultMember: boolean;
  /**是否残疾人*/
  beDisabled: boolean;
  /**是否兵残*/
  beDisabledSolider: boolean;
  /**是否空巢*/
  beEmptyNest: boolean;
  /**是否养老保险*/
  beEndowmentInsurance: boolean;
  /**是否参战*/
  beEnterToWar: boolean;
  /**是否流动人口*/
  beFloating: boolean;
  /**是否留守儿童*/
  beLeftBehindChildren: boolean;
  /**是否信仿人员*/
  beLetterImitationPeople: boolean;
  /**是否孤寡*/
  beLonelyOrWidowed: boolean;
  /**是否医保*/
  beMedicalInsurance: boolean;
  /**是否涉核*/
  beNuclear: boolean;
  /**是否高龄补贴*/
  beOldAgeAllowance: boolean;
  /**是否复原军人*/
  beSoldier: boolean;
  /**是否在校生*/
  beStudent: boolean;
  /**是否低保*/
  beSubsistenceAllowances: boolean;
  /**是否接种疫苗*/
  beVaccinated: boolean;
  /**是否志愿兵*/
  beVolunteer: boolean;
  /**慢性病描述*/
  chronicDiseaseDetails: string;
  /**矫正类型*/
  crimedTypes: CrimedType[];
  /**邪教*/
  cult: Cult;
  /**户籍地*/
  domicilePlace: string;
  /**教育程度*/
  education: EducationType;
  /**就业状况*/
  employmentStatus: number;
  /**加密后的身份证号*/
  encodedIdNumber: string;
  /**加密后的手机号*/
  encodedPhone: string;
  /**工作单位*/
  enterprise: Enterprise;
  /**流入流出日期*/
  floatedDate: number;
  /**流入流出地*/
  floatedPlace: string;
  /**住房信息*/
  houses: House[];
  /**id*/
  id: number;
  /**
   * 身份证号码
   */
  idNumber: string;
  /**求职意向*/
  jobTypeRequirements: JobType[];
  /**信仿内容*/
  letterImitationContent: string;
  /**是否本地户籍*/
  localDomicile: boolean;
  /**婚姻状况*/
  maritalStatus: MaritalType;
  /**姓名*/
  name: string;
  /**民族*/
  nationality: NationalityType;
  /**未接种疫苗原因*/
  notVaccinatedReason: string;
  /**电话号码*/
  phone: string;
  /**政治面貌*/
  politicalClimate: politicalType;
  /**宗教*/
  religion: string;
  /**宗教信仰*/
  religiousBelief: ReligiousBelief;
  /**备注*/
  remarks: string;
  /**学校名称*/
  school: string;
  /**学校地址*/
  schoolAddress: string;
  /**性别*/
  sex: boolean;
  /**特长*/
  skills: Skill[];
  /**接种疫苗地点*/
  vaccinatedPlace: string;
  /**务工地点*/
  workPlace: string;

  constructor(data = {} as {
    beStudent?: boolean;
    school?: string;
    schoolAddress?: string;
    beSoldier?: boolean;
    beEnterToWar?: boolean;
    beVaccinated?: boolean,
    beVolunteer?: boolean;
    beNuclear?: boolean;
    beDisabledSolider?: boolean;
    accountNumber?: string,
    beChronicDisease?: boolean,
    beCrimed?: boolean,
    beCultMember?: boolean,
    beDisabled?: boolean,
    beEmptyNest?: boolean,
    beEndowmentInsurance?: boolean,
    beFloating?: boolean,
    beLeftBehindChildren?: boolean,
    beLetterImitationPeople?: boolean,
    beLonelyOrWidowed?: boolean,
    beMedicalInsurance?: boolean,
    beOldAgeAllowance?: boolean,
    beSubsistenceAllowances?: boolean,
    chronicDiseaseDetails?: string,
    crimedTypes?: CrimedType[],
    domicilePlace?: string,
    education?: EducationType,
    employmentStatus?: number,
    encodedIdNumber?: string,
    encodedPhone?: string,
    enterprise?: Enterprise,
    floatedDate?: number,
    floatedPlace?: string,
    houses?: House[],
    id?: number,
    idNumber?: string,
    jobTypeRequirements?: JobType[],
    letterImitationContent?: string,
    localDomicile?: boolean,
    maritalStatus?: MaritalType,
    name?: string,
    nationality?: NationalityType,
    phone?: string,
    politicalClimate?: politicalType,
    religiousBelief?: ReligiousBelief,
    remarks?: string,
    sex?: boolean,
    skills?: Skill[];
    vaccinatedPlace?: string,
    notVaccinatedReason?: string,
    workPlace?: string,
    cult?: Cult,
  }) {
    if (data) {
      this.beStudent = data.beStudent;
      this.school = data.school;
      this.schoolAddress = data.schoolAddress;
      this.beSoldier = data.beSoldier;
      this.beEnterToWar = data.beEnterToWar;
      this.beVaccinated = data.beVaccinated;
      this.beVolunteer = data.beVolunteer;
      this.beNuclear = data.beNuclear;
      this.beDisabledSolider = data.beDisabledSolider;
      this.accountNumber = data.accountNumber;
      this.beChronicDisease = data.beChronicDisease;
      this.beCrimed = data.beCrimed;
      this.beCultMember = data.beCultMember;
      this.beDisabled = data.beDisabled;
      this.beEmptyNest = data.beEmptyNest;
      this.beEndowmentInsurance = data.beEndowmentInsurance;
      this.beFloating = data.beFloating;
      this.beLeftBehindChildren = data.beLeftBehindChildren;
      this.beLetterImitationPeople = data.beLetterImitationPeople;
      this.beLonelyOrWidowed = data.beLonelyOrWidowed;
      this.beMedicalInsurance = data.beMedicalInsurance;
      this.beOldAgeAllowance = data.beOldAgeAllowance;
      this.beSubsistenceAllowances = data.beSubsistenceAllowances;
      this.chronicDiseaseDetails = data.chronicDiseaseDetails;
      this.crimedTypes = data.crimedTypes;
      this.domicilePlace = data.domicilePlace;
      this.education = data.education;
      this.employmentStatus = data.employmentStatus;
      this.encodedIdNumber = data.encodedIdNumber;
      this.encodedPhone = data.encodedPhone;
      this.enterprise = isDefined(data.enterprise) ?
        data.enterprise instanceof Enterprise ? data.enterprise : new Enterprise(data.enterprise)
        : undefined;
      this.floatedDate = data.floatedDate;
      this.floatedPlace = data.floatedPlace;
      this.id = data.id;
      this.idNumber = data.idNumber;
      this.letterImitationContent = data.letterImitationContent;
      this.localDomicile = data.localDomicile;
      this.maritalStatus = data.maritalStatus;
      this.name = data.name;
      this.nationality = data.nationality;
      this.phone = data.phone;
      this.politicalClimate = data.politicalClimate;
      this.religiousBelief = isDefined(data.religiousBelief) ? data.religiousBelief instanceof ReligiousBelief
        ? data.religiousBelief : new ReligiousBelief(data.religiousBelief) : data.religiousBelief;
      this.remarks = data.remarks;
      this.sex = data.sex;
      this.vaccinatedPlace = data.vaccinatedPlace;
      this.notVaccinatedReason = data.notVaccinatedReason;
      this.workPlace = data.workPlace;
      if (Array.isArray(data.skills)) {
        this.skills = data.skills
          .map(skill => skill.constructor === Object ? new Skill(skill) : skill);
      }
      if (Array.isArray(data.jobTypeRequirements)) {
        this.jobTypeRequirements = data.jobTypeRequirements
          .map(jobType => jobType.constructor === Object ? new JobType(jobType) : jobType);
      }
      this.houses = data.houses;
      this.cult = isDefined(data.cult) ?
        data.cult instanceof Cult ? data.cult : new Cult(data.cult)
        : undefined;
    }
  }

  /**
   * 获取年龄
   */
  getAge(): number {
    const currentDate = new Date();
    //身份证
    const year = parseInt(this.idNumber.slice(6, 10));
    const month = parseInt(this.idNumber.slice(10, 12));
    const day = parseInt(this.idNumber.slice(12, 14));
    let age = currentDate.getFullYear() - year;
    if (currentDate.getMonth() + 1 < month || (currentDate.getMonth() + 1 === month && currentDate.getDay() <= day)) {
      age--;
    }
    return age;
  }
}
