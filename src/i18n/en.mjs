export default {
  code: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  label: 'English',
  short: 'EN',
  path: '/en/',

  meta: {
    title: 'DuaTech — Software engineering studio',
    description:
      'Custom business systems, online stores, apps and automation. DuaTech designs and builds software that solves real problems for your business.',
  },

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    language: 'Language',
    primaryNav: 'Main navigation',
    external: 'opens in a new tab',
    backToTop: 'Back to top',
  },

  nav: {
    solutions: 'Solutions',
    services: 'Services',
    engineering: 'Engineering',
    process: 'Process',
    about: 'About',
    faq: 'FAQ',
    cta: 'Start a project',
  },

  hero: {
    eyebrow: 'Software engineering studio',
    title: 'We design and build software',
    titleMuted: 'that solves real problems.',
    lead:
      'Business systems, online stores, apps and automation, custom-built for companies that want to sell more, run with less effort and decide with data.',
    primary: 'Start a project',
    secondary: 'See solutions',
    meta: {
      availability: 'Schedule',
      open: 'Open for new projects',
      closed: 'Waitlist',
      base: 'Based in',
      baseValue: 'Brazil, working remotely worldwide',
      clock: 'Local time',
      clockSuffix: 'Brasília',
      languages: 'Languages',
    },
  },

  solutions: {
    eyebrow: 'Solutions',
    title: 'Software that fits the way your business works.',
    lead:
      'Every business has a different bottleneck. We start with yours, not with an off-the-shelf package. A few examples of what we build:',
    tabsLabel: 'Industries',
    beforeLabel: 'Today',
    afterLabel: 'With the system',
    modulesLabel: 'What the system does',
    integrationsLabel: 'Connects with',
    cta: 'Talk about this project',
    other: "Don't see your industry? The same building blocks work for any operation.",
    otherCta: 'Tell us about your case',
    items: {
      ecommerce: {
        tab: 'Retail and e-commerce',
        title: 'Sell online without manual work behind the scenes.',
        lead:
          'For retailers who want to sell online, or who already do and are drowning in operations. We build the store and, above all, everything that happens after “buy”: payment, invoicing, shipping labels and tracking, all connected.',
        compare: [
          ['Every order means issuing an invoice, printing a label and copying the tracking code by hand.', 'Once an order is paid, the invoice and the shipping label are ready automatically, in seconds.'],
          ['Stock in the physical store, the website and the marketplace never matches.', 'One single inventory, updated across every sales channel.'],
          ['On sale days, operations grind to a halt and orders get lost.', 'Built for peaks like Black Friday, without losing or duplicating orders.'],
        ],
        modules: ['Fast mobile storefront', 'Cards, wallets and local payments', 'Automatic invoicing', 'Batch labels and shipping', 'Customer tracking', 'Sales dashboard'],
        integrations: ['Payment gateways', 'Invoicing providers', 'Carriers', 'Postal services', 'Marketplaces', 'ERPs'],
        message: 'Hi! I run a store and would like to talk about an e-commerce project.',
      },
      restaurants: {
        tab: 'Restaurants',
        title: 'From the dining room to the kitchen and the till, in one system.',
        lead:
          'For restaurants, bars, cafés and dark kitchens that want to stop relying on paper, memory and spreadsheets. Orders are taken once, the kitchen knows instantly and the day’s numbers are always at hand.',
        compare: [
          ['Paper tickets get lost and orders come out wrong.', 'Orders taken on the waiter’s phone appear instantly on the kitchen screen.'],
          ['Delivery, WhatsApp and counter orders live in different places.', 'Every order in a single queue, in the order it arrived.'],
          ['Ingredients run out mid-service and the till never balances.', 'Stock updated with every dish sold and the till reconciled automatically.'],
        ],
        modules: ['Tables and tickets', 'Kitchen display with timers', 'QR code menu', 'Unified delivery and counter', 'Stock and cost per dish', 'Till and reports'],
        integrations: ['Delivery apps', 'WhatsApp', 'Card terminals', 'Thermal printers', 'Tax receipts'],
        message: 'Hi! I run a restaurant and would like to talk about a management system.',
      },
      rental: {
        tab: 'Car rental',
        title: 'Fleet, bookings and contracts under control.',
        lead:
          'For rental companies that have outgrown the spreadsheet. Know instantly which car is available, how much each vehicle earns and what is about to expire, without calling anyone.',
        compare: [
          ['Fleet availability tracked on a spreadsheet or a whiteboard.', 'A real-time fleet calendar, with no double bookings.'],
          ['Printed contracts, filled in by hand and filed away.', 'Contracts generated from customer data and signed digitally.'],
          ['Damage found later, with no proof of when it happened.', 'Pick-up and return inspections with photos, date and mileage.'],
        ],
        modules: ['Fleet records and status', 'Bookings and calendar', 'Digital contracts', 'Photo inspections', 'Maintenance and renewals', 'Revenue per vehicle'],
        integrations: ['GPS trackers', 'E-signature', 'Card pre-authorization', 'Online booking', 'WhatsApp'],
        message: 'Hi! I run a car rental company and would like to talk about a management system.',
      },
      appointments: {
        tab: 'Clinics and services',
        title: 'A full calendar, no no-shows, no back-and-forth messages.',
        lead:
          'For clinics, practices, salons, studios and workshops: any business that runs on appointments. Clients book themselves, get a reminder and show up. You know exactly what came in this month.',
        compare: [
          ['Hours every day answering messages just to schedule appointments.', 'Clients see open slots and book on their own, 24/7.'],
          ['Unannounced no-shows leave gaps in the schedule.', 'Automatic reminders with confirmation and a waitlist.'],
          ['Commissions and payouts calculated by hand at the end of the month.', 'Commissions, packages and payouts calculated automatically.'],
        ],
        modules: ['Online booking', 'Reminders and confirmations', 'Client records and history', 'Deposits and packages', 'Staff and commissions', 'Occupancy and revenue'],
        integrations: ['WhatsApp', 'Google Calendar', 'Card payments', 'Service invoices', 'Email'],
        message: 'Hi! I run an appointment-based business and would like to talk about a system.',
      },
      logistics: {
        tab: 'Logistics and delivery',
        title: 'Every delivery visible, from the warehouse to the customer.',
        lead:
          'For distributors, wholesalers, manufacturers and stores with their own delivery. Know where every order is, why something is late and what each delivery costs, without spreadsheets or calling the driver.',
        compare: [
          ['Nobody knows where an order is without calling the driver.', 'A map with every delivery’s position and every order’s status.'],
          ['Problems only surface when the customer complains.', 'Stalled or failed orders land in an attention queue.'],
          ['Paper proof of delivery, lost or illegible.', 'Digital proof with photo, signature, time and location.'],
        ],
        modules: ['Dispatch dashboard', 'Routes by region', 'Driver app', 'Customer tracking', 'Labels and carriers', 'On-time rate and cost per delivery'],
        integrations: ['Carriers', 'Postal services', 'ERPs', 'Invoicing providers', 'Maps', 'WhatsApp'],
        message: 'Hi! I would like to talk about a logistics and delivery system.',
      },
      automation: {
        tab: 'Automation and AI',
        title: 'Fewer spreadsheets, less rework, more time.',
        lead:
          'For companies where skilled people spend the day copying data from one system to another. We connect the tools you already use, automate the repetitive work and apply AI where it pays off.',
        compare: [
          ['Data copied by hand between the ERP, spreadsheets and email.', 'Systems talking to each other, with no duplicate typing.'],
          ['The Monday report takes the whole morning.', 'Reports and dashboards that update themselves, ready when you arrive.'],
          ['Orders, invoices and documents read and typed in manually.', 'AI extracts the data from documents and a person just reviews it.'],
        ],
        modules: ['System integrations', 'Automated routines', 'AI document reading', 'AI-assisted support', 'Automatic reports', 'Alerts when something fails'],
        integrations: ['ERPs', 'CRMs', 'Spreadsheets', 'Google Workspace', 'Microsoft 365', 'WhatsApp', 'AI models'],
        message: 'Hi! I would like to talk about automating processes in my company.',
      },
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'What we build.',
    lead: 'From a brand-new system to the one that needs to talk to all the others. A single studio takes care of everything, from interface to infrastructure.',
    items: [
      { title: 'Custom business systems', text: 'Admin panels and internal systems that follow your process, not the other way around.', tags: 'ERP · Back office · Control' },
      { title: 'Online stores and e-commerce', text: 'Fast stores connected to payments, invoicing, shipping and marketplaces.', tags: 'Checkout · Payments · Invoicing' },
      { title: 'Web and mobile apps', text: 'Installable apps that work well even on unstable connections.', tags: 'PWA · Offline · Notifications' },
      { title: 'System integrations', text: 'Your ERP, store, finance tools and partners exchanging data on their own, securely.', tags: 'APIs · Webhooks · ERPs' },
      { title: 'Process automation', text: 'Repetitive tasks turned into automated routines, with a record of everything that was done.', tags: 'Routines · Queues · Alerts' },
      { title: 'Dashboards and real-time data', text: 'Live metrics, maps and alerts, so decisions are based on numbers, not hunches.', tags: 'Dashboards · Maps · BI' },
      { title: 'AI applied to business', text: 'Document reading, assisted support and classification, always with human oversight.', tags: 'LLMs · Extraction · Assistants' },
      { title: 'Evolving existing systems', text: 'Already have a system? We take it over, stabilize it, document it and keep it moving.', tags: 'Maintenance · Migration · Refactoring' },
    ],
  },

  engineering: {
    eyebrow: 'Engineering',
    title: 'You don’t see the engineering. You see the results every day.',
    lead:
      'A good-looking system that crashes on a Friday night is a loss. That’s why we take care of what you don’t see on screen: reliable data, integrations that recover on their own and an operation that handles the peak.',
    proofTitle: 'Capabilities already put into practice',
    proof: [
      { tag: 'Invoicing and logistics', text: 'A flow that takes a paid order to an authorized invoice and a ready-to-ship label in seconds, with no typing.' },
      { tag: 'Scale', text: 'Operations sized for Black Friday peaks, with scenario simulations before they happen.' },
      { tag: 'Real-time data', text: 'A mapping platform that combines six external data sources and stays up when one of them goes down.' },
      { tag: 'Mobile', text: 'Installable apps that work offline and send notifications, no app store required.' },
    ],
    guarantees: [
      { title: 'Nothing gets lost or duplicated', text: 'Every step is recorded. A double click or a dropped connection never creates two orders or two invoices.', tech: 'Idempotency · Transactions · Queues' },
      { title: 'If a partner goes down, you keep going', text: 'If the invoicing provider, carrier or bank is offline, the system waits and retries on its own.', tech: 'Retries · Fault isolation' },
      { title: 'Works with what you already use', text: 'Switching carrier, gateway or provider doesn’t mean rebuilding the system: only the piece that talks to it changes.', tech: 'Adapters · APIs · Webhooks' },
      { title: 'Fast on any device', text: 'Lightweight screens that load quickly on a customer’s phone and on the office’s old computer.', tech: 'Performance · PWA · Caching' },
      { title: 'Secure and privacy-compliant', text: 'Role-based access, protected data and a record of who did what. Compliant with LGPD and GDPR principles.', tech: 'Encryption · Audit trail · LGPD' },
      { title: 'Ready to grow', text: 'The foundation handles more volume without rewriting the system as the company grows.', tech: 'Architecture · Observability' },
    ],
    stackTitle: 'Technologies we work with',
    stack: [
      { layer: 'Interface', items: ['TypeScript', 'React', 'Next.js', 'Vite', 'PWA'] },
      { layer: 'Back end', items: ['Node.js', 'NestJS', 'Express', 'Fastify', 'Python', 'FastAPI'] },
      { layer: 'Data', items: ['PostgreSQL', 'PostGIS', 'Redis', 'RabbitMQ', 'WebSockets'] },
      { layer: 'Cloud', items: ['Docker', 'Azure', 'Vercel', 'Render', 'Neon'] },
      { layer: 'Quality', items: ['Automated tests', 'End-to-end tests', 'CI', 'ADRs'] },
    ],
  },

  process: {
    eyebrow: 'Process',
    title: 'From the first coffee to a running system.',
    lead: 'A clear process, with deliveries you can see working at every step. No months of silence and no surprises at the end.',
    outLabel: 'You get',
    steps: [
      { title: 'Conversation', text: 'We learn about the business, the problem and what success means to you. No strings attached.', out: 'A clear view of what is worth building' },
      { title: 'Assessment and proposal', text: 'We map the process, define the scope of the first version and present timeline and investment.', out: 'A proposal with fixed scope, timeline and price' },
      { title: 'Building in stages', text: 'Short deliveries that you test and approve. What matters most ships first.', out: 'Parts of the system working early on' },
      { title: 'Launch', text: 'We go live, migrate the data, train the team and follow the first days of real use.', out: 'System in production and a trained team' },
      { title: 'Evolution', text: 'Support, improvements and new features as the business grows.', out: 'A long-term technical partner' },
    ],
  },

  principles: {
    eyebrow: 'Principles',
    title: 'What guides every technical decision.',
    items: [
      { tag: 'Performance', title: 'Speed is a feature.', text: 'Slow screens cost sales and patience. We measure and optimize what users actually feel.' },
      { tag: 'Simplicity', title: 'The simplest thing that works.', text: 'Nothing built “for the future”. Fewer moving parts mean lower cost and fewer defects.' },
      { tag: 'Security', title: 'Protection from line one.', text: 'Least-privilege access, secrets kept out of the code and validation on every input.' },
      { tag: 'Experience', title: 'Made for the people who use it.', text: 'Clear language and screens your team learns without a manual.' },
      { tag: 'Observability', title: 'If you can’t see it, you can’t run it.', text: 'Logs, metrics and alerts from day one, so we act before customers notice.' },
      { tag: 'Maintainability', title: 'Code that lasts.', text: 'Readable code, documented decisions and tests where they matter. The system is never held hostage.' },
    ],
  },

  about: {
    eyebrow: 'About',
    title: 'A small studio, by choice.',
    paragraphs: [
      'DuaTech is an independent software engineering studio founded and led by Henrique Xaud. Every project has one engineer accountable from start to finish, with no layers of middlemen and no context lost along the way.',
      'When a project calls for it, we put together a tailored team of trusted developers and specialists in design, mobile, data and infrastructure, coordinated by the same technical lead. You always talk to the people who build.',
    ],
    founderRole: 'Founder and lead engineer',
    founderBio: 'Full-stack software engineer. Designs and builds systems end to end, from data modeling to the interface and production operations.',
    facts: [
      { label: 'Since', value: '2021' },
      { label: 'Model', value: 'Independent studio with a specialist network' },
      { label: 'Clients', value: 'Remote, across Brazil and abroad' },
    ],
  },

  engagement: {
    eyebrow: 'Engagement',
    title: 'How we can work together.',
    models: [
      { title: 'Custom project', text: 'To get a system off the ground. Scope, timeline and investment agreed before we start.', fit: 'New systems, stores and apps' },
      { title: 'Ongoing evolution', text: 'A monthly block of hours to improve, maintain and expand what you already have, with priorities set together.', fit: 'Companies with a system in use' },
      { title: 'Technical consulting', text: 'Assessments, architecture reviews, technology choices or overseeing another vendor.', fit: 'Decisions before investing' },
    ],
    fitLabel: 'Best for',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Before we talk.',
    items: [
      { q: 'How much does a custom system cost?', a: 'It depends on the scope, which is why we don’t have a price list. After a conversation and an assessment, you receive a proposal with fixed scope, timeline and investment. We often recommend starting with a lean first version that solves the main problem before the next stages.' },
      { q: 'How long does it take?', a: 'A useful first version usually takes from a few weeks to a few months, depending on complexity. We deliver in stages, so you start using parts of the system before the whole project is finished.' },
      { q: 'Do my company’s system and data stay with us?', a: 'Yes. The code, the data and the access belong to your company. There are no per-user fees and no vendor lock-in, and hosting costs are transparent and in the company’s name.' },
      { q: 'Do you provide support after delivery?', a: 'Yes, through support and ongoing evolution plans. If you prefer, we document everything and hand the system over to your team or to another vendor.' },
      { q: 'Do I need to understand technology?', a: 'No. You know your business and we handle the technical side. We explain decisions in plain language, and you follow the progress in the system itself.' },
      { q: 'I already use spreadsheets or an off-the-shelf system. Can we build on that?', a: 'In most cases, yes. We can integrate with what already exists, migrate the data or evolve an old system instead of starting from scratch.' },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Shall we talk about your project?',
    lead: 'Tell us what happens in your company today and where you want to go. The first conversation is free of commitment, and you leave it with a clear view of the path.',
    whatsapp: 'Chat on WhatsApp',
    whatsappMessage: 'Hi! I found DuaTech’s website and would like to talk about a project.',
    linkedin: 'LinkedIn',
    email: 'Email',
    checklistTitle: 'For the first conversation, it helps to know:',
    checklist: [
      'Which problem you want to solve, and who feels it today.',
      'How it is done right now: spreadsheets, paper or other systems.',
      'Whether there is a deadline or an important date ahead.',
    ],
  },

  footer: {
    tagline: 'Software engineering studio. We design and build software that solves real problems.',
    studio: 'Studio',
    solutions: 'Solutions',
    contact: 'Contact',
    rights: 'All rights reserved.',
    built: 'Static HTML, no trackers.',
  },

  visuals: {
    ecommerce: { order: 'Order #4821', paid: 'Payment approved', invoice: 'Invoice issued', label: 'Label created', transit: 'In transit', waiting: 'pending', sales: 'Sales today', amount: '$ 12,480' },
    restaurants: { title: 'Kitchen', count: '14 orders', cols: ['New', 'Cooking', 'Ready'], table: 'Table', delivery: 'Delivery', counter: 'Counter', items: ['2× Risotto', '1× Salad', '3× Burger', '1× Fries', '2× Juice', '1× Daily special'] },
    rental: { title: 'Fleet', week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], rented: 'Rented', reserved: 'Booked', maintenance: 'Service' },
    appointments: { title: 'Schedule', week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], blocks: ['Visit · Ana', 'Haircut · John', 'Check-up · Bea', 'Follow-up · Cai', 'Color · Lia', 'Service · Leo', 'Visit · Ray'], toast: 'Reminder sent', confirmed: 'Confirmed' },
    logistics: { title: 'Deliveries', delivered: 'Delivered', route: 'On route', issue: 'Attention', vehicle: 'Vehicle 03' },
    automation: { title: 'Automations', when: 'today · 07:00', nodes: ['Order in the ERP', 'AI document reading', 'Invoice issued', 'Report sent'], log: ['312 records synced', 'daily report sent', '1 document to review'] },
  },
};
