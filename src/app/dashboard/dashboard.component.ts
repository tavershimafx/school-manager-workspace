import { Component, ComponentRef, ElementRef, EnvironmentInjector, inject, input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { UserProfile, DialogModel, Student } from  "@models/app.models";
import { DialogService } from '@services/dialog-service';
import { isInbound } from '@services/utilities';
import AuthorizeService from '../security/auth.service';
import { ApiRoutes } from '@models/api.routes';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { studentProfile } from '@store/actions/student.actions';
import { dashboardServices } from '@store/actions/utility.actions';
import { userProfile } from '@store/actions/user.actions';
import { dashboardSelector } from '@store/selectors/students.selectors';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardLayoutComponent implements OnDestroy, OnInit {

  store = inject(Store);
  studentProfile = input.required<Student>();
  dashboard = this.store.selectSignal(dashboardSelector)

  mobileMenuOpen = false
  @ViewChild("sidebar", { static: true }) sidebar!: ElementRef
  sideBarItem = 0
  profile?: UserProfile
  showNotification: boolean = false
  notifyProps: any
  activeDialog?: ComponentRef<any>
  notifyDialog?: ComponentRef<any>
  
  constructor(dialogService: DialogService,private authorize: AuthorizeService, 
    container: ViewContainerRef, router: Router, private httpClient: HttpClient,
    private envInjector: EnvironmentInjector
  ){
    this.mouseEvent = this.mouseEvent.bind(this)
    
    dialogService.dialog.subscribe({
      next: n =>{
        if(n instanceof DialogModel){
          let p = n as DialogModel
          this.activeDialog = container.createComponent<any>(p.dialogType, { 
            index: 0, 
            environmentInjector: this.envInjector 
          })

          // any dialog who wishes to receive data should declare data prop through their @Input()
          this.activeDialog.setInput("data", p.data)
        }else{
          if(n == null || typeof(n) != typeof(Component) && this.activeDialog != undefined){
            this.activeDialog?.destroy()
            this.activeDialog = undefined
          }else if(typeof(n) == typeof(Component)){
            this.activeDialog = container.createComponent<any>(n)
          }
        }
      }
    })

    dialogService.notifyObservable.subscribe({
      next: n =>{
        this.showNotification = true
        this.notifyProps = n
        switch (n.accent) {
          case "success":
            this.notifyProps.accent = "bg-success-500"
            break;
          case "warning":
            this.notifyProps.accent = "bg-warning-500"
            break;
          case "danger":
            this.notifyProps.accent = "bg-error"
            break;
          case "info":
            this.notifyProps.accent = "bg-on-primary-container"
            break;
          default:
            break;
        }
        setTimeout(() => {
          this.closeNotify()
        }, 3000);
      }
    })

    router.events.subscribe((event:any) => {
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
    this.getLogos()
    this.getProfile()
    this.store.dispatch(studentProfile.setProfile({profile: this.studentProfile()}))
  }

  ngOnDestroy(): void {
    
  }

  setSidebar(n:number){
    this.sideBarItem = n
  }
  
  toggleSidebar() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if(this.mobileMenuOpen == true){
      setTimeout(() => {
      window.addEventListener("click", this.mouseEvent)
      }, 50);
    }
  }

  logout(){
    this.authorize.signOut()
  }

  mouseEvent(e:MouseEvent){
    let el = this.sidebar.nativeElement.getBoundingClientRect()
    let b = isInbound(el.top, el.left, el.bottom, el.right, e.clientX, e.clientY)
    if (!b){
      this.mobileMenuOpen = false
      window.removeEventListener("click", this.mouseEvent)
    }
  }
  
  closeNotify(){
    this.showNotification = false
    this.notifyProps = undefined
  }
  
  private getProfile(){
      this.httpClient.get<any>(ApiRoutes.account.profile).subscribe({
        next: res =>{
            this.profile = res.value
            this.store.dispatch(userProfile.setProfile({profile: res.value}))
        },
        error: er =>{
          return;
        }
    })
  }
  private getLogos(){
    this.httpClient.get<any>(ApiRoutes.identity.schoolLogo,).subscribe({
        next: res =>{
            this.store.dispatch(dashboardServices.schoolLogo({ schoolLogo: res.value }))
        }
    })
    
    this.httpClient.get<any>(ApiRoutes.identity.dashboardLogo,).subscribe({
        next: res =>{
            this.store.dispatch(dashboardServices.dashboardLogo({ dashboardLogo: res.value }))
        }
    })
  }
}
