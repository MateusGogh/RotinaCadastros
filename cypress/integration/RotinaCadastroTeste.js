/// <reference types="cypress" />

describe("Teste Instalação",()=>{
    //Este comando é responsável em realizar os comando em todos cenários de teste
    //no caso acessar a URL para os testes.
    beforeEach(() => {
        cy.visit("http://www.aprendendotestar.com.br/treinar-automacao.php")
      })
        
    const usuario = "UsuarioTeste";
    const senha = "SenhaTeste";
    const nome = "NomeTeste";
       
    it("Verificar Autenticidade do Site Carregado",()=>{       
        //Este bloco de Teste verifica a existencia de 4 campos 
        //(Titulo, Form para Usuário, Form para Senha e Form para Nome).
        cy.get('[class=title]').should('contain',"Iniciando na Automação de testes.")
        cy.get(`form table`).should('contain',`Usuário`)
        cy.get(`form table`).should('contain',`Senha`)
        cy.get(`form table`).should('contain',`Nome:`)
    })

    it("Cadastrar Faltando Informação no Campo Nome",()=>{        
        //Este bloco de Teste realiza a inserção dos dados de Usuário e Senha, faltando o dado 
        //de Nome forçando apresentar um erro e verificando se a Mensagem de Erro esta Correta.
        cy.get(`form table [name=form_usuario]`).type(usuario);
        cy.get(`form table [name=form_senha]`).type(senha);
        cy.get(`input.btn.btn-info`).click()
        cy.get('form table').should('contain','Existem campos em branco.')
    })

    it("Cadastrar preechendo todos os Campos",()=>{         
        //Este bloco de teste realiza o Cadastro preenchendo todos o Campos do Formulário
        cy.get(`form table [name=form_usuario]`).type(usuario);
        cy.get(`form table [name=form_senha]`).type(senha);
        cy.get(`form table [name=form_nome]`).type(nome);
        cy.get(`form table input.btn.btn-info`).click()
    })

    it("Verificar se o Cadastro foi feito Corretamente",()=>{
        //Este Bloco Realiza a checagem de a Tabela contem as informações 
        //cadastradas no bloco de teste anterior.
        cy.get(`div.content table`).should('contain',usuario)
        cy.get(`div.content table`).should('contain',senha)
        cy.get(`div.content table`).should('contain',nome)
    })

    it("Apagar o Cadastro Realizado",()=>{
        //Este Bloco de Teste localiza o cadastro realizado através da coluna Usuário
        //(Em analise percebeu que esse Campo não permite cadastro com informação Duplicada, 
        //por esse motivo foi utilizado como referência). Após localizar o cadastro dentro 
        //dessa referencia localiza o botão Responsavel por apagar o Cadastro.
        cy.get(`div.content table`)
        .contains(usuario)
        .parent()
        .find('[href^="?del"]')
        .click()
    })

    it("Verificar Se o Cadastro foi Apagado",()=>{
        //Este Bloco faz uma consulta verificando se contem alguma informação que foi 
        //cadastrada ainda armazenada.
        cy.get(`div.content table`)
        .should(`not.contain`,usuario)
        .should(`not.contain`,senha)
        .should(`not.contain`,nome)        
    })
})