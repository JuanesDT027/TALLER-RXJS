import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Búsqueda de Perfil - Red Social';
  ROOT_URL = "https://dummyjson.com";
  txtUser: string = "";
  usuario: User | null = null;
  usuarioNoEncontrado: boolean = false;
  
  constructor(private http: HttpClient) { }

  searchUser() {
    if (!this.txtUser.trim()) {
      this.usuario = null;
      this.usuarioNoEncontrado = false;
      return;
    }

    this.http.get(`${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`).subscribe({
      next: (response: any) => {
        if (response && response.users && response.users.length > 0) {
          this.usuario = response.users[0];
          this.usuarioNoEncontrado = false;
          console.log('Usuario encontrado:', this.usuario);
        } else {
          this.usuario = null;
          this.usuarioNoEncontrado = true;
          console.log('Usuario no encontrado');
        }
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        this.usuario = null;
        this.usuarioNoEncontrado = true;
      }
    });
  }

  ngOnInit(): void {
    
  }
}