import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { City } from 'src/app/models/city';
import { State } from 'src/app/models/state';
import { CitiesService } from 'src/app/services/cities.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.scss'],
})
export class EnterpriseFormComponent implements OnInit {

  @Input('id') id!: number
  @Input('rfc') rfc!: string
  @Input('razon_social') razon_social!: string
  @Input('idEstado') idEstado!: number
  @Input('idCiudad') idCiudad!: number
  @Input('colonia') colonia!: string
  @Input('codigo_postal') codigo_postal!: string
  @Input('edit') edit: boolean = false
  protected enterpriseFormGroup!: FormGroup

  protected states: State[] = []
  protected cities: City[] = []

  constructor(
    private statesService: StatesService,
    private citiesService: CitiesService,
    private enterpriseService: EnterpriseService,

    protected modalController: ModalController,
    private alertController: AlertController,

    private formBuilder: FormBuilder
  ) {
    this.enterpriseFormGroup = this.formBuilder.group({
      rfc: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      razon_social: ['', [Validators.required]],
      idCiudad: [null, [Validators.required]],
      colonia: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    })
  }

  ngOnInit() {
    this.statesService.GetAll().subscribe(c => this.states = c)
    this.citiesService.GetAll().subscribe(c => this.cities = c)
  }

  ngAfterContentInit() {
    if (this.edit) {
      this.enterpriseFormGroup.get('rfc')?.setValue(this.rfc)
      this.enterpriseFormGroup.get('razon_social')?.setValue(this.razon_social)
      this.enterpriseFormGroup.get('idCiudad')?.setValue(this.idCiudad)
      this.enterpriseFormGroup.get('colonia')?.setValue(this.colonia)
      this.enterpriseFormGroup.get('codigo_postal')?.setValue(this.codigo_postal)
    }
  }

  async save() {
    if (!this.enterpriseFormGroup.valid) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Los datos están incompletos, por favor rellena todo el formulario',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      if (!this.edit) {
        this.enterpriseService.Create(this.enterpriseFormGroup.value).subscribe(c => {
          console.log(c)
          this.modalController.dismiss(c, "confirm")
        })
      }
      else {
        this.enterpriseService.Update(this.id, this.enterpriseFormGroup.value).subscribe(c => {
          console.log(c)
          this.modalController.dismiss(c, "confirm")
        })
      }
    }
  }

}
