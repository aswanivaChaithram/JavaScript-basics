let students = [];
let editIndex = null;


const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");


form.addEventListener("submit", function (e) {
e.preventDefault();


const student = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
course: document.getElementById("course").value,
mobile: document.getElementById("mobile").value
};

if (editIndex === null) {
students.push(student);
} else {
students[editIndex] = student;
editIndex = null;
}


form.reset();
displayStudents();
});

function displayStudents() {
table.innerHTML = "";


students.forEach((student, index) => {
table.innerHTML += `
<tr>
<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.course}</td>
<td>${student.mobile}</td>
<td>
<button class="edit" onclick="editStudent(${index})">Edit</button>
<button class="delete" onclick="deleteStudent(${index})">Delete</button>
</td>
</tr>
`;
});
}

function editStudent(index) {
const student = students[index];


document.getElementById("name").value = student.name;
document.getElementById("email").value = student.email;
document.getElementById("course").value = student.course;
document.getElementById("mobile").value = student.mobile;


editIndex = index;
}


function deleteStudent(index) {
students.splice(index, 1);
displayStudents();
}