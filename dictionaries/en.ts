/** English copy — Final developer brief, 08 Nov 2026. */
const en = {
  meta: {
    // Page title = launch headline; description = hero support copy (brief p.04).
    title: "Injured? Find out if you could get a payout.",
    description:
      "Answer a few quick questions about your injury. Our Injury Payout team will collect your information and arrange for your inquiry to be shared with Whyte Law, PLLC.",
  },
  common: {
    skip: "Skip to main content",
    call: "Call {phone}",
    callPrompt: "Prefer to talk?",
    startReview: "Start my free inquiry",
    freeReview: "Free inquiry",
    responsibleFirm: "Responsible firm: {firm}",
    langName: "Español",
  },
  nav: {
    label: "Main",
    how: "How it works",
    types: "Injury types",
    results: "Results",
    faq: "FAQs",
  },
  hero: {
    titleBefore: "Injured? Find out if you could get a ",
    titleHighlight: "payout",
    titleAfter: ".",
    lede:
      "Answer a few quick questions about your injury. Our Injury Payout team will collect your information and arrange for your inquiry to be shared with Whyte Law, PLLC.",
    reassurance: "Free inquiry · No obligation",
    proofBefore: "",
    proofAmount: "$1.8M",
    proofAfter: " motor vehicle settlement.",
    // Secondary review (Josh, 11 Nov 2026), item 1: the firm line sits underneath the settlement.
    proofQualifier: "Past results from our participating law firm Whyte Law. Past results do not guarantee a similar outcome.",
    // Review of Injury Payout Website (Josh, 11 Nov 2026), item 7.
    disclosure:
      "Injury Payout is an independent marketing and lead-generation business. We are not a law firm. Inquiries submitted through this website may be shared with our participating law firm, Whyte Law, PLLC, for consideration.",
  },
  evaluator: {
    cardTitle: "Free personal injury inquiry",
    stepOf: "Step {n} of 3",
    step1: {
      legend: "What caused your injury?",
      hint: "Choose the closest match.",
    },
    step2: {
      title: "A few details about what happened",
      date: {
        legend: "When did it happen?",
        unknown: "I’m not sure",
      },
      description: {
        label: "Anything else you’d like us to know?",
        optional: "optional",
      },
    },
    step3: {
      title: "How can we reach you?",
      firstName: "First name",
      lastName: "Last name",
      phone: { label: "Phone number" },
      email: "Email address",
      // Josh, 11 Nov 2026: the ZIP is the client's home ZIP code.
      zip: { label: "Home ZIP code" },
      address: {
        street: "Street address",
        placeholder: "123 Main St",
        manual: "Enter address manually instead",
        city: "City",
        state: "State",
      },
      // Review item 10 ("enquiry" → US "inquiry"; "the Injury Payout" → "that Injury Payout").
      noticeBefore: "By submitting this inquiry, you agree to our ",
      noticeLink: "Privacy Policy",
      noticeAfter:
        " and acknowledge that Injury Payout, operated by Above All Enterprises, LLC, will collect your information and may share it directly with Whyte Law, PLLC so that the law firm can independently consider your inquiry. Injury Payout is not a law firm and submitting this inquiry does not establish an attorney-client relationship.",
    },
    actions: {
      continue: "Continue",
      back: "Back",
      submitLive: "Send my inquiry",
      submitting: "Sending your request…",
      startOver: "Start over",
    },
    heroDone: "Your inquiry has been sent.",
    liveDone: {
      pageTitle: "Thank you",
      title: "Thanks. We’ve received your request.",
      body:
        "Our Injury Payout team will collect your information and arrange for your inquiry to be shared with Whyte Law, PLLC. Whyte Law may subsequently contact you to discuss your circumstances and determine whether it can assist you.",
    },
    failure: "We couldn’t send your request. Please try again. Your answers are still here.",
    errors: {
      "category.required": "Please choose the closest match.",
      "zip.required": "Enter a valid 5-digit ZIP code.",
      "zip.invalid": "Enter a valid 5-digit ZIP code.",
      "month.required": "Choose an approximate date or select “I’m not sure.”",
      "year.required": "Choose an approximate date or select “I’m not sure.”",
      // Not reachable from the form (future months can't be chosen; the box has a max length). Server fallback only.
      "date.future": "Choose an approximate date or select “I’m not sure.”",
      "description.tooLong": "Anything else you’d like us to know? (optional)",
      "firstName.required": "Enter your first name.",
      "lastName.required": "Enter your last name.",
      "phone.required": "Enter a valid phone number.",
      "phone.invalid": "Enter a valid phone number.",
      "email.required": "Enter a valid email address.",
      "email.invalid": "Enter a valid email address.",
      // Not reachable from the form (submit is disabled until the box is checked). Server fallback only.
      "consent.required": "Please check the box to continue.",
    },
  },
  categories: {
    car: { label: "Car accident", blurb: "Crashes involving cars, SUVs, rideshares or hit-and-run drivers." },
    truck: { label: "Truck accident", blurb: "Collisions involving semis, delivery vans or other commercial vehicles." },
    work: { label: "Injured at work", blurb: "Injuries on a job site or while you were working." },
    fall: { label: "Slip, trip or fall", blurb: "Falls involving unsafe surfaces, broken steps or other property hazards." },
    dog: { label: "Dog bite", blurb: "Bites or attacks by someone else’s dog." },
    medical: { label: "Medical mistake", blurb: "Harm involving a medical error or negligent care." },
    other: { label: "Something else", blurb: "Hurt another way? Tell us what happened." },
  },
  results: {
    title: "What could a settlement mean for you?",
    lede:
      "Help with medical bills. A way to make up for missed pay. More breathing room while you recover. See what three real injury cases settled for.",
    // Review item 5.
    referral: "Past Results of our Participating Law Firm, Whyte Law, PLLC.",
    outcome: "Settlement",
    qualifier: "Past results do not guarantee a similar outcome.",
  },
  experiences: {
    title: "In their own words.",
  },
  team: {
    // Review item 6.
    title: "Meet the Attorney at Our Participating Law Firm",
    firmIntro:
      "{firm} is our participating law firm that may receive and independently review inquiries submitted through Injury Payout. If your inquiry is passed to Whyte Law, a member of the firm’s team may contact you to discuss your circumstances and determine whether the firm can assist.",
    practical: "Legal help can include reviewing what happened, documenting your losses and pursuing compensation.",
    // Josh, Developer Notes – Compliance Updates (10 Nov 2026), Action 1.2.
    contact:
      "Whyte Law, PLLC can be contacted directly at 20987 N John Wayne Pkwy, Unit B104-108, Maricopa, Arizona 85139 or by email at inquiries@whyte-law.com",
  },
  how: {
    title: "How your inquiry works",
    intro:
      "You don’t need to know if you have a case to get started. You may still be getting treatment or waiting to hear from an insurance company. Start by telling us what happened.",
    // Review item 9.
    steps: [
      "Submit your inquiry to Injury Payout.",
      "We will share your inquiry with Whyte Law.",
      "Whyte Law will independently consider your inquiry and may contact you to discuss potential representation.",
    ],
  },
  types: {
    title: "What happened to you?",
    lede: "Choose the closest match to start your free inquiry.",
    cta: "Start inquiry",
  },
  compensation: {
    title: "An injury can cost more than medical bills.",
    lede:
      "Missed paychecks. Ongoing treatment. Pain that affects everyday life. A claim may seek compensation for more than the bills in front of you.",
    items: [
      {
        title: "Medical bills and future care",
        body: "Treatment you’ve already needed, plus ongoing care your injury may require.",
      },
      {
        title: "Lost income",
        body: "Paychecks you’ve missed and the impact on your ability to earn in the future.",
      },
      {
        title: "Pain and suffering",
        body: "The physical pain and emotional impact of living with your injury.",
      },
      {
        title: "Other expenses and losses",
        body: "Costs such as damaged property, travel to appointments, and help at home.",
      },
    ],
    qualifier: "What you may recover depends on your circumstances and applicable law.",
  },
  faq: {
    title: "Straight answers before you start.",
    items: [
      {
        q: "How much does it cost?",
        a: "Submitting an inquiry is free, and there’s no obligation to hire an attorney. Before you agree to representation, the attorney fee arrangement and any case expenses will be explained so you can decide whether to move forward.",
      },
      {
        // Review item 2.
        q: "What happens after you submit your inquiry?",
        a: "Our Injury Payout team will collect your information and arrange for your inquiry to be shared with Whyte Law, PLLC.\n\nWhyte Law may subsequently contact you to discuss your circumstances and determine whether it can assist you.\n\nSubmitting your information does not mean that Whyte Law has accepted your case or that you have entered into an attorney-client relationship.",
      },
      {
        q: "How much could my case be worth?",
        a: "There’s no single amount that applies to every injury. The seriousness of your injuries, treatment costs, lost income and impact on daily life can all matter. Responsibility for the injury, the available evidence, insurance coverage and applicable law also affect what may be recoverable. An attorney can review those details with you; this website does not provide a dollar estimate.",
      },
      {
        q: "Is there a deadline to make a claim?",
        a: "Yes. Deadlines depend on the state, the type of case and the circumstances, and some can be much shorter than others. An attorney can help identify which deadlines apply. Submitting this form does not file a claim or lawsuit, or stop any deadline from running.",
      },
      {
        q: "How long could my case take?",
        a: "The timing depends on your treatment and recovery, the evidence, settlement discussions and whether a lawsuit is needed. Some cases resolve sooner than others, and there is no guaranteed timeline. An attorney can explain what may affect the timing in your situation.",
      },
      {
        q: "What if I already have a settlement offer?",
        a: "You can submit a free inquiry and tell us about the offer. Let our team know whether you have already accepted it or signed any documents. A signed release can limit your ability to seek further compensation, so it’s important to understand its terms before deciding. An attorney can review your situation and explain your options.",
      },
      {
        q: "Can I complete the inquiry in Spanish?",
        a: "Yes. Select Español at the top of the page to read the website and complete your inquiry in Spanish. Your language preference will be included with your request.",
      },
      {
        q: "What if I already have an attorney?",
        a: "Let our team know if an attorney is already representing you in this matter. Whether we can review your inquiry will depend on your circumstances and the firm’s policies. You do not need to end your current representation to send an inquiry.",
      },
    ],
  },
  finalCta: {
    title: "Find out if you could get a payout.",
    body: "Answer a few quick questions to start your free inquiry. There’s no obligation.",
  },
  footer: {
    tagline: "Free inquiries for people injured in accidents.",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      disclaimer: "Attorney Advertising & Disclosures",
    },
    // Josh, 10 Nov 2026 (independent lead-generation setup). "enquiry" → US "inquiry".
    connect: "We can connect you with legal assistance regarding your accident.",
    participatingFirm: "Our participating law firm: {firm}",
    operator:
      "Injury Payout, a trading style of Above All Enterprises, LLC, an independent marketing and lead-generation business. We are not a law firm and do not provide legal advice. By submitting your information, you agree to have your inquiry sent directly to Whyte Law, PLLC.",
    // Josh, Developer Notes – Compliance Updates (10 Nov 2026), Action 2.2.
    marketingEntity: "Marketing Entity: Above All Enterprises, LLC, 1712 Pioneer Ave. Ste. 7000, Cheyenne, WY 82001",
    lawFirm: "Participating Law Firm: Whyte Law, PLLC, 20987 N John Wayne Pkwy, Unit B104-108, Maricopa, Arizona 85139",
    // Working legal notice — firm approval required.
    legal:
      "Attorney advertising. This website provides general information, not legal advice. Submitting a form or calling doesn’t create an attorney-client relationship. Past results don’t guarantee a similar outcome; every case depends on its own facts.",
    copyright: "© {year} Injury Payout. All rights reserved.",
  },
  mobileBar: { review: "Free inquiry", call: "Call" },
  legalPages: {
    privacy: { title: "Privacy Policy" },
    terms: { title: "Terms of Use" },
    disclaimer: { title: "Attorney Advertising & Disclosures" },
  },
  notFound: {
    title: "We couldn't find that page.",
    body: "The link may be out of date. You can head back home or start a free inquiry.",
    home: "Back to home",
  },
};

export default en;
export type Dictionary = typeof en;
