
import { Actions, createEffect } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { DashboardActions } from "./dashboard.actions";
import * as selectors from "./dashboard.selectors";
import { DashboardServices } from "../dashboard.services";
import { createLoadIfNeededEffect } from "@store/utility.effects";
import { IKeyValue, UserProfile } from "@models/app.models";
import { inject, Injectable } from "@angular/core";
import AuthorizeService from "../../security/auth.service";


@Injectable()
export class DashboardEffects {
    actions$: Actions = inject(Actions)
    store: Store = inject(Store)
    constructor(private dashboardServices: DashboardServices, private authService: AuthorizeService) {
        
    }

   loadUserIfNeeded$ = createEffect(() =>
        createLoadIfNeededEffect<
            ReturnType<typeof DashboardActions.loadUser>,
            any,
            UserProfile
        >(this.actions$, this.store, {
            triggerAction: DashboardActions.loadUser,
            selectLoaded: selectors.selectUserProfileLoaded,

            fetch: () => this.authService.getAccount(),

            successAction: (profile) =>
                DashboardActions.userLoaded({ profile: profile }),
        })
    );

   loadStatusesIfNeeded$ = createEffect(() =>
        createLoadIfNeededEffect<
            ReturnType<typeof DashboardActions.loadEntityStatus>,
            any,
            IKeyValue[]
        >(this.actions$, this.store, {
            triggerAction: DashboardActions.loadEntityStatus,
            selectLoaded: selectors.selectEntityStatusLoaded,

            fetch: () => this.dashboardServices.getEntityStatus(),

            successAction: (options) =>
                DashboardActions.entityStatusLoaded({ options: options }),
        })
    );
    
   loadTenantLogoIfNeeded$ = createEffect(() =>
        createLoadIfNeededEffect<
            ReturnType<typeof DashboardActions.loadTenantLogo>,
            any,
            string
        >(this.actions$, this.store, {
            triggerAction: DashboardActions.loadTenantLogo,
            selectLoaded: selectors.selectTenantLogoLoaded,

            fetch: () => this.dashboardServices.getTenantLogo(),

            successAction: (logo) =>
                DashboardActions.tenantLogoLoaded({ logo: logo }),
        })
    );
    
   loadDashboardLogoIfNeeded$ = createEffect(() =>
        createLoadIfNeededEffect<
            ReturnType<typeof DashboardActions.loadDashboardLogo>,
            any,
            string
        >(this.actions$, this.store, {
            triggerAction: DashboardActions.loadDashboardLogo,
            selectLoaded: selectors.selectDashboardLogoLoaded,

            fetch: () => this.dashboardServices.getDashboardLogo(),

            successAction: (logo) =>
                DashboardActions.dashboardLogoLoaded({ logo: logo }),
        })
    );
}