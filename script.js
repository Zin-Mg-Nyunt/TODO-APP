const completeBtn = document.getElementById("complete");
const taskInput = document.getElementById("taskInput");
const taskItemContainer = document.getElementById("task-item-container");
const allBtn = document.getElementById("all");
const inCompleteBtn = document.getElementById("inComplete");

taskInput.addEventListener("change", () => {
  let value = {};
  value.content = taskInput.value;
  value.isComplete = false;
  const data = localStorage.getItem("inputData");
  // localStorage ထဲမှာ data ရှိနေတယ်ဆိုရင် if ထဲကဟာ အလုပ်လုပ်
  if (data) {
    const dataArr = JSON.parse(data); // ရှိတယ့် data ကို arr ပြောင်း
    dataArr.push(value); // အသစ်ဝင်လာတယ့် data obj ကို arr ထဲထည့်
    const dataString = JSON.stringify(dataArr); // ပြီးရင် json string ပြောင်း
    localStorage.setItem("inputData", dataString); // ပြီးတော့ localStorage ထဲထည့်
  }
  // localStorage ထဲမှာ data မရှိနေဘူးဆိုရင် else ထဲကဟာ အလုပ်လုပ်
  else {
    // localStroage ထဲမှာ data ကိုသွားသိမ်း
    const dataString = JSON.stringify([value]);
    localStorage.setItem("inputData", dataString);
  }
  taskInput.value = "";
  showTask();
});

let filter = "all";
let filterTask = [];
// let dataArr = [];
const updateLocalStorage = (dataArr) => {
  const updateDataString = JSON.stringify(dataArr);
  localStorage.setItem("inputData", updateDataString);
};
function showTask() {
  taskItemContainer.innerHTML = "";

  let dataArr = JSON.parse(localStorage.getItem("inputData"));
  // localStorage ထဲမှာ data ရှိ/မရှိ အရင်စစ် ဘာလို့ဆို မရှိတာကို မစစ်ထားဘဲ ဆွဲထုတ်ပြီး filter လုပ်မယ်ဆိုရင် error တွေတက်လာမယ် အဲ့တော့ မရှိရင် ဘာအလုပ်မှဆက်မလုပ်ဘူး ဆိုပြီး စစ်ထားလိုက်
  if (!dataArr) {
    return;
  }

  // data ရှိတယ့်အခါမှာကျတော့ localStorage ထဲက data ကိုပြန်ဆွဲထုတ်ပြီး အဲ့တာကို filter လုပ်ပြီးပြန်ပြ
  if (filter == "all") {
    filterTask = dataArr;
  }
  if (filter == "complete") {
    filterTask = dataArr.filter((data) => data.isComplete);
  }
  if (filter == "inComplete") {
    filterTask = dataArr.filter((data) => !data.isComplete);
  }

  for (let i = 0; i < filterTask.length; i++) {
    const taskItem = document.createElement("div");
    taskItem.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-3",
      "bg-gray-100",
      "select-none",
      "cursor-pointer"
    );

    const taskContentBox = document.createElement("div");

    const checkBox = document.createElement("input");
    checkBox.id = i;
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
        filterTask[i].isComplete = false; // filterTask ထဲက isComplete ကို update လုပ်တာနဲ့ dataArr ထဲမှာပါ update ဖြစ်သွားတယ် အဲ့တော့ localStorage ထဲကို update လုပ်လိုက်ရုံပဲ
        updateLocalStorage(dataArr);
        checkBox.checked = false;
        taskContent.classList.remove("line-through");
        showTask();
      } else {
        filterTask[i].isComplete = true;
        updateLocalStorage(dataArr);
        checkBox.checked = true;
        taskContent.classList.add("line-through");
        showTask();
      }
    });
    trash.addEventListener("click", (e) => {
      e.stopPropagation();

      // data ကိုဖျက်တယ့်အခါကျတော့လဲ မူရင်း dataArr ထဲကိုသွားဖျက်ရန် index တန်ဖိုးရှာ / ပထမတုန်းက localStorage ထဲမှာသိမ်းတာမဟုတ်တော့ TaskArr ထဲမှာသွားရှာ အခုကျတော့ localStorage ထဲမှာသိမ်းတာဆိုတော့ dataArr ထဲမှာသွားရှာ
      let indexInDataArr = dataArr.indexOf(filterTask[i]);

      if (indexInDataArr !== -1) {
        dataArr.splice(indexInDataArr, 1);
        // dataArr ထဲမှာဖျက်ပြီးရင် localStorage ထဲမှာပါပျက်သွားအောင် update လုပ်ပေး
        updateLocalStorage(dataArr);
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

showTask();

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
