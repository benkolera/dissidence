import { Elm } from './Main.elm'

const sessionKey = "dissidence_usersession";

var oldSessionStr = localStorage.getItem(sessionKey)

console.log("STARTUP");

const app = Elm.Main.init({
  node: document.getElementById('elm'),
})

app.ports.putUserSessionValue.subscribe((d) => {
  console.log("PUT USER SESSION");

  if (d === null) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.setItem(storageKey, JSON.stringify(d));
  }

  setTimeout(function () { app.ports.onUserSessionValueChange.send(d); }, 0);
})


window.addEventListener('storage', (event) => {
  console.log("STORAGE", event)
  if (event.storageArea === localStorage && event.key === sessionKey) {
    app.ports.onUserSessionValueChange.send(JSON.parse(event.newValue));
  }
}, false);

