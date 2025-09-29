import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserDataComponent } from './user-data/user-data.component';
import { PostsUserComponent } from './posts-user/posts-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    PostsUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }