import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

@Component({
  standalone: true,
  selector: 'app-admin-login',
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AdminLogin implements AfterViewInit, OnDestroy {
  @ViewChild('vantaRef', { static: true }) vantaRef!: ElementRef;

  vantaEffect: any;
  loginForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the login form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    // Apply Vanta Cloud animation to the background element
    this.vantaEffect = CLOUDS({
      el: this.vantaRef.nativeElement,
      THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      skyColor: 0x87ceeb,
      cloudColor: 0xffffff,
      cloudShadowColor: 0xcccccc,
      sunColor: 0xffe066
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        const decoded = this.auth.decodeToken(res.token);
        const role = decoded.role;

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.error = 'Invalid username or password';
      }
    });
  }
}
