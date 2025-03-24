import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CONTENT_KEYWORD} from '../../../projects/lib/src/enum/content-keyword';
import {ContentComponent} from '../content/content.component';

const routes: Routes = [
  {
    path: 'index',
    component: ContentComponent,
    data: {
      title: '',
      description: '人力资源公司',
      content: {
        keyword: CONTENT_KEYWORD.humanResourcesCompany.value,
        title: CONTENT_KEYWORD.humanResourcesCompany.description
      }
    }
  },
  {
    path: 'labor-dispatch',
    component: ContentComponent,
    data: {
      title: '劳动派遣',
      content: {
        keyword: CONTENT_KEYWORD.laborDispatch.value,
        title: CONTENT_KEYWORD.laborDispatch.description
      }
    }
  },
  {
    path: 'skill-training',
    component: ContentComponent,
    data: {
      title: '技术培训',
      content: {
        keyword: CONTENT_KEYWORD.skillTraining.value,
        title: CONTENT_KEYWORD.skillTraining.description,
      }
    }
  },
  {
    path: 'headhunting-service',
    component: ContentComponent,
    data: {
      title: '猎头服务',
      content: {
        keyword: CONTENT_KEYWORD.headhuntingService.value,
        title: CONTENT_KEYWORD.headhuntingService.description
      }
    }
  },
  {
    path: 'job-agent',
    component: ContentComponent,
    data: {
      title: '代理招聘',
      content: {
        keyword: CONTENT_KEYWORD.jobAgent.value,
        title:  CONTENT_KEYWORD.jobAgent.description
      }
    }
  },
  {
    path: 'government-and-enterprise',
    component: ContentComponent,
    data: {
      title: '政企对接',
      content: {
        keyword: CONTENT_KEYWORD.governmentAndEnterprise.value,
        title:  CONTENT_KEYWORD.governmentAndEnterprise.description,
      }
    }
  },
  {
    path: 'enterprise',
    component: ContentComponent,
    data: {
      title: '企业对接',
      content: {
        keyword: CONTENT_KEYWORD.enterprise.value,
        title: CONTENT_KEYWORD.enterprise.description,
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
