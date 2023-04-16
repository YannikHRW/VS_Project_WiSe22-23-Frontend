import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css']
})
export class MainpageComponent implements OnInit{

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
  maxChars = 100;

  ngOnInit(){
    this.getMaxChars()
  }

  getMaxChars() {
    this.httpClient.get<{ maxLength: number }>(this.host + '/max-length')
      .subscribe({
        next: (response) => {
          this.maxChars = response.maxLength;
        },
        error: (error) => {
          return
        }
      })
  }
  onTranslateToDE() {
    let textOB = {text: this.originalText};
    this.isLoading = true;
    this.httpClient.post<{germanTranslation: string}>(this.host+'/translate/DE', textOB)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.germanText = response.germanTranslation;
        },
        error: (error) => {
          this.isLoading = false;
          alert(error.status +" "+ error.error);
          console.log(error)

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
          this.isLoading = false;
          alert(error.status +" "+ error.error);
          console.log(error)
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
            this.isLoading = false;
            alert(error.status +" "+ error.error);
            console.log(error)
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
            this.isLoading = false;
            alert(error.status +" "+ error.error);
            console.log(error)
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
            this.isLoading = false;
            alert(error.status +" "+ error.error);
            console.log(error)
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
            this.isLoading = false;
            alert(error.status +" "+ error.error);
            console.log(error)
          }
        })
    }
    this.lastSentText = this.germanText;
  }
  onCheckSimilarity(){
    if (this.originalText == ''){
      alert("Input text has to be defined!")
      return;
    }
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
            this.isLoading = false;
            alert(error.status +" "+ error.error);
            console.log(error)
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
            this.isLoading = false;
            alert(error.status +" "+ error.error);
            console.log(error)
          }
        })
    }
  }
}
