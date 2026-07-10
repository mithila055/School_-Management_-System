function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const profileContainer = document.getElementById("profile-details");
const printBtn = document.getElementById("printBtn");

const student = JSON.parse(localStorage.getItem("selectedStudent"));

if (!student) {
  profileContainer.innerHTML = "<p>No student data found.</p>";
} else {
 profileContainer.innerHTML = `
    <p><strong>ID:</strong> ${student.id}</p>
    <p><strong>Name:</strong> ${student.name}</p>
    <p><strong>Class:</strong> ${student.class}</p>
    <p><strong>Section:</strong> ${student.section}</p>
    <p><strong>Roll:</strong> ${student.roll}</p>
    <p><strong>Date of Birth:</strong> ${student.dob}</p>
    <p><strong>Age:</strong> ${calculateAge(student.dob)}</p>
    <p><strong>Phone:</strong> ${student.phone}</p>
    <p><strong>Blood Group:</strong> ${student.blood}</p>
    <p><strong>Father's Name:</strong> ${student.father}</p>
    <p><strong>Mother's Name:</strong> ${student.mother}</p>
    <p><strong>Address:</strong> ${student.address}</p>
`;

}

printBtn.addEventListener("click", () => {
  window.print();
});
