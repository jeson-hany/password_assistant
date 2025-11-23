
import { auth } from "./auth.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// -------------------------
//  الترجمة (عربي / إنجليزي)
// -------------------------
const translations = {
  ar: {
    introTitle: "🔐 مساعد كلمة المرور",
    introText: "✨ أنشئ حسابك الآن وابدأ رحلتك نحو كلمات مرور آمنة وسهلة التذكر!\n🛡️ تطبيقنا يساعدك على إنشاء، اختبار، وتخزين كلمات مرور قوية بكل سهولة.",
    title: "📝 إنشاء حساب جديد",
    email: "📧 البريد الإلكتروني",
    password: "🔑 كلمة المرور",
    registerBtn: "إنشاء الحساب",
    langBtn: "English",
    emptyFields: "⚠️ أدخل البريد وكلمة المرور",
    success: "✅ تم إرسال رابط التفعيل إلى بريدك الإلكتروني! يرجى تأكيده قبل تسجيل الدخول.",
    emailUsed: "❗ البريد مستخدم بالفعل",
    weakPassword: "❗ كلمة المرور ضعيفة (6 أحرف على الأقل)",
    error: "❗ حدث خطأ، حاول مرة أخرى",
    strength: {
      veryWeak: "ضعيفة جدًا",
      medium: "متوسطة",
      strong: "قوية",
    },
    improve: {
      length6: "- طول كلمة المرور أقل من 6 أحرف",
      length8: "- طول كلمة المرور أقل من 8 أحرف",
      upper: "- أضف حرف كبير",
      lower: "- أضف حرف صغير",
      number: "- أضف رقم",
      symbol: "- أضف رمز خاص (!@#$%^&*)",
      commonPassword: "- كلمة المرور شائعة جدًا، اختر أخرى",
    },
    suggestions: "اقتراحات لتحسين كلمة المرور:",
    haveAccountText: 'لديك حساب بالفعل؟ <a href="login.html">تسجيل الدخول</a>'
  },

  en: {
    introTitle: "🔐 Password Assistant",
    introText: "✨ Create your account now and start your journey to stronger, easier passwords!\n🛡️ Our app helps you generate, test, and store strong passwords with ease.",
    title: "📝 Create New Account",
    email: "📧 Email",
    password: "🔑 Password",
    registerBtn: "Register",
    langBtn: "العربية",
    emptyFields: "⚠️ Enter email and password",
    success: "✅ Verification link sent to your email! Please verify before logging in.",
    emailUsed: "❗ Email is already in use",
    weakPassword: "❗ Weak password (at least 6 characters)",
    error: "❗ Error occurred, please try again",
    strength: {
      veryWeak: "Very Weak",
      medium: "Medium",
      strong: "Strong",
    },
    improve: {
      length6: "- Password length less than 6",
      length8: "- Password length less than 8",
      upper: "- Add uppercase letter",
      lower: "- Add lowercase letter",
      number: "- Add a number",
      symbol: "- Add a special character (!@#$%^&*)",
      commonPassword: "- Password is too common, choose another one",
    },
    suggestions: "Suggestions to improve your password:",
    haveAccountText: 'Already have an account? <a href="login.html">Login</a>'
  },
};

// -------------------------
// عناصر الصفحة
// -------------------------
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const regMsg = document.getElementById("regMsg");
const registerBtn = document.getElementById("registerBtn");
const langBtn = document.getElementById("langBtn");
const introTitle = document.querySelector("#intro h1");
const introText = document.getElementById("introText");
const passwordResult = document.getElementById("result");
const passwordSuggestions = document.getElementById("suggestions");
const togglePassword = document.getElementById("togglePassword");
const haveAccount = document.getElementById("haveAccount");

let currentLang = "ar";



// -------------------------
// تقييم قوة كلمة المرور
// -------------------------
function checkPassword() {
  const pw = regPassword.value.trim();
  let strength = "";
  let suggestions = [];

  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSymbol = /[!@#$%^&*()]/.test(pw);

  if (pw.length <= 6) {
    strength = translations[currentLang].strength.veryWeak;
    if (pw.length <= 6) suggestions.push(translations[currentLang].improve.length6);
    if (!hasUpper) suggestions.push(translations[currentLang].improve.upper);
    if (!hasLower) suggestions.push(translations[currentLang].improve.lower);
    if (!hasNumber) suggestions.push(translations[currentLang].improve.number);
    if (!hasSymbol) suggestions.push(translations[currentLang].improve.symbol);

    registerBtn.disabled = true;

  } else if (hasUpper && hasLower && hasNumber && hasSymbol && pw.length > 8) {
    strength = translations[currentLang].strength.strong;
    registerBtn.disabled = false;

  } else {
    strength = translations[currentLang].strength.medium;
    if (pw.length <= 8) suggestions.push(translations[currentLang].improve.length8);
    if (!hasUpper) suggestions.push(translations[currentLang].improve.upper);
    if (!hasLower) suggestions.push(translations[currentLang].improve.lower);
    if (!hasNumber) suggestions.push(translations[currentLang].improve.number);
    if (!hasSymbol) suggestions.push(translations[currentLang].improve.symbol);

    registerBtn.disabled = true;
  }

  passwordResult.innerText = "💬 " + strength;

  if (suggestions.length > 0) {
    passwordSuggestions.innerText = translations[currentLang].suggestions + "\n" + suggestions.join("\n");
  } else {
    passwordSuggestions.innerText = "";
  }
}

// -------------------------
// إنشاء الحساب وإرسال التأكيد
// -------------------------
registerBtn.addEventListener("click", async () => {
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!email || !password) {
    regMsg.textContent = translations[currentLang].emptyFields;
    regMsg.style.color = "red";
    return;
  }

  if (registerBtn.disabled) {
    regMsg.textContent = translations[currentLang].weakPassword;
    regMsg.style.color = "red";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    //  رسالة النجاح تظهر قبل الانتقال
    regMsg.textContent = translations[currentLang].success;
    regMsg.style.color = "green";

    //  زيادة مدة الانتظار
    setTimeout(() => {
      window.location.href = "login.html";
    }, 4000);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      regMsg.textContent = translations[currentLang].emailUsed;
    } else if (error.code === "auth/weak-password") {
      regMsg.textContent = translations[currentLang].weakPassword;
    } else {
      regMsg.textContent = translations[currentLang].error;
    }
    regMsg.style.color = "red";
  }
});

// -------------------------
// تغيير اللغة
// -------------------------
window.toggleLanguage = function () {
  const title = document.querySelector("h2");

  currentLang = currentLang === "ar" ? "en" : "ar";
  const t = translations[currentLang];

  introTitle.textContent = t.introTitle;
  introText.textContent = t.introText;
  title.textContent = t.title;
  regEmail.placeholder = t.email;
  regPassword.placeholder = t.password;
  registerBtn.textContent = t.registerBtn;
  langBtn.textContent = t.langBtn;

  regMsg.textContent = "";
  passwordResult.textContent = "";
  passwordSuggestions.textContent = "";

  document.body.style.direction = currentLang === "ar" ? "rtl" : "ltr";
  document.body.style.textAlign = currentLang === "ar" ? "right" : "left";

  haveAccount.innerHTML = t.haveAccountText;

  passwordSuggestions.style.direction =
    currentLang === "ar" ? "rtl" : "ltr";
  passwordSuggestions.style.textAlign =
    currentLang === "ar" ? "right" : "left";

  updateEyeDirection();
};

// -------------------------
// أيقونة إظهار/إخفاء كلمة المرور
// -------------------------
function updateEyeDirection() {
  const isArabic = currentLang === "ar";
  togglePassword.style.left = isArabic ? "10px" : "auto";
  togglePassword.style.right = isArabic ? "auto" : "10px";
  togglePassword.style.transform = isArabic
    ? "translateY(-50%) scaleX(-1)"
    : "translateY(-50%) scaleX(1)";
}

updateEyeDirection();

togglePassword.addEventListener("click", () => {
  const isPassword = regPassword.type === "password";
  regPassword.type = isPassword ? "text" : "password";

  togglePassword.textContent = isPassword ? "👁️‍🗨" : "👁️";

  togglePassword.style.transition = "transform 0.3s ease";
  togglePassword.style.transform =
    currentLang === "ar"
      ? "translateY(-50%) scaleX(-1) rotateY(180deg)"
      : "translateY(-50%) scaleX(1) rotateY(180deg)";

  setTimeout(() => {
    updateEyeDirection();
  }, 300);
});

// -------------------------
// تشغيل فحص كلمة المرور أثناء الكتابة
// -------------------------
regPassword.addEventListener("input", checkPassword);


