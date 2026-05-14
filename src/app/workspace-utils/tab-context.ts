
export interface ITabContext {
    tabId: number
    name: string
    data: any
    route: string
}

export interface ITab extends ITabContext {
    executeCommand(command: string, data: any): void;
    loadTabContext(): void;
}

export interface IAdminTab extends ITab {
    
}

export interface ITenantTab extends ITab {
    tenantName: string
    tenantId: string
}