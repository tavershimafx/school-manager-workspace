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

// export interface UserProfile{
//   id: string
//   userName: string
//   firstName: string
//   lastName: string
//   email: string
//   profilePicture: string
//   role: string
// }

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
   * A flag to determine if the option should be disabled
   */
  disabled?: boolean
}

export interface IModelBase{
  selected?: boolean
  id?: any
  concurrencyStamp?: string
}


export class DialogModel{
  data: any
  dialogType: any
}

export interface UserProfile {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
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

export interface ResultSheet {
  studentId: number;
  enrollmentNumber: string
  studentName: string;
  studentEmail: string;
  className: string;
  yearName: string;

  passportUrl: string;
  average: string;
  position: string;
  term: string;
  nextTermStart: string;
  nextTermEnd: string;
  nextTermFees: string;
  totalMarksObtained: string;
  totalMarksObtainable: string;
  numberInClass: string;
  daysPresent: string;
  daysOpened: string;
  formMasterRemark: string;
  headTeacherRemark: string;

  headTeacherName: string;
  formMasterName: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  clubs: string;
  specialization: string;
  dateComputed: string;
  percentAttendance: string;

  schoolSettings: SchoolSettingsDto;
  subjects: ResultSheetSubject[];
}

export interface SchoolSettingsDto {
  name: string;
  address: string;
  logo: string;
  phoneNumber: string;
  email: string;
  stamp: string;
}


export interface ResultSheetSubject {
  subjectName: string;
  cA1: string;
  cA2: string;
  cA3: string;
  exam: string;
  total: string;
  position: string;
  average: string;
  highestInSubject: string;
  lowestInSubject: string;
  remark: string;
  grade: string;
}

export interface AvailableSessionResult{
  id: number
  schoolYearName: string
}

export interface AvailableClassResult{
  yearId: number
  schoolYearName: string
  classId: number
  className: string
  terms: string[]
  schoolTerm: string
  dateComputed: Date
}

export interface StudentProfile
{
    id:string
    fullName:string
    email :string
    currentClass :string
    currentTerm :string
}

export interface StudentDashboard {
  feesPaid: number;
  outstandingFees: number
  totalExams: number;
  currentClass: string;
  currentTerm: string
  subjects: string[];
  averages: AverageComparison[];
}

export interface AverageComparison {
  className: string;
  yearName: string;
  yearId: number;
  average: number;
  highestInClass: number;
  lowestInClass: number;
}

export interface Student {
  classId: number;
  file: string | null;
  id: number;
  concurrencyStamp: string | null;
  surname: string;
  firstName: string;
  middleName: string;
  email: string;
  gender: string;
  studentStatus: string;
  dob: Date;
  nationality: string;
  state: string;
  lga: string;
  residentialAddress: string;
  classAdmitted: string;
  height: number | null;
  weight: number | null;
  clubs: string | null;
  dateofAdmission: Date;
  enrollmentNumber: string;
  currentClass: string;
  specialization: string | null;
  previousSchool: string;
  parentName: string;
  relationship: string;
  parentPhone: string;
  parentAddress: string;
  parentEmail: string;
  profilePicureUrl: string
}


export interface AccountInfo {
  accountName: string;
  accountNumber: string;
  bankName: string;
  currencyCode: string;

  entityId: number;
  entityName: string;
  summary: TransactionSummary
}

export interface TransactionSummary {
  totalTransaction: number;
  totalPayment: number;
  totalInvoice: number;
  totalDebt: number;
}

export interface PaymentInvoiceList extends IModelBase {
  amount: number;
  balance: number;
  invoiceStatus: string;
  paymentPurpose: string;
  dueDate: Date;
}

export interface TransactionListDto extends IModelBase {
  transactionReference: string;
  amount: number;
  fees: number;
  date: Date;
  senderBank: string;
  senderAccount: string;
  senderAccountName: string;
}