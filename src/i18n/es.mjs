export default {
  code: 'es',
  htmlLang: 'es',
  ogLocale: 'es_ES',
  label: 'Español',
  short: 'ES',
  path: '/es/',

  meta: {
    title: 'DuaTech — Estudio de ingeniería de software',
    description:
      'Sistemas a medida, tiendas online, aplicaciones y automatizaciones para empresas. DuaTech diseña y construye software que resuelve problemas reales de tu negocio.',
  },

  ui: {
    skip: 'Saltar al contenido',
    menu: 'Menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    primaryNav: 'Navegación principal',
    external: 'se abre en una pestaña nueva',
    backToTop: 'Volver arriba',
  },

  nav: {
    solutions: 'Soluciones',
    services: 'Servicios',
    engineering: 'Ingeniería',
    process: 'Proceso',
    about: 'Nosotros',
    faq: 'FAQ',
    cta: 'Iniciar proyecto',
  },

  hero: {
    eyebrow: 'Estudio de ingeniería de software',
    title: 'Diseñamos y construimos software',
    titleMuted: 'que resuelve problemas reales.',
    lead:
      'Sistemas de gestión, tiendas online, aplicaciones y automatizaciones hechos a medida para empresas que quieren vender más, operar con menos esfuerzo y decidir con datos.',
    primary: 'Iniciar un proyecto',
    secondary: 'Ver soluciones',
    meta: {
      availability: 'Agenda',
      open: 'Abierta a nuevos proyectos',
      closed: 'Lista de espera',
      base: 'Base',
      baseValue: 'Brasil, en remoto para todo el mundo',
      clock: 'Hora local',
      clockSuffix: 'Brasilia',
      languages: 'Idiomas',
    },
  },

  solutions: {
    eyebrow: 'Soluciones',
    title: 'Software para la forma en que funciona tu empresa.',
    lead:
      'Cada negocio tiene un cuello de botella distinto. Empezamos por el tuyo, no por un paquete cerrado. Algunos ejemplos de lo que construimos:',
    tabsLabel: 'Sectores',
    beforeLabel: 'Hoy',
    afterLabel: 'Con el sistema',
    modulesLabel: 'Qué hace el sistema',
    integrationsLabel: 'Se integra con',
    cta: 'Hablar sobre este proyecto',
    other: '¿No encuentras tu sector? Las mismas piezas sirven para cualquier operación.',
    otherCta: 'Cuéntanos tu caso',
    items: {
      ecommerce: {
        tab: 'Tiendas y e-commerce',
        title: 'Vende online sin trabajo manual tras bambalinas.',
        lead:
          'Para comercios que quieren vender online, o que ya venden y se ahogan en la operación. Construimos la tienda y, sobre todo, lo que pasa después de “comprar”: pago, factura, etiqueta de envío y seguimiento conectados.',
        compare: [
          ['Cada pedido exige emitir la factura, generar la etiqueta y copiar el seguimiento a mano.', 'Con el pedido pagado, la factura y la etiqueta quedan listas automáticamente, en segundos.'],
          ['El stock de la tienda física, la web y el marketplace nunca coincide.', 'Un único inventario, actualizado en todos los canales de venta.'],
          ['En días de promoción, la operación se traba y se pierden pedidos.', 'Preparado para picos como el Black Friday, sin perder ni duplicar pedidos.'],
        ],
        modules: ['Tienda rápida en el móvil', 'Tarjeta, transferencia y pagos locales', 'Facturación automática', 'Etiquetas por lote y envíos', 'Seguimiento para el cliente', 'Panel de ventas'],
        integrations: ['Pasarelas de pago', 'Facturación electrónica', 'Transportistas', 'Correos', 'Marketplaces', 'ERPs'],
        message: '¡Hola! Tengo una tienda y quiero hablar sobre un proyecto de e-commerce.',
      },
      restaurants: {
        tab: 'Restaurantes',
        title: 'Del salón a la cocina y la caja, todo en un solo sistema.',
        lead:
          'Para restaurantes, bares, cafeterías y dark kitchens que quieren dejar de depender del papel, la memoria y las hojas de cálculo. El pedido se anota una vez, la cocina se entera al instante y las cifras del día están siempre a mano.',
        compare: [
          ['Las comandas en papel se pierden y los pedidos salen mal.', 'El pedido tomado en el móvil del camarero aparece al instante en la pantalla de cocina.'],
          ['Pedidos de delivery, WhatsApp y mostrador en sitios distintos.', 'Todos los pedidos en una sola cola, por orden de llegada.'],
          ['Un ingrediente se agota en pleno servicio y la caja no cuadra.', 'Stock descontado con cada plato vendido y caja conciliada automáticamente.'],
        ],
        modules: ['Mesas y comandas', 'Pantalla de cocina con tiempos', 'Carta digital con QR', 'Delivery y mostrador unificados', 'Stock y coste por plato', 'Caja e informes'],
        integrations: ['Apps de delivery', 'WhatsApp', 'Datáfonos', 'Impresoras térmicas', 'Facturación'],
        message: '¡Hola! Tengo un restaurante y quiero hablar sobre un sistema de gestión.',
      },
      rental: {
        tab: 'Alquiler de vehículos',
        title: 'Flota, reservas y contratos bajo control.',
        lead:
          'Para empresas de alquiler que han superado la hoja de cálculo. Sabe al instante qué coche está disponible, cuánto rinde cada vehículo y qué está por vencer, sin llamar a nadie.',
        compare: [
          ['La disponibilidad de la flota se controla en una hoja de cálculo o una pizarra.', 'Calendario de la flota en tiempo real, sin reservas duplicadas.'],
          ['Contratos impresos, rellenados a mano y archivados en carpetas.', 'Contrato generado con los datos del cliente y firmado digitalmente.'],
          ['Los daños se descubren después, sin pruebas de cuándo ocurrieron.', 'Inspección de entrega y devolución con fotos, fecha y kilometraje.'],
        ],
        modules: ['Registro y estado de la flota', 'Reservas y calendario', 'Contratos digitales', 'Inspecciones con fotos', 'Mantenimiento y vencimientos', 'Rentabilidad por vehículo'],
        integrations: ['Rastreadores GPS', 'Firma electrónica', 'Preautorización con tarjeta', 'Reservas online', 'WhatsApp'],
        message: '¡Hola! Tengo una empresa de alquiler de vehículos y quiero hablar sobre un sistema de gestión.',
      },
      appointments: {
        tab: 'Clínicas y servicios',
        title: 'Agenda llena, sin ausencias y sin ir y venir de mensajes.',
        lead:
          'Para clínicas, consultas, peluquerías, estudios y talleres: cualquier negocio que vive de citas. El cliente reserva solo, recibe un recordatorio y acude. Tú sabes exactamente lo que entró en el mes.',
        compare: [
          ['Horas cada día respondiendo mensajes para agendar citas.', 'El cliente ve los horarios libres y reserva solo, las 24 horas.'],
          ['Las ausencias sin aviso dejan huecos en la agenda.', 'Recordatorios automáticos con confirmación y lista de espera.'],
          ['Comisiones y pagos calculados a mano a fin de mes.', 'Comisiones, bonos y pagos calculados automáticamente.'],
        ],
        modules: ['Reservas online', 'Recordatorios y confirmaciones', 'Ficha e historial del cliente', 'Señas y bonos', 'Equipo y comisiones', 'Ocupación y facturación'],
        integrations: ['WhatsApp', 'Google Calendar', 'Pagos con tarjeta', 'Facturación', 'Correo electrónico'],
        message: '¡Hola! Tengo un negocio de servicios con citas y quiero hablar sobre un sistema.',
      },
      logistics: {
        tab: 'Logística y entregas',
        title: 'Cada entrega visible, del almacén al cliente.',
        lead:
          'Para distribuidoras, mayoristas, fábricas y tiendas con reparto propio. Sabe dónde está cada pedido, por qué algo se retrasó y cuánto cuesta cada entrega, sin hojas de cálculo ni llamadas al conductor.',
        compare: [
          ['Nadie sabe dónde está un pedido sin llamar al conductor.', 'Mapa con la posición de las entregas y el estado de cada pedido.'],
          ['Los problemas solo aparecen cuando el cliente reclama.', 'Los pedidos parados o con incidencias caen en una cola de atención.'],
          ['Comprobante de entrega en papel, perdido o ilegible.', 'Comprobante digital con foto, firma, hora y ubicación.'],
        ],
        modules: ['Panel de expedición', 'Rutas por zona', 'App del repartidor', 'Seguimiento para el cliente', 'Etiquetas y transportistas', 'Puntualidad y coste por entrega'],
        integrations: ['Transportistas', 'Correos', 'ERPs', 'Facturación electrónica', 'Mapas', 'WhatsApp'],
        message: '¡Hola! Quiero hablar sobre un sistema de logística y entregas.',
      },
      automation: {
        tab: 'Automatización e IA',
        title: 'Menos hojas de cálculo, menos retrabajo, más tiempo.',
        lead:
          'Para empresas en las que personas cualificadas pasan el día copiando datos de un sistema a otro. Conectamos lo que ya usas, automatizamos lo repetitivo y aplicamos IA donde da retorno.',
        compare: [
          ['Datos copiados a mano entre el ERP, hojas de cálculo y correo.', 'Sistemas que se comunican entre sí, sin teclear dos veces.'],
          ['El informe del lunes se lleva toda la mañana.', 'Informes y paneles que se actualizan solos, listos cuando llegas.'],
          ['Pedidos, facturas y documentos leídos y tecleados a mano.', 'La IA extrae los datos de los documentos y una persona solo revisa.'],
        ],
        modules: ['Integración entre sistemas', 'Rutinas automáticas', 'Lectura de documentos con IA', 'Atención asistida por IA', 'Informes automáticos', 'Alertas cuando algo falla'],
        integrations: ['ERPs', 'CRMs', 'Hojas de cálculo', 'Google Workspace', 'Microsoft 365', 'WhatsApp', 'Modelos de IA'],
        message: '¡Hola! Quiero hablar sobre automatizar procesos en mi empresa.',
      },
    },
  },

  services: {
    eyebrow: 'Servicios',
    title: 'Qué construimos.',
    lead: 'Del sistema nuevo al que necesita hablar con todos los demás. Un único estudio se ocupa de todo, de la interfaz a la infraestructura.',
    items: [
      { title: 'Sistemas de gestión a medida', text: 'Paneles de administración y sistemas internos que siguen tu proceso, y no al revés.', tags: 'ERP · Back office · Control' },
      { title: 'Tiendas online y e-commerce', text: 'Tiendas rápidas integradas con pagos, facturación, envíos y marketplaces.', tags: 'Checkout · Pagos · Facturación' },
      { title: 'Aplicaciones web y móviles', text: 'Apps instalables en el móvil que funcionan bien incluso con mala conexión.', tags: 'PWA · Offline · Notificaciones' },
      { title: 'Integraciones entre sistemas', text: 'El ERP, la tienda, las finanzas y los socios intercambiando datos solos y de forma segura.', tags: 'APIs · Webhooks · ERPs' },
      { title: 'Automatización de procesos', text: 'Tareas repetitivas convertidas en rutinas automáticas, con registro de todo lo hecho.', tags: 'Rutinas · Colas · Alertas' },
      { title: 'Paneles y datos en tiempo real', text: 'Indicadores, mapas y alertas en vivo para decidir con números y no por intuición.', tags: 'Dashboards · Mapas · BI' },
      { title: 'IA aplicada al negocio', text: 'Lectura de documentos, atención asistida y clasificación, siempre con supervisión humana.', tags: 'LLMs · Extracción · Asistentes' },
      { title: 'Evolución de sistemas existentes', text: '¿Ya tienes un sistema? Lo asumimos, estabilizamos, documentamos y seguimos evolucionando.', tags: 'Mantenimiento · Migración · Refactorización' },
    ],
  },

  engineering: {
    eyebrow: 'Ingeniería',
    title: 'La ingeniería no se ve. El resultado se nota todos los días.',
    lead:
      'Un sistema bonito que se cae un viernes por la noche es una pérdida. Por eso cuidamos lo que no se ve en pantalla: datos fiables, integraciones que se recuperan solas y una operación que aguanta el pico.',
    proofTitle: 'Capacidades ya puestas en práctica',
    proof: [
      { tag: 'Facturación y logística', text: 'Un flujo que lleva el pedido pagado a la factura autorizada y a la etiqueta lista para enviar en segundos, sin teclear nada.' },
      { tag: 'Escala', text: 'Operación dimensionada para picos de Black Friday, con simulación de escenarios antes de que ocurran.' },
      { tag: 'Datos en tiempo real', text: 'Una plataforma de mapas que cruza seis fuentes de datos externas y sigue en pie cuando una de ellas cae.' },
      { tag: 'Móvil', text: 'Apps instalables que funcionan sin conexión y envían notificaciones, sin pasar por la tienda de aplicaciones.' },
    ],
    guarantees: [
      { title: 'Nada se pierde, nada se duplica', text: 'Cada paso queda registrado. Un doble clic o una caída de conexión nunca generan dos pedidos ni dos facturas.', tech: 'Idempotencia · Transacciones · Colas' },
      { title: 'Si un proveedor cae, tú sigues', text: 'Si el servicio de facturación, el transportista o el banco no responde, el sistema espera y reintenta solo.', tech: 'Reintentos · Aislamiento de fallos' },
      { title: 'Se integra con lo que ya usas', text: 'Cambiar de transportista, pasarela o proveedor no exige rehacer el sistema: solo cambia la pieza que habla con él.', tech: 'Adaptadores · APIs · Webhooks' },
      { title: 'Rápido en cualquier dispositivo', text: 'Pantallas ligeras que cargan rápido en el móvil del cliente y en el ordenador antiguo de la oficina.', tech: 'Rendimiento · PWA · Caché' },
      { title: 'Seguro y conforme a la privacidad', text: 'Acceso por perfil, datos protegidos y registro de quién hizo qué. Alineado con la LGPD y el RGPD.', tech: 'Cifrado · Auditoría · LGPD' },
      { title: 'Preparado para crecer', text: 'La base soporta más volumen sin reescribir el sistema cuando la empresa crece.', tech: 'Arquitectura · Observabilidad' },
    ],
    stackTitle: 'Tecnologías con las que trabajamos',
    stack: [
      { layer: 'Interfaz', items: ['TypeScript', 'React', 'Next.js', 'Vite', 'PWA'] },
      { layer: 'Back end', items: ['Node.js', 'NestJS', 'Express', 'Fastify', 'Python', 'FastAPI'] },
      { layer: 'Datos', items: ['PostgreSQL', 'PostGIS', 'Redis', 'RabbitMQ', 'WebSockets'] },
      { layer: 'Nube', items: ['Docker', 'Azure', 'Vercel', 'Render', 'Neon'] },
      { layer: 'Calidad', items: ['Tests automatizados', 'Tests de extremo a extremo', 'CI', 'ADRs'] },
    ],
  },

  process: {
    eyebrow: 'Proceso',
    title: 'Del primer café al sistema funcionando.',
    lead: 'Un proceso claro, con entregas que ves funcionar en cada etapa. Sin meses de silencio y sin sorpresas al final.',
    outLabel: 'Recibes',
    steps: [
      { title: 'Conversación', text: 'Entendemos el negocio, el problema y qué significa el éxito para ti. Sin compromiso.', out: 'Una visión clara de lo que vale la pena construir' },
      { title: 'Diagnóstico y propuesta', text: 'Mapeamos el proceso, definimos el alcance de la primera versión y presentamos plazo e inversión.', out: 'Propuesta con alcance, plazo y precio definidos' },
      { title: 'Construcción por etapas', text: 'Entregas cortas que pruebas y validas. Lo más importante se entrega primero.', out: 'Partes del sistema funcionando desde el principio' },
      { title: 'Lanzamiento', text: 'Lo ponemos en producción, migramos los datos, formamos al equipo y acompañamos los primeros días de uso real.', out: 'Sistema en producción y equipo formado' },
      { title: 'Evolución', text: 'Soporte, mejoras y nuevas funcionalidades a medida que el negocio crece.', out: 'Un socio técnico a largo plazo' },
    ],
  },

  principles: {
    eyebrow: 'Principios',
    title: 'Lo que guía cada decisión técnica.',
    items: [
      { tag: 'Rendimiento', title: 'La velocidad es una funcionalidad.', text: 'Una pantalla lenta cuesta ventas y paciencia. Medimos y optimizamos lo que el usuario siente.' },
      { tag: 'Simplicidad', title: 'Lo más simple que resuelve.', text: 'Nada construido “para el futuro”. Menos piezas significan menos coste y menos fallos.' },
      { tag: 'Seguridad', title: 'Protección desde la primera línea.', text: 'Acceso mínimo necesario, secretos fuera del código y validación en todas las entradas.' },
      { tag: 'Experiencia', title: 'Hecho para quien lo usa.', text: 'Lenguaje claro y pantallas que el equipo aprende sin manual.' },
      { tag: 'Observabilidad', title: 'Lo que no se ve no se puede operar.', text: 'Logs, métricas y alertas desde el primer día, para actuar antes de que el cliente lo note.' },
      { tag: 'Mantenibilidad', title: 'Código que perdura.', text: 'Código legible, decisiones documentadas y tests donde importan. El sistema nunca queda rehén de nadie.' },
    ],
  },

  about: {
    eyebrow: 'Nosotros',
    title: 'Un estudio pequeño por elección.',
    paragraphs: [
      'DuaTech es un estudio independiente de ingeniería de software, fundado y dirigido por Henrique Xaud. Cada proyecto tiene un ingeniero responsable de principio a fin, sin capas de intermediarios y sin contexto perdido por el camino.',
      'Cuando el proyecto lo pide, formamos un equipo a medida con desarrolladores y especialistas de confianza en diseño, móvil, datos e infraestructura, coordinados por el mismo liderazgo técnico. Siempre hablas con quien construye.',
    ],
    founderRole: 'Fundador e ingeniero responsable',
    founderBio: 'Ingeniero de software full-stack. Diseña y construye sistemas de punta a punta, desde el modelado de datos hasta la interfaz y la operación en producción.',
    facts: [
      { label: 'Desde', value: '2021' },
      { label: 'Modelo', value: 'Estudio independiente con red de especialistas' },
      { label: 'Atención', value: 'En remoto, en Brasil y en el exterior' },
    ],
  },

  engagement: {
    eyebrow: 'Formatos',
    title: 'Cómo podemos trabajar juntos.',
    models: [
      { title: 'Proyecto a medida', text: 'Para sacar un sistema adelante. Alcance, plazo e inversión definidos antes de empezar.', fit: 'Nuevos sistemas, tiendas y apps' },
      { title: 'Evolución continua', text: 'Un paquete mensual de horas para mejorar, mantener y ampliar lo que ya existe, con prioridades definidas juntos.', fit: 'Empresas con un sistema en uso' },
      { title: 'Consultoría técnica', text: 'Diagnóstico, revisión de arquitectura, elección de tecnología o supervisión de otro proveedor.', fit: 'Decisiones antes de invertir' },
    ],
    fitLabel: 'Ideal para',
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de hablar.',
    items: [
      { q: '¿Cuánto cuesta un sistema a medida?', a: 'Depende del alcance, y por eso no trabajamos con tarifas cerradas. Tras una conversación y un diagnóstico, recibes una propuesta con alcance, plazo e inversión definidos. A menudo recomendamos empezar por una primera versión ligera que ya resuelve el problema principal antes de las siguientes etapas.' },
      { q: '¿Cuánto tiempo lleva?', a: 'Una primera versión útil suele llevar de unas semanas a pocos meses, según la complejidad. Entregamos por etapas, así que empiezas a usar partes del sistema antes de que termine el proyecto completo.' },
      { q: '¿El sistema y los datos son de mi empresa?', a: 'Sí. El código, los datos y los accesos son de tu empresa. Sin cuotas por usuario ni dependencia de proveedor, y los costes de alojamiento son transparentes y a nombre de la empresa.' },
      { q: '¿Dais soporte después de la entrega?', a: 'Sí, con planes de soporte y evolución continua. Si lo prefieres, lo documentamos todo y transferimos el sistema a tu equipo o a otro proveedor.' },
      { q: '¿Necesito saber de tecnología?', a: 'No. Tú conoces tu negocio y nosotros nos ocupamos de la parte técnica. Explicamos las decisiones en lenguaje claro y sigues el progreso en el propio sistema.' },
      { q: 'Ya uso hojas de cálculo o un sistema estándar. ¿Se puede aprovechar?', a: 'En la mayoría de los casos, sí. Podemos integrarnos con lo que ya existe, migrar los datos o evolucionar un sistema antiguo en lugar de empezar de cero.' },
    ],
  },

  contact: {
    eyebrow: 'Contacto',
    title: '¿Hablamos de tu proyecto?',
    lead: 'Cuéntanos qué pasa hoy en tu empresa y adónde quieres llegar. La primera conversación es sin compromiso, y sales de ella con claridad sobre el camino.',
    whatsapp: 'Escribir por WhatsApp',
    whatsappMessage: '¡Hola! Vengo de la web de DuaTech y quiero hablar sobre un proyecto.',
    linkedin: 'LinkedIn',
    email: 'Correo',
    checklistTitle: 'Para la primera conversación, ayuda saber:',
    checklist: [
      'Qué problema quieres resolver y quién lo sufre hoy.',
      'Cómo se hace ahora: hojas de cálculo, papel u otros sistemas.',
      'Si hay un plazo o una fecha importante por delante.',
    ],
  },

  footer: {
    tagline: 'Estudio de ingeniería de software. Diseñamos y construimos software que resuelve problemas reales.',
    studio: 'Estudio',
    solutions: 'Soluciones',
    contact: 'Contacto',
    rights: 'Todos los derechos reservados.',
    built: 'HTML estático, sin rastreadores.',
  },

  visuals: {
    ecommerce: { order: 'Pedido #4821', paid: 'Pago aprobado', invoice: 'Factura emitida', label: 'Etiqueta creada', transit: 'En tránsito', waiting: 'pendiente', sales: 'Ventas hoy', amount: '$ 12.480' },
    restaurants: { title: 'Cocina', count: '14 pedidos', cols: ['Nuevos', 'En curso', 'Listos'], table: 'Mesa', delivery: 'Delivery', counter: 'Barra', items: ['2× Risotto', '1× Ensalada', '3× Burger', '1× Patatas', '2× Zumo', '1× Menú del día'] },
    rental: { title: 'Flota', week: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], rented: 'Alquilado', reserved: 'Reservado', maintenance: 'Taller' },
    appointments: { title: 'Agenda', week: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], blocks: ['Consulta · Ana', 'Corte · Juan', 'Revisión · Bea', 'Control · Caio', 'Color · Lía', 'Servicio · Leo', 'Consulta · Rui'], toast: 'Recordatorio enviado', confirmed: 'Confirmado' },
    logistics: { title: 'Entregas', delivered: 'Entregadas', route: 'En ruta', issue: 'Atención', vehicle: 'Vehículo 03' },
    automation: { title: 'Automatizaciones', when: 'hoy · 07:00', nodes: ['Pedido en el ERP', 'Lectura con IA', 'Factura emitida', 'Informe enviado'], log: ['312 registros sincronizados', 'informe diario enviado', '1 documento por revisar'] },
  },
};
