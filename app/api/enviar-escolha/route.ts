import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "process";

const mensagens: Record<string, string> = {
  a: "🧦 Você ganhou várias meias e eu um boquete inesperado seu!",
  b: "🍝 Você ganhou um jantar na Garagem gastronômica em Torres Galvão, mas eu escolho a sua roupa conforme 3 opções que me der!",
  c: "🎬 Você ganhou uma noite de Cinema para assistir o filme que quiser e eu um abraço com amor bem apertado!",
  d: "🦀 Você ganhou uma corda de carangueiro + uma noite de penetração anal comigo dentro de você!",
  e: "👖 Você ganhou uma calça Jeans ou do modelo que preferir e eu um beijo bem gostoso!",
};

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false,
  auth: {
    user: "resend",
    pass: env.RESEND_SMTP_USER,
  },
});

console.log("env", env.RESEND_SMTP_USER);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { opcao } = body;
    const mensagem = mensagens[opcao];

    if (!mensagem) {
      return NextResponse.json({ error: "Opção inválida." }, { status: 400 });
    }

    await transporter.sendMail({
      from: "Dia dos Namorados <onboarding@resend.dev>",
      to: "mendez27junder@gmail.com",
      subject: "Opção escolhida no Dia dos Namorados",
      text: `A opção escolhida foi: ${opcao.toUpperCase()}\n\n${mensagem}`,
    });

    return NextResponse.json(
      { message: "E-mail enviado com sucesso!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Erro ao enviar e-mail:", err?.response || err);
    return NextResponse.json(
      { error: "Erro ao enviar e-mail." },
      { status: 500 }
    );
  }
}
