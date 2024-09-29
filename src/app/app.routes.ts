import { Routes } from '@angular/router';
import { HomeDemoOneComponent } from './demos/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './demos/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './demos/home-demo-three/home-demo-three.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './pages/terms-conditions-page/terms-conditions-page.component';
import { BlogLeftSidebarPageComponent } from './pages/blog-left-sidebar-page/blog-left-sidebar-page.component';
import { BlogRightSidebarPageComponent } from './pages/blog-right-sidebar-page/blog-right-sidebar-page.component';
import { BlogGridPageComponent } from './pages/blog-grid-page/blog-grid-page.component';
import { BlogDetailsLeftSidebarPageComponent } from './pages/blog-details-left-sidebar-page/blog-details-left-sidebar-page.component';
import { BlogDetailsRightSidebarPageComponent } from './pages/blog-details-right-sidebar-page/blog-details-right-sidebar-page.component';
import { BlogDetailsNoSidebarPageComponent } from './pages/blog-details-no-sidebar-page/blog-details-no-sidebar-page.component';
import { CandidatesLeftSidebarPageComponent } from './pages/candidates-left-sidebar-page/candidates-left-sidebar-page.component';
import { CandidatesRightSidebarPageComponent } from './pages/candidates-right-sidebar-page/candidates-right-sidebar-page.component';
import { CandidatesGridSidebarPageComponent } from './pages/candidates-grid-sidebar-page/candidates-grid-sidebar-page.component';
import { CandidatesMapSidebarPageComponent } from './pages/candidates-map-sidebar-page/candidates-map-sidebar-page.component';
import { CandidateDetailsPageComponent } from './pages/candidate-details-page/candidate-details-page.component';
import { EmployersLeftSidebarPageComponent } from './pages/employers-left-sidebar-page/employers-left-sidebar-page.component';
import { EmployersRightSidebarPageComponent } from './pages/employers-right-sidebar-page/employers-right-sidebar-page.component';
import { EmployersGridPageComponent } from './pages/employers-grid-page/employers-grid-page.component';
import { EmployersListPageComponent } from './pages/employers-list-page/employers-list-page.component';
import { EmployersMapSidebarPageComponent } from './pages/employers-map-sidebar-page/employers-map-sidebar-page.component';
import { EmployerDetailsPageComponent } from './pages/employer-details-page/employer-details-page.component';
import { JobsLeftSidebarPageComponent } from './pages/jobs-left-sidebar-page/jobs-left-sidebar-page.component';
import { JobsRightSidebarPageComponent } from './pages/jobs-right-sidebar-page/jobs-right-sidebar-page.component';
import { JobsGridPageComponent } from './pages/jobs-grid-page/jobs-grid-page.component';
import { JobsListPageComponent } from './pages/jobs-list-page/jobs-list-page.component';
import { JobsColumnsPageComponent } from './pages/jobs-columns-page/jobs-columns-page.component';
import { JobsTopMapPageComponent } from './pages/jobs-top-map-page/jobs-top-map-page.component';
import { JobsSidebarMapPageComponent } from './pages/jobs-sidebar-map-page/jobs-sidebar-map-page.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { JobDetailsTwoPageComponent } from './pages/job-details-two-page/job-details-two-page.component';
import { JobDetailsThreePageComponent } from './pages/job-details-three-page/job-details-three-page.component';
import { EmployersDashboardComponent } from './employers-dashboard/employers-dashboard.component';
import { EdDashboardComponent } from './employers-dashboard/ed-dashboard/ed-dashboard.component';
import { EdCompanyProfileComponent } from './employers-dashboard/ed-company-profile/ed-company-profile.component';
import { EdJobsComponent } from './employers-dashboard/ed-jobs/ed-jobs.component';
import { EdApplicantsComponent } from './employers-dashboard/ed-applicants/ed-applicants.component';
import { EdPostAJobComponent } from './employers-dashboard/ed-post-a-job/ed-post-a-job.component';
import { EdSavedCandidatesComponent } from './employers-dashboard/ed-saved-candidates/ed-saved-candidates.component';
import { EdAccountSettingsComponent } from './employers-dashboard/ed-account-settings/ed-account-settings.component';
import { CandidatesDashboardComponent } from './candidates-dashboard/candidates-dashboard.component';
import { CdDashboardComponent } from './candidates-dashboard/cd-dashboard/cd-dashboard.component';
import { CdMyProfileComponent } from './candidates-dashboard/cd-my-profile/cd-my-profile.component';
import { CdSavedCandidatesComponent } from './candidates-dashboard/cd-saved-candidates/cd-saved-candidates.component';
import { CdAccountSettingsComponent } from './candidates-dashboard/cd-account-settings/cd-account-settings.component';
import { CdAppliedJobComponent } from './candidates-dashboard/cd-applied-job/cd-applied-job.component';
import { CdJobAlertsComponent } from './candidates-dashboard/cd-job-alerts/cd-job-alerts.component';
import { CdShortlistJobsComponent } from './candidates-dashboard/cd-shortlist-jobs/cd-shortlist-jobs.component';
import { CdPersonalComponent } from './candidates-dashboard/cd-personal/cd-personal.component';
import { CdAcademicsComponent } from './candidates-dashboard/cd-academics/cd-academics.component';
import { CdExperiencesComponent } from './candidates-dashboard/cd-experiences/cd-experiences.component';
import { CdDocumentsComponent } from './candidates-dashboard/cd-documents/cd-documents.component';
import { CandidateLoginComponent } from './pages/candidate-login/candidate-login.component';
import { AuthGuard } from './guards/auth.guard';
import { ApplicantDetailsComponent } from './employers-dashboard/applicant-details/applicant-details.component';
import { CdUserInfoComponent } from './candidates-dashboard/cd-user-info/cd-user-info.component';
import { CdSpecialityBoardComponent } from './candidates-dashboard/cd-speciality-board/cd-speciality-board.component';
import { CdSchoolingsComponent } from './candidates-dashboard/cd-schoolings/cd-schoolings.component';
import { CdPgEducationComponent } from './candidates-dashboard/cd-pg-education/cd-pg-education.component';
import { CdUgEducationComponent } from './candidates-dashboard/cd-ug-education/cd-ug-education.component';
import { CdLicenceRegisterComponent } from './candidates-dashboard/cd-licence-register/cd-licence-register.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { OverviewComponent } from './home-dashboard/overview/overview.component';
import { PendingTaskComponent } from './home-dashboard/pending-task/pending-task.component';
import { SbumittedReqComponent } from './home-dashboard/sbumitted-req/sbumitted-req.component';
import { DocumentWalComponent } from './home-dashboard/document-wal/document-wal.component';
import { PaymentsComponent } from './home-dashboard/payments/payments.component';
import { HelpdeskComponent } from './home-dashboard/helpdesk/helpdesk.component';

export const routes: Routes = [
    // { path: 'home', component: HomeDemoOneComponent },
    // { path: 'index-2', component: HomeDemoTwoComponent },
    // { path: 'index-3', component: HomeDemoThreeComponent },
    // { path: 'about-us', component: AboutPageComponent },
    // { path: 'pricing-plan', component: PricingPageComponent },
    // { path: 'jobs-left-sidebar', component: JobsLeftSidebarPageComponent },
    // { path: 'jobs-right-sidebar', component: JobsRightSidebarPageComponent },
    // { path: 'jobs-grid', component: JobsGridPageComponent },
    // { path: 'jobs-list', component: JobsListPageComponent },
    // { path: 'jobs-columns', component: JobsColumnsPageComponent },
    // { path: 'jobs-top-map', component: JobsTopMapPageComponent },
    // { path: 'jobs-sidebar-map', component: JobsSidebarMapPageComponent },
    // { path: 'job-details-sidebar', component: JobDetailsPageComponent },
    // { path: 'job-details-sidebar-two', component: JobDetailsTwoPageComponent },
    // { path: 'job-details-without-sidebar', component: JobDetailsThreePageComponent },
    // { path: 'employers-left-sidebar', component: EmployersLeftSidebarPageComponent },
    // { path: 'employers-right-sidebar', component: EmployersRightSidebarPageComponent },
    // { path: 'employers-grid', component: EmployersGridPageComponent },
    // { path: 'employers-list', component: EmployersListPageComponent },
    // { path: 'employers-sidebar-map', component: EmployersMapSidebarPageComponent },
    // { path: 'employer-details', component: EmployerDetailsPageComponent },
    // { path: 'candidates-left-sidebar', component: CandidatesLeftSidebarPageComponent },
    // { path: 'candidates-right-sidebar', component: CandidatesRightSidebarPageComponent },
    // { path: 'candidates-grid', component: CandidatesGridSidebarPageComponent },
    // { path: 'candidates-sidebar-map', component: CandidatesMapSidebarPageComponent },
    // { path: 'candidate-details', component: CandidateDetailsPageComponent },
    // { path: 'faq', component: FaqPageComponent },
    // { path: 'login', component: LoginPageComponent },
    // { path: 'register', component: RegisterPageComponent },
    // { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
    // { path: 'terms-conditions', component: TermsConditionsPageComponent },
    // { path: 'blog-left-sidebar', component: BlogLeftSidebarPageComponent },
    // { path: 'blog-right-sidebar', component: BlogRightSidebarPageComponent },
    // { path: 'blog-grid', component: BlogGridPageComponent },
    // { path: 'blog-details-left-sidebar', component: BlogDetailsLeftSidebarPageComponent },
    // { path: 'blog-details-right-sidebar', component: BlogDetailsRightSidebarPageComponent },
    // { path: 'blog-details-no-sidebar', component: BlogDetailsNoSidebarPageComponent },
    // { path: 'contact-us', component: ContactPageComponent },
    { path: '', redirectTo: '/candidates-dashboard', pathMatch: 'full' },
    { path: 'candidate-login', component: CandidateLoginComponent, title: "Candidate Login" },
    { path: 'employer-login', component: CandidateLoginComponent, title: "Employer Login" },

    {
        path: 'employers-dashboard',
        component: EmployersDashboardComponent,
        children: [
            { path: '', redirectTo: 'company-profile', pathMatch: 'full' },
            // { path: 'employers-dashboard', component: EdDashboardComponent },
            { path: 'company-profile', component: EdCompanyProfileComponent },
            // { path: 'jobs', component: EdJobsComponent },
            { path: 'applicants', component: EdApplicantsComponent },
            { path: 'applicants-details', component: ApplicantDetailsComponent },
            { path: 'post-a-job', component: EdPostAJobComponent },
            { path: 'saved-candidates', component: EdSavedCandidatesComponent },
            // { path: 'account-settings', component: EdAccountSettingsComponent },
        ]
    },
    {
        path: 'candidates-dashboard',
        component: CandidatesDashboardComponent,
        // canActivate: [AuthGuard],
        children: [
            // { path: '', component: CdDashboardComponent },
            // { path: 'my-profile', component: CdMyProfileComponent },
            // { path: 'applied-job', component: CdAppliedJobComponent },
            // { path: 'job-alerts', component: CdJobAlertsComponent },
            // { path: 'shortlist-jobs', component: CdShortlistJobsComponent },
            // { path: 'saved-candidates', component: CdSavedCandidatesComponent },
            // { path: 'account-settings', component: CdAccountSettingsComponent },
            { path: '', redirectTo: 'user-info', pathMatch: 'full' },
            { path: 'user-info', component: CdUserInfoComponent },
            { path: 'speciality-board', component: CdSpecialityBoardComponent },
            { path: 'personal-forms', component: CdPersonalComponent },
            { path: 'academics-forms', component: CdAcademicsComponent },
            { path: 'experience-forms', component: CdExperiencesComponent },
            { path: 'document-forms', component: CdDocumentsComponent },
            { path: 'schooling-forms', component: CdSchoolingsComponent },
            { path: 'ug-education', component: CdUgEducationComponent },
            { path: 'pg-education', component: CdPgEducationComponent },
            { path: 'license-register', component: CdLicenceRegisterComponent },
        ]
    },
    {
        path: 'home-dashboard',
        component: HomeDashboardComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent },
            { path: 'pending-task', component: PendingTaskComponent },
            { path: 'submitted-req', component: SbumittedReqComponent },
            { path: 'document-wal', component: DocumentWalComponent },
            { path: 'payments', component: PaymentsComponent },
            { path: 'helpdesk', component: HelpdeskComponent },
        ]
    },
    // Here add new pages component

    { path: '**', component: ErrorPageComponent } // This line will remain down from the whole pages component list
];