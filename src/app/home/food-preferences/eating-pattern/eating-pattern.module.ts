import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EatingPatternPageRoutingModule } from './eating-pattern-routing.module';

import { EatingPatternPage } from './eating-pattern.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EatingPatternPageRoutingModule
  ],
  declarations: [EatingPatternPage]
})
export class EatingPatternPageModule {}
