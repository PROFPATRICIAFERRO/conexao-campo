let campoItens = [];
let cidadeAlvos = [];
let itemSelecionado = null;
let pontos = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  // Criar itens do campo
  campoItens.push(new Item("Milho", 100, 100));
  campoItens.push(new Item("Água", 100, 200));
  campoItens.push(new Item("Fruta", 100, 300));

  // Criar alvos da cidade
  cidadeAlvos.push(new Alvo("Feira", 500, 100, "Fruta"));
  cidadeAlvos.push(new Alvo("Indústria", 500, 200, "Milho"));
  cidadeAlvos.push(new Alvo("ETA", 500, 300, "Água"));
}

function draw() {
  background(220);
  fill(0);
  textSize(24);
  text("Conecte os itens do campo aos seus destinos na cidade!", width / 2, 30);
  text("Pontos: " + pontos, width / 2, 60);

  for (let item of campoItens) {
    item.mostrar();
  }

  for (let alvo of cidadeAlvos) {
    alvo.mostrar();
  }

  if (itemSelecionado) {
    stroke(0);
    line(itemSelecionado.x, itemSelecionado.y, mouseX, mouseY);
  }
}

function mousePressed() {
  for (let item of campoItens) {
    if (dist(mouseX, mouseY, item.x, item.y) < 30) {
      itemSelecionado = item;
    }
  }
}

function mouseReleased() {
  if (itemSelecionado) {
    for (let alvo of cidadeAlvos) {
      if (dist(mouseX, mouseY, alvo.x, alvo.y) < 30) {
        if (alvo.tipoEsperado === itemSelecionado.nome) {
          pontos += 10;
          itemSelecionado.encaixado = true;
        } else {
          pontos -= 5;
        }
      }
    }
  }
  itemSelecionado = null;
}

// Classe para itens do campo
class Item {
  constructor(nome, x, y) {
    this.nome = nome;
    this.x = x;
    this.y = y;
    this.encaixado = false;
  }

  mostrar() {
    if (!this.encaixado) {
      fill(76, 175, 80);
      ellipse(this.x, this.y, 60);
      fill(255);
      textSize(12);
      text(this.nome, this.x, this.y);
    }
  }
}

// Classe para alvos da cidade
class Alvo {
  constructor(nome, x, y, tipoEsperado) {
    this.nome = nome;
    this.x = x;
    this.y = y;
    this.tipoEsperado = tipoEsperado;
  }

  mostrar() {
    fill(33, 150, 243);
    rect(this.x - 30, this.y - 30, 60, 60, 10);
    fill(255);
    textSize(12);
    text(this.nome, this.x, this.y);
  }
}
