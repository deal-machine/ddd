<!-- # _Domain-Driven Design_ - DDD

#### É algo teórico e conceitual.

### São princípios para modelar um _software_ a partir do domínio que é o coração do negócio. A partir desse modelo são separadas as regras, processos e complexidades para depois desenvolver a solução de maneira organizada.

- Criado por **Eric Evans** em 2003 com o livro principal sobre o assunto;
- Deve ser aplicado em grandes soluções, _softwares_ complexos onde há muitos contextos, regras, departamentos e pessoas;
- Grande parte da complexidade vem da comunicação, separação de contextos e entendimento do negócio.

### Nos ajuda

- Entender domínios e subdominios:
  - É entender o negócio e todos os seus modelos nos mais diversos ângulos, tendo contato direto e constante com os _Domain Experts_.
- Criar linguagens ubíquas:
  - É a terminologia falada no cotidiano, realidade e ambiente do contexto do negócio.
  - Definir um glossário.
- Criar _design_ estratégico -> _bounded contexts_ -> contextos delimitados:
  - Responsabilidades claramente definidas.
  - Cada contexto pode ter seu _domain expert_ e sua linguagem ubíqua.
- _Design_ tático -> _context maps_ -> mapear e agregar entidades, objetos de valor e eventos:
  - Comunicação entre os contextos delimitados.
- Entender complexidade de negócio e complexidade técnica e aplicar soluções:
  - Aplicar os _domain model patterns_. São padrões de desenvolvimento e estruturação de aplicações, onde o domínio é o principal foco.

##### _Domain Experts_ são pessoas totalmente envolvidas ao negócio, que dominam a área a ser explorada pelo dev, para obtenção de informações pontuais e especialistas.

<br>

> "In short, DDD is primarily about modeling a Ubiquitous Language in an explicity Bounded Context."

> "Resumindo, DDD é primeiramente sobre modelar uma linguagem ubíqua em um contexto delimitado explícito."

<br>

---

### _Core Domain_

- domínio principal, razão do negócio existir;
- diferencial de mercado e competitivo;
- alta complexidade de negócio;
- alta influência de negócio.

### _Support Subdomain_

- apoia o domínio;
- torna o domínio possível;
- tem uma alta influência de negócio;
- baixa complexidade de negócio.

### _Generic Subdomain_

- sistemas auxiliares;
- sem diferencial competitivo;
- facilmente substituiveis;
- baixa influência de negócio;
- baixa complexidade de negócio;
- _softwares_ de plateleira são um exemplo.

<br>

---

<br>

### Processo de Problema para Solução

#### Problema

- Visão geral do domínio e suas complexidades -> subdominios

#### Solução

- Análise e modelagem dos domínios/subdominios -> contextos delimitados

<br>

---

<br>

### _Bounded Context_ - Contexto delimitado

> "A Bounded Context is an explicit boundary within which a domain model exists. Inside the boundary all terms and phrases of the Ubiquitous Language have specific meaning, and the model reflects the Language with exactness"

> "Um _Bounded Context_ é um limite explícito dentro do qual um modelo de domínio existe. Dentro desse limite, todos os termos e frases da Linguagem Ubíqua possuem significados específicos, e o modelo reflete a Linguagem com precisão."

<br>

---

<br>

### _Context Mapping_ - Mapeamento de contextos

#### Visão estratégica e modelagem estratégica.

Contextos:

1. Venda de ingressos
2. Suporte ao cliente
3. Vendas de ingressos parceiros
4. Pagamentos

<br>

-- Venda de ingressos -> **parceria** <- Venda de ingressos parceiros

-- Venda de ingressos(D) -> **cliente/fornecedor** <- Pagamentos(U)

-- Venda de ingressos(U) -> **fornecedor/cliente** <- Suporte ao cliente(D)

-- Pagamento <-> ACL -> **conformista** <- ACL <-> _Gateway_ de pagamentos (Serviço externo)

### Definições

- **Partnership** - relação de parceria entre contextos, geralmente entre _core domains_.
- **Shared kernel** - núcleo compartilhado -> compartilham funcionalidades ou funções.
- **Customer-Supplier** - relação onde um contexto consome recursos e outro fornece, respectivamente.
- **Downstream** - (D) - consome o serviço - se adapta ao modo de comunicação.
- **Upstream** - (U) - fornece o serviço e diz como será a comunicação.
- **Conformist** -> Conformista - é a necessidade em se adaptar a um serviço, se conformando com a comunicação.
- **Anticorruption-layer** - (ACL) - camada anti-corrupção é uma camada de interface, _adapter_.
- **Open host service** - um contexto vai fornecer um serviço disponível a partir de algum protocolo pré definido, exemplo: APIs.
- **Publish language** -> para consumir um serviço é necessário utilizar uma linguagem pré definida: exemplo JSON.
- **Separate ways** -> rumos separados em que cada contexto usa e mantém seu prórpio padrão.
- **Big Ball of Mud** -> Grande bola de lama - monte de coisas misturadas que precisamos lidar, muito comum em códigos legados.

<br>

---

<br>

### _*Domain Model Patterns*_

- _Entities_ - entidades
- _Value Objects_ - objetos de valor
- _Repositories_ - repositórios
- _Domain Services_ - serviços de domínio

<br>

### _Entities_ - Entidades

> "Uma entidade é algo único que é capaz de ser alterado de forma contínua durante um longo período de tempo."

> "Uma entidade é algo que possui uma continuidade em seu ciclo de vida e pode ser distinguida independente dos atributos que são importantes para a aplicação do usuário. Pode ser uma pessoal, cidade, carro, ticket de loteria ou uma transação bancária."

- principal caracteristica de uma entidade é a identidade, algo único;
- pode ser alterado ao longo do caminho;
- se autovalida para manter a consistência;
- manipula o coração da aplicação, carrega as pricipais regras de negócio;
- possui atributos que foram mapeados do modelo;
- possui comportamentos - metodos expressivos do modelo;
- sempre representa o estado correto e atual do elemento.

#### entidade anêmica - apenas guarda dados (atributos), não carrega regra de negócio e não possui métodos. Exemplo: DTO - _data transfer object_.

<br>

### _Value Objects_ - Objetos de Valor

> "Quando voce se preocupa apenas com os atríbutos de um elemento de um model, classifique isso como um Value Object."

> "Trate o Value Object como imutável."

- vai além dos tipos primitivos, é um objeto que possui valor ou valores;
- se autovalida para manter a consistência;
- nao possui id, é um conjunto de propriedades(atributos).

<br>

### _Aggregates_ - Agregadores

> "Um agregado é um conjunto de objetos associados que tratamos como uma unidade para propósito de mudança de dados."

- conjunto de objetos (Entidades ou _Object Value_) que possuem vínculos;
- podem estar fortementes agregados;
- podem ter relacionamento sem estar necessáriamente agregados;
- agregador é o _root_, o objeto que comanda o relacionamento, normalmente outros objetos dependem ou se comportam de acordo com o _root_;
- se está em diferentes agregados relaciona pelo ID;
- se está dentro do mesmo agregado a relação é pelo próprio objeto.

<br>

### _Repositories_ - Repositórios

- tem acesso direto a camada de dados;
- persiste dados utilizando as entidades;
- métodos de consultas;
- cria-se repositório por agregador, não por entidade;
- pode consultar diretamente serviços externos;
- possibilidade de validar dados no construtor do objeto.

<br>

### _Domain Services_ - Serviços de Domínio

- implementam a lógica de negócios de acordo com as definições de um domain expert;
- trabalham com diversos fluxos e diversas entidades e agregações;
- utilizam repositórios como interface de acesso aos dados;
- consomem recursos da camada de infraestrutura.

<br>

---

<br><br><br>

<h1 align="center"> Domain Storytelling </h1>
<h4 align="right"> Forma fácil e gráfica de representar uma narrativa de domínio, pela perspectiva de um atuante. </h4>

<h3 align="justify"> Nos ajudará a entender o domínio, estabelecer uma linguagem ubíqua, evitar mal-entendidos, esclarecer requisitos de software, estruturar e implementar software corretamente, desenhar processos. </h3>
<br>
<h2>Linguagem Pictográfica</h2>
<dl>
    <dt><b> Atores - <i>Actors</i></b></dt>
        <dd>Um ator ou atores</dd>
        <dd>Pode ser uma pessoa, um grupo de pessos, um objeto ou um sistema</dd>
         <div align="center" >
            <figure>
            <img src="./resources/actors.png" alt="actors example" width="350"     height="150"/>
            </figure>
        </div>
    <br>
    <dt><b> Objetor de trabalho - <i>Work Objects</i></b></dt>
        <dd>São objetos utilizados pelos atores</dd>
        <dd>Pode ser documentos, objetos, interações físicas ou digitais</dd>
        <div align="center" >
            <figure>
            <img src="./resources/workobjects.png" alt="work objects example" width="350"     height="150"/>
            </figure>
        </div>
    <br>
     <dt><b> Atividades - <i>Activities</i></b></dt>
        <dd>São as ações dos atores com os objetos de trabalho</dd>
        <div align="center" >
            <figure>
            <img src="./resources/activity.png" alt="activity example" width="350"     height="150"/>
            </figure>
        </div>
    <br>
    <dt><b> Números sequênciais - <i>Sequence Numbers</i></b></dt>
        <dd>Indicam o fluxo da história</dd>
    <br>
    <dt><b> Anotações - <i>Annotations</i></b></dt>
        <dd>São Informações que são importantes</dd>
        <dd>Para detalhamento, para fluxo, para gatilhos de ações ou eventos</dd>
    <br>
    <dt><b> Grupos - <i>Groups</i></b></dt>
        <dd>Representam parte da história</dd>
        <dd>Como ações repetidas, subdomínios, limitações, processos, etc</dd>
    <br>
    <dt><b> Cores - <i>Colors</i></b></dt>
        <dd>Trazem ênfase e organização</dd>
    <br>
    <dt><b> Escopo atual vs Escopo desejado</b></dt>
        <dd>Escopo atual representa exatamente a historia do fluxo de negócio, o escopo desejado inclui possiveis mudanças ou melhorias que não são reais, ou ainda não foram implementados</dd>
    <dt><b> Domínios puros e domínios digitalizados</b></dt>
    <dd>Detalhes das atividades feitas de maneira natual, dentro da realidade do fluxo. Digitalizado inclui as tecnologias utilizadas.</dd>
        <dt><b>Equipe de trabalho</b></dt>
        <ul>
            <li>Domain Expert vai contar a história</li>
            <li>Ouvintes quaisquer interessados</li>
            <li>Moderador vai conduzir as conversas e manter dentro dos assuntos de interesse</li>
            <li>Modelador irá desenhar os fluxos das histórias na linguagem adequada e com anotações</li>
        </ul>
        <br>
</dl>
<br>
<h1 align="center"> Event Storming </h1>
<h4 align="right"> Visa ser leve e dinâmico,
utiliza-se de ferramentas didaticas como postits, papeis, cards coloridos </h4>

<h2 align="justify"> Reunião essencial para identificar melhor os elementos do DDD. É um método baseado em workshop para descobrir rapidamente o que está acontecendo no domínio de um programa de software </h2>

<br>
<ul>
    eventos
    <ul>
        <li>
        algo que aconteceu e as pessoas se importam
        </li>
        <li>
        sempre no passado, pode ser cronometrado, resultado de algo importante
        </li>
        <li>
        são gerados através de sistemas, telas, politicas e até outros eventos
        </li>
        <li>
        eventos são definidos por domain experts
        </li>
    </ul>
    comandos
    <ul>
        <li>
        inverso do evento
        </li>
        <li>
        ação iniciada pelo ator, sempre no presente
        </li>
        <li>
        para todo evento há um comando realizado
        </li>
    </ul>
    linha do tempo
    <ul>
        <li>define os acontecimentos cronologicamente</li>
        <li>sempre possui um ator envolvido</li>
        <li>envolve um evento e um comando</li>
    </ul>
    <div align="center" >
            <figure>
            <img src="./resources/timeline.png" alt="timeline example" width="300" height="200"/>
            </figure>
        </div>
    modelo de leitura
    <ul>
        <li>
            pode gerar um comando
        </li>
        <li>
            geralmente uma tela, board, papel, notificação qualquer lugar que exiba informações
        </li>
    </ul>
    politica
    <ul>
        <li>
            são regras e definições que geram comandos ou eventos
        </li>
    </ul>
    sistemas externos
    <ul>
        <li>
            são integrações ou ações de sistemas fora do nosso domínio
        </li>
    </ul>
    aggregate
    <ul>
        <li>
            é um <i>cluster</i> (conjunto) de objetos importantes para o dominio, entidades relacionadas
        </li>
    </ul>
</ul>
<br>
<div align="center" >
            <figure>
            <img src="./resources/eventstormingboard.png" alt="event storming board example" width="600" height="350"/>
<figcaption>
            <a href="https://miro.com/app/board/o9J_kpZJAAE=/" rel="board example" target="_blank">
    <b>example board</b>
</a>
            </figcaption>
            </figure>
        </div> -->
