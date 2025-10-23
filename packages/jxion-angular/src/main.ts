import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
  providers: [provideRouter([]), importProvidersFrom(BrowserAnimationsModule)],
}).catch((err) => console.error(err));
