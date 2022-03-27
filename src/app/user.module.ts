import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { FavouriteComponent } from "./modules/pages/favourite/favourite.component";
import { FriendsComponent } from "./modules/pages/friends/friends.component";
import { MoviePageComponent } from "./modules/pages/movie-page/movie-page.component";
import { SelectedComponent } from "./modules/pages/selected/selected.component";
import { UserPageComponent } from "./modules/pages/user-page/user-page.component";
import { MovieService } from "./services/movie.service";
import { SharedModule } from "./shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: "movie/:id",
                component: MoviePageComponent,
                canActivate: [AuthGuard]
            },
            {
                path: '',
                component: UserPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "favourite",
                component: FavouriteComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "friends",
                component: FriendsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "selected",
                component: SelectedComponent,
                canActivate: [AuthGuard]
            },
        ])
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        UserPageComponent,
        FavouriteComponent,
        SelectedComponent,
        FriendsComponent,
        MoviePageComponent
    ],
    providers: [
        AuthGuard,
        MovieService
    ],
})


export class UserModule {}