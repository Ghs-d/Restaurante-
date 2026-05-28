// Variável para saber se o usuário já preencheu os dados
let usuarioCadastrado = false;


// Verifica se já tem dados salvos no LocalStorage assim que a página carrega

document.addEventListener("DOMContentLoaded", () => {
    recuperarDadosDoPerfil();
});

function recuperarDadosDoPerfil() {
    const nomeSalvo = localStorage.getItem("perfil_nome");

    // Se o nome existe no navegador, significa que já tem cadastro
    if (nomeSalvo) {
        usuarioCadastrado = true;

        // Atualiza o botão do menu
        let primeiroNome = nomeSalvo.split(" ")[0];
        document.getElementById("texto-menu-perfil").innerText = "Olá, " + primeiroNome;

        // Preenche o card oculto com os dados salvos
        document.getElementById("nomePerfil").innerText = nomeSalvo;
        document.getElementById("telefonePerfil").innerText = "Tel: " + localStorage.getItem("perfil_telefone");
        document.getElementById("emailPerfil").innerText = "E-mail: " + localStorage.getItem("perfil_email");

        const nascSalvo = localStorage.getItem("perfil_nascimento");
        if (nascSalvo) document.getElementById("nascimentoPerfil").innerText = "Nasc: " + nascSalvo;

        const bioSalva = localStorage.getItem("perfil_bio");
        if (bioSalva) document.getElementById("bioPerfil").innerText = bioSalva;

        const fotoSalva = localStorage.getItem("perfil_foto");
        if (fotoSalva) document.getElementById("fotoPerfil").src = fotoSalva;
    }
}


//função para abrir o formulário 

function abrirPerfilOuCard() {
    if (usuarioCadastrado) {
        // Se já tem cadastro, abre o Card de Perfil com as informações
        document.getElementById("overlayPerfil").style.display = "block";
        document.getElementById("cardPerfil").style.display = "block";
    } else {
        // Se não tem cadastro, abre o formulário
        document.getElementById("popup").style.display = "flex";
    }
}

function fecharPerfil() {
    document.getElementById("popup").style.display = "none";
}

function fecharCardPerfil() {
    document.getElementById("overlayPerfil").style.display = "none";
    document.getElementById("cardPerfil").style.display = "none";
}

// função para criar o perfil do usuário, salvar os dados no LocalStorage

function criarPerfilCard() {
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let nascimento = document.getElementById("nascimento").value;
    let bio = document.getElementById("bio").value;
    let foto = document.getElementById("foto").files[0];

    // Exige que o usuário preencha pelo menos Nome, Telefone e Email
    if (nome && telefone && email) {

        // Salva os dados obrigatórios e opcionais no LocalStorage 
        localStorage.setItem("perfil_nome", nome);
        localStorage.setItem("perfil_telefone", telefone);
        localStorage.setItem("perfil_email", email);

        if (nascimento) localStorage.setItem("perfil_nascimento", nascimento);
        if (bio) localStorage.setItem("perfil_bio", bio);

        // Preenche o visual do Card 
        document.getElementById("nomePerfil").innerText = nome;
        document.getElementById("telefonePerfil").innerText = "Tel: " + telefone;
        document.getElementById("emailPerfil").innerText = "E-mail: " + email;
        if (nascimento) document.getElementById("nascimentoPerfil").innerText = "Nasc: " + nascimento;
        if (bio) document.getElementById("bioPerfil").innerText = bio;

        // Processa a imagem enviada e também salva no LocalStorage
        if (foto) {
            let leitor = new FileReader();
            leitor.onload = function (e) {
                document.getElementById("fotoPerfil").src = e.target.result;
                localStorage.setItem("perfil_foto", e.target.result);
            }
            leitor.readAsDataURL(foto);
        }


        let primeiroNome = nome.split(" ")[0];
        document.getElementById("texto-menu-perfil").innerText = "Olá, " + primeiroNome;

        usuarioCadastrado = true;

        fecharPerfil();
        alert("Perfil criado com sucesso! \nBem-vindo(a), " + primeiroNome + "!");
        abrirPerfilOuCard();

    } else {
        alert("Preencha pelo menos Nome, Telefone e E-mail!");
    }
}