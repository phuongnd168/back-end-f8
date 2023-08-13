function firstTime() {
  localStorage.setItem("firstTime", false);
}

if (localStorage.getItem("firstTime")) {
  if (window.location.href === "http://127.0.0.1:5500/Buoi15/views/home.html") {
    window.location.href = "http://127.0.0.1:5500/Buoi15/views/index.html";
  }
} else {
  if (
    window.location.href === "http://127.0.0.1:5500/Buoi15/views/index.html"
  ) {
    window.location.href = "http://127.0.0.1:5500/Buoi15/views/home.html";
  }
  s;
}
let todoList = [];

window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";
});
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  addTodo();
});

let viewTitle = "";
let viewStatus = "";
let viewId = "";

function addTodo() {
  const newTodo = document.getElementById("data").value;

  if (!newTodo) {
    todoList.push({
      id: `${Math.floor(Math.random() * 99)}-Empty`,
      text: "EmptyTask",
      completed: false,
    });
  } else {
    todoList.push({
      id: Math.floor(Math.random() * 99999),
      text: newTodo,
      completed: false,
    });
  }

  localStorage.setItem("todos", JSON.stringify(todoList));
  document.getElementById("data").value = "";
  //render id
  var id = document.getElementById("id");
  const lastId = Object.values(todoList).pop();

  viewId += `<div>${lastId.id}</div>`;
  id.innerHTML = viewId;

  //render title
  var title = document.getElementById("title");
  const lastTitle = Object.values(todoList).pop();

  viewTitle += `<div>${lastTitle.text}</div>`;
  title.innerHTML = viewTitle;

  //render status
  var status = document.getElementById("status");
  const lastStatus = Object.values(todoList).pop();
  if (lastStatus.completed) {
    viewStatus += `<div>Completed</div>`;
    status.innerHTML = viewStatus;
  } else {
    viewStatus += `<div>Not Completed</div>`;
    status.innerHTML = viewStatus;
  }
}
function render() {
  const data = localStorage.getItem("todos");
  const dataJson = JSON.parse(data);
  for (let key in dataJson) {
    var id = document.getElementById("id");
    viewId += `<div>${dataJson[key].id}</div>`;
    id.innerHTML = viewId;

    var title = document.getElementById("title");
    viewTitle += `<div>${dataJson[key].text}</div>`;
    title.innerHTML = viewTitle;
    if (dataJson[key].completed) {
      var status = document.getElementById("status");
      viewStatus += `<div>Completed</div>`;
      status.innerHTML = viewStatus;
    } else {
      var status = document.getElementById("status");
      viewStatus += `<div>Not Completed</div>`;
      status.innerHTML = viewStatus;
    }
  }
}
render();
