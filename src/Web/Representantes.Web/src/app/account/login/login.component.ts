import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  backgroundImage = "";
  logoImage = "";

  login = {
    matricula: '',
    senha: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(this.accountService.isSessaoExpirou()){
      Swal.fire('Sua sessão expirou.', '', 'info');
    }
    
  }

  async onSubmit(){
    const result = this.accountService.login(this.login);
    
    result.then(result => {
      if(result){
        console.log(`Login efetuado: ${result}`);
        this.router.navigate(['']);
      }else{
        console.log(`Erro no login: ${result}`);
      }
    }).catch((error) => {
      console.log(`Erro no login: ${error}`);
      Swal.fire('Nome de Usuário e Senha não conferem.', '', 'error');
    });
  }

}
