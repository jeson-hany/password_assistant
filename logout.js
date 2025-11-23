import { auth } from "./auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

//  الترجمة حسب اللغة الحالية
function updateLogoutText() {
  const currentLang = localStorage.getItem("lang") || "ar";
  logoutBtn.innerText = currentLang === "ar" ? "🚪 تسجيل الخروج" : "🚪 Logout";
}

// أول ما الصفحة تفتح
updateLogoutText();

// لما يتغير الزر الخاص باللغة
document.getElementById("langBtn").addEventListener("click", () => {
  setTimeout(updateLogoutText, 100); // نأجلها لحظة علشان تتغير اللغة الأول
});

// زر تسجيل الخروج
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
