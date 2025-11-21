require('dotenv').config();
const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_SENHA = process.env.ADMIN_SENHA;
const TECNICO_ID = process.env.TECNICO_ID ? Number(process.env.TECNICO_ID) : null;
// sufixo único por execução (timestamp)
const uniq = Date.now();

async function loginAdmin() {
  const resp = await axios.post(`${API_BASE_URL}/api/auth/login`, {
    email: ADMIN_EMAIL,
    senha: ADMIN_SENHA,
  });
  return resp.data.token;
}

async function criarCliente(token, cliente) {
  const resp = await axios.post(
    `${API_BASE_URL}/api/clientes`,
    cliente,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log('Cliente criado:', resp.data.id, '-', resp.data.nome);
  return resp.data;
}

async function criarOS(token, os) {
  const resp = await axios.post(
    `${API_BASE_URL}/api/os`,
    os,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log('OS criada:', resp.data.id, '-', resp.data.titulo);
  return resp.data;
}


function dataHoje(horas, minutos) {
  const d = new Date();
  d.setHours(horas, minutos, 0, 0);
  return d.toISOString(); 
}

async function main() {
  try {
    console.log('1) Fazendo login como ADMIN...');
    const token = await loginAdmin();
    console.log('Token obtido com sucesso.\n');

    console.log('2) Criando clientes...');
  const clientesParaCriar = [
  {
    nome: 'Cliente A',
    telefone: '11999990001',
    email: `cliente.a+${uniq}@example.com`,
    endereco: 'Rua A, 123',
  },
  {
    nome: 'Cliente B',
    telefone: '11999990002',
    email: `cliente.b+${uniq}@example.com`,
    endereco: 'Rua B, 456',
  },
];

    const clientesCriados = [];
    for (const c of clientesParaCriar) {
      const novo = await criarCliente(token, c);
      clientesCriados.push(novo);
    }

    console.log('\n3) Criando Ordens de Serviço...');

    // pega o primeiro cliente criado
    const cliente1 = clientesCriados[0];
    const cliente2 = clientesCriados[1];

    const osParaCriar = [
      {
        titulo: 'Manutenção Internet',
        descricao: 'Verificar Sinal da ONU',
        clienteId: cliente1.id,
        tecnicoId: TECNICO_ID, 
        prioridade: 'ALTA', // Prioridade enum: BAIXA, MEDIA, ALTA, URGENTE
        status: 'ABERTO',   // StatusOS enum: ABERTO, EM_ANDAMENTO, CONCLUIDO, CANCELADO
        dataAgendada: dataHoje(9, 0),
      },
      {
        titulo: 'Instalação de roteador',
        descricao: 'Configurar Wi-Fi para o cliente ',
        clienteId: cliente2.id,
        tecnicoId: TECNICO_ID,
        prioridade: 'MEDIA',
        status: 'ABERTO',
        dataAgendada: dataHoje(11, 30),
      },
    ];

    for (const os of osParaCriar) {
      await criarOS(token, os);
    }

    console.log('\nAutomação concluída com sucesso!');
  } catch (err) {
    if (err.response) {
      console.error('Erro na API:', err.response.status, err.response.data);
    } else {
      console.error('Erro geral:', err.message);
    }
  }
}

main();
