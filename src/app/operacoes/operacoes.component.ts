import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdDialog } from '@angular/material';

import { Operacao } from '../operacao';
import { OperacaoService } from '../operacao.service';
import { RefreshService } from '../refresh.service';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';
import { MyAlertDialogComponent } from '../my-alert-dialog/my-alert-dialog.component';

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.css']
})
export class OperacoesComponent implements OnInit {

	operacoes: Operacao[];
	displayedColumns = ['codigo', 'tipo_mercadoria', 'nome', 'quantidade', 'preco', 'tipo_operacao', 'data_operacao'];
	dataSource: OperacaoDataSource;

  constructor(private operacaoService: OperacaoService, private refreshService: RefreshService, public dialog: MdDialog) {
  	refreshService.refresh.subscribe(event => {
  		this.getOperacoes();
  	});
  }

  getOperacoes(): void {
  	let dialogRef = this.dialog.open(ProgressDialogComponent);
    this.operacaoService
        .getOperacoes()
        .then(operacoes => {
        	dialogRef.close();
        	let pre = operacoes;
        	this.operacoes = this.prepareOperacoes(pre);
        	this.dataSource = new OperacaoDataSource(this.operacoes);
        }).catch(error => {
        	dialogRef.close();
        	let alertDialogRef = this.dialog.open(MyAlertDialogComponent, {
		      data: { title: "Atenção", msg: "Houve um erro ao carregar os dados!" },
		    });
        });
  }

  prepareOperacoes(pre: any[]): Operacao[] {
  	let final = Array(pre.length);
  	for (let i in pre) {
	    final[i] = {codigo: pre[i].codigo,
	    			tipo_mercadoria: pre[i].tipo_mercadoria,
	    			nome: pre[i].nome,
	    			quantidade: pre[i].quantidade,
	    			preco: pre[i].preco,
	    			tipo_operacao: this.getTipoOperacao(pre[i].tipo_operacao),
  					data_operacao: this.getDataFormatada(pre[i].data_operacao)};
	}
  	return final;
  }

  getDataFormatada(data: string): string {
  	let mData = new Date(data);
  	let dia = mData.getDate() > 9 ? mData.getDate() : "0"+mData.getDate();
  	let mes = (mData.getMonth()+1) ? (mData.getMonth()+1) : "0"+(mData.getMonth()+1);
  	let hora = mData.getHours() > 9 ? mData.getHours() : "0"+mData.getHours();
  	let minuto = mData.getMinutes() > 9 ? mData.getMinutes() : "0"+mData.getMinutes();
  	let result = dia+"/"+mes+"/"+mData.getFullYear()+" "+hora+":"+minuto;
  	return result;
  }

  getTipoOperacao(tipo: number): string {
  	if (tipo == 1) {
  		return "Compra";
  	}
  	else {
  		return "Venda";
  	}
  }

  ngOnInit() {
  	this.getOperacoes();
  }

}

export class OperacaoDataSource extends DataSource<any> {

	constructor(private operacoes: Operacao[]) {
		super();
	}

  connect(): Observable<Operacao[]> {
    return Observable.of(this.operacoes);
  }

  disconnect() {}
}
