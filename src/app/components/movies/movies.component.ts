import { ChangeDetectorRef, Component, ElementRef, OnInit, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {

  genresList = [];
  selectedGenres = [];
  dropdownSettings: IDropdownSettings = {};
  public movieTitle: string;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      // idField: 'item_id',
      // textField: 'item_text',
      selectAllText: 'Select All Genre(s)',
      unSelectAllText: 'UnSelect All Genre(s)',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(`Title: ${this.movieTitle}`);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  addGenres(genres: string[]) {
    this.genresList = genres;
  }

}
