// import {
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexTooltip,
//   ApexYAxis,
//   ApexMarkers,
//   ApexPlotOptions,
//   ApexFill,
//   ApexGrid,
//   ApexLegend,
//   ApexStroke,
//   ApexTitleSubtitle
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   yaxis: ApexYAxis | ApexYAxis[];
//   labels: string[];
//   stroke: ApexStroke;
//   markers: ApexMarkers;
//   plotOptions: ApexPlotOptions;
//   fill: ApexFill;
//   tooltip: ApexTooltip;
//   dataLabels: ApexDataLabels;
//   grid: ApexGrid;
//   legend: ApexLegend;
//   title: ApexTitleSubtitle
// };

export interface IKeyValue{
  /**
   * The value or key which will be used or sent to the form control or initiator
   */
  key: any

  /**
   * The text to be displayed to the user
   */
  value: string


  /**
   * An additional field to include for custom collections
   */
  meta?: any

  /**
   * A flag to determine if the option should be disabled
   */
  disabled?: boolean
}

export interface IModelBase{
  selected?: boolean
  id?: any
  concurrencyStamp?: string
}

export interface TaskResult<T>{
  value: T
  errors: string[]
  warning: string
  succeeded: boolean
}

export class DialogModel{
  data: any
  dialogType: any
}

export interface UserProfile{
  id: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profilePicture: string
  role: string
  navigations: NavigationItem[]
}

export interface NavigationItem{
  displayText: string
  link: string
  icon: string
  notificationCount?: number
  children?: NavigationItem[]
}

export interface IBasicListDto extends IModelBase{
  id: any
  name: string
  description: string
  status: string
}

export interface IBasicInfoDto extends IModelBase{
  name: string
  description?: string
  status: string
}

export interface INotificationDto {
  id: number;
  message: string;
  action: string;
  icon: string;
  accent: string;
  isRead: boolean;
  messageType: string;
  dateCreated: Date;
}

export class QueryForm{
  query: string = "";
  para:string = "";
  page: number = 1;
  size: number = 50
}
export class Pagination{
  requestedPage?: number = 1
  pageSize?: number = 100

  /**
   *  for use in client side pagination and not necessarily required by the server
   *  just because we dont want to define another pagination class
   */ 
  label?: string
  page?: number | null
  disabled?: boolean
}

export interface SmartTableResult<T>{
  items: T[]
  totalItems: number
  currentPage: number
  pageSize: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  totalPages: number
}

export interface MediaListItem {
  id: number;
  name: string;
  type: string;
  url: string;
  size: number;     
  dateCreated: Date;
}

export interface FileDirectory {
  currentPage: number;
  pageSize: number;
  fullPath: string;
  name: string;
  directories: FileDirectory[];
  files: MediaListItem[];
}
