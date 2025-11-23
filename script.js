
const translations = {
  ar: {
    title: "🔐 مساعد كلمة المرور",
    specs: "📝 مواصفات الكلمة القوية:",
    rule1: "✅ أكثر من 6 حروف",
    rule2: "✅ حرف كبير (مثل: A, B, C...)",
    rule3: "✅ حرف صغير (مثل: a, b, c...)",
    rule4: "✅ رقم (مثل: 1, 2, 3...)", 
    rule5: "✅ رمز (مثل: !, @, #, $, ...)",
    genBtn: "🔄 إنشاء كلمة مرور قوية",
    saveBtn: "💾 حفظ كلمة المرور",
    showBtn: "📂 عرض الكلمات المحفوظة",
    clearBtn: "🗑️ مسح كل الكلمات",
    inputPlaceholder: "✏️ اكتب كلمة مرور لاختبارها",
    checkBtn: "🔍 اختبار القوة",
    result: "💬 النتيجة ستظهر هنا",
    suggestions: "💡 اقتراحات للتحسين:",
    strength: {
      veryWeak: "❌ ضعيفة جدًا",
      medium: "⚠️ متوسطة",
      strong: "✅ قوية"
    },
    improve: {
      length6: "➡️ اجعل كلمة المرور أطول من 6 أحرف.",
      length8: "➡️ اجعل كلمة المرور أطول من 8 أحرف.",
      upper: "➡️ أضف حرف كبير (A-Z).",
      lower: "➡️ أضف حرف صغير (a-z).",
      number: "➡️ أضف رقم (0-9).",
      symbol: "➡️ أضف رمز خاص (!@#$...)."
    },
    savedEmpty: "❌ لا توجد كلمات مرور محفوظة.",
    savedTitle: "📂 الكلمات المحفوظة:",
    savedDone: "✅ تم حفظ كلمة المرور!",
    savedExists: "⚠️ تم حفظ كلمة المرور سابقًا!",
    savedCleared: "🗑️ تم مسح جميع كلمات المرور.",
    generated: "🔐 كلمة المرور: ",
    copied: "✅ تم النسخ!"
  },
  en: {
    title: "🔐 Password Assistant",
    specs: "📝 Strong password rules:",
    rule1: "✅ More than 6 characters",
    rule2: "✅ At least one uppercase letter (A-Z)",
    rule3: "✅ At least one lowercase letter (a-z)",
    rule4: "✅ At least one number (0-9)", 
    rule5: "✅ At least one symbol (!, @, #, $, ...)",
    genBtn: "🔄 Generate Strong Password",
    saveBtn: "💾 Save Password",
    showBtn: "📂 Show Saved Passwords",
    clearBtn: "🗑️ Clear All Passwords",
    inputPlaceholder: "✏️ Enter a password to test",
    checkBtn: "🔍 Check Strength",
    result: "💬 Result will appear here",
    suggestions: "💡 Suggestions to improve:",
    strength: {
      veryWeak: "❌ Very Weak",
      medium: "⚠️ Medium",
      strong: "✅ Strong"
    },
    improve: {
      length6: "➡️ Make the password longer than 6 characters.",
      length8: "➡️ Make the password longer than 8 characters.",
      upper: "➡️ Add at least one uppercase letter (A-Z).",
      lower: "➡️ Add at least one lowercase letter (a-z).",
      number: "➡️ Add at least one number (0-9).",
      symbol: "➡️ Add at least one special symbol (!@#$...)."
    },
    savedEmpty: "❌ No saved passwords.",
    savedTitle: "📂 Saved Passwords:",
    savedDone: "✅ Password saved!",
    savedExists: "⚠️ Password already saved!",
    savedCleared: "🗑️ All passwords cleared.",
    generated: "🔐 Password: ",
    copied: "✅ Copied!"
  }
};

let currentLang = localStorage.getItem("lang") || "ar";

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);
  document.getElementById("langBtn").innerText = currentLang === "ar" ? "English" : "Arabic";
}

function applyTranslations(lang) {
  document.querySelector("h2").innerText = translations[lang].title;
  document.querySelector("h3").innerText = translations[lang].specs;

  const rules = document.querySelectorAll(".rules li");
  rules[0].innerText = translations[lang].rule1;
  rules[1].innerText = translations[lang].rule2;
  rules[2].innerText = translations[lang].rule3;
  rules[3].innerText = translations[lang].rule4;
  rules[4].innerText = translations[lang].rule5;

  document.querySelector("button[onclick='generatePassword()']").innerText = translations[lang].genBtn;
  document.getElementById("saveBtn").innerText = translations[lang].saveBtn;
  document.querySelector("button[onclick='showSavedPasswords()']").innerText = translations[lang].showBtn;
  document.querySelector("button[onclick='clearAllPasswords()']").innerText = translations[lang].clearBtn;

  document.getElementById("userPassword").placeholder = translations[lang].inputPlaceholder;
  document.querySelector("button[onclick='checkPassword()']").innerText = translations[lang].checkBtn;

  document.getElementById("result").innerText = translations[lang].result;
  document.getElementById("suggestions").innerText = "";

  if (lang === "ar") {
    document.body.style.direction = "rtl";
    document.querySelector(".rules").style.textAlign = "right";
    document.getElementById("suggestions").style.textAlign = "right";
  } else {
    document.body.style.direction = "ltr";
    document.querySelector(".rules").style.textAlign = "left";
    document.getElementById("suggestions").style.textAlign = "left";
  }
}

window.onload = () => {
  applyTranslations(currentLang);
  document.getElementById("langBtn").innerText = currentLang === "ar" ? "English" : "Arabic";
};

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";

  let password = "";
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));

  const all = upper + lower + numbers + symbols;
  for (let i = 4; i < 10; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');

  document.getElementById("generated").innerText = translations[currentLang].generated + password;
  document.getElementById("saveBtn").style.display = "inline-block";
  document.getElementById("saveMsg").innerText = "";
}

function checkPassword() {
  const pw = document.getElementById("userPassword").value;
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

    document.getElementById("saveBtn").style.display = "none";

  } else if (hasUpper && hasLower && hasNumber && hasSymbol && pw.length > 8) {
    strength = translations[currentLang].strength.strong;
    document.getElementById("saveBtn").style.display = "inline-block";
    document.getElementById("generated").innerText = translations[currentLang].generated + pw;

  } else {
    strength = translations[currentLang].strength.medium;
    if (pw.length <= 8) suggestions.push(translations[currentLang].improve.length8);
    if (!hasUpper) suggestions.push(translations[currentLang].improve.upper);
    if (!hasLower) suggestions.push(translations[currentLang].improve.lower);
    if (!hasNumber) suggestions.push(translations[currentLang].improve.number);
    if (!hasSymbol) suggestions.push(translations[currentLang].improve.symbol);
    document.getElementById("saveBtn").style.display = "none";
  }

  document.getElementById("result").innerText = "💬 " + strength;

  if (suggestions.length > 0) {
    document.getElementById("suggestions").innerText = translations[currentLang].suggestions + "\n" + suggestions.join("\n");
  } else {
    document.getElementById("suggestions").innerText = "";
  }
}

function savePassword() {
  const pw = document.getElementById("generated").innerText.replace(translations[currentLang].generated, "");
  if (!pw) return;

  let savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];

  // هل كلمة المرور محفوظة من قبل  ؟
  if (savedPasswords.includes(pw)) {
    document.getElementById("saveMsg").innerText = translations[currentLang].savedExists;
  } else {
    savedPasswords.push(pw);
    localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));
    document.getElementById("saveMsg").innerText = translations[currentLang].savedDone;
  }

  setTimeout(() => {
    document.getElementById("saveMsg").innerText = "";
  }, 2000);
}

function showSavedPasswords() {
  const savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
  const container = document.getElementById("savedList");

  if (savedPasswords.length === 0) {
    container.innerHTML = translations[currentLang].savedEmpty;
    setTimeout(() => {
      container.innerHTML = "";
    }, 2000);
    return;
  }

  container.innerHTML = "<h3>" + translations[currentLang].savedTitle + "</h3>";
  savedPasswords.forEach((pw, index) => {
    container.innerHTML += `
      <div style="margin:8px 0; padding:8px; border:1px solid #444; border-radius:8px; position:relative;">
        <span>🔑 ${pw}</span>
        <button onclick="copyPassword('${pw}', ${index})" style="margin-left:10px; cursor:pointer;">📋</button>
        <button onclick="deletePassword(${index})" style="margin-left:5px; cursor:pointer;">🗑️</button>
        <div id="copyMsg-${index}" style="color:green; font-size:12px; margin-top:4px; display:none;"></div>
      </div>
    `;
  });
}

function copyPassword(text, index) {
  navigator.clipboard.writeText(text).then(() => {
    const msgEl = document.getElementById(`copyMsg-${index}`);
    msgEl.innerText = translations[currentLang].copied;
    msgEl.style.display = "block";

    setTimeout(() => {
      msgEl.style.display = "none";
    }, 2000);
  });
}

function deletePassword(index) {
  let savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
  savedPasswords.splice(index, 1);
  localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));
  showSavedPasswords();
}

function clearAllPasswords() {
  let savedPasswords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
  if (savedPasswords.length === 0) {
    document.getElementById("savedList").innerText = translations[currentLang].savedEmpty;
    setTimeout(() => {
      document.getElementById("savedList").innerText = "";
    }, 2000);
    return;
  }

  localStorage.removeItem("savedPasswords");
  document.getElementById("savedList").innerText = translations[currentLang].savedCleared;
  setTimeout(() => {
    document.getElementById("savedList").innerText = "";
  }, 2000);
}
