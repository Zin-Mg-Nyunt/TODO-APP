const taskInput = document.getElementById("taskInput");
const taskItemContainer = document.getElementById("task-item-container");
const allBtn = document.getElementById("all");
const completeBtn = document.getElementById("complete");
const inCompleteBtn = document.getElementById("inComplete");

// task ကိုယူရမယ်
// ယူထားတယ့် task ကို obj ဆောက်
// taskArr ထဲကိုထည့်
let taskArr = [];

taskInput.addEventListener("change", () => {
  let value = {};
  value.content = taskInput.value;
  value.isComplete = false;
  taskArr.push(value);
  taskInput.value = "";
  showTask();
});

let filter = "all";

let filterTask = [];
function showTask() {
  taskItemContainer.innerHTML = "";

  if (filter == "all") {
    filterTask = taskArr;
  }
  if (filter == "complete") {
    filterTask = taskArr.filter((task) => task.isComplete);
  }
  if (filter == "inComplete") {
    filterTask = taskArr.filter((task) => !task.isComplete);
  }

  for (let i = 0; i < filterTask.length; i++) {
    const taskItem = document.createElement("div");
    taskItem.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-3",
      "bg-gray-100",
      "mg-1",
      "rounded-md",
      "select-none"
    );

    const taskContentBox = document.createElement("div");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("mr-2", "cursor-pointer");

    const taskContent = document.createElement("span");
    taskContent.innerText = filterTask[i].content;

    taskContentBox.append(checkBox, taskContent);

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash", "cursor-pointer");

    taskItem.append(taskContentBox, trash);
    taskItemContainer.append(taskItem);

    if (filterTask[i].isComplete) {
      checkBox.checked = true;
      taskContent.classList.add("line-through");
    }

    taskItem.addEventListener("click", () => {
      if (filterTask[i].isComplete) {
        filterTask[i].isComplete = false;
        checkBox.checked = false;
        taskContent.classList.remove("line-through");
        showTask();
      } else {
        filterTask[i].isComplete = true;
        checkBox.checked = true;
        taskContent.classList.add("line-through");
        showTask();
      }
    });
    trash.addEventListener("click", (e) => {
      e.stopPropagation();

      let indexInTaskArr = taskArr.indexOf(filterTask[i]);

      if (indexInTaskArr !== -1) {
        taskArr.splice(indexInTaskArr, 1);
      }

      //   filterTask.splice(i, 1);

      Swal.fire({
        title: "You completely deleted the task.",
        showClass: {
          popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
        },
      });

      showTask();
    });
  }
}

allBtn.addEventListener("click", () => {
  allBtn.classList.add("shadow-md", "shadow-blue-600");
  completeBtn.classList.remove("shadow-md", "shadow-green-600");
  inCompleteBtn.classList.remove("shadow-md", "shadow-red-600");

  filter = "all";
  showTask();
});

completeBtn.addEventListener("click", () => {
  completeBtn.classList.add("shadow-md", "shadow-green-600");
  allBtn.classList.remove("shadow-md", "shadow-blue-600");
  inCompleteBtn.classList.remove("shadow-md", "shadow-red-600");

  filter = "complete";
  showTask();
});

inCompleteBtn.addEventListener("click", () => {
  inCompleteBtn.classList.add("shadow-md", "shadow-red-600");
  allBtn.classList.remove("shadow-md", "shadow-blue-600");
  completeBtn.classList.remove("shadow-md", "shadow-green-600");

  filter = "inComplete";
  showTask();
});
