import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { Enterprise } from '../models/enterprise';
import { ModalController } from '@ionic/angular';
import { EnterpriseFormComponent } from '../components/forms/enterprise-form/enterprise-form.component';
import JSPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  protected enterprises: Enterprise[] = []
  protected results: Enterprise[] = []

  constructor(
    private enterpriseService: EnterpriseService,

    private modalController: ModalController,

    private file: File, private fileOpener: FileOpener
  ) { }

  ngOnInit(): void {
    this.refresh()
  }

  async createEnterprise() {
    const modal = await this.modalController.create({
      component: EnterpriseFormComponent
    })

    await modal.present()

    const { data, role } = await modal.onDidDismiss()

    if (role == 'confirm') this.refresh()

  }

  async editEnterprise(enterprise: Enterprise) {
    const modal = await this.modalController.create({
      component: EnterpriseFormComponent,
      componentProps: {
        edit: true,
        id: enterprise.id,
        rfc: enterprise.rfc,
        razon_social: enterprise.razon_social,
        idEstado: enterprise.city.idEstado,
        idCiudad: enterprise.idCiudad,
        colonia: enterprise.colonia,
        codigo_postal: enterprise.codigo_postal
      }
    })

    await modal.present()

    const { data, role } = await modal.onDidDismiss()

    if (role == 'confirm') this.refresh()

  }

  createPdf(enterprise: Enterprise) {
    const doc = new JSPDF()

    doc.text(`Razón Social: ${enterprise.razon_social}`, 10, 20)

    doc.text(`RFC: ${enterprise.rfc}`, 10, 30)

    if (enterprise.persona_fisica) doc.text("Persona Física", 10, 40)
    if (enterprise.persona_moral) doc.text("Persona Moral", 10, 40)

    doc.text(`Colonia ${enterprise.colonia}, Ciudad de ${enterprise.city.name}, Estado de ${enterprise.city.estado.name}`, 10, 60)

    doc.save("a4.pdf")
  }

  handleInput(event: any, type: number) {
    const query = event.target.value.toLowerCase();
    switch (type) {
      case 1:
        this.results = this.enterprises.filter((d) => d.rfc.toLowerCase().indexOf(query) > -1);
        break;
      case 2:
        this.results = this.enterprises.filter((d) => d.razon_social.toLowerCase().indexOf(query) > -1);
        break;
      case 3:
        this.results = this.enterprises.filter((d) => d.city.estado.name.toLowerCase().indexOf(query) > -1);
        break;
      case 4:
        this.results = this.enterprises.filter((d) => d.city.name.toLowerCase().indexOf(query) > -1);
        break;
      default:
        break;
    }
  }

  refresh() {
    this.enterpriseService.GetAll().subscribe(c => {
      this.enterprises = c
      this.results = [...this.enterprises]
    })
  }
}
