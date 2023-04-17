import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { UsertableComponent } from './pages/admin/usertable/usertable.component';
import { UpdateUserComponent } from './pages/admin/update-user/update-user.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';

const routes: Routes = [
  {
    path:'signup',
    component: SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'categories',
        component:ViewCategoryComponent
      },
      {
        path:'addCategory',
        component:AddCategoryComponent
      },
      {
        path:'userDetails',
        component:UsertableComponent
      },
      {
        path:'updateUser',
        component:UpdateUserComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'addQuiz',
        component:AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'viewQuestion/:qid/:title',
        component:ViewQuizQuestionsComponent
      },
      {
        path:'addQuestion/:qid/:title',
        component:AddQuestionsComponent
      }
    ]
  },
  {
    path: 'userDashboard',
    component: UserDashboardComponent,
    pathMatch:'full',
    canActivate :[NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
