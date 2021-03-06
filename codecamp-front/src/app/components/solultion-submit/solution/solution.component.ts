import { Component, OnInit, Input } from '@angular/core';
import { SolultionSubmitComponent } from '../solultion-submit.component';
import { ContestService } from '../../../services/contest.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  data;
  condition;
  constructor(
    private contestService: ContestService
  ) { }

  ngOnInit() {
    this.data = this.contestService.getSolution();
    if(this.data === true)
    {
      this.data = "Correct Answer";
      this.condition = 'green';
    }
    else if(this.data === false)
    {
      this.data = "Worng Answer";
      this.condition = 'red';
    }
    else if(this.data === 'RE')
    {
      this.data = "Runtime Error";
      this.condition = 'red';
    }
    else if(this.data === 'TLE')
    {
      this.data = "Time Limit Exceed";
      this.condition = 'blue';
    }
    else
    {
      this.data = "Compile Time Error";
      this.condition = 'red';
    }
  }

}
