/* vim:set ts=2 sw=2 sts=2 et: */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Jetpack Packages.
 *
 * The Initial Developer of the Original Code is Red Hat.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Matěj Cepl <mcepl@redhat.com> (Original Author)
 *   Irakli Gozalishvili <gozala@mozilla.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"use strict";

const { Cc, Ci, components: { Constructor: CC } } = require("chrome");
const { id: ADDON_ID } = require("self");
const loginManager = Cc["@mozilla.org/login-manager;1"].
                     getService(Ci.nsILoginManager);
const LoginInfo = CC("@mozilla.org/login-manager/loginInfo;1", "nsILoginInfo",
                     "init");
const ADDON_URI = "jetpack:" + ADDON_ID;

function query(loginInfo)
  Object.keys(this).every(function(key) loginInfo[key] === this[key], this);

function Login(options) {
  let login = Object.create(Login.prototype);
  Object.keys(options || {}).forEach(function(key) {
    if (key === 'url')
      login.hostname = options.url;
    else if (key === 'realm')
      login.httpRealm = options.realm;
    else 
      login[key] = options[key];
  });

  return login;
}
Login.prototype.toJSON = function toJSON() {
  return {
    url: this.hostname || ADDON_URI,
    realm: this.httpRealm || null,
    formSubmitURL: this.formSubmitURL || null,
    username: this.username || null,
    password: this.password || null,
    usernameField: this.usernameField || '',
    passwordField: this.passwordField || '',
  }
};
Login.prototype.toLoginInfo = function toLoginInfo() {
  let { url, realm, formSubmitURL, username, password, usernameField,
        passwordField } = this.toJSON();

  return new LoginInfo(url, formSubmitURL, realm, username, password,
                       usernameField, passwordField);
};

function loginToJSON(value) Login(value).toJSON()

/**
 * Returns array of `nsILoginInfo` objects that are stored in the login manager
 * and have all the properties with matching values as a given `options` object.
 * @param {Object} options
 * @returns {nsILoginInfo[]}
 */
exports.search = function search(options)
  loginManager.getAllLogins().filter(query, Login(options)).map(loginToJSON);

/**
 * Stores login info created from the given `options` to the applications
 * built-in login management system.
 * @param {Object} options.
 */
exports.store = function store(options) {
  loginManager.addLogin(Login(options).toLoginInfo());
};

/**
 * Removes login info from the applications built-in login management system.
 * _Please note: When removing a login info the specified properties must
 * exactly match to the one that is already stored or exception will be thrown._
 * @param {Object} options.
 */
exports.remove = function remove(options) {
  loginManager.removeLogin(Login(options).toLoginInfo());
};