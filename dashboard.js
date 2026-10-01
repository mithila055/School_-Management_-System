const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");
const classFilter = document.getElementById("classFilter");
const sectionFilter = document.getElementById("sectionFilter");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");


let students = JSON.parse(localStorage.getItem("students")) || [];
let selectedPhotoData = "";


function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}


function displayStudents(list = students) {
  table.innerHTML = "";
  list.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.class}</td>
      <td>${student.section}</td>
      <td>${student.roll}</td>
      <td>${student.dob}</td>
      <td>${calculateAge(student.dob)}</td>
      <td>${student.phone}</td>
      <td>${student.blood}</td>
      <td>${student.father}</td>
      <td>${student.mother}</td>
      <td>${student.address}</td>
      <td>${student.photo ? `<img src="${student.photo}" class="student-thumbnail" alt="${student.name}'s photo">` : '<span class="no-photo">-</span>'}</td>
      <td>
        <button onclick="editStudent(${index})" class="btn">Edit</button>
        <button onclick="deleteStudent(${index})" class="btn">Delete</button>
        <button onclick="viewStudent(${index})" class="btn">View</button>        
  
      </td>`;
    table.appendChild(tr);
  });
  updateFilters();
}


photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    selectedPhotoData = reader.result;
    photoPreview.src = selectedPhotoData;
    photoPreview.hidden = false;
  });
  reader.readAsDataURL(file);
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newStudent = {
    id: document.getElementById("studentId").value.trim(),
    name: document.getElementById("name").value.trim(),
    class: document.getElementById("class").value.trim(),
    section: document.getElementById("section").value.trim(),
    roll: document.getElementById("roll").value.trim(),
    dob: document.getElementById("dob").value,
    phone: document.getElementById("phone").value.trim(),
    blood: document.getElementById("blood").value.trim(),
    father: document.getElementById("father").value.trim(),
    mother: document.getElementById("mother").value.trim(),
    address: document.getElementById("address").value.trim(),
    photo: selectedPhotoData,
  };


  const existingIndex = students.findIndex((s) => s.id === newStudent.id);
  if (existingIndex >= 0 && !newStudent.photo) {
    newStudent.photo = students[existingIndex].photo || "";
  }
  if (existingIndex >= 0) students[existingIndex] = newStudent;
  else students.push(newStudent);


  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  selectedPhotoData = "";
  photoPreview.src = "";
  photoPreview.hidden = true;
  displayStudents();
});


function editStudent(index) {
  const s = students[index];
  for (let key in s) {
    if (key !== "photo" && document.getElementById(key)) document.getElementById(key).value = s[key];
  }
  selectedPhotoData = s.photo || "";
  if (selectedPhotoData) {
    photoPreview.src = selectedPhotoData;
    photoPreview.hidden = false;
  }
}


function deleteStudent(index) {
  if (confirm("Delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}

// new function to veiw student profile
function viewStudent(index) {
  // Save the selected student's data temporarily
  localStorage.setItem("selectedStudent", JSON.stringify(students[index]));

  // Redirect to the profile page
  window.location.href = "student-profile.html";
}



searchInput.addEventListener("keyup", filterStudents);
classFilter.addEventListener("change", filterStudents);
sectionFilter.addEventListener("change", filterStudents);


function filterStudents() {
  const query = searchInput.value.toLowerCase();
  const classValue = classFilter.value;
  const sectionValue = sectionFilter.value;


  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
    const matchClass = classValue ? s.class === classValue : true;
    const matchSection = sectionValue ? s.section === sectionValue : true;
    return matchSearch && matchClass && matchSection;
  });
  displayStudents(filtered);
}


function updateFilters() {
  const classes = [...new Set(students.map((s) => s.class))];
  const sections = [...new Set(students.map((s) => s.section))];


  classFilter.innerHTML = `<option value="">All Classes</option>`;
  classes.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    classFilter.appendChild(opt);
  });


  sectionFilter.innerHTML = `<option value="">All Sections</option>`;
  sections.forEach((sec) => {
    const opt = document.createElement("option");
    opt.value = sec;
    opt.textContent = sec;
    sectionFilter.appendChild(opt);
  });
}


setInterval(displayStudents, 86400000);
displayStudents();


// naw added function to view student profile




