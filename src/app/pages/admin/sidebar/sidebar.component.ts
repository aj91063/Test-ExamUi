import { RenderRow } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public login :LoginService){}

  isLoggedIn=false;
  user=null;

  ngOnInit():void{
     this.isLoggedIn=this.login.isLoggedIn();
     this.user=this.login.getUser();
     this.login.loginStatusSubject.asObservable().subscribe((data)=>{
       this.isLoggedIn=this.login.isLoggedIn();
     this.user=this.login.getUser();
     })
  }

  public logout(){
   this.login.logout();
   window.location.reload();
  }

  // arrowClick(){
  //   // let arrow = document.querySelectorAll(".arrow");
  //   // for (var i = 0; i < arrow.length; i++) {
  //   //   arrow[i].addEventListener("click", (e)=>{
  //   //  let arrowParent = e.//selecting main parent of arrow
  //   //  arrowParent.classList.toggle("showMenu");
  //   //   });
  //   // }
  //   let sidebar:any = document.querySelector(".sidebar");
  //   let sidebarBtn:any = document.querySelector(".bx-menu");
  //   console.log(sidebarBtn);
  //   sidebarBtn.addEventListener("click", ()=>{
  //     sidebar.classList.toggle("close");
  //   });
  // }


  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    let sidebar:any = document.querySelector(".sidebar");
    if (hasClass) {
        sidebar.removeClass(className);
    } else {
        sidebar.classList.toggle(className);
    }
}

}


