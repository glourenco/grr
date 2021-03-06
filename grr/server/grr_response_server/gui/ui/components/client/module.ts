import {NgModule} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FlowFormModule} from '@app/components/flow_form/module';
import {FlowListModule} from '@app/components/flow_list/module';

import {ApprovalModule} from '../approval/module';

import {Client} from './client';
import {ClientRoutingModule} from './routing';

/**
 * Module for the client details component.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    MatChipsModule,
    ClientRoutingModule,
    ApprovalModule,
    FlowFormModule,
    FlowListModule,
  ],
  declarations: [
    Client,
  ],
})
export class ClientModule {
}
