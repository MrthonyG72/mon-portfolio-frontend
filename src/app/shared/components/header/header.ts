import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  menuOpen = signal(false);
  isDark = signal(false);

  private readonly DARK_KEY = 'portfolio-dark';

  ngOnInit(): void {
    const saved = localStorage.getItem(this.DARK_KEY);
    const dark = saved === 'true';
    this.isDark.set(dark);
    this.applyDark(dark);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleDark(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    localStorage.setItem(this.DARK_KEY, String(next));
    this.applyDark(next);
  }

  private applyDark(dark: boolean): void {
    document.documentElement.classList.toggle('dark-theme', dark);
  }
}
