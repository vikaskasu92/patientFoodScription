import { Component, OnInit } from '@angular/core';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private safariViewController: SafariViewController) {}
  ngOnInit(): void {
    this.safariViewController.isAvailable().then((available: boolean) => {
      if (available) {
          this.safariViewController.show({
            url: 'https://ionic.io',
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: true,
            tintColor: '#ff0000'
          })
          .subscribe((result: any) => {
              if(result.event === 'opened') console.log('Opened');
              else if(result.event === 'loaded') console.log('Loaded');
              else if(result.event === 'closed') console.log('Closed');
            },
            (error: any) => console.error(error)
          );

        } else {
          // use fallback browser, example InAppBrowser
          console.log("safari view controller is not available")
        }
      }
    );
  }

  

}
