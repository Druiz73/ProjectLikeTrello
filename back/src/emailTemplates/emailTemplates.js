const emailTemplates = {
  recoveryPassword: function (token) {
    this.subject = 'Password help has arrived!';
    this.html = `<h1>Hola</h1><p>Hacé clic acá para reiniciar tu contraseña</p><a href='${process.env.SERVER_FE}/change-password/${token}'>REINICIAR CONTRASEÑA</a>`;
    return this;
  },
  inviteProject: function () {
    this.subject = 'join the project!';
    this.html = `<h1>Hola!</h1><p>Hacé clic acá para unirte al proyecto</p><a href='${process.env.SERVER_LOGIN}/'>UNIRSE al Project</a>`;
    return this;
  },
  userRegister: function () {
    this.subject = 'Congrats!';
    this.html = `<h1>Hola stars User!</h1><p>Ya eres parte de la comunidad stars!</p><a href='${process.env.SERVER_LOGIN}/'>GO !</a>`;
    return this;
  }, 
  inviteRoom: function (room) {
    this.subject = 'join the Room!';
    this.html = `<h1>Hola!</h1><p>Te unieron al Room ${room}</p><a  href='${process.env.SERVER_LOGIN}/'>UNIRSE al Room</a>`;
    return this;
  },
  inviteOrganization: function (nameOrg) {
    this.subject = 'join the Room!';
    this.html = `<h1>Hola!</h1><p>Te unieron al Room ${nameOrg}</p><a  href='${process.env.SERVER_LOGIN}/'>UNIRSE al Room</a>`;
    return this;
  }
}
export default emailTemplates;