import Chart from "./node_modules/chart.js/auto/auto.js";

function sortMessages(messages) {
  /**
   * input:
   * [
   *   {
   *     author: ...,
   *     message: ...,
   *     date: ...,
   *   }
   * ]
   *
   * output:
   * {
   *   Joren: [
   *     {
   *       author: ...,
   *       message: ...,
   *       date: ...,
   *     },
   *   ],
   *   Nick: ...
   * }
   */

  const obj = {};

  messages.forEach((message) => {
    const { author } = message;
    if (author === "System") {
      return;
    }
    if (!obj[author]) {
      obj[author] = [];
    }
    obj[author].push(message);
  });
  return obj;
}

function renderToHTML(messages, msgAmount, hueChunks) {
  const app = document.getElementById("app");

  let htmlStr = ``;
  Object.entries(messages).forEach(([user, messages], index) => {
    const hue = index * hueChunks;
    htmlStr += `
      <div class="user-block" style="
        background-color: hsl(${hue}deg 50% 70%);
        height: ${(100 / msgAmount) * messages.length * 10}px
      ">
        <p>${user}</p>
        <p>${messages.length}</p>
      </div>
    `;
  });

  app.innerHTML = htmlStr;
}

function renderToChart(messages, hueChunks) {
  const messageEntries = Object.entries(messages).sort((a, b) => {
    if (a[1].length > b[1].length) {
      return -1;
    } else {
      return 1;
    }
  });

  const messageAmounts = messageEntries.map(([, val]) => val.length);
  const backgroundColor = messageEntries.map(
    (item, index) => `hsl(${index * hueChunks}, 50%, 70%)`
  );
  console.log(backgroundColor);
  const config = {
    type: "doughnut",
    data: {
      datasets: [
        {
          backgroundColor,
          data: messageAmounts, // [8604, 10256, 10257, 14000]
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: messageEntries.map(([key]) => key),
    },
  };

  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, config);
}

fetch("/chat")
  .then((response) => response.json())
  .then((messages) => {
    const msgAmount = messages.length;
    const messagesPerUser = sortMessages(messages);
    const totalUsers = Object.keys(messagesPerUser).length; // ['Joren', 'Edu', 'Bas', 'Nick']
    const hueChunks = 360 / totalUsers; // steps of X degrees

    renderToHTML(messagesPerUser, msgAmount, hueChunks);

    renderToChart(messagesPerUser, hueChunks);
  });
