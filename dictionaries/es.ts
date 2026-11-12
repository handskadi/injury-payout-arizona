import type { Dictionary } from "./en";

/**
 * Spanish copy — Final developer brief, 08 Nov 2026. Formal "usted" for US
 * audiences. Needs native-speaker and firm review before launch.
 */
const es: Dictionary = {
  meta: {
    title: "¿Se lesionó? Descubra si podría recibir una compensación.",
    description:
      "Responda unas preguntas rápidas sobre su lesión. Nuestro equipo de Injury Payout recopilará su información y se encargará de que su consulta se comparta con Whyte Law, PLLC.",
  },
  common: {
    skip: "Saltar al contenido principal",
    call: "Llame al {phone}",
    callPrompt: "¿Prefiere hablar?",
    startReview: "Iniciar mi consulta gratuita",
    freeReview: "Consulta gratuita",
    responsibleFirm: "Despacho responsable: {firm}",
    langName: "English",
  },
  nav: {
    label: "Principal",
    how: "Cómo funciona",
    types: "Tipos de lesiones",
    results: "Resultados",
    faq: "Preguntas frecuentes",
  },
  hero: {
    titleBefore: "¿Se lesionó? Descubra si podría recibir una ",
    titleHighlight: "compensación",
    titleAfter: ".",
    lede:
      "Responda unas preguntas rápidas sobre su lesión. Nuestro equipo de Injury Payout recopilará su información y se encargará de que su consulta se comparta con Whyte Law, PLLC.",
    reassurance: "Consulta gratuita · Sin compromiso",
    proofBefore: "Acuerdo de ",
    proofAmount: "$1.8 millones",
    proofAfter: " por un accidente de tránsito.",
    proofQualifier: "Resultados anteriores de nuestro bufete de abogados participante Whyte Law. Los resultados anteriores no garantizan un resultado similar.",
    disclosure:
      "Injury Payout es una empresa independiente de marketing y generación de clientes potenciales. No somos un bufete de abogados. Las consultas enviadas a través de este sitio web pueden compartirse con nuestro bufete de abogados participante, Whyte Law, PLLC, para su consideración.",
  },
  evaluator: {
    cardTitle: "Consulta gratuita sobre lesiones personales",
    stepOf: "Paso {n} de 3",
    step1: {
      legend: "¿Cómo se lesionó?",
      hint: "Elija la opción que más se acerque.",
    },
    step2: {
      title: "Algunos detalles sobre lo ocurrido",
      date: {
        legend: "¿Cuándo ocurrió?",
        unknown: "No estoy seguro/a",
      },
      description: {
        label: "¿Desea contarnos algo más?",
        optional: "opcional",
      },
    },
    step3: {
      title: "¿Cómo podemos contactarle?",
      firstName: "Nombre",
      lastName: "Apellido",
      phone: { label: "Número de teléfono" },
      email: "Correo electrónico",
      zip: { label: "Código postal de su domicilio" },
      address: {
        street: "Dirección",
        placeholder: "123 Main St",
        manual: "Ingresar la dirección manualmente",
        city: "Ciudad",
        state: "Estado",
      },
      noticeBefore: "Al enviar esta consulta, usted acepta nuestra ",
      noticeLink: "Política de privacidad",
      noticeAfter:
        " y reconoce que Injury Payout, operado por Above All Enterprises, LLC, recopilará su información y podrá compartirla directamente con Whyte Law, PLLC para que el bufete pueda considerar su consulta de forma independiente. Injury Payout no es un bufete de abogados y enviar esta consulta no establece una relación abogado-cliente.",
    },
    actions: {
      continue: "Continuar",
      back: "Atrás",
      submitLive: "Enviar mi consulta",
      submitting: "Enviando su solicitud…",
      startOver: "Empezar de nuevo",
    },
    heroDone: "Su consulta fue enviada.",
    liveDone: {
      pageTitle: "Gracias",
      title: "Gracias. Hemos recibido su solicitud.",
      body:
        "Nuestro equipo de Injury Payout recopilará su información y se encargará de que su consulta se comparta con Whyte Law, PLLC. Whyte Law podrá comunicarse con usted posteriormente para hablar sobre sus circunstancias y determinar si puede ayudarle.",
    },
    failure: "No pudimos enviar su solicitud. Inténtelo de nuevo. Sus respuestas siguen aquí.",
    errors: {
      "category.required": "Elija la opción que más se acerque.",
      "zip.required": "Ingrese un código postal válido de 5 dígitos.",
      "zip.invalid": "Ingrese un código postal válido de 5 dígitos.",
      "month.required": "Elija una fecha aproximada o seleccione “No estoy seguro/a”.",
      "year.required": "Elija una fecha aproximada o seleccione “No estoy seguro/a”.",
      "date.future": "Elija una fecha aproximada o seleccione “No estoy seguro/a”.",
      "description.tooLong": "¿Desea contarnos algo más? (opcional)",
      "firstName.required": "Ingrese su nombre.",
      "lastName.required": "Ingrese su apellido.",
      "phone.required": "Ingrese un número de teléfono válido.",
      "phone.invalid": "Ingrese un número de teléfono válido.",
      "email.required": "Ingrese un correo electrónico válido.",
      "email.invalid": "Ingrese un correo electrónico válido.",
      "consent.required": "Marque la casilla para continuar.",
    },
  },
  categories: {
    car: {
      label: "Accidente de auto",
      blurb: "Choques de autos, SUV, vehículos de transporte por aplicación o conductores que se dieron a la fuga.",
    },
    truck: {
      label: "Accidente de camión",
      blurb: "Choques con camiones de carga, furgonetas de reparto u otros vehículos comerciales.",
    },
    work: { label: "Lesión en el trabajo", blurb: "Lesiones en el lugar de trabajo o mientras realizaba sus tareas laborales." },
    fall: {
      label: "Resbalón, tropiezo o caída",
      blurb: "Caídas relacionadas con superficies inseguras, escalones rotos u otros peligros en una propiedad.",
    },
    dog: { label: "Mordedura de perro", blurb: "Mordeduras o ataques del perro de otra persona." },
    medical: { label: "Error médico", blurb: "Daños relacionados con un error médico o atención negligente." },
    other: { label: "Otra lesión", blurb: "¿Se lesionó de otra manera? Cuéntenos qué ocurrió." },
  },
  results: {
    title: "¿Qué podría significar una compensación para usted?",
    lede:
      "Ayuda con las facturas médicas. Una forma de compensar los ingresos perdidos. Un poco de tranquilidad mientras se recupera. Vea por cuánto se resolvieron tres casos reales de lesiones.",
    referral: "Resultados anteriores de nuestro bufete de abogados participante, Whyte Law, PLLC.",
    outcome: "Acuerdo",
    qualifier: "Los resultados anteriores no garantizan un resultado similar.",
  },
  experiences: {
    title: "En sus propias palabras.",
  },
  team: {
    title: "Conozca al abogado de nuestro bufete participante",
    firmIntro:
      "{firm} es nuestro bufete de abogados participante, que puede recibir y revisar de forma independiente las consultas enviadas a través de Injury Payout. Si su consulta se transmite a Whyte Law, un miembro del equipo del bufete podrá comunicarse con usted para hablar sobre sus circunstancias y determinar si el bufete puede ayudarle.",
    practical: "La ayuda legal puede incluir revisar lo ocurrido, documentar sus pérdidas y buscar una compensación.",
    contact:
      "Puede comunicarse directamente con Whyte Law, PLLC en 20987 N John Wayne Pkwy, Unit B104-108, Maricopa, Arizona 85139 o por correo electrónico a inquiries@whyte-law.com",
  },
  how: {
    title: "Cómo funciona su consulta",
    intro:
      "No necesita saber si tiene un caso para dar el primer paso. Quizá todavía esté recibiendo tratamiento o esperando noticias de una aseguradora. Empiece por contarnos qué ocurrió.",
    steps: [
      "Envíe su consulta a Injury Payout.",
      "Compartiremos su consulta con Whyte Law.",
      "Whyte Law considerará su consulta de forma independiente y podrá comunicarse con usted para hablar sobre una posible representación.",
    ],
  },
  types: {
    title: "¿Qué le ocurrió?",
    lede: "Elija la opción que más se acerque para iniciar su consulta gratuita.",
    cta: "Iniciar consulta",
  },
  compensation: {
    title: "Una lesión puede costarle más que las facturas médicas.",
    lede:
      "Ingresos perdidos. Tratamiento continuo. Dolor que afecta su vida diaria. Una reclamación puede buscar compensación por más que las facturas que tiene hoy.",
    items: [
      {
        title: "Facturas médicas y atención futura",
        body: "El tratamiento que ya ha necesitado y la atención continua que su lesión podría requerir.",
      },
      {
        title: "Ingresos perdidos",
        body: "Los ingresos que ha dejado de recibir y el impacto en su capacidad de trabajar en el futuro.",
      },
      {
        title: "Dolor y sufrimiento",
        body: "El dolor físico y el impacto emocional de vivir con su lesión.",
      },
      {
        title: "Otros gastos y pérdidas",
        body: "Costos como daños materiales, traslados a citas y ayuda en el hogar.",
      },
    ],
    qualifier: "La compensación que podría obtener depende de sus circunstancias y de la ley aplicable.",
  },
  faq: {
    title: "Respuestas claras antes de empezar.",
    items: [
      {
        q: "¿Cuánto cuesta?",
        a: "Enviar una consulta es gratis y no tiene obligación de contratar a un abogado. Antes de aceptar la representación legal, se le explicarán los honorarios del abogado y los gastos del caso para que pueda decidir si desea continuar.",
      },
      {
        q: "¿Qué pasa después de enviar su consulta?",
        a: "Nuestro equipo de Injury Payout recopilará su información y se encargará de que su consulta se comparta con Whyte Law, PLLC.\n\nWhyte Law podrá comunicarse con usted posteriormente para hablar sobre sus circunstancias y determinar si puede ayudarle.\n\nEnviar su información no significa que Whyte Law haya aceptado su caso ni que usted haya establecido una relación abogado-cliente.",
      },
      {
        q: "¿Cuánto podría valer mi caso?",
        a: "No hay una cantidad que se aplique a todas las lesiones. La gravedad de sus lesiones, los costos del tratamiento, los ingresos perdidos y el impacto en su vida diaria pueden ser importantes. La responsabilidad por la lesión, las pruebas disponibles, la cobertura de seguro y la ley aplicable también influyen en la compensación que podría obtener. Un abogado puede revisar esos detalles con usted; este sitio web no proporciona una estimación en dólares.",
      },
      {
        q: "¿Hay un plazo para presentar una reclamación?",
        a: "Sí. Los plazos dependen del estado, del tipo de caso y de las circunstancias; algunos pueden ser mucho más cortos que otros. Un abogado puede ayudarle a identificar los plazos aplicables. Enviar este formulario no presenta una reclamación ni una demanda, y tampoco detiene ningún plazo legal.",
      },
      {
        q: "¿Cuánto tiempo podría tardar mi caso?",
        a: "El tiempo depende de su tratamiento y recuperación, de las pruebas, de las negociaciones y de si es necesario presentar una demanda. Algunos casos se resuelven antes que otros y no hay un plazo garantizado. Un abogado puede explicarle qué factores podrían influir en la duración de su caso.",
      },
      {
        q: "¿Qué pasa si ya tengo una oferta de acuerdo?",
        a: "Puede enviar una consulta gratuita y contarnos sobre la oferta. Informe a nuestro equipo si ya la aceptó o firmó algún documento. Firmar un documento de liberación de responsabilidad puede limitar su posibilidad de solicitar más compensación, por lo que es importante entender sus términos antes de decidir. Un abogado puede revisar su situación y explicarle sus opciones.",
      },
      {
        q: "¿Puedo completar la consulta en español?",
        a: "Sí. Seleccione Español en la parte superior de la página para leer el sitio y completar su consulta en español. Su preferencia de idioma se incluirá con su solicitud.",
      },
      {
        q: "¿Qué pasa si ya tengo un abogado?",
        a: "Informe a nuestro equipo si un abogado ya le representa en este asunto. La posibilidad de revisar su consulta dependerá de sus circunstancias y de las políticas del despacho. No necesita terminar su representación actual para enviar una consulta.",
      },
    ],
  },
  finalCta: {
    title: "Descubra si podría recibir una compensación.",
    body: "Responda unas preguntas rápidas para iniciar su consulta gratuita. Sin compromiso.",
  },
  footer: {
    tagline: "Consultas gratuitas para personas lesionadas en accidentes.",
    links: {
      privacy: "Política de privacidad",
      terms: "Términos de uso",
      disclaimer: "Publicidad de abogados y avisos legales",
    },
    connect: "Podemos ponerle en contacto con asistencia legal sobre su accidente.",
    participatingFirm: "Nuestro bufete de abogados participante: {firm}",
    operator:
      "Injury Payout, nombre comercial de Above All Enterprises, LLC, una empresa independiente de marketing y generación de clientes potenciales. No somos un bufete de abogados y no brindamos asesoría legal. Al enviar su información, usted acepta que su solicitud se envíe directamente a Whyte Law, PLLC.",
    marketingEntity: "Entidad de marketing: Above All Enterprises, LLC, 1712 Pioneer Ave. Ste. 7000, Cheyenne, WY 82001",
    lawFirm: "Bufete de abogados participante: Whyte Law, PLLC, 20987 N John Wayne Pkwy, Unit B104-108, Maricopa, Arizona 85139",
    legal:
      "Publicidad de abogados. Este sitio web ofrece información general, no asesoramiento legal. Enviar un formulario o llamar no crea una relación abogado-cliente. Los resultados anteriores no garantizan un resultado similar; cada caso depende de sus propias circunstancias.",
    copyright: "© {year} Injury Payout. Todos los derechos reservados.",
  },
  mobileBar: { review: "Consulta gratuita", call: "Llamar" },
  legalPages: {
    privacy: { title: "Política de privacidad" },
    terms: { title: "Términos de uso" },
    disclaimer: { title: "Publicidad de abogados y avisos legales" },
  },
  notFound: {
    title: "No encontramos esa página.",
    body: "Es posible que el enlace sea antiguo. Puede volver al inicio o iniciar una consulta gratuita.",
    home: "Volver al inicio",
  },
};

export default es;
