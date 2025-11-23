import { auth } from "./auth.js";
import { sendPasswordResetEmail } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// -------------------------
//  كائن الترجمة (عربي / إنجليزي)
// -------------------------
const translations = {
  ar: {
    title: "🔑 إعادة تعيين كلمة المرور",
    desc: "أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين",
    emailPlaceholder: "📧 البريد الإلكتروني",
    sendBtn: "إرسال رابط إعادة التعيين",
    back: "⬅️ الرجوع لتسجيل الدخول",
    langBtn: "English",
    empty: "⚠️ يرجى إدخال البريد الإلكتروني",
    sent: "✅ تم إرسال رابط إعادة التعيين إليه.",
  },
  en: {
    title: "🔑 Reset Password",
    desc: "Enter your email to receive a reset link",
    emailPlaceholder: "📧 Email",
    sendBtn: "Send Reset Link",
    back: "⬅️ Back to Login",
    langBtn: "العربية",
    empty: "⚠️ Please enter your email",
    sent: "✅ If the email is registered, ",
  },
};

// -------------------------
// عناصر الصفحة
// -------------------------
const resetEmail = document.getElementById("resetEmail");
const sendBtn = document.getElementById("sendResetBtn");
const msg = document.getElementById("resetMsg");
const langBtn = document.getElementById("langBtn");
const title = document.querySelector("h2");
const desc = document.getElementById("descText");
const backLink = document.getElementById("backLink");
let currentLang = "ar";

// -------------------------
//  إرسال رابط إعادة التعيين
// -------------------------
sendBtn.addEventListener("click", async () => {
  const email = resetEmail.value.trim();
  const t = translations[currentLang];

  if (!email) {
    msg.textContent = t.empty;
    msg.style.color = "red";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    msg.textContent = t.sent;
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = t.sent; // نفس الرسالة لحماية الخصوصية
    msg.style.color = "green";
  }
});

// -------------------------
//  تبديل اللغة (عربي ↔ English)
// -------------------------
window.toggleLanguage = function () {
  currentLang = currentLang === "ar" ? "en" : "ar";
  const t = translations[currentLang];

  document.documentElement.lang = currentLang;
  title.textContent = t.title;
  desc.textContent = t.desc;
  resetEmail.placeholder = t.emailPlaceholder;
  sendBtn.textContent = t.sendBtn;
  backLink.textContent = t.back;
  langBtn.textContent = t.langBtn;
  msg.textContent = "";

  // تغيير اتجاه الصفحة
  document.body.style.direction = currentLang === "ar" ? "rtl" : "ltr";
  document.body.style.textAlign = currentLang === "ar" ? "right" : "left";
};
