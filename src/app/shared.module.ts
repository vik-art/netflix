import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: []
})

export class SharedModule {}