// B.1. Dados
const catalogo = [
  { id: 1, titulo: "Inception", tipo: "filme", ano: 2010, generos: ["ação", "ficção científica"], nota: 9.2, assistido: true, imagem: "https://imusic.b-cdn.net/images/item/original/988/5051892032988.jpg?2010-inception-dvd&class=scaled&v=1456738976.jpg" },
  { id: 2, titulo: "Breaking Bad", tipo: "serie", ano: 2008, generos: ["drama", "crime"], nota: 9.5, assistido: true, imagem: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
  { id: 3, titulo: "Interstellar", tipo: "filme", ano: 2014, generos: ["ficção científica"], nota: 8.9, assistido: false, imagem: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
  { id: 4, titulo: "Stranger Things", tipo: "serie", ano: 2016, generos: ["drama", "mistério"], nota: 8.7, assistido: true, imagem: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg" },
  { id: 5, titulo: "The Matrix", tipo: "filme", ano: 1999, generos: ["ação", "ficção científica"], nota: 8.7, assistido: false, imagem: "https://image.tmdb.org/t/p/w500/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg" },
  { id: 6, titulo: "The Witcher", tipo: "serie", ano: 2019, generos: ["fantasia"], nota: 8.2, assistido: false, imagem: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg" }
];

// B.2. Console
console.log("Catálogo carregado:", catalogo);
console.log("Primeiro título:", catalogo[0].titulo);
console.log("Ano do último:", catalogo[catalogo.length - 1].ano);
console.log("Gênero extra:", catalogo[2].generos[1] || "Apenas um gênero disponível");

// B.3. Iterators
catalogo.forEach(item => console.log(`- [${item.tipo}] ${item.titulo} (${item.ano})`));

const titulosEmCaixaAlta = catalogo.map(item => item.titulo.toUpperCase());
console.log("Títulos em MAIÚSCULO:", titulosEmCaixaAlta);

const naoAssistidos = catalogo.filter(item => !item.assistido);
console.log("Quantidade não assistidos:", naoAssistidos.length);

const destaque = catalogo.find(item => item.nota >= 9);
console.log(destaque ? `Destaque encontrado: ${destaque.titulo}` : "Nenhum item com nota >= 9");

const mediaGeral = catalogo.reduce((acc, item) => acc + item.nota, 0) / catalogo.length;
const assistidos = catalogo.filter(item => item.assistido);
const mediaAssistidos = assistidos.reduce((acc, item) => acc + item.nota, 0) / assistidos.length;
console.log(`Médias: Geral ${mediaGeral.toFixed(2)} | Assistidos ${mediaAssistidos.toFixed(2)}`);

console.log("Tem filme antigo (<2000)?", catalogo.some(item => item.ano < 2000));
console.log("Todos têm gênero?", catalogo.every(item => item.generos.length > 0));

// B.4. Saída na tela (DOM)
const output = document.getElementById("output");
const container = document.getElementById("catalogo-container");

// Renderizar cards
if (container) {
    container.innerHTML = catalogo.map(i => `
      <div class="card">
        <img src="${i.imagem}" alt="${i.titulo}" style="width:100%; height:250px; object-fit:cover;">
        <div class="card-content" style="padding:10px;">
          <span class="badge ${i.tipo}" style="padding:3px 8px; border-radius:5px; font-size:12px;">${i.tipo}</span>
          <h3 style="margin:10px 0;">${i.titulo}</h3>
          <p style="margin:0;">Ano: ${i.ano}</p>
          <p style="margin:5px 0; color: #f1c40f;">⭐ ${i.nota}</p>
        </div>
      </div>
    `).join("");
}

// Ranking
const ranking = [...catalogo].sort((a, b) => b.nota - a.nota).slice(0, 3);

// Resumo
if (output) {
    output.innerHTML = `
      <h2 style="color: red;">Resumo do Catálogo</h2>
      <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
        <div style="background:#222; padding:10px; border-radius:8px; border: 1px solid #444;">Total: ${catalogo.length}</div>
        <div style="background:#222; padding:10px; border-radius:8px; border: 1px solid #444;">Média: ${mediaGeral.toFixed(2)}</div>
        <div style="background:#222; padding:10px; border-radius:8px; border: 1px solid #444;">Não assistidos: ${naoAssistidos.length}</div>
      </div>
      <h3 style="color: #aaa; font-size: 14px; text-transform: uppercase;">🏆 Top 3 Melhores Notas</h3>
      <ul style="list-style: none; padding: 0;">
        ${ranking.map(i => `<li style="margin: 5px 0;"><strong>${i.titulo}</strong> (${i.nota})</li>`).join("")}
      </ul>
    `;
}