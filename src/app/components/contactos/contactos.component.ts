import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";
import { Contactos } from "../../models/contacto";
import { ContactosService } from "../../services/contactos.service";

@Component({
  selector: "app-contactos",
  templateUrl: "./contactos.component.html",
  styleUrls: ["./contactos.component.css"]
})
export class ContactosComponent implements OnInit {
  Titulo: "Contactos";
  Acciones: {
    A: "(Agregar)";
    C: "(Consultar)";
    L: "(Listado)";
  };
  Accion = "L"; //inicia con listado

  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  Lista: Contactos[] = [];
  RegistrosTotal: number;
  SinBusquedasRealizadas = true;

  Pagina = 1;

  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private contactosService: ContactosService
  ) {}

  ngOnInit() {
    this.FormFiltro = this.formBuilder.group({
      Nombre: [""]
    });
    this.FormReg = this.formBuilder.group({
      IdContacto: [0],
      Nombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(30)]
      ],
      FechaNacimiento: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}"
          )
        ]
      ],
      Telefono: [null, [Validators.required, Validators.pattern("[0-9]{1,10}")]]
    });

    // this.getContactos();
  }

  // getContactos() {
  //   this.contactosService.get().subscribe((datos: Contactos[]) => {
  //     this.Lista = datos;
  //   });
  // }
  Agregar() {
    this.Accion = "A";
    this.FormReg.reset({ Activo: true });
    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.contactosService
      .get(this.FormFiltro.value.Nombre, this.Pagina)
      .subscribe((res: any) => {
        this.Lista = res.Lista;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }

  Grabar() {
    this.submitted = true;
    if (this.FormReg.invalid) {
      return;
    }
    const itemCopy = { ...this.FormReg.value };
    var arrFecha = itemCopy.FechaNacimiento.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaNacimiento = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (itemCopy.IdContacto == 0 || itemCopy.IdContacto == null) {
      itemCopy.IdContacto = 0;
      this.contactosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
        this.Buscar();
      });
    } else {
    }
  }

  Volver() {
    this.Accion = "L";
  }
}
