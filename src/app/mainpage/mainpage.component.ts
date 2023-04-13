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

  onTranslateToDE() {
    let textOB = {text: this.originalText};
    this.httpClient.post<{ germanTranslation: string }>('http://localhost:5000/translate/DE', textOB).subscribe((response) => {
      this.germanText = response.germanTranslation;
    })
  }
  onTranslateToEN(){
    let textOB = {text: this.editedText};
    this.httpClient.post<{ englishTranslation: string }>('http://localhost:5000/translate/EN', textOB).subscribe((response) => {
      this.englishText = response.englishTranslation;
    })
  }
  onCorrectText() {
    if (this.editedText.length > 0 && this.lastSentText == this.germanText){
      let textOB = {text: this.editedText};
      this.httpClient.post<{ optimizedTextGS: string }>('http://localhost:5000/optimize/gs-correction', textOB).subscribe((response) => {
        this.editedText = response.optimizedTextGS;
      })
    }else {
      let textOB = {text: this.germanText};
      this.httpClient.post<{ optimizedTextGS: string }>('http://localhost:5000/optimize/gs-correction', textOB).subscribe((response) => {
        this.editedText = response.optimizedTextGS;
      })
    }
    this.lastSentText = this.germanText;
  }
  onParaphraseText() {
    if (this.editedText.length > 0 && this.lastSentText == this.germanText) {
      let textOB = {text: this.editedText};
      this.httpClient.post<{ optimizedTextPara: string }>('http://localhost:5000/optimize/paraphrasing', textOB).subscribe((response) => {
        console.log(response.optimizedTextPara);
        this.editedText = response.optimizedTextPara;
      })
    } else {
      let textOB = {text: this.germanText};
      this.httpClient.post<{ optimizedTextPara: string }>('http://localhost:5000/optimize/paraphrasing', textOB).subscribe((response) => {
        this.editedText = response.optimizedTextPara;
      })
    }
    this.lastSentText = this.germanText;
  }
  onCheckSimilarity(){
    this.httpClient.get<{delta: any}>('http://localhost:5000/similarity').subscribe((response) => {
      this.delta = response.delta.similarity;
      console.log(this.delta);
    })
  }
}
