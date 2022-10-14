import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  toggleForm = () => {
    const container = document.querySelector('.container');
    container!.classList.toggle('active');
  };

  registerUser(formValue: any) {
    if (formValue.password === '' || formValue.username === '') {
      console.log('Fields Empty');
    } else {
      console.log('Register: ', formValue);
      this.http
        .post('http://localhost:3000/api/user/register', formValue)
        .subscribe((res: any) => {
          console.log(res);
          if (res.statusCode === 201) {
            Swal.fire({
              title: 'Registered Successfully',
              text: 'You can now login',
            }).then((result) => {
              if (result.isConfirmed) {
                this.toggleForm();
              }
            });
          }
        });
    }
  }

  loginUser(formValue: any) {
    if (formValue.password === '' || formValue.username === '') {
      console.log('Fields Empty');
    } else {
      console.log('Login: ', formValue);
      this.http
        .post('http://localhost:3000/api/user/login', formValue)
        .subscribe((res: any) => {
          console.log(res);
          if (res.statusCode === 200) {
            window.location.href = '/';
          }
        });
    }
  }
}
