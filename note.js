
// Dados iniciais para demonstração
const initialData = {
    requests: [
        {
            id: 1,
            elderly: "Dona Maria, 78 anos",
            location: "Lar dos Anciãos Felizes",
            type: "Conversa Semanal",
            duration: "1 hora",
            when: "Quartas-feiras, 15h",
            description: "Dona Maria gostaria de conversar sobre histórias do passado e ouvir música brasileira antiga.",
            status: "Disponível"
        },
        {
            id: 2,
            elderly: "Seu João, 82 anos",
            location: "Lar Harmonia",
            type: "Acompanhamento ao Mercado",
            duration: "2 horas",
            when: "Sexta-feira, 10h",
            description: "Ajudar Seu João a fazer compras mensais no supermercado próximo.",
            status: "Disponível"
        },
        {
            id: 3,
            elderly: "Dona Clara, 85 anos",
            location: "Lar Vovó Felicidade",
            type: "Leitura de Livros",
            duration: "1 hora",
            when: "Terças e Quintas, 14h",
            description: "Ler capítulos de livros clássicos para Dona Clara, que tem dificuldades de visão.",
            status: "Disponível"
        },
        {
            id: 4,
            elderly: "Seu Antônio, 80 anos",
            location: "Lar Harmonia",
            type: "Passeio no Parque",
            duration: "2 horas",
            when: "Sábado, 14h",
            description: "Acompanhar Seu Antônio em um passeio no parque próximo.",
            status: "Disponível"
        }
    ],
    users: [
        {
            email: "lar@exemplo.com",
            password: "123456",
            type: "lar",
            name: "Lar dos Idosos Felizes",
            cnpj: "12.345.678/0001-99",
            phone: "(11) 9999-9999",
            address: "Rua das Flores, 123 - São Paulo, SP"
        },
        {
            email: "voluntario@exemplo.com",
            password: "123456",
            type: "voluntario",
            name: "Ana Silva",
            phone: "(11) 98888-7777",
            city: "São Paulo",
            skills: "Conversa, Leitura, Passeios"
        }
    ]
};

// Verificar se já existe dados no localStorage
if (!localStorage.getItem('velhoAmigoData')) {
    localStorage.setItem('velhoAmigoData', JSON.stringify(initialData));
}

// Funções de navegação
function showPage(pageId) {
    // Esconde todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    // Mostra a página solicitada
    document.getElementById(pageId).classList.add('active-page');
    
    // Atualiza a navegação ativa
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(.nav-links a[onclick="showPage('${pageId}')"]);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Rola para o topo
    window.scrollTo(0, 0); 
    
    // Carrega dados específicos da página
    if (pageId === 'home-page' || pageId === 'requests-page') {
        loadRequests();
    }
    
    if (pageId === 'nursing-home-dashboard') {
        updateNursingHomeDashboard();
    }
    
    if (pageId === 'volunteer-dashboard') {
        updateVolunteerDashboard();
    }
    
    if (pageId === 'volunteers-page') {
        showVolunteersPage();
    }
}

function setActiveTab(tabId) {
    // Atualizar botões de tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Mostrar o formulário correto
    if (tabId === 'voluntario') {
        document.getElementById('voluntario-form').style.display = 'block';
Joice, [16 de jun de 2025 às 18:15]
document.getElementById('lar-form').style.display = 'none';
    } else {
        document.getElementById('voluntario-form').style.display = 'none';
        document.getElementById('lar-form').style.display = 'block';
    }
}

// Funções para carregar solicitações
function loadRequests() {
    const data = JSON.parse(localStorage.getItem('velhoAmigoData') || '{}');
    const requests = data.requests || [];
    
    const homeRequestsContainer = document.getElementById('home-requests');
    const requestsContainer = document.getElementById('requests-list');
    
    if (homeRequestsContainer) {
        homeRequestsContainer.innerHTML = '';
        // Mostrar apenas 3 solicitações na home
        const homeRequests = requests.slice(0, 3);
        homeRequests.forEach(request => {
            homeRequestsContainer.appendChild(createRequestCard(request));
        });
    }
    
    if (requestsContainer) {
        requestsContainer.innerHTML = '';
        requests.forEach(request => {
            requestsContainer.appendChild(createRequestCard(request));
        });
    }
}

function createRequestCard(request) {
    const firstLetter = request.elderly.charAt(0);
    
    const card = document.createElement('div');
    card.className = 'request-card';
    card.innerHTML = 
        <div class="request-header">
            <h3>${request.type}</h3>
            <span class="request-status">${request.status}</span>
        </div>
        <div class="request-body">
            <p><i class="fas fa-user"></i> <strong>Idoso:</strong> ${request.elderly}</p>
            <p><i class="fas fa-map-marker-alt"></i> <strong>Local:</strong> ${request.location}</p>
            <p><i class="fas fa-clock"></i> <strong>Duração:</strong> ${request.duration}</p>
            <p><i class="fas fa-calendar"></i> <strong>Quando:</strong> ${request.when}</p>
            <p><i class="fas fa-info-circle"></i> <strong>Descrição:</strong> ${request.description}</p>
        </div>
        <div class="request-footer">
            <div class="senior-info">
                <div class="senior-avatar">${firstLetter}</div>
                <div>
                    <strong>${request.elderly.split(',')[0]}</strong>
                    <div>${request.elderly.split(',')[1]}</div>
                </div>
            </div>
            <button class="btn" onclick="acceptRequest(${request.id})">Aceitar Solicitação</button>
        </div>
    ;
    return card;
}

// Função para aceitar solicitação
function acceptRequest(requestId) {
    alert(Solicitação ${requestId} aceita com sucesso! Você receberá um e-mail com os detalhes.);
    
    // Atualizar status da solicitação
    const data = JSON.parse(localStorage.getItem('velhoAmigoData'));
    const request = data.requests.find(r => r.id === requestId);
    if (request) {
        request.status = "Aceita";
        localStorage.setItem('velhoAmigoData', JSON.stringify(data));
        
        // Recarregar as solicitações
        loadRequests();
    }
}

// Atualizar dashboard do lar de idosos
function updateNursingHomeDashboard() {
    const data = JSON.parse(localStorage.getItem('velhoAmigoData'));
    const requests = data.requests || [];
    
    document.getElementById('elderly-count').textContent = "4 idosos";
    document.getElementById('active-requests').textContent = ${requests.length} solicitações;
    
    const requestsContainer = document.getElementById('nursing-home-requests');
    if (requestsContainer) {
        requestsContainer.innerHTML = '';
        requests.slice(0, 3).forEach(request => {
            requestsContainer.appendChild(createRequestCard(request));
        });
    }
}

// Atualizar dashboard do voluntário
function updateVolunteerDashboard() {
    const data = JSON.parse(localStorage.getItem('velhoAmigoData'));
Joice, [16 de jun de 2025 às 18:15]
const requests = data.requests || [];
    
    document.getElementById('completed-activities').textContent = "15 atividades";
    document.getElementById('volunteer-hours').textContent = "42 horas";
    document.getElementById('volunteer-rating').textContent = "4.8/5.0";
    document.getElementById('upcoming-activities').textContent = "3 atividades";
    
    const requestsContainer = document.getElementById('volunteer-recommended-requests');
    if (requestsContainer) {
        requestsContainer.innerHTML = '';
        requests.slice(0, 3).forEach(request => {
            requestsContainer.appendChild(createRequestCard(request));
        });
    }
}

// Mostrar página de voluntários
function showVolunteersPage() {
    const data = JSON.parse(localStorage.getItem('velhoAmigoData')) || { users: [] };
    const volunteers = data.users.filter(u => u.type === 'voluntario');
    const container = document.getElementById('volunteers-list');
    container.innerHTML = '';

    if (volunteers.length === 0) {
        container.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    volunteers.forEach(v => {
        const card = document.createElement('div');
        card.className = 'request-card';
        card.innerHTML = 
            <div class="request-header">
                <h3>${v.name}</h3>
                <span class="request-status">Ativo</span>
            </div>
            <div class="request-body">
                <p><strong>Email:</strong> ${v.email}</p>
                <p><strong>Telefone:</strong> ${v.phone}</p>
                <p><strong>Cidade:</strong> ${v.city || 'Não informado'}</p>
                <p><strong>Interesses:</strong> ${v.skills || 'Não informado'}</p>
            </div>
        ;
        container.appendChild(card);
    });
}

// Gerar certificado
function generateCertificate() {
    alert("Seu certificado será enviado por e-mail ou estará disponível para download em breve!");
}

// Funções de formulário
document.getElementById('volunteer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    registerUser('voluntario');
});

document.getElementById('nursing-home-form').addEventListener('submit', function(e) {
    e.preventDefault();
    registerUser('lar');
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    loginUser();
});

document.getElementById('request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    createRequest();
});

function registerUser(type) {
    const alertContainer = type === 'voluntario' ? 
        document.getElementById('register-alert') : 
        document.getElementById('register-alert-lar');
    
    alertContainer.innerHTML = '';
    
    // Simulação de cadastro
    setTimeout(() => {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = type === 'voluntario' ? 
            'Cadastro como voluntário realizado com sucesso!' : 
            'Cadastro do lar de idosos realizado com sucesso!';
        
        alertContainer.appendChild(alert); 
        
        // Limpar formulário
        if (type === 'voluntario') {
            document.getElementById('volunteer-form').reset();
        } else {
            document.getElementById('nursing-home-form').reset();
        }
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
            showPage('login-page');
        }, 2000);
    }, 1000);
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const alertContainer = document.getElementById('login-alert');
    
    alertContainer.innerHTML = '';
Joice, [16 de jun de 2025 às 18:15]
// Obter dados
    const data = JSON.parse(localStorage.getItem('velhoAmigoData'));
    const user = data.users.find(u => u.email === email && u.password === password);
    
    setTimeout(() => {
        if (user) {
            if (user.type === 'lar') {
                showPage('nursing-home-dashboard');
                // Preencher dados do lar
                document.getElementById('nursing-home-name').textContent = user.name;
                document.getElementById('nursing-home-avatar').textContent = user.name.charAt(0);
                document.getElementById('nursing-home-contact').textContent = Responsável: ${user.name} | ${user.email};
                document.getElementById('nursing-home-address').textContent = user.address;
            } else {
                showPage('volunteer-dashboard');
                // Preencher dados do voluntário
                document.getElementById('volunteer-name').textContent = user.name;
                document.getElementById('volunteer-avatar').textContent = user.name.charAt(0);
                document.getElementById('volunteer-contact').textContent = ${user.email} | ${user.phone};
                document.getElementById('volunteer-location').textContent = user.city;
                document.getElementById('volunteer-availability').textContent = Disponibilidade: ${user.availability || 'A combinar'};
            }
        } else {
            const alert = document.createElement('div');
            alert.className = 'alert alert-error';
            alert.textContent = 'Credenciais inválidas. Tente novamente.';
            alertContainer.appendChild(alert);
        }
    }, 1000);
}

function createRequest() {
    const elderly = document.getElementById('request-elderly').value;
    const type = document.getElementById('request-type').value;
    const description = document.getElementById('request-description').value;
    const duration = document.getElementById('request-duration').value;
    const date = document.getElementById('request-date').value;
    
    // Formatar data
    const dateObj = new Date(date);
    const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
    const formattedDate = dateObj.toLocaleDateString('pt-BR', options);
    
    // Criar nova solicitação
    const newRequest = {
        id: Date.now(),
        elderly: elderly.split(' (')[0] + elderly.split(')')[0],
        location: "Meu Lar de Idosos",
        type: type,
        duration: duration + " horas",
        when: formattedDate,
        description: description,
        status: "Disponível"
    };
    
    // Salvar no localStorage
    const data = JSON.parse(localStorage.getItem('velhoAmigoData'));
    data.requests.push(newRequest);
    localStorage.setItem('velhoAmigoData', JSON.stringify(data));
    
    // Feedback
    alert('Solicitação criada com sucesso!');
    
    // Redirecionar
    showPage('nursing-home-dashboard');
}

function logout() {
    // Redirecionar para home
    showPage('home-page');
    
    // Mostrar mensagem
    alert('Você saiu do sistema. Volte sempre!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carregar solicitações na home
    loadRequests();
    
    // Definir data/hora atual como padrão para criação de solicitação
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('request-date').value = ${year}-${month}-${day}T${hours}:${minutes};
});
