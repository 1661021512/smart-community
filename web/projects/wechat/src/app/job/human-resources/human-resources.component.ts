import {Component} from '@angular/core';
import {CONTENT_KEYWORD} from '../../../../../lib/src/enum/content-keyword';

/**
 *人力资源公司
 */
@Component({
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.scss']
})
export class HumanResourcesComponent {
  enterprise = CONTENT_KEYWORD.enterprise.value;
  governmentAndEnterprise = CONTENT_KEYWORD.governmentAndEnterprise.value;
  headhuntingService = CONTENT_KEYWORD.headhuntingService.value;
  jobAgent = CONTENT_KEYWORD.jobAgent.value;
  keyword = CONTENT_KEYWORD.humanResourcesCompany.value;
  laborDispatch = CONTENT_KEYWORD.laborDispatch.value;
  skillTraining = CONTENT_KEYWORD.skillTraining.value;
}
