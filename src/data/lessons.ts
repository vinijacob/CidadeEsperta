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

  {
    id: "lesson-5",
    title: "Listas",
    description:
      "Aprenda como guardar várias informações dentro de uma única variável.",
    topics: [
      {
        id: "topic-5-1",
        title: "O que é uma lista?",
        content:
          "Uma lista permite guardar várias informações dentro de uma única variável. Podemos usar listas para organizar vários valores.",
        pythonExample: 'cars = ["carro", "ônibus", "bicicleta"]',
      },
      {
        id: "topic-5-2",
        title: "Acessando informações",
        content:
          "Cada item de uma lista possui uma posição. Em Python, a primeira posição começa no número 0.",
        pythonExample:
          'vehicles = ["carro", "ônibus", "bicicleta"]\nprint(vehicles[0])',
      },
      {
        id: "topic-5-3",
        title: "Adicionando itens",
        content:
          "Podemos adicionar novos itens a uma lista usando o comando append().",
        pythonExample:
          'cars = ["carro", "ônibus"]\ncars.append("bicicleta")\nprint(cars)',
      },
      {
        id: "topic-5-4",
        title: "Quantidade de itens",
        content:
          "A função len() permite descobrir quantos itens existem dentro de uma lista.",
        pythonExample:
          'sensors = ["temperatura", "chuva", "luz"]\nprint(len(sensors))',
      },
      {
        id: "topic-5-5",
        title: "Listas na cidade",
        content:
          "Uma cidade inteligente pode usar listas para organizar sensores, ruas, veículos ou outros elementos da cidade.",
        pythonExample:
          'sensors = ["temperatura", "chuva", "trânsito"]\n\nfor sensor in sensors:\n    print("Verificando:", sensor)',
      },
    ],
    exercises: [
      {
        id: "exercise-5-1",
        question: "Para que serve uma lista?",
        options: [
          "Para guardar várias informações",
          "Para desligar o computador",
          "Para criar uma condição",
        ],
        correctAnswer: 0,
        explanation:
          "Uma lista permite guardar vários valores dentro de uma única variável.",
      },
      {
        id: "exercise-5-2",
        question:
          'O que será mostrado por este código?\n\nvehicles = ["carro", "ônibus", "bicicleta"]\nprint(vehicles[0])',
        options: ["carro", "ônibus", "bicicleta"],
        correctAnswer: 0,
        explanation:
          "A primeira posição de uma lista em Python é 0, então vehicles[0] contém 'carro'.",
      },
      {
        id: "exercise-5-3",
        question: "Para que serve o append()?",
        options: [
          "Para adicionar um item a uma lista",
          "Para apagar uma lista",
          "Para contar uma condição",
        ],
        correctAnswer: 0,
        explanation: "O append() adiciona um novo item ao final de uma lista.",
      },
    ],
  },

  {
    id: "lesson-6",
    title: "Funções",
    description:
      "Aprenda como criar blocos de código reutilizáveis para organizar seus programas.",
    topics: [
      {
        id: "topic-6-1",
        title: "O que é uma função?",
        content:
          "Uma função é um bloco de código criado para realizar uma tarefa específica. Ela pode ser utilizada várias vezes no programa.",
        pythonExample: 'def greet():\n    print("Olá!")\n\ngreet()',
      },
      {
        id: "topic-6-2",
        title: "Criando uma função",
        content:
          "Em Python, usamos a palavra def para criar uma função. Depois damos um nome para ela e colocamos os comandos dentro do bloco.",
        pythonExample:
          'def turn_on_light():\n    print("Luz ligada")\n\nturn_on_light()',
      },
      {
        id: "topic-6-3",
        title: "Parâmetros",
        content:
          "Uma função pode receber informações chamadas parâmetros. Isso permite que a mesma função trabalhe com diferentes valores.",
        pythonExample:
          'def greet(name):\n    print("Olá,", name)\n\ngreet("Ana")',
      },
      {
        id: "topic-6-4",
        title: "Retornando valores",
        content:
          "Uma função pode devolver um resultado usando o comando return.",
        pythonExample:
          "def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)",
      },
      {
        id: "topic-6-5",
        title: "Funções na cidade",
        content:
          "Podemos criar funções para controlar diferentes partes de uma cidade inteligente, como iluminação, semáforos e sensores.",
        pythonExample:
          'def check_traffic(cars):\n    if cars > 20:\n        return "Trânsito intenso"\n    return "Trânsito normal"\n\nprint(check_traffic(25))',
      },
    ],
    exercises: [
      {
        id: "exercise-6-1",
        question: "Para que serve uma função?",
        options: [
          "Para organizar e reutilizar código",
          "Para desligar o computador",
          "Para criar uma imagem",
        ],
        correctAnswer: 0,
        explanation:
          "Funções permitem organizar código em blocos reutilizáveis que realizam tarefas específicas.",
      },
      {
        id: "exercise-6-2",
        question: "Qual palavra usamos para criar uma função em Python?",
        options: ["function", "def", "create"],
        correctAnswer: 1,
        explanation:
          "Em Python, usamos a palavra-chave def para criar uma função.",
      },
      {
        id: "exercise-6-3",
        question: "O que é um parâmetro?",
        options: [
          "Uma informação recebida por uma função",
          "Um erro do programa",
          "Uma lista de comandos",
        ],
        correctAnswer: 0,
        explanation:
          "Parâmetros são informações que uma função pode receber para trabalhar com diferentes valores.",
      },
    ],
  },

  {
    id: "lesson-7",
    title: "Operadores lógicos",
    description:
      "Aprenda como combinar condições para criar decisões mais inteligentes.",
    topics: [
      {
        id: "topic-7-1",
        title: "O que são operadores lógicos?",
        content:
          "Operadores lógicos permitem combinar ou modificar condições. Eles são muito úteis quando uma decisão depende de mais de uma informação.",
        pythonExample:
          'rain = True\ntraffic = True\n\nif rain and traffic:\n    print("Trânsito complicado")',
      },
      {
        id: "topic-7-2",
        title: "O operador and",
        content:
          "O operador and significa 'e'. Ele exige que todas as condições sejam verdadeiras para que a decisão seja executada.",
        pythonExample:
          'temperature = 35\ncars = 30\n\nif temperature > 30 and cars > 20:\n    print("Alerta de trânsito")',
      },
      {
        id: "topic-7-3",
        title: "O operador or",
        content:
          "O operador or significa 'ou'. Com ele, basta que uma das condições seja verdadeira.",
        pythonExample:
          'rain = False\nstorm = True\n\nif rain or storm:\n    print("Ativar alerta")',
      },
      {
        id: "topic-7-4",
        title: "O operador not",
        content:
          "O operador not inverte o resultado de uma condição. Se algo é verdadeiro, not transforma em falso, e vice-versa.",
        pythonExample:
          'traffic_light = False\n\nif not traffic_light:\n    print("Semáforo desligado")',
      },
      {
        id: "topic-7-5",
        title: "Decisões inteligentes",
        content:
          "Sistemas inteligentes podem combinar várias informações para tomar decisões mais precisas.",
        pythonExample:
          'cars = 40\nrain = True\n\nif cars > 30 and rain:\n    print("Ativar plano de trânsito")',
      },
    ],
    exercises: [
      {
        id: "exercise-7-1",
        question: "O que significa o operador and?",
        options: ["E", "Ou", "Não"],
        correctAnswer: 0,
        explanation:
          "O operador and exige que todas as condições sejam verdadeiras.",
      },
      {
        id: "exercise-7-2",
        question: "O que significa o operador or?",
        options: ["E", "Ou", "Não"],
        correctAnswer: 1,
        explanation:
          "O operador or permite que uma condição seja verdadeira para que o resultado também seja verdadeiro.",
      },
      {
        id: "exercise-7-3",
        question: "Para que serve o operador not?",
        options: [
          "Para repetir um código",
          "Para inverter uma condição",
          "Para criar uma lista",
        ],
        correctAnswer: 1,
        explanation: "O operador not inverte o resultado de uma condição.",
      },
    ],
  },

  {
    id: "lesson-8",
    title: "Dicionários",
    description:
      "Aprenda como organizar informações usando pares de chave e valor.",
    topics: [
      {
        id: "topic-8-1",
        title: "O que é um dicionário?",
        content:
          "Um dicionário permite organizar informações usando uma chave para identificar cada valor.",
        pythonExample:
          'city = {"name": "Cidade Esperta", "population": 100000}',
      },
      {
        id: "topic-8-2",
        title: "Acessando valores",
        content:
          "Podemos acessar uma informação de um dicionário usando sua chave.",
        pythonExample:
          'city = {"name": "Cidade Esperta", "population": 100000}\nprint(city["name"])',
      },
      {
        id: "topic-8-3",
        title: "Alterando informações",
        content:
          "Os valores armazenados em um dicionário podem ser alterados durante a execução do programa.",
        pythonExample:
          'city = {"population": 100000}\ncity["population"] = 105000\nprint(city["population"])',
      },
      {
        id: "topic-8-4",
        title: "Adicionando informações",
        content:
          "Também podemos adicionar novas informações a um dicionário criando uma nova chave.",
        pythonExample:
          'city = {"name": "Cidade Esperta"}\ncity["temperature"] = 28\nprint(city)',
      },
      {
        id: "topic-8-5",
        title: "Dicionários na cidade",
        content:
          "Dicionários são úteis para representar objetos da cidade com várias características, como sensores, veículos e semáforos.",
        pythonExample:
          'traffic_light = {\n    "color": "red",\n    "location": "Rua Central",\n    "cars": 25\n}\n\nprint(traffic_light["color"])',
      },
    ],
    exercises: [
      {
        id: "exercise-8-1",
        question: "Como um dicionário organiza informações?",
        options: [
          "Usando chaves e valores",
          "Usando apenas números",
          "Usando apenas listas",
        ],
        correctAnswer: 0,
        explanation:
          "Dicionários organizam informações usando pares de chave e valor.",
      },
      {
        id: "exercise-8-2",
        question:
          'Qual informação será mostrada?\n\ncity = {"name": "Manaus"}\nprint(city["name"])',
        options: ["city", "Manaus", "name"],
        correctAnswer: 1,
        explanation: "A chave name está associada ao valor 'Manaus'.",
      },
      {
        id: "exercise-8-3",
        question: "Podemos alterar um valor dentro de um dicionário?",
        options: ["Sim", "Não", "Somente usando listas"],
        correctAnswer: 0,
        explanation:
          "Os valores de um dicionário podem ser alterados durante a execução do programa.",
      },
    ],
  },

  {
    id: "lesson-9",
    title: "Entrada de dados",
    description:
      "Aprenda como fazer um programa receber informações do usuário.",
    topics: [
      {
        id: "topic-9-1",
        title: "Conversando com o programa",
        content:
          "Um programa pode receber informações de uma pessoa. Isso permite criar programas interativos.",
        pythonExample:
          'name = input("Qual é o seu nome? ")\nprint("Olá,", name)',
      },
      {
        id: "topic-9-2",
        title: "Usando input()",
        content:
          "A função input() permite que o programa espere o usuário digitar uma informação.",
        pythonExample: 'city = input("Qual é a sua cidade? ")\nprint(city)',
      },
      {
        id: "topic-9-3",
        title: "Recebendo números",
        content:
          "Por padrão, o input() recebe texto. Para trabalhar com números, podemos converter o resultado usando int().",
        pythonExample: 'age = int(input("Qual é a sua idade? "))\nprint(age)',
      },
      {
        id: "topic-9-4",
        title: "Usando os dados",
        content:
          "Depois de receber uma informação, podemos armazená-la em uma variável e utilizá-la em outras partes do programa.",
        pythonExample:
          'cars = int(input("Quantos carros existem? "))\n\nif cars > 20:\n    print("Trânsito intenso")\nelse:\n    print("Trânsito normal")',
      },
      {
        id: "topic-9-5",
        title: "Programas interativos",
        content:
          "Sistemas de uma cidade inteligente podem receber informações para tomar decisões e responder aos usuários.",
        pythonExample:
          'temperature = int(input("Temperatura atual: "))\n\nif temperature > 30:\n    print("Ativar sistema de resfriamento")\nelse:\n    print("Temperatura normal")',
      },
    ],
    exercises: [
      {
        id: "exercise-9-1",
        question: "Para que serve o input()?",
        options: [
          "Para receber uma informação do usuário",
          "Para repetir um código",
          "Para apagar uma variável",
        ],
        correctAnswer: 0,
        explanation:
          "A função input() permite que o programa receba uma informação digitada pelo usuário.",
      },
      {
        id: "exercise-9-2",
        question: "O que o int() pode fazer?",
        options: [
          "Transformar um valor em número inteiro",
          "Criar uma lista",
          "Repetir uma condição",
        ],
        correctAnswer: 0,
        explanation:
          "A função int() pode converter um valor para um número inteiro.",
      },
      {
        id: "exercise-9-3",
        question:
          'O que acontece neste código?\n\nname = input("Nome: ")\nprint(name)',
        options: [
          "O programa recebe e mostra o nome digitado",
          "O programa apaga o nome",
          "O programa cria uma lista",
        ],
        correctAnswer: 0,
        explanation:
          "O input() recebe o nome e o print() mostra o valor armazenado na variável.",
      },
    ],
  },

  {
    id: "lesson-10",
    title: "Projeto: Semáforo inteligente",
    description:
      "Use tudo o que você aprendeu para criar a lógica de um semáforo inteligente.",
    topics: [
      {
        id: "topic-10-1",
        title: "Pensando no problema",
        content:
          "Antes de programar, precisamos entender o problema. Nosso semáforo precisa analisar informações e decidir qual ação deve realizar.",
        pythonExample:
          'traffic_light = "red"\n\nif traffic_light == "red":\n    print("Pare!")',
      },
      {
        id: "topic-10-2",
        title: "Usando variáveis",
        content:
          "Podemos guardar informações importantes em variáveis, como a cor do semáforo e a quantidade de carros.",
        pythonExample:
          'traffic_light = "green"\ncars = 15\n\nprint(traffic_light)\nprint(cars)',
      },
      {
        id: "topic-10-3",
        title: "Tomando decisões",
        content:
          "Agora podemos usar condições para fazer o semáforo tomar decisões dependendo das informações recebidas.",
        pythonExample:
          'cars = 35\n\nif cars > 30:\n    print("Manter sinal vermelho")\nelse:\n    print("Liberar trânsito")',
      },
      {
        id: "topic-10-4",
        title: "Criando uma função",
        content:
          "Podemos organizar a lógica do semáforo dentro de uma função para reutilizá-la sempre que necessário.",
        pythonExample:
          'def check_traffic(cars):\n    if cars > 30:\n        return "Vermelho"\n    return "Verde"\n\nprint(check_traffic(40))',
      },
      {
        id: "topic-10-5",
        title: "Nosso semáforo inteligente",
        content:
          "Agora podemos combinar variáveis, condições e funções para criar uma lógica simples de um semáforo inteligente.",
        pythonExample:
          'def traffic_light(cars, rain):\n    if cars > 30 and rain:\n        return "Vermelho"\n    elif cars > 30:\n        return "Amarelo"\n    else:\n        return "Verde"\n\nprint(traffic_light(35, True))',
      },
    ],
    exercises: [
      {
        id: "exercise-10-1",
        question:
          "Qual informação pode ser armazenada em uma variável para controlar um semáforo?",
        options: [
          "A quantidade de carros",
          "Apenas o nome do programa",
          "O tamanho da tela",
        ],
        correctAnswer: 0,
        explanation:
          "A quantidade de carros é uma informação que pode ser usada para tomar decisões sobre o trânsito.",
      },
      {
        id: "exercise-10-2",
        question: "Por que podemos usar uma função para controlar um semáforo?",
        options: [
          "Para organizar e reutilizar a lógica",
          "Para apagar o programa",
          "Para criar uma imagem",
        ],
        correctAnswer: 0,
        explanation:
          "Uma função permite organizar a lógica do semáforo e reutilizá-la sempre que necessário.",
      },
      {
        id: "exercise-10-3",
        question: "Se existem muitos carros e está chovendo, o programa pode:",
        options: [
          "Ignorar as informações",
          "Tomar uma decisão usando as duas condições",
          "Apagar todas as variáveis",
        ],
        correctAnswer: 1,
        explanation:
          "Usando o operador and, podemos combinar as duas condições e tomar uma decisão baseada nas duas informações.",
      },
    ],
  },
];
