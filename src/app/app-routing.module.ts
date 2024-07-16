import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { MangeClientsComponent } from './pages/mange-clients/mange-clients.component';
import { ManageBrokersComponent } from './components/manage-brokers/manage-brokers.component';
import { BrokerDetailsComponent } from './components/brokerDetails/brokerDetails.component';
import { ManageClientsComponent } from './components/manage-clients/manage-clients.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { EditAdvisorComponent } from './components/edit-advisor/edit-advisor.component'
import { AddbrokerDetailsComponent } from './components/addbrokerDetails/addbrokerDetails.component'
import { CommonComponent } from './pages/common/common.component';

import  { AuthGuardService } from './services/authGuard.service'

import { ReportsComponent } from './components/reports/reports.component'

import { EmployeePortalComponent } from './components/employee-portal/employee-portal.component'

import { MyplansComponent } from './components/myplans/myplans.component'

import { ManageSystemUsersComponent } from './components/manage-system-users/manage-system-users.component'

import { InvoicesComponent } from './components/invoices/invoices.component'

import { EditCorporateComponent } from './components/edit-corporate/edit-corporate.component'
import { PayablesComponent } from './components/payables/payables.component'

import { MarketingComponent } from './components/marketing/marketing.component'

import { SettingsComponent } from './components/settings/settings.component'

import { ViewCustomersComponent } from './components/viewCustomers/viewCustomers.component'
import { ViewCustomerDetailsComponent } from './components/view-customer-details/view-customer-details.component'
import { OverviewComponent } from './components/overview/overview.component'
import{AddCustomerComponent}from './components/add-customer/add-customer.component'
import{AddEmployeeComponent}from './components/add-employee/add-employee.component'

const routes: Routes = [
  { path: '', component: PagesLoginComponent },
  { path: 'login', component: PagesLoginComponent},
  { path: 'inprogress', component: CommonComponent,canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myplans', component: MyplansComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageUsers', component: ManageSystemUsersComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageCorporates/addCorporate', component: MangeClientsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageAdvisors', component: ManageBrokersComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageCorporates', component: ManageClientsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageMembers', component: ManageCustomersComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageDetails/:id', component: BrokerDetailsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageAdvisors/editAdvisor/:id', component: EditAdvisorComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageAdvisors/advsiors/:id/customers', component: ViewCustomersComponent,canActivate: [AuthGuardService],pathMatch: 'full'},

  { path: 'manageMembers/employee/:id/details', component: OverviewComponent,canActivate: [AuthGuardService],pathMatch: 'full'},

  { path: 'manageCorporates/edit-corporate/:id', component: EditCorporateComponent,canActivate: [AuthGuardService],pathMatch: 'full'},

  { path: 'customer/:id/details', component: ViewCustomerDetailsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'manageAdvisors/addAdvisor', component: AddbrokerDetailsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  {path :'manageMembers/addMember',component:AddCustomerComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  {path :'manageCorporates/addEmployee',component:AddEmployeeComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'reports', component: ReportsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'employee-portal', component: EmployeePortalComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'invoices', component: InvoicesComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'payables', component: PayablesComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'marketing&promotions', component: MarketingComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGuardService],pathMatch: 'full'},
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
  { path: 'charts-chartjs', component: ChartsChartjsComponent },
  { path: 'form-editors', component: FormsEditorsComponent },
  { path: 'form-elements', component: FormsElementsComponent },
  { path: 'form-layouts', component: FormsLayoutsComponent },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent },
  { path: 'icons-remix', component: IconsRemixComponent },
  { path: 'list-group', component: ListGroupComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'spinners', component: SpinnersComponent },
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
