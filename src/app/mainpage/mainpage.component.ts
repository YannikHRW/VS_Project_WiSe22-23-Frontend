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

  onTranslateToDE() {
    let textOB = {text: this.originalText};
    this.isLoading = true;
    this.httpClient.post<{ germanTranslation: string }>('http://localhost:5000/translate/DE', textOB).subscribe((response) => {
      this.isLoading = false;
      this.germanText = response.germanTranslation;
    })
  }
  onTranslateToEN(){
    let textOB = {text: this.editedText};
    this.isLoading = true;
    this.httpClient.post<{ englishTranslation: string }>('http://localhost:5000/translate/EN', textOB).subscribe((response) => {
      this.isLoading = false;
      this.englishText = response.englishTranslation;
    })
  }
  onCorrectText() {
    if (this.editedText.length > 0 && this.lastSentText == this.germanText){
      let textOB = {text: this.editedText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextGS: string }>('http://localhost:5000/optimize/gs-correction', textOB).subscribe((response) => {
        this.isLoading = false;
        this.editedText = response.optimizedTextGS;
      })
    }else {
      let textOB = {text: this.germanText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextGS: string }>('http://localhost:5000/optimize/gs-correction', textOB).subscribe((response) => {
        this.isLoading = false;
        this.editedText = response.optimizedTextGS;
      })
    }
    this.lastSentText = this.germanText;
  }
  onParaphraseText() {
    if (this.editedText.length > 0 && this.lastSentText == this.germanText) {
      let textOB = {text: this.editedText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextPara: string }>('http://localhost:5000/optimize/paraphrasing', textOB).subscribe((response) => {
        this.isLoading = false;
        this.editedText = response.optimizedTextPara;
      })
    } else {
      let textOB = {text: this.germanText};
      this.isLoading = true;
      this.httpClient.post<{ optimizedTextPara: string }>('http://localhost:5000/optimize/paraphrasing', textOB).subscribe((response) => {
        this.isLoading = false;
        this.editedText = response.optimizedTextPara;
      })
    }
    this.lastSentText = this.germanText;
  }
  onCheckSimilarity(){
    //Semantic Mode
    if (this.selectedMode == 1){
      this.isLoading = true;
      this.httpClient.get<{delta: any}>('http://localhost:5000/similarity').subscribe((response) => {
        this.isLoading = false;
        this.delta = response.delta.similarity;
      })
    }else if (this.selectedMode == 2) {
      this.isLoading = true;
      this.httpClient.get<{delta: any}>('http://localhost:5000/similarity/syntactic').subscribe((response) => {
        this.isLoading = false;
        this.delta = response.delta.similarity;
      })
    }
  }
}
