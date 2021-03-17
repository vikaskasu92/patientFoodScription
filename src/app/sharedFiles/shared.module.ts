import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { GetDayPipe } from './pipe/get-day.pipe';
import { GetDatePipe } from './pipe/get-date.pipe';
import { MealElementsPipe } from './pipe/meal-elements.pipe';
import { DigitsPipe } from './pipe/digits.pipe';
import { DecimalToFractionPipe } from './pipe/decimal-to-fraction.pipe';
import { GetDayDatePipe } from './pipe/get-day-date.pipe';
import { RoundNumberPipe } from './pipe/round-number.pipe';
import { RemoveSpacePipe } from './pipe/remove-space.pipe';
import { NullCheckPipe } from './pipe/null-check.pipe';
import { StepnumberPipe } from './pipe/stepnumber.pipe';


@NgModule({
        declarations: [
                GetDayPipe, 
                GetDatePipe, 
                MealElementsPipe, 
                HeaderComponent,
                DigitsPipe,
                DecimalToFractionPipe,
                GetDayDatePipe,
                RoundNumberPipe,
                RemoveSpacePipe,
                NullCheckPipe,
                StepnumberPipe
        ],
        entryComponents: [],
        imports: [IonicModule.forRoot()],
        exports:[
                GetDatePipe,
                GetDayPipe,
                MealElementsPipe,
                HeaderComponent,
                DigitsPipe,
                DecimalToFractionPipe,
                GetDayDatePipe,
                RoundNumberPipe,
                RemoveSpacePipe,
                NullCheckPipe,
                StepnumberPipe
        ],
        providers: [],
        bootstrap: []
})
export class SharedModule{

}