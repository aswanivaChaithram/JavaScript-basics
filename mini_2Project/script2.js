const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

let editId = null;

/* LOAD STUDENTS */

function loadStudents() {
    fetch("http://localhost:3000/students")
        .then(response => response.json())
        .then(students => {
            table.innerHTML = "";

            students.forEach(student => {
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
        });
}

/* ADD / UPDATE STUDENT */

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        mobile: document.getElementById("mobile").value
    };

    // ADD

    if (editId === null) {
        fetch("http://localhost:3000/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        .then(() => {
            form.reset();
            loadStudents();
        });
    }

    // UPDATE

    else {
        fetch("http://localhost:3000/students/" + editId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        .then(() => {
            editId = null;
            form.reset();
            loadStudents();
        });
    }
});

/* EDIT STUDENT */

function editStudent(id) {
    fetch("http://localhost:3000/students/" + id)
        .then(response => response.json())
        .then(student => {
            document.getElementById("name").value = student.name;
            document.getElementById("email").value = student.email;
            document.getElementById("course").value = student.course;
            document.getElementById("mobile").value = student.mobile;

            editId = id;
        });
}

/* DELETE STUDENT */

function deleteStudent(id) {
    fetch("http://localhost:3000/students/" + id, {
        method: "DELETE"
    })
    .then(() => {
        loadStudents();
    });
}

loadStudents();
