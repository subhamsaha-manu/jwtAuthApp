import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDividerModule} from '@angular/material/divider';
import { MatIconModule} from '@angular/material/icon';
import { MatRadioModule} from '@angular/material/radio';

@NgModule({
    declarations :[],
    imports :[
        
    ],
    exports:[
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatRadioModule
    ]
})

export class AngularMaterialModule{}