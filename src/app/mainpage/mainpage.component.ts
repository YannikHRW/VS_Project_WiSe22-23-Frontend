import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css']
})
export class MainpageComponent {

  constructor(private httpClient: HttpClient) {
  }

  originalText = '';
  germanText = '';
  lastSentText = '';
  editedText = '';
  englishText = '';
  delta = -100;
  isLoading = false;
  selectedMode = 1;
  host = window.location.protocol + "//" + window.location.host;

  onTranslateToDE() {
    let textOB = {text: this.originalText};
    this.isLoading = true;
    this.httpClient.post<{ germanTranslation: string }>(this.host+'/translate/DE', textOB)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.germanText = response.germanTranslation;
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
        }
      })
  }
  onTranslateToEN(){
    let textOB = {text: this.editedText};
    this.isLoading = true;
    this.httpClient.post<{ englishTranslation: string }>(this.host+'/translate/EN', textOB)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.englishText = response.englishTranslation;
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false;
        }
      })
  }
  onCorrectText() {
    if (this.editedText.length > 0 && this.lastSentText == this.germanText){
      let textOB = {text: this.editedText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextGS: string }>(this.host+'/optimize/gs-correction', textOB)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.editedText = response.optimizedTextGS;
          },
          error: (error) => {
            console.log(error)
            this.isLoading = false;
          }
        })
    }else {
      let textOB = {text: this.germanText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextGS: string }>(this.host+'/optimize/gs-correction', textOB)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.editedText = response.optimizedTextGS;
          },
          error: (error) => {
            console.log(error)
            this.isLoading = false;
          }
        })
    }
    this.lastSentText = this.germanText;
  }
  onParaphraseText() {
    if (this.editedText.length > 0 && this.lastSentText == this.germanText) {
      let textOB = {text: this.editedText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextPara: string }>(this.host+'/optimize/paraphrasing', textOB)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.editedText = response.optimizedTextPara;
          },
          error: (error) => {
            console.log(error)
            this.isLoading = false;
          }
        })
    } else {
      let textOB = {text: this.germanText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextPara: string }>(this.host+'/optimize/paraphrasing', textOB)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.editedText = response.optimizedTextPara;
          },
          error: (error) => {
            console.log(error)
            this.isLoading = false;
          }
        })
    }
    this.lastSentText = this.germanText;
  }
  onCheckSimilarity(){
    //Semantic Mode
    if (this.selectedMode == 1){
      let textOB = {originEnglishText: this.originalText, englishTranslation: this.englishText};
      this.isLoading = true;
      this.httpClient.post<{delta: any}>(this.host+'/similarity', textOB)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.delta = response.delta.similarity;
          },
          error: (error) => {
            console.log(error)
            this.isLoading = false;
          }
        })
    }else if (this.selectedMode == 2) {
      let textOB = {originEnglishText: this.originalText, englishTranslation: this.englishText};
      this.isLoading = true;
      this.httpClient.post<{delta: any}>(this.host+'/similarity/syntactic', textOB)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.delta = response.delta.similarity;
          },
          error: (error) => {
            console.log(error)
            this.isLoading = false;
          }
        })
    }
  }
}
