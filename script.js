const inputBox = document.querySelector(".inputfield input");
const addbtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todolist");
const deleteAllbtn = document.querySelector(".footer button");
document.addEventListener("DOMContentLoaded",showTasks);

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() != 0){
       addbtn.classList.add("active"); 
    }
    else addbtn.classList.remove("active"); 
}

addbtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null)
    {
        listArr = [];
    }
    else
    {
        listArr = JSON.parse(getLocalStorage);
    }

    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  let listArr;
  
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  if(listArr.length > 0)
  {
    deleteAllbtn.classList.add("active");
  }
  else{
    deleteAllbtn.classList.remove("active");

  }
  const Numberque = document.querySelector(".number");
  Numberque.textContent = listArr.length;
  let newLiTag = '';
  
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick="editTask(${index})" id="edit"><i class='bx bxs-edit'></i></span><span onclick="deleteTask(${index})" id="delete"><i class='bx bx-trash'></i></span></li>`;
  });
  
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  let listArr = JSON.parse(getLocalStorage);
  
  listArr.splice(index, 1);
  
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  
  showTasks();
}

deleteAllbtn.onclick = ()=>{
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

/*function editTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  let listArr = JSON.parse(getLocalStorage);
  
  // Hiển thị nội dung cần chỉnh sửa trong hộp thoại prompt
  let editedTask = prompt("Chỉnh sửa nội dung công việc:", listArr[index]);
  
  // Kiểm tra nếu người dùng đã nhập nội dung mới
  if (editedTask !== null && editedTask.trim() !== "") {
    listArr[index] = editedTask;
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); // Hiển thị danh sách công việc sau khi đã chỉnh sửa
  }
}*/
function editTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  let listArr = JSON.parse(getLocalStorage);
  
  // Kiểm tra xem code đang chạy trên điện thoại hay máy tính
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Code chạy trên điện thoại - sử dụng cordova-plugin-dialogs
    navigator.notification.prompt(
      "Chỉnh sửa nội dung công việc:", // Tin nhắn hiển thị
      function(result) {
        if (result.buttonIndex === 1) {
          let editedTask = result.input1;
          
          // Kiểm tra nếu người dùng đã nhập nội dung mới
          if (editedTask !== null && editedTask.trim() !== "") {
            listArr[index] = editedTask;
            localStorage.setItem("New Todo", JSON.stringify(listArr));
            showTasks(); // Hiển thị danh sách công việc sau khi đã chỉnh sửa
          }
        }
      },
      "Chỉnh sửa công việc", // Tiêu đề hộp thoại
      ["Lưu", "Hủy"], // Các nút hiển thị
      listArr[index] // Giá trị mặc định của input
    );
  } else {
    // Code chạy trên máy tính - sử dụng prompt
    let editedTask = prompt("Chỉnh sửa nội dung công việc:", listArr[index]);

    // Kiểm tra nếu người dùng đã nhập nội dung mới
    if (editedTask !== null && editedTask.trim() !== "") {
      listArr[index] = editedTask;
      localStorage.setItem("New Todo", JSON.stringify(listArr));
      showTasks(); // Hiển thị danh sách công việc sau khi đã chỉnh sửa
    }
  }
}