# teste-full-stack

## Front-end

Requisitos obrigatórios
- Angular 13v [⇗](https://angular.io/docs)
- AngularMaterial para componentes [⇗](https://material.angular.io/)
- ReactiveForms [⇗](https://angular.io/guide/reactive-forms) 
- Qualquer framwork css para classes de utilidade: Bootstrap[⇗](https://getbootstrap.com/docs/5.2/utilities/api/), Tailwind[⇗](https://tailwindcss.com/), Bulma[⇗](https://bulma.io/) 
- Roteamento via AngularRoutar [⇗](https://angular.io/guide/routing-overview)


**Seria ótimo se ⇓**
- Colocasse em prática um fluxo de dados unidirecional e imutabilidade de estados via frameworks de gerenciamento de estados como o NGXS[⇗](https://www.ngxs.io/), NGRX[⇗](https://ngrx.io/)
- Utilizasse a funcionalidade de lazy loading [⇗](https://angular.io/guide/lazy-loading-ngmodules)
- Fizesse uso da estratégia de change detection OnPush [⇗](https://angular.io/guide/change-detection-skipping-subtrees#skipping-component-subtrees)
- Fizesse uso dos operadores do RXJS [⇗](https://rxjs.dev/api)

> Dica:<br /> 
> Lembre-se que no final do dia você sempre estará escrevendo código para outros desenvolvedores.<br />
> Deixe as mágicas para Merlin e as variáveis x,y,z para o webpack 😂

---

[Login] História de usuário

- Como usuário, desejo ver uma tela de login com dois campos: um para e-mail e outro para senha, para poder acessar o sistema.

- Como usuário, quero poder interagir livremente com os campos de e-mail e senha na tela de login, sem receber nenhum feedback de erro, até o momento em que eu tente submeter os dados do formulário.

- Como usuário, ao deixar algum campo vazio na tela login, quero ver a mensagens de erro relacionadas ao não preenchimento desses campos.

- Como usuário, ao submeter um formulário inválido na tela de login, gostaria de receber um feedback do sistema  para entender que cometi erros e poder corrigi-los.

- Como usuário, ao inserir credenciais inválidas na tela de login, espero receber algum feedback do sistema.

- Como usuário, ao enviar minhas credenciais na tela de login, gostaria de receber um feedback do sistema que minha solicitação foi enviada e está sendo processada.

- Como usuário, ao enviar minhas credenciais corretas na tela de login, gostaria de ser redireciondo para dentro do sistema.

**Seria ótimo se ⇓**

- Os dados gerais do usuário e de autenticação estejam disponíveis para toda a aplicação sem a necessidade de consultar a local storage.
- O campo de input possuir um ícone para mostrar ou esconder a senha.
- O usuário possa permanecer na aplicação sem precisar se autenticar ate o refresh_token expirar.
- O usuário fosse autenticado somente quando o formulário for válido.
