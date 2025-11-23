
import { auth } from "./auth.js";
import { signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// -------------------------
//  الترجمة (العربية والإنجليزية)
// -------------------------
const translations = {
  ar: {
    welcomeText: "🔐 مساعد كلمة المرور<br>✨ مرحبًا بعودتك! سجّل دخولك لإدارة كلمات مرورك بأمان 🛡️",
    title: "🔐 تسجيل الدخول",
    email: "📧 البريد الإلكتروني",
    password: "🔑 كلمة المرور",
    loginBtn: "تسجيل الدخول",
    resetBtn: "نسيت كلمة المرور؟",
    noAccountText: 'ليس لديك حساب؟ <a href="register.html">إنشاء حساب</a>',
    langBtn: "English",
    successMsg: "✅ تم تسجيل الدخول بنجاح!",
    errorMsg: "❌ خطأ في تسجيل الدخول، تحقق من البيانات.",
    verifyEmail: "⚠️ يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول."
  },
  en: {
    welcomeText: "🔐 Password Assistant<br>✨ Welcome back! Log in to manage your passwords securely 🛡️",
    title: "🔐 Login",
    email: "📧 Email",
    password: "🔑 Password",
    loginBtn: "Login",
    resetBtn: "Forgot password?",
    noAccountText: 'Don\'t have an account? <a href="register.html">Create one</a>',
    langBtn: "العربية",
    successMsg: "✅ Logged in successfully!",
    errorMsg: "❌ Login failed, please check your credentials.",
    verifyEmail: "⚠️ Please verify your email before logging in."
  }
};

// -------------------------
//  دالة تطبيق اللغة على الصفحة
// -------------------------
function applyLanguage(lang) {
  const t = translations[lang];
  document.getElementById("welcomeText").innerHTML = t.welcomeText;
  document.getElementById("loginTitle").textContent = t.title;
  document.getElementById("loginEmail").placeholder = t.email;
  document.getElementById("loginPassword").placeholder = t.password;
  document.getElementById("loginBtn").textContent = t.loginBtn;
  document.getElementById("resetBtn").textContent = t.resetBtn;
  document.getElementById("noAccountText").innerHTML = t.noAccountText;
  document.getElementById("langBtn").textContent = t.langBtn;

  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";
  document.body.style.textAlign = lang === "ar" ? "right" : "left";

  const icons = document.querySelectorAll("i, svg, .icon");
  icons.forEach(icon => {
    icon.style.transform = lang === "ar" ? "scaleX(-1)" : "scaleX(1)";
  });
}

// -------------------------
//  تحميل اللغة من LocalStorage عند الفتح
// -------------------------
let currentLang = localStorage.getItem("lang") || "ar";
applyLanguage(currentLang);

// -------------------------
//  زر تبديل اللغة
// -------------------------
window.toggleLanguage = function () {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
  updateEyeDirection();
};


// ننتظر معرفة حالة المستخدم
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    // لو المستخدم مسجل دخول ومفعل الايميل، نوجهه ل index.html فوراً
    window.location.href = "index.html";
  } else {
    // لو مش مسجل أو مش مفعل الايميل، نعرض صفحة اللوجين
    document.body.style.display = "block";
  }
});


// -------------------------
//  تسجيل الدخول مع الرسائل المترجمة
// -------------------------
const loginBtn = document.getElementById("loginBtn");
const loginMsg = document.getElementById("loginMsg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      window.location.href = "index.html";
    } else {
      loginMsg.textContent = translations[currentLang].verifyEmail;
      loginMsg.style.color = "orange";
    }
  } catch (error) {
    loginMsg.textContent = translations[currentLang].errorMsg;
    loginMsg.style.color = "red";
  }
});

// -------------------------
//  أيقونة العين - عرض/إخفاء كلمة المرور
// -------------------------
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPassword");

function updateEyeDirection() {
  const isArabic = currentLang === "ar";
  togglePassword.style.left = isArabic ? "10px" : "auto";
  togglePassword.style.right = isArabic ? "auto" : "10px";
  togglePassword.style.transform = isArabic
    ? "translateY(-50%) scaleX(-1)"
    : "translateY(-50%) scaleX(1)";
}

// ضبط موضع الأيقونة عند تحميل الصفحة
updateEyeDirection();

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.textContent = isPassword ? "👁️‍🗨" : "👁️";

  // دوران مؤقت + اتجاه حسب اللغة بدون تراكم
  togglePassword.style.transition = "transform 0.3s ease";
  togglePassword.style.transform = (currentLang === "ar"
    ? "translateY(-50%) scaleX(-1) rotateY(180deg)"
    : "translateY(-50%) scaleX(1) rotateY(180deg)");

  setTimeout(() => {
    updateEyeDirection();
  }, 200);
});


