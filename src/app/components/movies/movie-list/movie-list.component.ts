import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  masterMoviesMap = new Map<string, Movie[]>();
  filteredMoviesMap = new Map<string, Movie[]>();
  totalGenres: string[] = [];
  _selectedGenres: string[] = [];
  _movieTitle: string;
  @Output() genresEvent = new EventEmitter<string[]>();

  constructor( private movieService: MovieService ) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      data.forEach(element => {
        console.log(`Data: ${element.date}`)
        let movies: Movie[] = [];
        element.movies.forEach(movie => {
          movies.push(new Movie(movie.title, movie.released, movie.rated, movie.runtime, movie.genre, movie.meta_score, movie.poster));
        })
        this.masterMoviesMap.set(element.date, movies);  
      });
      this.populateData();
    });
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(`Title: ${this._movieTitle}`);
  }

  private populateData(){
    console.log("Map: " + this.masterMoviesMap);
    this.filteredMoviesMap = new Map(this.masterMoviesMap);
    let genereSet = new Set<string>();
    for (let movies of this.masterMoviesMap.values()) {
      for( let movie of movies ){
        for( let genre of movie.genre ){
          genereSet.add(genre);
        }
      }
    }
    this.totalGenres = [...genereSet]
    console.log(`Geners: ${this.totalGenres}`)
    this.genresEvent.emit(this.totalGenres);
  }

  @Input() set selectedGenres(genres: string[]) {
    this._selectedGenres = genres;
    this.filteredMoviesMap = new Map(this.masterMoviesMap);
    if( this._selectedGenres.length > 0 ) {
      for (let date of this.filteredMoviesMap.keys()) {
        let movies = this.filteredMoviesMap.get(date);
        this.filteredMoviesMap.set(date, movies.filter(movie => movie.genre.some(genre => this._selectedGenres.includes(genre)) ));
      }
    }
    console.log(`Selected Genres: ${this._selectedGenres}`)
  }

  @Input() set movieTitle(title: string) {
    console.log(`Movie title: ${title}`);
    this._movieTitle = title;
    this.filteredMoviesMap = new Map(this.masterMoviesMap);
    if( title !== '' ) {
      for (let date of this.filteredMoviesMap.keys()) {
        let movies = this.filteredMoviesMap.get(date);
        this.filteredMoviesMap.set(date, movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase())) );
      }
    }
  }

}
