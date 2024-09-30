import { Injectable } from '@angular/core';
import { Config } from 'ngx-easy-table';
// import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';

@Injectable()
export class ConfigService {
    public static config: Config = {
        searchEnabled: false,
        headerEnabled: true,
        orderEnabled: true,
        // globalSearchEnabled: false,
        paginationEnabled: false,
        // exportEnabled: false,
        clickEvent: false,
        selectRow: false,
        selectCol: false,
        selectCell: false,
        rows: 6,
        additionalActions: false,
        serverPagination: false,
        isLoading: false,
        detailsTemplate: false,
        groupRows: false,
        paginationRangeEnabled: false,
        collapseAllRows: false,
        checkboxes: false,
        resizeColumn: false,
        fixedColumnWidth: false,
        horizontalScroll: false,
        // draggable: false,
        logger: false,
        tableLayout: {
            style: 'normal',
            theme: 'light',
            borderless: true,
            hover: true,
            striped: true,
        }
    };
}
