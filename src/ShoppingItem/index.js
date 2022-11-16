import "./style.css";

export const ShoppingItem = (props) => {
  const { item, day, onDelete } = props;
  const { id, product, amount, unit, done } = item;

  let checkClass = "icon-nocheck";
  if (done) {
    checkClass = "icon-check";
  }

  const element = document.createElement("li");
  element.classList.add("item");
  element.innerHTML = `
    <div class="item__name">${product}</div>
    <div class="item__amount">${amount} ${unit}</div>
    <button class="btn-check item__btn ${checkClass}"></button>
    <button class="btn-delete item__btn icon-cross"></button>
  `;
  element.querySelector(".btn-check").addEventListener("click", () => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}/items/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic testtest@test.cz:testtest",
        },
        body: JSON.stringify({ done: !done }),
      }
    )
      .then((response) => response.json())
      .then((data) =>
        element.replaceWith(
          ShoppingItem({
            item: data.results,
            day: day,
            onDelete: onDelete,
          })
        )
      );
  });
  element.querySelector(".btn-delete").addEventListener("click", () => {
    onDelete(id);
  });

  return element;
};
