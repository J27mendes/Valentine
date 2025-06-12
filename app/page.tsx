"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css"; // importa os estilos globais se estiverem no styles/globals.css

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("escolheu")) {
      router.push("/ja-escolheu");
    }
  }, [router]);

  function choose(letra: string) {
    fetch("/api/enviar-escolha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opcao: letra }),
    })
      .then(() => {
        localStorage.setItem("escolheu", "sim");
        router.push(`/surpresa-${letra}`);
      })
      .catch((err) => {
        alert("Erro ao enviar a escolha por e-mail.");
        console.error(err);
      });
  }

  function toggleDescricao(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = el.style.display === "block" ? "none" : "block";
    }
  }

  return (
    <main>
      <h1>Escolha seu presente misterioso do dia dos namorados</h1>
      <h3>
        Se quiser saber o que pode ter em cada opção fique à vontade para espiar
        no botão de Espiar opção. Se quiser uma surpresa clique em algum botão e
        escolha, lembre-se que você só tem uma chance!
      </h3>

      <div className="buttons">
        <button onClick={() => choose("a")}>Opção 1</button>
        <button onClick={() => choose("b")}>Opção 2</button>
        <button onClick={() => choose("c")}>Opção 3</button>
        <button onClick={() => choose("d")}>Opção 4</button>
        <button onClick={() => choose("e")}>Opção 5</button>
      </div>

      <h2>
        As opções e a lista estão descritas em ordem aleatória. Boa sorte ao
        escolher!
      </h2>

      <ul>
        <li>
          <button onClick={() => toggleDescricao("desc1")}>Espiar Opção</button>
          <div id="desc1" className="descricao">
            🧦 Você ganhou várias meias e eu um boquete inesperado seu!
          </div>
        </li>
        <li>
          <button onClick={() => toggleDescricao("desc2")}>Espiar Opção</button>
          <div id="desc2" className="descricao">
            🍝 Você ganhou um jantar na Garagem Gastronômica em Torres Galvão,
            mas eu escolho a sua roupa conforme 3 opções que me der!
          </div>
        </li>
        <li>
          <button onClick={() => toggleDescricao("desc3")}>Espiar Opção</button>
          <div id="desc3" className="descricao">
            🎬 Você ganhou uma noite de Cinema para assistir o filme que quiser
            e eu um abraço com amor bem apertado!
          </div>
        </li>
        <li>
          <button onClick={() => toggleDescricao("desc4")}>Espiar Opção</button>
          <div id="desc4" className="descricao">
            🦀 Você ganhou uma corda de carangueiro + uma noite de penetração
            anal comigo dentro de você!
          </div>
        </li>
        <li>
          <button onClick={() => toggleDescricao("desc5")}>Espiar Opção</button>
          <div id="desc5" className="descricao">
            👖 Você ganhou uma calça jeans ou do modelo que preferir e eu um
            beijo bem gostoso!
          </div>
        </li>
      </ul>
    </main>
  );
}
