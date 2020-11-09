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

  ngOnInit() {}
}
