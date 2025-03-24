import {Component, OnInit} from '@angular/core';
import {HistoryExportExcelService} from '../../../../projects/lib/src/service/history-export-excel.service';
import {HistoryExportExcel} from '../../../../projects/lib/src/entity/history-export-excel';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';

@Component({
  selector: 'app-export-excel-list',
  templateUrl: './export-excel-list.component.html',
  styleUrls: ['./export-excel-list.component.scss']
})
/**
 * 历史导出excel列表
 */
export class ExportExcelListComponent implements OnInit {

  historyExportExcels = [] as Array<HistoryExportExcel>;

  constructor(private historyExportExcelService: HistoryExportExcelService,
              private residentService: ResidentService) { }


  loadData(): void {
    this.historyExportExcelService.getAllByStatusIsExported().subscribe(
      data => {
        this.historyExportExcels = data;
      }
    )
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * 点击下载历史导出excel表
   */
  onDownload(historyExportExcel: HistoryExportExcel): void {
    this.residentService.downloadExcel(HistoryExportExcelService.BASE_EXPORT_FILENAME
      + historyExportExcel.filename.slice(0,4) + '_' + historyExportExcel.filename.slice(4,6) + '_'
      + historyExportExcel.filename.slice(6,8) + '.xlsx', historyExportExcel.filename)
  }

  /**
   * 当点击下拉菜单时更新数据
   */
  onClickOpen() {
    this.loadData();
  }
}
