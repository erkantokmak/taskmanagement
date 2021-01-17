import { kullanici } from './../../models/kullanici';
import { FbNotServisService } from './../../services/fbNotServis.service';
import { pozisyon } from './../../models/pozisyon';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Gorev } from 'src/app/models/gorev';
import { Sonuc } from 'src/app/models/sonuc';
import { map } from 'rxjs/operators';
import { not } from 'src/app/models/not';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  gorevler;
  kullanicilar;
  pozisyonlar;
  notlar;
  secGorev: Gorev = new Gorev();
  secKullanici: kullanici = new kullanici();
  sonuc: Sonuc = new Sonuc();
  secPozisyon: pozisyon = new pozisyon();
  secNot: not = new not();
  gorevtab: boolean = false;
  kullanicitab: boolean = false;
  pozisyontab: boolean = false;
  notlartab: boolean = false;
  performanstab: boolean = false;
  constructor(
    public fbServis: FbServisService,
    public FbNotServis : FbNotServisService
  ) { }

  ngOnInit() {
    this.GorevListele();
    this.KullaniciListele();
    this.PozisyonListele();
    this.NotListele();
  }

  Kaydet() {
    var tarih = new Date();
    if (this.secGorev.key == null) {
      this.secGorev.kayTarih = tarih.getTime();
      this.secGorev.duzTarih = tarih.getTime();
      this.secGorev.islem = false;
      this.fbServis.GorevEkle(this.secGorev).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Görev Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }

  PozisyonKaydet() {
    if (this.secPozisyon.key == null) {
      this.fbServis.PozisyonEkle(this.secPozisyon).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Görev Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }

  NotKaydet() {
    var tarih = new Date();
    if (this.secNot.key == null) {
      this.secNot.kayTarih = tarih.getTime();
      this.FbNotServis.NotEkle(this.secNot).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Not Başarıyla Eklendi!";
      });
    }else{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    }
  }

  NotDuzenle(){
    var tarih = new Date();
          this.secNot.kayTarih = tarih.getTime();
      this.FbNotServis.NotDuzenle(this.secNot).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Not Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

  GorevDuzenle(){
    var tarih = new Date();
          this.secGorev.duzTarih = tarih.getTime();
      this.secGorev.islem = false;
      this.fbServis.GorevDuzenle(this.secGorev).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Görev Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

  GorevSil(){
    this.fbServis.GorevSil(this.secGorev.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Görev Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
  }

  NotSil(){
    this.FbNotServis.NotSil(this.secNot.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Not Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
  }


 KullaniciSil(){
    this.fbServis.KulaniciSil(this.secKullanici.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kullanici Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
  }

  KullaniciDuzenle(){
      this.fbServis.KulaniciDuzenle(this.secKullanici).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Görev Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

   GorevSec(g: Gorev){
    Object.assign(this.secGorev, g);
  }

  KullaniciSec(k: kullanici){
    Object.assign(this.secKullanici, k);
  }

  PozisyonSec(p: pozisyon){
    Object.assign(this.secPozisyon, p);
  }

  NotSec(n: not){
    Object.assign(this.secNot, n);
  }

  PozisyonDuzenle(){
      this.fbServis.PozisyonDuzenle(this.secPozisyon).then(d=>{
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Pozisyon Başarıyla Düzenlendi!";
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu.";
    });
  }

  PozisyonSil(){
    this.fbServis.GorevSil(this.secPozisyon.key).then(d=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Pozisyon Silindi!"
    },err=>{
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Hata Oluştu!"
    });
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

  KullaniciListele() {
    this.fbServis.KulaniciListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kullanicilar = data;
    });
  }

  PozisyonListele() {
    this.fbServis.PozisyonListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.pozisyonlar = data;
    });
  }

  NotListele() {
    this.FbNotServis.NotListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notlar = data;
    });
  }

}
