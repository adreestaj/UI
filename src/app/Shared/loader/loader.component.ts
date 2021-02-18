import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../Services/global.service';
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  subscription: Subscription;
  IsLoading: Boolean = false;
  constructor(private messageService: GlobalService) {

    this.subscription = this.messageService.getMessage().subscribe(message => {
     
      if (message.type = 'loading') {
        setTimeout(() => {
          this.IsLoading = message.value;
         
      });
       
      
      }
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
