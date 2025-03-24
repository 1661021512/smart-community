import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Assert} from '@yunzhi/utils';
import {PropertyCompanyService} from '../../../../projects/lib/src/service/property-company.service';
import {PropertyCompany} from '../../../../projects/lib/src/entity/property-company';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private propertyCompanyService: PropertyCompanyService) {
  }

  propertyCompany : PropertyCompany;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      this.propertyCompanyService.getById(id)
        .subscribe((propertyCompany) => {
            this.validate(propertyCompany);
            this.propertyCompany = propertyCompany;
          }
        );
    })
  }

  validate(propertyCompany: PropertyCompany) {
    Assert.isObject(propertyCompany, 'propertyCompany must be object');
    // 新增时设置了备用联系人、备用联系电话、公司地址可以为空
    Assert.isDefined(
      propertyCompany.name,
      propertyCompany.legalPerson,
      propertyCompany.timelyResponseRate,
      propertyCompany.score,
      propertyCompany.scoreRank,
      propertyCompany.contacts,
      propertyCompany.phone,
      'propertyCompany validate fail');
  }

  OnBack() {
    this.router.navigateByUrl('property').then();
  }
}
