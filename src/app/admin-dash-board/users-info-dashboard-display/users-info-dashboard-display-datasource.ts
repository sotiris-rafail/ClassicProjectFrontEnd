import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { User } from '../admin-dash-board.component';

// TODO: Replace this with your own data model type


// TODO: replace this with real data from your application


/**
 * Data source for the UsersInfoDashboardDiaply view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersInfoDashboardDiaplyDataSource extends DataSource<User> {

  constructor(public data: User[], private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: User[]) {
    if (data.length === 0) {
      return data;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'email': return compare(a.email, b.email, isAsc);
        case 'userId': return compare(+a.userId, +b.userId, isAsc);
        default: return 0;
      }
    });
  }

  public filterByEmail(filter: string) {
    return this.data.filter(user => {
      return user.email.trim().toLowerCase().includes(filter.trim().toLowerCase())
    })
  };

  filterByCharacterName(filter: string): User[] {
    let filterData = [];
    this.data.forEach(user => {
      user.chars.forEach(char => {
        if (char.name.trim().toLowerCase().includes(filter.trim().toLowerCase())) {
          filterData.push(user);
        }
      });
    });
    return filterData;
  };


}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
