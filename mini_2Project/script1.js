const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

let editId = null;

/* =========================
   LOAD STUDENTS (GET)
========================= */
function loadStudents() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/students");

    request.onload = function () {
        var students = JSON.parse(request.responseText);
        table.innerHTML = "";

        students.forEach(function (student) {
            table.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>${student.mobile}</td>
                    <td>
                        <button class="edit" onclick="editStudent('${student.id}')">Edit</button>
                        <button class="delete" onclick="deleteStudent('${student.id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    };

    request.send();
}

/* =========================
   ADD / UPDATE STUDENT
========================= */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    var student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        mobile: document.getElementById("mobile").value
    };

    // ADD
    if (editId === null) {
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/students");
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = function () {
            form.reset();
            loadStudents();
        };

        request.send(JSON.stringify(student));
    }
    // UPDATE
    else {
        var request = new XMLHttpRequest();
        request.open("PUT", "http://localhost:3000/students/" + editId);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = function () {
            editId = null;
            form.reset();
            loadStudents();
        };

        request.send(JSON.stringify(student));
    }
});

/* =========================
   EDIT STUDENT (GET ONE)
========================= */
function editStudent(id) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/students/" + id);

    request.onload = function () {
        var student = JSON.parse(request.responseText);

        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("course").value = student.course;
        document.getElementById("mobile").value = student.mobile;

        editId = id;
    };

    request.send();
}

/* =========================
   DELETE STUDENT
========================= */
function deleteStudent(id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:3000/students/" + id);

    request.onload = function () {
        loadStudents();
    };

    request.send();
}

/* =========================
   LOAD ON PAGE OPEN
========================= */
loadStudents();
