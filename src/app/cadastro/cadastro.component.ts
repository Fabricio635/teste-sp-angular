import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';
import { MyAlertDialogComponent } from '../my-alert-dialog/my-alert-dialog.component';
import { OperacaoService } from '../operacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	myFormControl = new FormControl('', [
    	Validators.required,
    ]);

    userInput:any = {codigo:null, tipo_mercadoria:null, nome:null, qtd:null, preco:null, tipo_operacao:1};

  constructor(public dialog: MdDialog, private operacaoService: OperacaoService, private router: Router) {

  }

  onSubmit() {
    let dialogRef = this.dialog.open(ProgressDialogComponent);
    this.operacaoService.salvarOperacao(this.userInput).then(status => {
          dialogRef.close();
          if (status == 1) {
            this.userInput = {codigo:null, tipo_mercadoria:null, nome:null, qtd:null, preco:null, tipo_operacao:1};
            this.router.navigate(['/operacoes']);
          }
          else {
            this.showAlert("Atenção", "Houve um erro ao salvar os dados!");
          }
        }).catch(erro => {
          dialogRef.close();
          this.showAlert("Atenção", "Houve um erro ao salvar os dados!");
        });
  }

  showAlert(title: string, msg: string) {
    let alertDialogRef = this.dialog.open(MyAlertDialogComponent, {
      data: { title: title, msg: msg },
    });
  }

  ngOnInit() {
  }

}
