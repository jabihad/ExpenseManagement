import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  public isUserAuthenticated: boolean;
  public isCustomer: boolean;
  public isAdmin: boolean;
  
  constructor(private _authService: AuthenticationService, private _router: Router) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("role")=="customer"){
      this.isUserAuthenticated = true;
      this.isCustomer = true;
    }
    else if(localStorage.getItem("role")=="admin"){
      this.isUserAuthenticated = true;
      this.isAdmin = true;
    }

    this._authService.loggedinMessage$
      .subscribe(
        message => {
          //this.isUserAuthenticated = message;
          //console.log(message)
          if(message=="customer"){
            this.isUserAuthenticated = true;
            this.isCustomer = true;
            console.log("customer")
          }
          else if(message=="admin"){
            this.isUserAuthenticated = true;
            this.isAdmin = true;
            console.log("admin")
          }
            
          //console.log(this.isUserAuthenticated)
        },
        error => {
          console.log(error)
        }
      )
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  public logout = () => {
    this._authService.logout();
    this.isUserAuthenticated = false;
    this.isCustomer = false;
    this.isAdmin = false;
    this._router.navigate(["/authentication/login"])
    
      // .then(() => {
      //   window.location.reload();
      // });
  }
}
