import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Resident} from '../../../../projects/lib/src/entity/resident';

/**
 * 查看居民详情
 */
@Component({
  selector: 'app-resident-view',
  templateUrl: './resident-view.component.html',
  styleUrls: ['./resident-view.component.scss']
})
export class ResidentViewComponent {
  @Output()
  beResidentIdChange = new EventEmitter<number>();
  @Input()
  resident: Resident;
  showMore = false;
  showRelationship = false;

  onResidentIdChange(residentId: number) {
    this.beResidentIdChange.next(residentId);
  }
}
