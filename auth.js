
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { firebaseConfig } from "./config.js";

// تهيئة الفايربيز
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//  1) حماية فورية قبل تشغيل onAuthStateChange
// لو المستخدم فتح / أو الفولدر الرئيسي → نودّيه login
if (window.location.pathname === "/" || window.location.pathname === "") {
  window.location.href = "login.html";
}

// لو المستخدم على index.html ومافيش تسجيل دخول أصلاً
// نمنعه فوراً قبل Firebase ما ترد
if (window.location.pathname.includes("index.html")) {
  auth.onAuthStateChanged((usr) => {
    if (!usr || !usr.emailVerified) {
      window.location.href = "login.html";
    }
  });
}



// مراقبة حالة تسجيل الدخول
onAuthStateChanged(auth, async (user) => {
  const path = window.location.pathname;

  if (user) {

    // لو المستخدم لسه مأكّدش بريده
    if (!user.emailVerified) {

      //  السماح بعرض رسالة success في صفحة register
      if (path.includes("register.html")) return;

      //  السماح بعرض رسالة "يرجى التحقق" في صفحة login بدون redirect
      if (path.includes("login.html")) return;

      //  غير كده → امنعه وارجعه للّوجين
      await signOut(auth);
      window.location.href = "login.html";
      return;
    }

    // لو مفعل الإيميل فعلاً
    if (path.includes("login.html") || path.includes("register.html")) {
      window.location.href = "index.html";
      return;
    }

  } else {
    // مستخدم مش عامل login وحاول يدخل index
    if (path.includes("index.html")) {
      window.location.href = "login.html";
    }
  }
});

// زر تسجيل الخروج
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

export { auth };
