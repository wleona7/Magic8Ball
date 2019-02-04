import { Component } from '@angular/core';
// JDavis: importing Platform
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
// JDavis: importing ScreenOrientation
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public cssClass: string;
  private answers = ['It is certain.', 'It is decidedly so.', 'Without a doubt.',
             'Yes - definitely.', 'You may rely on it.', 'As I see it, yes.',
             'Most likely.', 'Outlook good.', 'Yes.',
             'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.',
             'Better not tell you now.', 'Cannot predict now.',
             'Concentrate and ask again.', "Don't count on it.", 'My reply is no.',
             'My sources say no.', 'Outlook not so good.', 'Very doubtful.']

  constructor(public navCtrl: NavController,
              // JDavis declare screenOrientation & platform
              private screenOrientation: ScreenOrientation,
              private platform: Platform,
              private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    // JDavis: if you are on a mobile device, lock the screen.
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  giveAnswer() {
    this.cssClass = "animated shake";
    let answer = this.answers[Math.floor(Math.random() * this.answers.length)];
    var temp = this;
    setTimeout(function(){
      temp.presentToast(answer);
    }, 1500)
  }

  presentToast(answer) {
    const toast = this.toastCtrl.create({
      message: answer,
      duration: 5000,
      position: 'top',
      // showCloseButton: true
    });
    toast.onDidDismiss(() => {
      this.cssClass = "";
    });
    toast.present();
  }

  gotoAbout() {
    this.navCtrl.push('AboutPage', {
      x: "This is a message from the HomePage"
    });
  }

}
