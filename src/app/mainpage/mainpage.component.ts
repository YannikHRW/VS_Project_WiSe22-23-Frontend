import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mainpage',
  templateUrl: 'mainpage.component.html',
  styleUrls: ['mainpage.component.css']
})
export class MainpageComponent{

  constructor(private httpClient: HttpClient) {}

  enteredValue = '';
  germanText = '';
  correctedText = '';
  optimizedText = '';

  onTranslateToDE(){
    let textOB = {text: this.enteredValue};
    this.httpClient.post<{text: string}>('http://localhost:5000/translate/DE', textOB).subscribe((response) => {
      console.log(response.text);
      this.germanText = response.text;
    })
    // this.englishText = this.enteredValue;
  }
  onCorrectText(){
    let textOB = {text: this.germanText};
    this.httpClient.post<{message: string, text: string}>('http://localhost:5000/optimize', textOB).subscribe((response) => {
      console.log(response.text);
      console.log(response.message);
      this.correctedText = response.text;
    })
  }
}
