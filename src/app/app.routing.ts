import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './auth/login.component';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'emas',
		pathMatch: 'full'
	},
	{
		path: 'emas',
		component: LayoutsComponent,
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', loadChildren: './pages/home-page/home-page.module#HomePageModule' },
			{ path: 'house-management', loadChildren: './pages/house-management/house-management.module#HouseManagementModule' },
			{ path: 'user-management', loadChildren: './pages/user-management/user-management.module#UserManagementModule' },
		]
	},
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: 'emas', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})

export class AppRoutingModule { }
