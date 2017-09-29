import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Operacao } from './operacao';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OperacaoService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private options = new RequestOptions({ headers: this.headers });
	private operacoesUrl = "http://testesp.epizy.com/index_slim.php/operacao/listar";
	private salvarOperacaoUrl = "http://testesp.epizy.com/index_slim.php/operacao/salvar";

  constructor(private http: Http) {

  }

  getOperacoes(): Promise<any[]> {
	  return this.http.get(this.operacoesUrl)
	             .toPromise()
	             .then(response => response.json().operacoes as any[])
	             .catch(this.handleError);
	}

	salvarOperacao(dados:any): Promise<number> {
	  return this.http.post(this.salvarOperacaoUrl, JSON.stringify(dados))
	             .toPromise()
	             .then(response => response.json().status as number)
	             .catch(this.handleError);
	}
	 
	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}
}
