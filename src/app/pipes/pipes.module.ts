import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InitialsPipe, MoneyPipe, SentenceCasePipe, TimespanPipe } from "./timespan.pipe";

const components = [
   TimespanPipe,
   MoneyPipe,
   SentenceCasePipe,
   InitialsPipe
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
export default class PipesModule{}