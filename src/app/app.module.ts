import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdInputModule,
        MdButtonToggleModule,
        MdGridListModule,
        MdTableModule,
        MdDialogModule,
        MdProgressSpinnerModule,
        MdIconModule
      } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { OperacoesComponent } from './operacoes/operacoes.component';
import { OperacaoService } from './operacao.service';
import { RefreshService } from './refresh.service';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    OperacoesComponent,
    ProgressDialogComponent,
    MyAlertDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
    MdButtonToggleModule,
    MdGridListModule,
    MdTableModule,
    MdDialogModule,
    MdIconModule,
    MdProgressSpinnerModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  	ProgressDialogComponent,
  	MyAlertDialogComponent
  ],
  providers: [OperacaoService, RefreshService],
  bootstrap: [AppComponent]
})
export class AppModule { }
