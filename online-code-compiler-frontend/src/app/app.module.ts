import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeCompilerModule } from './code-compiler/code-compiler.module';
import { provideHttpClient } from '@angular/common/http'
import { HttpService } from './services/http/http.service';
import { DataHandlerService } from './services/dataHandler/data-handler.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeCompilerModule,
  ],
  providers: [provideHttpClient(), HttpService, DataHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
