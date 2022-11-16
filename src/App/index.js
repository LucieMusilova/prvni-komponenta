import { Header } from "../Header/index.js";
import { HomePage } from "../HomePage/index.js";
import { LoginPage } from "../LoginPage/index.js";
import { RegisterPage } from "../RegisterPage/index.js";

export const App = (props) => {
  let { session } = props;
  console.log("session", session);

  if (session === undefined) {
    const authToken = window.localStorage.getItem("authToken");
    if (authToken === null) {
      session = "no-session";
    } else {
      fetch("https://apps.kodim.cz/daweb/shoplist/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "unauthorized") {
            session = "no-session";
          } else {
            session = {
              user: data.results.email,
            };
          }
          element.replaceWith(App({ session: session }));
        });
    }
  }

  element.append(Header({ session }));

  const { pathname } = window.location;
  if (pathname === "/") {
    element.append(HomePage({}));
  } else if (pathname === "/login") {
    element.append(LoginPage({}));
  } else if (pathname === "/register") {
    element.append(RegisterPage({}));
  }

  return element;
};
