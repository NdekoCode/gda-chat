/**
 * @description Verifie si une chaine de caractère est vide et retourne true si il est vide et false sinon
 * @param {String} value
 * @author NdekoCode
 * @export
 * @return {Boolean}
 */
export function isStringEmpty(value) {
  if (isVarEmpty(value) || value === "") {
    return true;
  }
  return value.toString().trim().length < 1;
}

/**
 * @description Verifie si une variable est vide et retourne true si il est vide et false sinon
 * @author NdekoCode
 * @export
 * @param {*} value
 * @return {Boolean}
 */
export function isVarEmpty(value) {
  return value === undefined || value === null;
}

/**
 * @description Verifie si une variable est vide et retourne true si il est vide et false sinon
 * @author NdekoCode
 * @export
 * @param {*} value
 * @return {Boolean}
 */
export function isEmpty(value) {
  if (!isVarEmpty(value)) {
    if (typeof value === "string") {
      return isStringEmpty(value);
    }

    if (value.length === undefined) {
      return isEmptyObject(value);
    }
    return isArrayEmpty(value);
  }
}
/**
 * @description Verifie si une variable est vide et retourne true si il est vide et false sinon
 * @author NdekoCode
 * @export
 * @param {Object} value
 * @return {Boolean}
 */
export function isEmptyObject(value) {
  if (!isVarEmpty(value)) {
    return Object.keys(value).length < 1;
  }
  return true;
}

/**
 * @description
 * Verifie si un tableau est vide et retourne true si il est vide et false sinon
 * @param {Array} value
 * @author NdekoCode
 * @export
 * @return {Boolean}
 */
export function isArrayEmpty(value) {
  return Array.isArray(value) && value.length < 1;
}

/**
 * @description Permet de valider le formulaire des produits
 * @author NdekoCode
 * @export
 * @param {Object} reqbody Le corps de la requete
 * @param {Array} [error=[]] Le tableau des erreurs
 * @return {Boolean}
 */
export function validForm(reqbody, error = {}) {
  if (!isVarEmpty(reqbody)) {
    for (let element in reqbody) {
      if (
        isStringEmpty(reqbody[element]) ||
        (typeof reqbody[element] === "string" && reqbody[element].length < 2)
      ) {
        error["error"] = "Remplissez tous les champs";
      }
    }
  } else {
    error["error"] = "Veuillez completer tous les champs";
  }
  return error;
}

/**
 * @description Permet de verifier si une addresse mail est valide ou non
 * @param {String} value L'adresse emil à verifier
 * @param {Object} errors Le tableau qui va contenir les erreur s'il y en a
 * @returns
 */
export function ValidateEmail(value, errors = {}) {
  if (!isStringEmpty(value)) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (value.match(validRegex)) {
      return true;
    }
    errors["error"] = "adresse e-mail invalide";
  }
  errors["error"] = "Entrer un e-mail valide";
  return false;
}
export function validPassword(value, errors = {}) {
  if (isStringEmpty(value) || value.length < 5) {
    errors["error"] = "Le mot de passe doit etre au moins de 5 caractères";
  }
  return errors;
}
export function isValidUserFields(bodyUserRequest, validField) {
  let errors = {};
  for (let field in bodyUserRequest) {
    if (!validField.includes(field)) {
      errors[field] = "Le champs est requis";
    }
  }
  return isEmptyObject(errors);
}
