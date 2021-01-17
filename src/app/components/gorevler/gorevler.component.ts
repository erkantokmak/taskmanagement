import { not } from '../../models/not';
import { Sonuc } from './../../models/sonuc';
import { Gorev } from './../../models/gorev';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FbNotServisService } from 'src/app/services/fbNotServis.service';

@Component({
  selector: 'app-gorevler',
  templateUrl: './gorevler.component.html',
  styleUrls: ['./gorevler.component.scss']
})
export class GorevlerComponent implements OnInit {
  gorevler;
  secGorev: Gorev = new Gorev();
  sonuc: Sonuc = new Sonuc();
  detaylar: boolean;
  secNot: not = new not();
  notlar;
  notekle:boolean=false;
  notdetay: boolean;
  constructor(
    public fbServis: FbServisService,
    public fbNotServis: FbNotServisService
  ) { }

  ngOnInit() {
    this.GorevListele();
    this.NotListele();
  }
  GorevListele() {
    this.fbServis.GorevListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.gorevler = data;
    });
  }

  NotListele() {
    this.fbNotServis.NotListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notlar = data;
    });
  }

  GorevSec(g: Gorev){
    Object.assign(this.secGorev, g);
  }
  Tamamla(g: Gorev, islem:boolean){
    var tarih = new Date();
    g.islem = islem;
    this.secGorev.duzTarih = tarih.getTime();
    this.fbServis.GorevDuzenle(g).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "İşlem Onaylandı!"
    });
  }
  NotSec(n: not){
    Object.assign(this.secNot, n);
  }

  NotKaydet() {
    var tarih = new Date();
    if (this.secNot.key == null) {
      this.secNot.kayTarih = tarih.getTime();
      this.fbNotServis.NotEkle(this.secNot).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Not Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }
}
