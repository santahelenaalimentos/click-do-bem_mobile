/**
 * usuarios tem seus cpfs e status pre-cadastrados pela importação de arquivo
 * 
 * dados do arquivo => cpf, status 
 * 
 * fluxo = user abre o app => insere cpf => verificamos se está autorizado
 *                  => sim => recebe acesso ao app
 *                  => não => informa ao usuário
 */
{
    preRegisteredUser = {
        cpf = "cpf",
        status = false
    }
}

/**
 * Categorias serão cadastradas direto no banco inicialmente
 */
{
    category = {
        name = "Casaco",
        points = 10,
        hidden = false,
    }
}


{
    user = {
        role = "colaborador, admin",
        login = "cpf",
        hash = "1290871209h0712e",
        email = "...",
        donator = "312321224-123123-123123",
    }
}

{
    donator = {
        data = "..."
    }
}

{
    item = {
        type = "donation / need",
        title = "Cobertores de inverno",
        description = "Lorem ipsum...",
        images = [],
        anonymous = false,
        category = "Agasalho",
        user = {},
    }
}
