import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';


import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContestService {

  public authToken: any;
  public user: any;
  public contest: any;
  public domain = 'http://localhost:80/';
  public options;
  public sol;
  public toggler: boolean;



  private contestSource = new BehaviorSubject<string>('default contest');
  currentContest = this.contestSource.asObservable();

  private Toggler = new BehaviorSubject<boolean>(true);
  toggle = this.Toggler.asObservable();

  public activeContest = new Subject();
  constructor(
    private http: Http
  ) { }
  public time: Subject<String> = new Subject<String>();
  public createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  public loadToken() {
    this.authToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }

  public addContest(contest) {
    return this.http
      .post( this.domain +  'contest', contest)
        .map(res => res.json());
  }

  public getContest(): Observable<any> {
    return this.http.get( this.domain +  'contest')
        .map(res => res.json());
  }

  public addProblem(problem, contest): Observable<any> {
    return this.http.post('contest/' + contest, problem)
      .map(res => res.json());
  }

  public getProblems(contest): Observable<any> {
    return this.http.get( 'contest/' + contest)
        .map(res => res.json());
  }

  public getProblem(code, contest): Observable<any> {
    return this.http.get(this.domain +  'contest/' + contest + '/problems/' + code)
      .map(res => res.json());
  }

  public addSolution(solution): Observable<any> {
    return this.http.post('solution', solution)
      .map(res => res.json());
  }
  public deleteContest(contest) {
    return this.http.delete(this.domain +  'contest/' + contest)
      .map(res => res.json());
  }
  public setSolution(sol) {
    this.sol = sol;
  }
  public getSolution() {
    return this.sol;
  }

  changeContest(contest: string) {
    this.contestSource.next(contest);
  }

  getRankings(contest) {
    return this.http.get('rankings/' + contest)
      .map(res => res.json());
  }
  ontoggle(value: boolean) {
    this.Toggler.next(value);
  }

}
