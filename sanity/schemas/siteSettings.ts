export default {
  name: 'siteSettings',
  title: 'Ajustes del Sitio',
  type: 'document',
  fields: [
    {
      name: 'maintenanceMode',
      title: 'Modo Mantenimiento',
      type: 'boolean',
      description: 'Activa o desactiva la capa de mantenimiento en toda la web.',
      initialValue: false,
    },
    {
      name: 'adminUsername',
      title: 'Usuario Administrador (By-pass)',
      type: 'string',
      initialValue: 'jgutierrez',
    },
    {
      name: 'adminPassword',
      title: 'Contraseña Administrador (By-pass)',
      type: 'string',
      initialValue: 'Pescadit05',
    }
  ],
}
