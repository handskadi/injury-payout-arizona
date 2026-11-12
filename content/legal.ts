import type { Locale } from "@/lib/i18n";

/**
 * Policy pages (Review of Injury Payout Website, Josh, 11 Nov 2026, item 8):
 * privacy policy explaining the data sharing with Whyte Law, PLLC, terms of
 * use, and attorney advertising & disclosures. Facts only from the review,
 * the compliance notes and what the form actually collects.
 */
export type LegalSection = { heading: string; body: string[]; list?: string[]; after?: string[] };
export type LegalDoc = { updated: string; intro: string[]; sections: LegalSection[] };
export type LegalDocId = "privacy" | "terms" | "disclaimer";

const MARKETING_EN = "Above All Enterprises, LLC, 1712 Pioneer Ave. Ste. 7000, Cheyenne, WY 82001";
const FIRM_EN = "Whyte Law, PLLC, 20987 N John Wayne Pkwy, Unit B104-108, Maricopa, Arizona 85139, inquiries@whyte-law.com";

const en: Record<LegalDocId, LegalDoc> = {
  privacy: {
    updated: "Last updated: November 11, 2026",
    intro: [
      "This Privacy Policy explains how Injury Payout collects, uses and shares information when you visit this website or submit an inquiry through it.",
      "Injury Payout is a trading style of Above All Enterprises, LLC, an independent marketing and lead-generation business. We are not a law firm and do not provide legal advice.",
    ],
    sections: [
      {
        heading: "Who we are",
        body: [
          `Injury Payout is operated by ${MARKETING_EN}. In this policy, “Injury Payout”, “we” and “us” mean Above All Enterprises, LLC.`,
        ],
      },
      {
        heading: "Information we collect",
        body: ["When you submit an inquiry, we collect:"],
        list: [
          "What caused your injury",
          "Your home ZIP code and, if you add them, your street address, city and state",
          "The approximate date it happened",
          "Anything you choose to tell us in the optional description",
          "Your first and last name, phone number and email address",
          "Your preferred language (English or Spanish)",
        ],
        after: [
          "With your inquiry we also record technical and advertising information: the page you arrived on and the website that referred you; campaign tags and ad click identifiers in the link you followed (for example from Google, Meta or Microsoft ads); your IP address and the approximate location derived from it; your browser, operating system, device type, screen size, language and time zone; and random identifiers kept in cookies or local storage on your device (a device identifier, a session identifier and advertising cookies such as Meta’s _fbc and _fbp), together with the page and date of your first visit.",
          "If you call us, we receive your phone number and the information you give us during the call.",
        ],
      },
      {
        heading: "Cookies and similar technologies",
        body: [
          "We use first-party cookies and local storage to remember how you first found our website, to recognize your device on later visits and to measure our advertising. You can clear or block cookies in your browser settings; the inquiry form still works without them.",
        ],
      },
      {
        heading: "How we use your information",
        body: [],
        list: [
          "To receive and process your inquiry",
          "To share your inquiry with our participating law firm, Whyte Law, PLLC, so that the firm can independently consider it",
          "To contact you about your inquiry",
          "To understand how people find and use our website and to measure our advertising",
          "To prevent spam, fraud and misuse of the website",
          "To comply with the law",
        ],
      },
      {
        heading: "Sharing your inquiry with Whyte Law, PLLC",
        body: [
          `When you submit an inquiry, we share the information you provide directly with our participating law firm: ${FIRM_EN}.`,
          "Whyte Law, PLLC uses your information to independently consider your inquiry and may contact you to discuss your circumstances and determine whether it can assist you. Once the firm receives your information, its handling of that information is governed by the firm’s own privacy practices and professional obligations.",
          "Submitting your information does not mean that Whyte Law has accepted your case or that you have entered into an attorney-client relationship.",
        ],
      },
      {
        heading: "Other sharing",
        body: [
          "We also share information with service providers that host or operate this website for us, only so that they can provide those services, and where we are required to by law or need to protect the rights and safety of others.",
        ],
      },
      {
        heading: "Sensitive information",
        body: [
          "Please do not include medical records, Social Security numbers, financial account details or other highly sensitive information in the optional description.",
        ],
      },
      {
        heading: "How long we keep information",
        body: [
          "We keep inquiry information only for as long as we need it for the purposes described in this policy and to meet our legal, accounting and reporting obligations.",
        ],
      },
      {
        heading: "Security",
        body: [
          "We use reasonable administrative, technical and physical safeguards to protect your information. No website or method of transmission is completely secure.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to access, correct or delete the information we hold about you, or ask us not to contact you again, by writing to us at the address below. Depending on where you live, you may have additional rights under state law. For information held by Whyte Law, PLLC, please contact the firm directly.",
        ],
      },
      {
        heading: "Children",
        body: ["This website is not directed to children under 13, and we do not knowingly collect information from them."],
      },
      {
        heading: "Changes to this policy",
        body: ["We may update this policy from time to time. The date at the top of this page shows when it was last updated."],
      },
      {
        heading: "Contact us",
        body: [`Injury Payout, ${MARKETING_EN}.`],
      },
    ],
  },
  terms: {
    updated: "Last updated: November 11, 2026",
    intro: [
      "These Terms of Use apply to your use of this website, which is operated by Above All Enterprises, LLC, trading as Injury Payout (“Injury Payout”, “we”, “us”). By using this website, you agree to these terms. If you do not agree, please do not use the website.",
    ],
    sections: [
      {
        heading: "We are not a law firm",
        body: [
          "Injury Payout is an independent marketing and lead-generation business. We are not a law firm, we do not provide legal advice, and we do not review or evaluate the merits of any claim. Information on this website is general information only.",
        ],
      },
      {
        heading: "Submitting an inquiry",
        body: [
          "When you submit an inquiry, you agree that we may share it directly with our participating law firm, Whyte Law, PLLC, so that the firm can independently consider it. Whyte Law, PLLC decides independently whether it can assist you and may contact you to discuss your circumstances.",
          "Submitting an inquiry does not establish an attorney-client relationship, does not mean that a law firm has accepted your case, does not file a claim or lawsuit, and does not stop any legal deadline from running. An attorney-client relationship can only be formed directly between you and a law firm.",
        ],
      },
      {
        heading: "Information you provide",
        body: [
          "You agree to provide accurate information and to submit an inquiry only about yourself or about someone you are authorized to act for. Our Privacy Policy explains how we handle your information.",
        ],
      },
      {
        heading: "Past results",
        body: [
          "Settlement amounts shown on this website are past results of our participating law firm, Whyte Law, PLLC. They are not results obtained by Injury Payout. Past results do not guarantee a similar outcome; every case depends on its own facts.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "Do not use this website for any unlawful purpose, submit false or automated inquiries, or attempt to interfere with the website’s operation or security.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The content and design of this website and the Injury Payout name and logo belong to us or our licensors. You may view and print pages for your personal, non-commercial use.",
        ],
      },
      {
        heading: "Third-party websites",
        body: [
          "Links to other websites are provided for convenience. We are not responsible for the content or privacy practices of those websites.",
        ],
      },
      {
        heading: "Disclaimer and limitation of liability",
        body: [
          "This website is provided “as is”. To the fullest extent permitted by law, we make no warranties about the website and are not liable for any indirect or consequential loss arising from your use of it.",
        ],
      },
      {
        heading: "Changes to these terms",
        body: ["We may update these terms from time to time. The date at the top of this page shows when they were last updated."],
      },
      {
        heading: "Contact us",
        body: [`Injury Payout, ${MARKETING_EN}.`],
      },
    ],
  },
  disclaimer: {
    updated: "Last updated: November 11, 2026",
    intro: ["Attorney advertising."],
    sections: [
      {
        heading: "About Injury Payout",
        body: [
          `Injury Payout is a trading style of ${MARKETING_EN}, an independent marketing and lead-generation business. Injury Payout is not a law firm, does not provide legal advice and does not review or evaluate cases.`,
        ],
      },
      {
        heading: "Our participating law firm",
        body: [
          "Inquiries submitted through this website may be shared with our participating law firm, Whyte Law, PLLC, for consideration.",
          `Participating Law Firm: ${FIRM_EN}.`,
          "Whyte Law, PLLC independently decides whether it can assist you. Pierré Whyte, the attorney featured on this website, is admitted to practice law in Arizona.",
        ],
      },
      {
        heading: "No attorney-client relationship",
        body: [
          "Using this website, submitting an inquiry or calling does not create an attorney-client relationship. An attorney-client relationship can only be formed directly between you and a law firm.",
        ],
      },
      {
        heading: "Past results",
        body: [
          "Settlement amounts shown on this website are past results of our participating law firm, Whyte Law, PLLC, not results obtained by Injury Payout. Past results do not guarantee a similar outcome; every case depends on its own facts.",
        ],
      },
      {
        heading: "Fees and costs",
        body: [
          "Submitting an inquiry is free and there is no obligation to hire an attorney. If a law firm offers to represent you, it will explain its fee arrangement and any case expenses before you decide whether to move forward.",
        ],
      },
      {
        heading: "General information only",
        body: [
          "Content on this website is general information, not legal advice. Laws and deadlines vary by state and by type of case.",
        ],
      },
    ],
  },
};

const MARKETING_ES = "Above All Enterprises, LLC, 1712 Pioneer Ave. Ste. 7000, Cheyenne, WY 82001";
const FIRM_ES = "Whyte Law, PLLC, 20987 N John Wayne Pkwy, Unit B104-108, Maricopa, Arizona 85139, inquiries@whyte-law.com";

const es: Record<LegalDocId, LegalDoc> = {
  privacy: {
    updated: "Última actualización: 11 de noviembre de 2026",
    intro: [
      "Esta Política de privacidad explica cómo Injury Payout recopila, usa y comparte información cuando usted visita este sitio web o envía una consulta a través de él.",
      "Injury Payout es un nombre comercial de Above All Enterprises, LLC, una empresa independiente de marketing y generación de clientes potenciales. No somos un bufete de abogados y no brindamos asesoría legal.",
    ],
    sections: [
      {
        heading: "Quiénes somos",
        body: [
          `Injury Payout es operado por ${MARKETING_ES}. En esta política, “Injury Payout” y “nosotros” se refieren a Above All Enterprises, LLC.`,
        ],
      },
      {
        heading: "Información que recopilamos",
        body: ["Cuando usted envía una consulta, recopilamos:"],
        list: [
          "Cómo se lesionó",
          "El código postal de su domicilio y, si los agrega, su dirección, ciudad y estado",
          "La fecha aproximada en que ocurrió",
          "Lo que decida contarnos en la descripción opcional",
          "Su nombre y apellido, número de teléfono y correo electrónico",
          "Su idioma preferido (inglés o español)",
        ],
        after: [
          "Junto con su consulta también registramos información técnica y publicitaria: la página por la que llegó y el sitio web que lo remitió; las etiquetas de campaña y los identificadores de clic en anuncios incluidos en el enlace que siguió (por ejemplo, de anuncios de Google, Meta o Microsoft); su dirección IP y la ubicación aproximada que se deriva de ella; su navegador, sistema operativo, tipo de dispositivo, tamaño de pantalla, idioma y zona horaria; e identificadores aleatorios guardados en cookies o en el almacenamiento local de su dispositivo (un identificador de dispositivo, un identificador de sesión y cookies publicitarias como _fbc y _fbp de Meta), junto con la página y la fecha de su primera visita.",
          "Si nos llama, recibimos su número de teléfono y la información que nos proporcione durante la llamada.",
        ],
      },
      {
        heading: "Cookies y tecnologías similares",
        body: [
          "Usamos cookies propias y almacenamiento local para recordar cómo encontró nuestro sitio web por primera vez, reconocer su dispositivo en visitas posteriores y medir nuestra publicidad. Puede borrar o bloquear las cookies en la configuración de su navegador; el formulario de consulta funciona igualmente sin ellas.",
        ],
      },
      {
        heading: "Cómo usamos su información",
        body: [],
        list: [
          "Para recibir y procesar su consulta",
          "Para compartir su consulta con nuestro bufete de abogados participante, Whyte Law, PLLC, para que el bufete pueda considerarla de forma independiente",
          "Para comunicarnos con usted sobre su consulta",
          "Para entender cómo las personas encuentran y usan nuestro sitio web y medir nuestra publicidad",
          "Para prevenir spam, fraude y el uso indebido del sitio web",
          "Para cumplir con la ley",
        ],
      },
      {
        heading: "Cómo compartimos su consulta con Whyte Law, PLLC",
        body: [
          `Cuando usted envía una consulta, compartimos la información que nos proporciona directamente con nuestro bufete de abogados participante: ${FIRM_ES}.`,
          "Whyte Law, PLLC usa su información para considerar su consulta de forma independiente y podrá comunicarse con usted para hablar sobre sus circunstancias y determinar si puede ayudarle. Una vez que el bufete recibe su información, su manejo se rige por las prácticas de privacidad y las obligaciones profesionales del propio bufete.",
          "Enviar su información no significa que Whyte Law haya aceptado su caso ni que usted haya establecido una relación abogado-cliente.",
        ],
      },
      {
        heading: "Otras formas en que compartimos información",
        body: [
          "También compartimos información con proveedores de servicios que alojan u operan este sitio web por nosotros, solo para que puedan prestar esos servicios, y cuando la ley nos lo exige o es necesario para proteger los derechos y la seguridad de otras personas.",
        ],
      },
      {
        heading: "Información sensible",
        body: [
          "Por favor, no incluya expedientes médicos, números de Seguro Social, datos de cuentas financieras ni otra información altamente sensible en la descripción opcional.",
        ],
      },
      {
        heading: "Cuánto tiempo conservamos la información",
        body: [
          "Conservamos la información de las consultas solo durante el tiempo necesario para los fines descritos en esta política y para cumplir nuestras obligaciones legales, contables y de información.",
        ],
      },
      {
        heading: "Seguridad",
        body: [
          "Usamos medidas de seguridad administrativas, técnicas y físicas razonables para proteger su información. Ningún sitio web ni método de transmisión es completamente seguro.",
        ],
      },
      {
        heading: "Sus opciones",
        body: [
          "Puede pedirnos acceder, corregir o eliminar la información que tenemos sobre usted, o pedirnos que no volvamos a contactarle, escribiéndonos a la dirección indicada abajo. Según el lugar donde viva, la ley estatal puede otorgarle derechos adicionales. Para la información que tiene Whyte Law, PLLC, comuníquese directamente con el bufete.",
        ],
      },
      {
        heading: "Menores",
        body: ["Este sitio web no está dirigido a menores de 13 años y no recopilamos a sabiendas información de ellos."],
      },
      {
        heading: "Cambios a esta política",
        body: ["Podemos actualizar esta política periódicamente. La fecha al inicio de esta página indica cuándo se actualizó por última vez."],
      },
      {
        heading: "Contáctenos",
        body: [`Injury Payout, ${MARKETING_ES}.`],
      },
    ],
  },
  terms: {
    updated: "Última actualización: 11 de noviembre de 2026",
    intro: [
      "Estos Términos de uso se aplican al uso de este sitio web, operado por Above All Enterprises, LLC, con el nombre comercial Injury Payout (“Injury Payout” o “nosotros”). Al usar este sitio web, usted acepta estos términos. Si no está de acuerdo, por favor no use el sitio web.",
    ],
    sections: [
      {
        heading: "No somos un bufete de abogados",
        body: [
          "Injury Payout es una empresa independiente de marketing y generación de clientes potenciales. No somos un bufete de abogados, no brindamos asesoría legal y no revisamos ni evaluamos los méritos de ninguna reclamación. La información de este sitio web es solo información general.",
        ],
      },
      {
        heading: "Envío de una consulta",
        body: [
          "Cuando envía una consulta, usted acepta que podamos compartirla directamente con nuestro bufete de abogados participante, Whyte Law, PLLC, para que el bufete pueda considerarla de forma independiente. Whyte Law, PLLC decide de forma independiente si puede ayudarle y podrá comunicarse con usted para hablar sobre sus circunstancias.",
          "Enviar una consulta no establece una relación abogado-cliente, no significa que un bufete haya aceptado su caso, no presenta una reclamación ni una demanda y no detiene ningún plazo legal. Una relación abogado-cliente solo puede formarse directamente entre usted y un bufete de abogados.",
        ],
      },
      {
        heading: "Información que usted proporciona",
        body: [
          "Usted se compromete a proporcionar información exacta y a enviar una consulta solo sobre usted mismo o sobre alguien en cuyo nombre esté autorizado a actuar. Nuestra Política de privacidad explica cómo manejamos su información.",
        ],
      },
      {
        heading: "Resultados anteriores",
        body: [
          "Los montos de acuerdos que se muestran en este sitio web son resultados anteriores de nuestro bufete de abogados participante, Whyte Law, PLLC. No son resultados obtenidos por Injury Payout. Los resultados anteriores no garantizan un resultado similar; cada caso depende de sus propias circunstancias.",
        ],
      },
      {
        heading: "Uso aceptable",
        body: [
          "No use este sitio web con fines ilícitos, no envíe consultas falsas o automatizadas y no intente interferir con el funcionamiento o la seguridad del sitio web.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
          "El contenido y el diseño de este sitio web, así como el nombre y el logotipo de Injury Payout, nos pertenecen a nosotros o a nuestros licenciantes. Puede ver e imprimir páginas para su uso personal y no comercial.",
        ],
      },
      {
        heading: "Sitios web de terceros",
        body: [
          "Los enlaces a otros sitios web se ofrecen por conveniencia. No somos responsables del contenido ni de las prácticas de privacidad de esos sitios web.",
        ],
      },
      {
        heading: "Exención y limitación de responsabilidad",
        body: [
          "Este sitio web se ofrece “tal cual”. En la máxima medida permitida por la ley, no ofrecemos garantías sobre el sitio web y no somos responsables de ninguna pérdida indirecta o consecuente derivada de su uso.",
        ],
      },
      {
        heading: "Cambios a estos términos",
        body: ["Podemos actualizar estos términos periódicamente. La fecha al inicio de esta página indica cuándo se actualizaron por última vez."],
      },
      {
        heading: "Contáctenos",
        body: [`Injury Payout, ${MARKETING_ES}.`],
      },
    ],
  },
  disclaimer: {
    updated: "Última actualización: 11 de noviembre de 2026",
    intro: ["Publicidad de abogados."],
    sections: [
      {
        heading: "Acerca de Injury Payout",
        body: [
          `Injury Payout es un nombre comercial de ${MARKETING_ES}, una empresa independiente de marketing y generación de clientes potenciales. Injury Payout no es un bufete de abogados, no brinda asesoría legal y no revisa ni evalúa casos.`,
        ],
      },
      {
        heading: "Nuestro bufete de abogados participante",
        body: [
          "Las consultas enviadas a través de este sitio web pueden compartirse con nuestro bufete de abogados participante, Whyte Law, PLLC, para su consideración.",
          `Bufete de abogados participante: ${FIRM_ES}.`,
          "Whyte Law, PLLC decide de forma independiente si puede ayudarle. Pierré Whyte, el abogado que aparece en este sitio web, está autorizado para ejercer la abogacía en Arizona.",
        ],
      },
      {
        heading: "Sin relación abogado-cliente",
        body: [
          "Usar este sitio web, enviar una consulta o llamar no crea una relación abogado-cliente. Una relación abogado-cliente solo puede formarse directamente entre usted y un bufete de abogados.",
        ],
      },
      {
        heading: "Resultados anteriores",
        body: [
          "Los montos de acuerdos que se muestran en este sitio web son resultados anteriores de nuestro bufete de abogados participante, Whyte Law, PLLC, no resultados obtenidos por Injury Payout. Los resultados anteriores no garantizan un resultado similar; cada caso depende de sus propias circunstancias.",
        ],
      },
      {
        heading: "Honorarios y costos",
        body: [
          "Enviar una consulta es gratis y no tiene obligación de contratar a un abogado. Si un bufete le ofrece representación, le explicará sus honorarios y los gastos del caso antes de que usted decida si desea continuar.",
        ],
      },
      {
        heading: "Solo información general",
        body: [
          "El contenido de este sitio web es información general, no asesoría legal. Las leyes y los plazos varían según el estado y el tipo de caso.",
        ],
      },
    ],
  },
};

export const legalDocs: Record<Locale, Record<LegalDocId, LegalDoc>> = { en, es };
