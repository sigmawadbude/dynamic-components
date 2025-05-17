import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  template:  `<div class="home-page-container">
    <h2>Home Page</h2>
    <div class="home-page-content">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.
        </p>
    </div>
</div>`,
  styles: [`.home-page-container{
    padding: 50px 100px;
}
.home-page-content{
    width: 70%;
    padding-top: 50px;
    border-top: #dedede 3px solid;
}
p{
    margin-top: 20px;
}`]
})
export class HomeComponent {

}
