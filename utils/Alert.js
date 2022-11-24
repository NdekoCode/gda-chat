/**
 * @description Permet d'envoyer des messages d'alert pour notre application
 * @author NdekoCode
 * @class Alert
 */
export default class Alert {
  /**
   *Créer une instance de l'objet Alet
   * @author NdekoCode
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @memberof Alert
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  /**
   * @description Fait un alerte de tout type
   * @author NdekoCode
   * @param {String} message Le message à envoye à l'utilisateur
   * @param {Number} statusCode Le status de la reponse HTTP
   * @param {String} type Le type de l'Alert à envoyer
   * @return {Object} L'Objet contenant la description de l'alerte
   * @memberof Alert
   */
  makeAlert(message, statusCode, type, otherData = {}) {
    return this.res.status(statusCode).send({
      alert: {
        statusCode,
        message,
        type,
      },
      ...otherData,
    });
  }

  /**
   * @description Fait une alerte de type Succés
   * @author NdekoCode
   * @param {string} [message=""] Le message à envoye à l'utilisateur
   * @param {number} [statusCode=201] Le status de la reponse HTTP
   * @param {string} [type="success"] Le type de l'Alert à envoyer
   * @return {Object} L'Objet contenant la description de l'alerte
   * @memberof Alert
   */
  success(message = "", statusCode = 201, type = "success") {
    return this.makeAlert(message, statusCode, type);
  }
  /**
   * @description  Fait une alerte de type Danger
   * @author NdekoCode
   * @param {string} [message=""] Le message à envoye à l'utilisateur
   * @param {number} [statusCode=400] Le status de la reponse HTTP
   * @param {string} [type="danger"] Le type de l'Alert à envoyer
   * @return {Object} L'Objet contenant la description de l'alerte
   * @memberof Alert
   */
  danger(message = "", statusCode = 400, type = "danger") {
    return this.makeAlert(message, statusCode, type);
  }
  /**
   * @description  Fait une alerte d'avertissement
   * @author NdekoCode
   * @param {string} [message=""] Le message à envoye à l'utilisateur
   * @param {number} [statusCode=199]  Le status de la reponse HTTP
   * @param {string} [type="warning"] Le type de l'Alert à envoyer
   * @return {Object} L'Objet contenant la description de l'alerte
   * @memberof Alert
   */
  warning(message = "", statusCode = 199, type = "warning") {
    return this.makeAlert(message, statusCode, type);
  }
  /**
   * @description Fait une alerte Informative
   * @author NdekoCode
   * @param {string} [message=""]  Le message à envoye à l'utilisateur
   * @param {number} [statusCode=100] Le status de la reponse HTTP
   * @param {string} [type="info"] Le type de l'Alert à envoyer
   * @return {Object} L'Objet contenant la description de l'alerte
   * @memberof Alert
   */
  infos(message = "", statusCode = 100, type = "info") {
    return this.makeAlert(message, statusCode, type);
  }
}
