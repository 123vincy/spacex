import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentComponent } from "./content/content.component";
const routes: Routes = [
  { path: "", redirectTo: "/launches", pathMatch: "full" },
  { path: "launches", component: ContentComponent },
  { path: "**", redirectTo: "/launches" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
