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
  germanText: Object = '';

  onSendText(){
    let textOB = {text: this.enteredValue};
    this.httpClient.post<{text: string}>('http://localhost:5000/translate/DE', textOB).subscribe((responsData) => {
      console.log(responsData.text);
      this.germanText = responsData.text;
    })

    // this.englishText = this.enteredValue;
  }
}
