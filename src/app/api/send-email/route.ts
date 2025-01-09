import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, subject, message } = body;

    // Pokud někdo poslal jen email z footeru, zpracujeme to takto:
    if (email && !firstName && !lastName && !phone) {
      // Odešleme e-mail s informací, že chce být kontaktován...
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Footer Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: subject || "Kontakt z Footeru",
        text: message || `Někdo zadal e-mail: ${email}`,
      });

      return NextResponse.json(
        { message: "Email z footeru byl odeslán." },
        { status: 200 }
      );
    }

    // Pokud naopak poslal firstName atd., zpracujte to dál pro váš hlavní formulář
    if (!firstName || !lastName || !phone || !message) {
      return NextResponse.json(
        { message: "Některá pole chybí." },
        { status: 400 }
      );
    }

    // ... zbytek logiky pro plnou verzi formuláře ...
    // Např. stejný nodemailer code:
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: subject || "Nová poptávka z hlavního formuláře",
      text: `
        Jméno: ${firstName} ${lastName}
        Telefon: ${phone}
        Zpráva: ${message}
      `,
    });

    return NextResponse.json({ message: "Email byl odeslán." }, { status: 200 });
  } catch (error) {
    console.error("Chyba v API:", error);
    return NextResponse.json(
      { message: "Chyba serveru." },
      { status: 500 }
    );
  }
}
