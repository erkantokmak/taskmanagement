import { pozisyon } from './../models/pozisyon';
import { kullanici } from './../models/kullanici';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Gorev } from './../models/gorev';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Gorevler';
  private dbKullanici = '/Kullanicilar';
  private dbPozisyon = '/Pozisyonlar';

  gorevRef: AngularFireList<Gorev> = null;
  kullaniciRef: AngularFireList<kullanici> = null;
  pozisyonRef: AngularFireList<pozisyon> = null;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.gorevRef = db.list(this.dbKayit);
    this.kullaniciRef = db.list(this.dbKullanici);
    this.pozisyonRef = db.list(this.dbPozisyon);
  }

  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  UyeOl(kullanici: kullanici) {
    return this.afAuth.createUserWithEmailAndPassword(kullanici.mail, kullanici.parola)
  }
  UyeEkle(kullanici: kullanici) {
    return this.kullaniciRef.push(kullanici);
  }
  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  OturumKapat() {
    return this.afAuth.signOut();
  }

  /* Görev Servisleri Başlangıç */
  GorevEkle(g: Gorev) {
    return this.gorevRef.push(g);
  }
  GorevListele() {
    return this.gorevRef
  }
  GorevSil(key: string) {
    return this.gorevRef.remove(key);
  }
  GorevDuzenle(g: Gorev) {
    return this.gorevRef.update(g.key, g);
  }
  /* Görev Servisleri Bitiş */

  /* Pozisyon Servisleri Başlangıç */
  PozisyonEkle(p: pozisyon) {
    return this.pozisyonRef.push(p);
  }
  PozisyonListele() {
    return this.pozisyonRef
  }
  PozisyonSil(key: string) {
    return this.pozisyonRef.remove(key);
  }
  PozisyonDuzenle(p: pozisyon) {
    return this.pozisyonRef.update(p.key, p);
  }
  /* Pozisyon Servisleri Bitiş */

  /* Kullanıcı Servisleri Başlangıç */
  KulaniciListele() {
    return this.kullaniciRef
  }
  KulaniciSil(key: string) {
    return this.kullaniciRef.remove(key);
  }
  KulaniciDuzenle(k: kullanici) {
    return this.kullaniciRef.update(k.key, k);
  }
  /* Kullanıcı Servisleri Bitiş */

}