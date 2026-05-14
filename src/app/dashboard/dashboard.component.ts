import { Component, ComponentRef, computed, ElementRef, EnvironmentInjector, inject, OnDestroy, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { DialogModel } from "@models/app.models";
import { DialogService } from '@services/dialog-service';
import { isInbound } from '@services/utilities';
import AuthorizeService from '../security/auth.service';
import { Store } from '@ngrx/store';
import { dashboardSelector, selectUserProfile } from './store/dashboard.selectors';
import {WorkspaceManager } from '@workspace/tab-manager';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardLayoutComponent implements OnDestroy, OnInit {

  store = inject(Store);
  workspaceManager = inject(WorkspaceManager);
  //tabsList = computed(() => Array.from(this.workspaceManager.tabs().values()));
  protected Array = Array
  dashboard = this.store.selectSignal(dashboardSelector)
  userProfile = this.store.selectSignal(selectUserProfile)

  mobileMenuOpen = signal(false)
  @ViewChild("sidebar", { static: true }) sidebar!: ElementRef
  sideBarItem = 0
  showNotification = signal(false)
  notifyProps: any
  activeDialog?: ComponentRef<any>
  notifyDialog?: ComponentRef<any>

  private autoCloseTimer: any;
  private startTime: number = 0;
  private remainingTime: number = 5000;

  constructor(dialogService: DialogService, private authorize: AuthorizeService,
    container: ViewContainerRef, public router: Router,
    private envInjector: EnvironmentInjector
  ) {
    this.mouseEvent = this.mouseEvent.bind(this)

    dialogService.dialog.subscribe({
      next: n => {
        if (n instanceof DialogModel) {
          let p = n as DialogModel
          this.activeDialog = container.createComponent<any>(p.dialogType, {
            index: 0,
            environmentInjector: this.envInjector
          })

          // any dialog who wishes to receive data should declare data prop through their @Input()
          this.activeDialog.setInput("data", p.data)
        } else {
          if (n == null || typeof (n) != typeof (Component) && this.activeDialog != undefined) {
            this.activeDialog?.destroy()
            this.activeDialog = undefined
          } else if (typeof (n) == typeof (Component)) {
            this.activeDialog = container.createComponent<any>(n)
          }
        }
      }
    })

    dialogService.notifyObservable.subscribe({
      next: n => {
        this.showNotification.set(true)
        this.notifyProps = n
        this.startTimer(5000);
      }
    })

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        dialogService.toggleAsyncMode(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        dialogService.toggleAsyncMode(false);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  startTimer(duration: number) {
    this.startTime = Date.now();
    this.autoCloseTimer = setTimeout(() => {
      this.closeNotify();
    }, duration);
  }

  onMouseEnter() {
    // 1. Stop the JS timer
    clearTimeout(this.autoCloseTimer);

    // 2. Calculate how much time was left before pausing
    const elapsed = Date.now() - this.startTime;
    this.remainingTime -= elapsed;
  }

  onMouseLeave() {
    // 3. Restart timer with only the remaining time
    if (this.remainingTime > 0) {
      this.startTimer(this.remainingTime);
    }
  }

  setSidebar(n: number) {
    this.sideBarItem = n
  }

  toggleSidebar() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
    if (this.mobileMenuOpen() == true) {
      setTimeout(() => {
        window.addEventListener("click", this.mouseEvent)
      }, 50);
    }
  }

  logout() {
    this.authorize.signOut()
  }

  mouseEvent(e: MouseEvent) {
    let el = this.sidebar.nativeElement.getBoundingClientRect()
    let b = isInbound(el.top, el.left, el.bottom, el.right, e.clientX, e.clientY)
    if (!b) {
      this.mobileMenuOpen.set(false)
      window.removeEventListener("click", this.mouseEvent)
    }
  }

  closeNotify() {
    this.showNotification.set(false)
    this.notifyProps = undefined
  }
}
