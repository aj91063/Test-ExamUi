import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  constructor(private title:Title){}
  ngOnInit(): void {
    this.title.setTitle("User Update")
  }
}
