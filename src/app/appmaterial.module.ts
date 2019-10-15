import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material';


@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule
    ],
    exports: [
        MatSelectModule
    ],
    providers: [],
    declarations: []
})

export class AppMaterialModule {}
