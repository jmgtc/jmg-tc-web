import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfth4gqi',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-01-01',
});

const DATA = {
  nif: '60291524Z',
  email: 'info@jmg-tc.com',
  address: 'Calle Club 1 Oficina 4 Las Arenas Getxo Bizkaia 48930',
  owner: 'JMG Tech Consulting',
  url: 'https://jmg-tc.com'
};

const createBlock = (text, style = 'normal') => ({
  _type: 'block',
  style,
  children: [{ _type: 'span', text }],
  markDefs: []
});

async function seedLegalPages() {
  console.log('🚀 Iniciando inyección de páginas legales...');

  const pages = [
    {
      _type: 'legalPage',
      _id: 'legal-aviso-legal',
      title: 'Aviso Legal',
      title_en: 'Legal Notice',
      slug: { _type: 'slug', current: 'aviso-legal' },
      content: [
        createBlock('1. INFORMACIÓN IDENTIFICATIVA', 'h2'),
        createBlock(`En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se detallan los siguientes datos: El titular de este sitio web es ${DATA.owner}, con NIF ${DATA.nif}, con domicilio en ${DATA.address}. Correo electrónico de contacto: ${DATA.email}.`),
        createBlock('2. USUARIOS', 'h2'),
        createBlock('El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta los Términos y Condiciones aquí reflejados.'),
        createBlock('3. PROPIEDAD INTELECTUAL E INDUSTRIAL', 'h2'),
        createBlock(`Todos los derechos de propiedad intelectual e industrial del contenido de esta web son titularidad de ${DATA.owner}. Queda prohibida cualquier reproducción, distribución o comunicación pública sin autorización expresa.`)
      ],
      content_en: [
        createBlock('1. IDENTIFICATION INFORMATION', 'h2'),
        createBlock(`In compliance with article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce, the following data is detailed: The owner of this website is ${DATA.owner}, with NIF ${DATA.nif}, located at ${DATA.address}. Contact email: ${DATA.email}.`),
        createBlock('2. USERS', 'h2'),
        createBlock('Access and/or use of this portal attributes the condition of USER, who accepts the Terms and Conditions reflected here.')
      ]
    },
    {
      _type: 'legalPage',
      _id: 'legal-privacidad',
      title: 'Política de Privacidad',
      title_en: 'Privacy Policy',
      slug: { _type: 'slug', current: 'politica-de-privacidad' },
      content: [
        createBlock('PROTECCIÓN DE DATOS (RGPD)', 'h2'),
        createBlock(`${DATA.owner} cumple con las directrices del Reglamento General de Protección de Datos (UE) 2016/679.`),
        createBlock('¿Quién es el responsable del tratamiento de sus datos?', 'h3'),
        createBlock(`Responsable: ${DATA.owner}`),
        createBlock(`NIF: ${DATA.nif}`),
        createBlock(`Dirección: ${DATA.address}`),
        createBlock(`Email: ${DATA.email}`),
        createBlock('Finalidad del tratamiento', 'h3'),
        createBlock('Tratamos la información que nos facilita para gestionar las consultas recibidas a través del formulario de contacto y para la prestación de los servicios profesionales contratados.'),
        createBlock('Derechos de los interesados', 'h3'),
        createBlock('Usted tiene derecho a obtener confirmación sobre si estamos tratando sus datos, así como a acceder, rectificar o solicitar su supresión cuando los datos ya no sean necesarios.')
      ],
      content_en: [
        createBlock('DATA PROTECTION (GDPR)', 'h2'),
        createBlock(`${DATA.owner} complies with the guidelines of the General Data Protection Regulation (EU) 2016/679.`),
        createBlock('Purpose of Processing', 'h3'),
        createBlock('We process the information you provide to manage inquiries received through the contact form and for the provision of contracted professional services.')
      ]
    },
    {
      _type: 'legalPage',
      _id: 'legal-cookies',
      title: 'Política de Cookies',
      title_en: 'Cookies Policy',
      slug: { _type: 'slug', current: 'politica-de-cookies' },
      content: [
        createBlock('USO DE COOKIES', 'h2'),
        createBlock(`${DATA.url} utiliza cookies propias y de terceros para mejorar la experiencia de navegación y ofrecer contenido de interés.`),
        createBlock('¿Qué son las cookies?', 'h3'),
        createBlock('Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario.'),
        createBlock('Tipos de cookies utilizadas', 'h3'),
        createBlock('- Cookies técnicas: Necesarias para el funcionamiento.'),
        createBlock('- Cookies de análisis: Permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico.')
      ],
      content_en: [
        createBlock('USE OF COOKIES', 'h2'),
        createBlock(`${DATA.url} uses its own and third-party cookies to improve the browsing experience and offer content of interest.`),
        createBlock('What are cookies?', 'h3'),
        createBlock('A cookie is a file that is downloaded to your computer when accessing certain web pages.')
      ]
    }
  ];

  try {
    for (const page of pages) {
      console.log(`📝 Creando/Actualizando: ${page.title}...`);
      await client.createOrReplace(page);
    }
    console.log('✅ ¡Páginas legales inyectadas con éxito!');
  } catch (err) {
    console.error('❌ Error inyectando páginas:', err);
  }
}

seedLegalPages();
