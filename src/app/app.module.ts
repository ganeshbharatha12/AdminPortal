import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from "./loader.component";

import { LoaderInterceptor } from "./loader.interceptor";
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { MangeClientsComponent } from './pages/mange-clients/mange-clients.component';
import { ManageBrokersComponent } from './components/manage-brokers/manage-brokers.component';
import  { NotificationsComponent } from './components/notifications/notifications.component'
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonComponent } from './pages/common/common.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExcelService } from './services/excel.service';

import {PhoneMaskDirective} from './Directives/phone-mask.directive';
import {EnableDisableDirective} from './Directives/enable-disable.directive'

import { ChartGuageComponent } from './components/chart-guage/chart-guage.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { WalletConfigComponent } from './components/wallet-config/wallet-config.component'
import { AddbrokerDetailsComponent } from './components/addbrokerDetails/addbrokerDetails.component'
import { EditAdvisorComponent } from './components/edit-advisor/edit-advisor.component'
import { ReportsComponent } from './components/reports/reports.component'

import { EmployeePortalComponent } from './components/employee-portal/employee-portal.component'
import { AuthGuardService} from './services/authGuard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";
import { ClipboardModule } from 'ngx-clipboard';
import { ResponsiveService } from './responsive/responsive.service';
import { FilerenamePipe } from './pipes/filerename.pipe';
import { MyplansComponent } from './components/myplans/myplans.component'
import { SwiperModule } from 'swiper/angular';
import { ManageSystemUsersComponent } from './components/manage-system-users/manage-system-users.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { PayablesComponent } from './components/payables/payables.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewCustomersComponent } from './components/viewCustomers/viewCustomers.component';
import { ManageClientsComponent } from './components/manage-clients/manage-clients.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { ViewCustomerDetailsComponent } from './components/view-customer-details/view-customer-details.component';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { EditCorporateComponent } from './components/edit-corporate/edit-corporate.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SalestrackingcodePipe } from './pipes/salestrackingcode.pipe';
// import { AddEmployeeComponent } from './add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    OverviewComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    MangeClientsComponent,
    ManageBrokersComponent,
    ViewCustomersComponent,
    NotificationsComponent,
    CommonComponent,
    PhoneMaskDirective,
    EnableDisableDirective,
    ChartGuageComponent,
    EmployeeComponent,
    WalletConfigComponent,
    LoaderComponent,
    AddbrokerDetailsComponent,
    EditAdvisorComponent,
    ReportsComponent,
    EmployeePortalComponent,
    FilerenamePipe,
    MyplansComponent,
    ManageSystemUsersComponent,
    InvoicesComponent,
    PayablesComponent,
    MarketingComponent,
    SettingsComponent,
    ManageClientsComponent,
    ManageCustomersComponent,
    ViewCustomerDetailsComponent,
    PhoneFormatPipe,
    EditCorporateComponent,

    AddCustomerComponent,
    AddEmployeeComponent,
    SalestrackingcodePipe,
   ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    }),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    ClipboardModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SwiperModule
  ],
  exports:[PhoneMaskDirective,EnableDisableDirective],
  providers: [ExcelService,AuthGuardService,{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
