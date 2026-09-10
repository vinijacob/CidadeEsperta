import { Lesson } from "@/models/Lesson";

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "O que é programação?",
    description:
      "Aprenda como os computadores seguem instruções para realizar tarefas.",
    topics: [
      {
        id: "topic-1-1",
        title: "O que é programação?",
        content:
          "Programação é o processo de criar instruções para que um computador realize tarefas. Nós usamos linguagens de programação para escrever essas instruções.",
        pythonExample: 'print("Olá, mundo!")',
      },
      {
        id: "topic-1-2",
        title: "O que é um algoritmo?",
        content:
          "Um algoritmo é uma sequência de passos organizada para resolver um problema ou realizar uma tarefa.",
        pythonExample: 'print("Passo 1")\nprint("Passo 2")\nprint("Passo 3")',
      },
      {
        id: "topic-1-3",
        title: "Comandos",
        content:
          "Um comando é uma instrução que diz ao computador o que ele deve fazer.",
        pythonExample: 'print("Acender a luz")',
      },
      {
        id: "topic-1-4",
        title: "Conhecendo o Python",
        content:
          "Python é uma linguagem de programação conhecida por possuir uma sintaxe simples e fácil de entender.",
        pythonExample: 'name = "Cidade Esperta"\nprint(name)',
      },
      {
        id: "topic-1-5",
        title: "Programando uma cidade",
        content:
          "Em uma cidade inteligente, programas podem controlar semáforos, sensores, iluminação e muitos outros sistemas.",
        pythonExample:
          'traffic_light = "red"\n\nif traffic_light == "red":\n    print("Pare!")',
      },
    ],
    exercises: [
      {
        id: "exercise-1-1",
        question: "O que é programação?",
        options: [
          "Uma forma de criar instruções para o computador",
          "Uma peça do computador",
          "Um tipo de jogo",
        ],
        correctAnswer: 0,
        explanation:
          "Programação é usada para criar instruções que dizem ao computador o que ele deve fazer.",
      },
      {
        id: "exercise-1-2",
        question: "O que é um algoritmo?",
        options: [
          "Um computador",
          "Uma sequência de passos para resolver um problema",
          "Uma linguagem de programação",
        ],
        correctAnswer: 1,
        explanation:
          "Um algoritmo é uma sequência organizada de passos para realizar uma tarefa ou resolver um problema.",
      },
      {
        id: "exercise-1-3",
        question: 'O que o comando print("Olá!") faz?',
        options: [
          "Apaga o computador",
          "Cria uma variável",
          "Mostra uma mensagem na tela",
        ],
        correctAnswer: 2,
        explanation: "O comando print() mostra uma informação na tela.",
      },
    ],
  },

  {
    id: "lesson-2",
    title: "Variáveis",
    description: "Aprenda como guardar informações dentro de um programa.",
    topics: [
      {
        id: "topic-2-1",
        title: "O que é uma variável?",
        content:
          "Uma variável é um espaço onde podemos guardar uma informação para utilizar posteriormente.",
        pythonExample: 'name = "Ana"',
      },
      {
        id: "topic-2-2",
        title: "Guardando números",
        content:
          "Podemos usar variáveis para guardar números, como a quantidade de carros em uma rua.",
        pythonExample: "cars = 15",
      },
      {
        id: "topic-2-3",
        title: "Guardando textos",
        content:
          "Também podemos guardar textos em variáveis. Em Python, textos normalmente ficam entre aspas.",
        pythonExample: 'city = "Cidade Esperta"',
      },
      {
        id: "topic-2-4",
        title: "Alterando valores",
        content:
          "O valor de uma variável pode mudar durante a execução do programa.",
        pythonExample: "cars = 10\ncars = 20\nprint(cars)",
      },
      {
        id: "topic-2-5",
        title: "Variáveis na cidade",
        content:
          "Podemos usar variáveis para representar informações da cidade, como temperatura, população ou quantidade de veículos.",
        pythonExample:
          "temperature = 28\ncars = 50\nprint(temperature)\nprint(cars)",
      },
    ],
    exercises: [
      {
        id: "exercise-2-1",
        question: "Para que serve uma variável?",
        options: [
          "Para guardar uma informação",
          "Para desligar o computador",
          "Para criar uma tela",
        ],
        correctAnswer: 0,
        explanation:
          "Uma variável permite guardar uma informação para que o programa possa utilizá-la.",
      },
      {
        id: "exercise-2-2",
        question: 'O que está sendo guardado em city = "Manaus"?',
        options: ["Um número", "Um texto", "Uma imagem"],
        correctAnswer: 1,
        explanation: "O valor entre aspas é um texto.",
      },
      {
        id: "exercise-2-3",
        question: "Qual variável representa corretamente uma temperatura?",
        options: [
          'temperature = "quente"',
          "temperature = 30",
          "temperature = cidade",
        ],
        correctAnswer: 1,
        explanation:
          "O número 30 pode representar uma temperatura armazenada em uma variável.",
      },
    ],
  },

  {
    id: "lesson-3",
    title: "Condições",
    description: "Aprenda a fazer o programa tomar decisões usando if e else.",
    topics: [
      {
        id: "topic-3-1",
        title: "Tomando decisões",
        content:
          "Um programa pode tomar decisões dependendo de uma determinada condição.",
        pythonExample: 'if traffic_light == "red":\n    print("Pare!")',
      },
      {
        id: "topic-3-2",
        title: "O comando if",
        content:
          "O comando if significa 'se'. Ele permite executar uma ação somente quando uma condição é verdadeira.",
        pythonExample:
          'temperature = 35\n\nif temperature > 30:\n    print("Está quente!")',
      },
      {
        id: "topic-3-3",
        title: "O comando else",
        content:
          "O comando else significa 'senão'. Ele pode ser usado quando queremos definir o que acontece quando a condição não é verdadeira.",
        pythonExample:
          'traffic_light = "green"\n\nif traffic_light == "red":\n    print("Pare!")\nelse:\n    print("Pode seguir!")',
      },
      {
        id: "topic-3-4",
        title: "Comparando valores",
        content: "Podemos comparar valores usando operadores como >, < e ==.",
        pythonExample:
          'cars = 10\n\nif cars > 5:\n    print("Rua movimentada")',
      },
      {
        id: "topic-3-5",
        title: "Condições inteligentes",
        content:
          "Cidades inteligentes podem usar condições para tomar decisões automaticamente com base nos dados dos sensores.",
        pythonExample:
          'rain = True\n\nif rain:\n    print("Ativar sistema de drenagem")\nelse:\n    print("Sistema normal")',
      },
    ],
    exercises: [
      {
        id: "exercise-3-1",
        question: "Para que serve o comando if?",
        options: [
          "Para repetir uma ação",
          "Para tomar uma decisão baseada em uma condição",
          "Para apagar uma variável",
        ],
        correctAnswer: 1,
        explanation:
          "O if permite executar um trecho do programa quando uma condição é verdadeira.",
      },
      {
        id: "exercise-3-2",
        question: "O que significa else?",
        options: ["Senão", "Repetir", "Começar"],
        correctAnswer: 0,
        explanation:
          "O else define o que acontece quando a condição do if não é verdadeira.",
      },
      {
        id: "exercise-3-3",
        question: "Se o semáforo está vermelho, o carro deve:",
        options: ["Parar", "Acelerar", "Ignorar o semáforo"],
        correctAnswer: 0,
        explanation:
          "Quando o semáforo está vermelho, a regra da cidade determina que o carro deve parar.",
      },
    ],
  },

  {
    id: "lesson-4",
    title: "Repetições",
    description:
      "Aprenda como fazer uma ação acontecer várias vezes usando loops.",
    topics: [
      {
        id: "topic-4-1",
        title: "O que é uma repetição?",
        content:
          "Uma repetição permite executar a mesma ação várias vezes sem precisar escrever o mesmo código várias vezes.",
        pythonExample: 'for i in range(3):\n    print("Olá!")',
      },
      {
        id: "topic-4-2",
        title: "O comando for",
        content:
          "O comando for pode ser usado para repetir uma ação uma quantidade determinada de vezes.",
        pythonExample: 'for i in range(5):\n    print("Luz acesa")',
      },
      {
        id: "topic-4-3",
        title: "Contando repetições",
        content:
          "Podemos usar o range() para determinar quantas vezes uma ação será repetida.",
        pythonExample: "for i in range(4):\n    print(i)",
      },
      {
        id: "topic-4-4",
        title: "O comando while",
        content:
          "O while repete uma ação enquanto uma determinada condição for verdadeira.",
        pythonExample:
          "cars = 0\n\nwhile cars < 5:\n    print(cars)\n    cars = cars + 1",
      },
      {
        id: "topic-4-5",
        title: "Repetições na cidade",
        content:
          "Uma cidade inteligente pode repetir tarefas automaticamente, como verificar sensores várias vezes.",
        pythonExample: 'for i in range(3):\n    print("Verificando sensor...")',
      },
    ],
    exercises: [
      {
        id: "exercise-4-1",
        question: "Para que serve uma repetição?",
        options: [
          "Para executar uma ação várias vezes",
          "Para apagar o programa",
          "Para criar uma senha",
        ],
        correctAnswer: 0,
        explanation:
          "As repetições permitem executar uma ação várias vezes sem escrever o mesmo código repetidamente.",
      },
      {
        id: "exercise-4-2",
        question:
          "Qual comando podemos usar para criar uma repetição em Python?",
        options: ["print", "for", "name"],
        correctAnswer: 1,
        explanation:
          "O comando for é utilizado para criar repetições em Python.",
      },
      {
        id: "exercise-4-3",
        question:
          "O que o código abaixo faz?\n\nfor i in range(3):\n    print('Oi!')",
        options: [
          "Mostra 'Oi!' três vezes",
          "Mostra 'Oi!' uma vez",
          "Não faz nada",
        ],
        correctAnswer: 0,
        explanation: "O range(3) faz o loop executar três vezes.",
      },
    ],
  },
];
