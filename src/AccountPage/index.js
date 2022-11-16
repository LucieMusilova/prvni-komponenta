import "./style.css";

export const AccountPage = (props) => {
  const { session } = props;

  if (session === "no-session") {
    window.location.href = "/login";
    return null;
  } else if (session === "session") {
    window.location.href = "/account";
  }

  let userContent = "Uživatel není přihlášený.";

  if (session !== undefined && session !== "no-session") {
    userContent = `<div>${session.user}</div>`;
  }

  const element = document.createElement("div");
  element.classList.add("accout-page");
  element.innerHTML = `
    <div class="container">
      <h1>Účet</h1>
      ${userContent}
      <button class="logout">Odhlásit se</button>
    </div>
  `;

  const authToken = window.localStorage.getItem("authToken");

  element.querySelector(".logout").addEventListener("click", () => {
    fetch("https://apps.kodim.cz/daweb/shoplist/api/me/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
      });
  });

  return element;
};
