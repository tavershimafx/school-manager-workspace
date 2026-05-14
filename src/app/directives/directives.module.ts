import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "./dropdown.directive";
import { BadgeDirective } from "./badge.directive";
import { AppRouterDirective } from "./app-router.directive";

const components = [
   BadgeDirective,
   DropdownDirective,
   AppRouterDirective
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [
        ...components
    ]
})
export default class DirectivesModule{}