// Global Profile & Auth State (기본 비로그인 상태로 진입)
let currentUser = {
  isLoggedIn: false,
  identifier: "게스트"
};

let userProfile = {
  school: "한국대학교",
  major: "컴퓨터공학과",
  status: "졸업 예정",
  gpa: 3.8,
  certs: ["정보처리기사", "SQLD"],
  languages: ["TOEIC 850점"],
  courses: ["자료구조", "알고리즘", "Python", "Java", "데이터베이스"],
  desiredRole: "소프트웨어 개발",
  desiredLoc: "서울"
};

// Master Companies Database
const companiesDB = [
  {
    id: "comp-a",
    name: "기업 A (혁신 IT)",
    role: "신입 소프트웨어 개발자",
    location: "서울",
    minGpa: 3.2,
    requiredMajor: "컴퓨터공학과",
    requiredTech: ["Python", "Java", "자료구조"],
    preferredCerts: ["정보처리기사"],
    experience: "신입",
    deadline: "2026.11.30 마감"
  },
  {
    id: "comp-b",
    name: "기업 B (플랫폼 테크)",
    role: "웹 풀스택 개발자",
    location: "서울",
    minGpa: 3.0,
    requiredMajor: "컴퓨터공학과",
    requiredTech: ["Java", "데이터베이스"],
    preferredCerts: ["SQLD"],
    experience: "신입",
    deadline: "2026.12.15 마감"
  },
  {
    id: "comp-c",
    name: "기업 C (솔루션즈)",
    role: "IT 시스템 운용 엔지니어",
    location: "경기·인천",
    minGpa: 3.0,
    requiredMajor: "관련 전공 무관",
    requiredTech: ["Linux"],
    preferredCerts: ["정보처리기사"],
    experience: "신입",
    deadline: "상시 채용"
  },
  {
    id: "naver",
    name: "네이버 (NAVER)",
    role: "SW 개발 신입 공채",
    location: "경기·성남",
    minGpa: 3.5,
    requiredMajor: "컴퓨터공학 관련 전공",
    requiredTech: ["자료구조", "알고리즘", "Java"],
    preferredCerts: ["정보처리기사"],
    experience: "신입",
    deadline: "2026.11.20 마감"
  },
  {
    id: "kakao",
    name: "카카오 (Kakao)",
    role: "클라이언트/백엔드 개발자",
    location: "판교",
    minGpa: 3.0,
    requiredMajor: "전공 무관",
    requiredTech: ["Python", "알고리즘"],
    preferredCerts: ["SQLD"],
    experience: "신입",
    deadline: "2026.12.01 마감"
  }
];

let currentSelectedCompanyId = "comp-a";

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').innerText = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2300);
}

// Header Auth UI Renderer ('로그인' 텍스트로 단순화 및 상태별 UI 분기)
function updateHeaderAuthUI() {
  const authArea = document.getElementById('headerAuthArea');
  const greetElem = document.getElementById('userGreetingName');
  const bottomNav = document.getElementById('bottomNav');
  if(!authArea) return;

  if(currentUser.isLoggedIn) {
    if(greetElem) greetElem.innerText = currentUser.identifier;
    if(bottomNav) bottomNav.classList.remove('hidden');
    authArea.innerHTML = `
      <button onclick="handleLogout()" class="text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5 shadow-md font-bold">
        <i class="fa-solid fa-right-from-bracket text-rose-400"></i> <span>로그아웃</span>
      </button>
    `;
  } else {
    if(greetElem) greetElem.innerText = "커리어메이트";
    if(bottomNav) bottomNav.classList.add('hidden');
    authArea.innerHTML = `
      <button onclick="openLoginModal()" class="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl border border-indigo-400/30 transition flex items-center gap-1.5 shadow-md font-bold">
        <i class="fa-solid fa-user-shield text-[11px] text-cyan-300"></i> <span>로그인</span>
      </button>
    `;
  }
}

// Login Modal Controls
function openLoginModal() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}

function executeLogin() {
  const inputVal = document.getElementById('loginInputId').value.trim();
  if(!inputVal) {
    showToast("닉네임이나 이메일을 입력해주세요!");
    return;
  }
  currentUser.isLoggedIn = true;
  currentUser.identifier = inputVal;
  
  updateHeaderAuthUI();
  closeLoginModal();
  showToast(`환영합니다, ${currentUser.identifier}님!`);
  switchTab('home');
}

// Gateway Login (첫 진입 화면 로그인)
function executeGateLogin() {
  const inputVal = document.getElementById('gateLoginInput').value.trim();
  if(!inputVal) {
    showToast("닉네임이나 이메일을 입력해주세요!");
    return;
  }
  currentUser.isLoggedIn = true;
  currentUser.identifier = inputVal;
  
  updateHeaderAuthUI();
  showToast(`환영합니다, ${currentUser.identifier}님!`);
  switchTab('home');
}

// Logout & Withdrawal Handlers
function handleLogout() {
  currentUser.isLoggedIn = false;
  currentUser.identifier = "게스트";
  updateHeaderAuthUI();
  showToast("로그아웃 되었습니다.");
  switchTab('login-gate');
}

function handleWithdrawal() {
  if(confirm("정말 회원 탈퇴하시겠습니까? 입력된 스펙과 정보가 초기화됩니다.")) {
    currentUser.isLoggedIn = false;
    currentUser.identifier = "게스트";
    updateHeaderAuthUI();
    showToast("회원 탈퇴 처리되었습니다.");
    switchTab('login-gate');
  }
}

// Policy Modal Controls (이용약관 및 개인정보 취급방침)
function openPolicyModal(type) {
  const modal = document.getElementById('policyModal');
  const title = document.getElementById('policyModalTitle');
  const content = document.getElementById('policyModalContent');
  if(!modal) return;

  if(type === 'terms') {
    title.innerHTML = `<i class="fa-solid fa-file-contract text-indigo-600"></i> 이용약관`;
    content.innerHTML = `
      <p class="font-bold text-slate-800">제1조 (목적)</p>
      <p>본 약관은 '취UP' (JobUP) 서비스의 이용조건 및 절차, 권리와 책임사항을 규정함을 목적으로 합니다.</p>
      <p class="font-bold text-slate-800 mt-2">제2조 (익명 보호)</p>
      <p>본 서비스는 실명 수집을 지양하며, 닉네임과 이메일 아이디를 통한 익명 기반 맞춤 커리어 메이트 서비스를 제공합니다.</p>
      <p class="font-bold text-slate-800 mt-2">제3조 (서비스 이용)</p>
      <p>AI 맞춤 추천 및 진단 결과는 참고용으로 제공되며, 실제 기업 채용 결과와 차이가 있을 수 있습니다.</p>
    `;
  } else {
    title.innerHTML = `<i class="fa-solid fa-shield-halved text-indigo-600"></i> 개인정보 취급방침`;
    content.innerHTML = `
      <p class="font-bold text-slate-800">1. 수집하는 개인정보 항목</p>
      <p>- 필수항목: 닉네임 또는 이메일 아이디 (실명 수집 없음)</p>
      <p class="font-bold text-slate-800 mt-2">2. 개인정보의 수집 및 이용목적</p>
      <p>- 사용자 맞춤형 커리어 분석 및 채용 정보 추천 서비스 제공</p>
      <p class="font-bold text-slate-800 mt-2">3. 개인정보의 보유 및 이용기간</p>
      <p>- 회원 탈퇴 시 혹은 로그아웃 시 즉시 파기됩니다.</p>
    `;
  }
  modal.classList.remove('hidden');
}

function closePolicyModal() {
  document.getElementById('policyModal').classList.add('hidden');
}

// Switch active Bottom Tab (비로그인 상태일 때는 로그인 진입 화면 강제)
function switchTab(tabId) {
  if (!currentUser.isLoggedIn && tabId !== 'login-gate') {
    tabId = 'login-gate';
  }

  ['login-gate', 'home', 's02', 's03', 's04'].forEach(id => {
    const tabElem = document.getElementById(`tab-${id}`);
    if(tabElem) tabElem.classList.add('hidden');
    const navBtn = document.getElementById(`nav-${id}`);
    if(navBtn) {
      navBtn.classList.remove('text-indigo-600');
      navBtn.classList.add('text-slate-400');
    }
  });

  const activeTab = document.getElementById(`tab-${tabId}`);
  if(activeTab) activeTab.classList.remove('hidden');
  const activeNav = document.getElementById(`nav-${tabId}`);
  if(activeNav) {
    activeNav.classList.remove('text-slate-400');
    activeNav.classList.add('text-indigo-600');
  }

  if (tabId === 'home') renderHomeDashboard();
  if (tabId === 's02') renderRecommendations();
  if (tabId === 's03') renderCompanyDetail(currentSelectedCompanyId);

  document.getElementById('mainContainer').scrollTop = 0;
}

function updateProfileFromInputs() {
  const sch = document.getElementById('inputSchool');
  if(sch) userProfile.school = sch.value.trim();
  const maj = document.getElementById('inputMajor');
  if(maj) userProfile.major = maj.value.trim();
  const st = document.getElementById('inputStatus');
  if(st) userProfile.status = st.value;
  
  const gpaStr = document.getElementById('inputGpa')?.value || "3.8";
  const gpaMatch = gpaStr.match(/([0-9.]+)/);
  userProfile.gpa = gpaMatch ? parseFloat(gpaMatch[1]) : 3.5;

  const certsElem = document.getElementById('inputCerts');
  if(certsElem) userProfile.certs = certsElem.value.split(',').map(s => s.trim()).filter(Boolean);
  const langElem = document.getElementById('inputLang');
  if(langElem) userProfile.languages = langElem.value.split(',').map(s => s.trim()).filter(Boolean);
  const crsElem = document.getElementById('inputCourses');
  if(crsElem) userProfile.courses = crsElem.value.split(',').map(s => s.trim()).filter(Boolean);
  const roleElem = document.getElementById('inputDesiredRole');
  if(roleElem) userProfile.desiredRole = roleElem.value;
  const locElem = document.getElementById('inputDesiredLoc');
  if(locElem) userProfile.desiredLoc = locElem.value;
}

function analyzeCompanyFit(company) {
  let totalPoints = 0;
  let metRequirements = [];
  let missingRequirements = [];

  if (company.requiredMajor.includes("무관")) {
    totalPoints += 25;
    metRequirements.push({ title: "전공 무관 충족", level: "ok" });
  } else if (userProfile.major.includes("컴퓨터") || userProfile.major.includes("소프트웨어")) {
    totalPoints += 25;
    metRequirements.push({ title: `관련 전공 (${userProfile.major})`, level: "ok" });
  } else {
    totalPoints += 10;
    missingRequirements.push({ title: "전공 우대 필요", level: "warn" });
  }

  if (userProfile.gpa >= company.minGpa) {
    totalPoints += 20;
    metRequirements.push({ title: `학점 요건 (${userProfile.gpa})`, level: "ok" });
  } else {
    totalPoints += 10;
    missingRequirements.push({ title: `학점 보완 (${company.minGpa} 이상)`, level: "warn" });
  }

  let userSkills = [...userProfile.courses, ...userProfile.certs];
  let techMatches = company.requiredTech.filter(tech => 
    userSkills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()))
  );

  if (techMatches.length > 0) {
    techMatches.forEach(t => metRequirements.push({ title: `필수 과목: ${t}`, level: "ok" }));
    totalPoints += Math.round((techMatches.length / company.requiredTech.length) * 30);
  }
  
  let missingTech = company.requiredTech.filter(tech => !techMatches.includes(tech));
  missingTech.forEach(t => missingRequirements.push({ title: `미수강: ${t}`, level: "warn" }));

  let certMatches = company.preferredCerts.filter(cert =>
    userProfile.certs.some(uCert => uCert.toLowerCase().includes(cert.toLowerCase()))
  );
  if (certMatches.length > 0) {
    certMatches.forEach(c => metRequirements.push({ title: `우대 자격: ${c}`, level: "ok" }));
    totalPoints += 25;
  } else {
    totalPoints += 15;
  }

  let fitScore = Math.min(Math.max(totalPoints, 55), 96);
  return { score: fitScore, metCount: metRequirements.length, missingCount: missingRequirements.length, metRequirements, missingRequirements };
}

// Render Home Tab
function renderHomeDashboard() {
  updateProfileFromInputs();

  const evaluated = companiesDB.map(c => ({ ...c, analysis: analyzeCompanyFit(c) }))
                               .sort((a,b) => b.analysis.score - a.analysis.score)
                               .slice(0, 3);

  const listContainer = document.getElementById('homeMatchedList');
  if(!listContainer) return;
  listContainer.innerHTML = '';

  evaluated.forEach(comp => {
    const itemHTML = `
      <div onclick="openCompanyDetail('${comp.id}')" class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between cursor-pointer">
        <div class="space-y-0.5">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-xs text-slate-800">${comp.name}</span>
            <span class="text-[9px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.2 rounded">추천</span>
          </div>
          <p class="text-[10px] text-slate-500">${comp.role}</p>
        </div>
        <div class="text-right flex items-center gap-2">
          <div>
            <span class="text-xs font-black text-indigo-600 block">${comp.analysis.score}%</span>
            <span class="text-[8px] text-slate-400">매칭도</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
        </div>
      </div>
    `;
    listContainer.insertAdjacentHTML('beforeend', itemHTML);
  });
}

// Render Recommendations Tab
function renderRecommendations() {
  updateProfileFromInputs();
  const summaryElem = document.getElementById('s02SummaryRole');
  if(summaryElem) summaryElem.innerHTML = `<i class="fa-solid fa-filter text-indigo-500"></i> ${userProfile.desiredRole} · ${userProfile.desiredLoc}`;

  let evaluated = companiesDB.map(comp => ({ ...comp, analysis: analyzeCompanyFit(comp) }));
  const sortOpt = document.getElementById('sortOption')?.value || 'fit';
  evaluated.sort((a, b) => sortOpt === 'fit' ? b.analysis.score - a.analysis.score : b.analysis.metCount - a.analysis.metCount);

  const listContainer = document.getElementById('recommendationList');
  const countElem = document.getElementById('recommendCount');
  if(countElem) countElem.innerText = evaluated.length;
  if(!listContainer) return;
  listContainer.innerHTML = '';

  evaluated.forEach(comp => {
    const { score, metCount, missingCount } = comp.analysis;
    const cardHTML = `
      <div class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <div class="flex items-start justify-between">
          <div>
            <span class="font-bold text-sm text-slate-800 block">${comp.name}</span>
            <p class="text-xs text-slate-500 font-medium">${comp.role}</p>
          </div>
          <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">${score}% 매칭</span>
        </div>
        <div class="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-xl text-center text-xs">
          <div><span class="text-[9px] text-slate-400 block">충족 조건</span><b class="text-emerald-600">${metCount}개</b></div>
          <div><span class="text-[9px] text-slate-400 block">보완 요건</span><b class="text-amber-600">${missingCount}개</b></div>
        </div>
        <button onclick="openCompanyDetail('${comp.id}')" class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition">
          상세보기 및 합격 진단
        </button>
      </div>
    `;
    listContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}

function openCompanyDetail(compId) {
  currentSelectedCompanyId = compId;
  switchTab('s03');
}

function renderCompanyDetail(compId) {
  updateProfileFromInputs();
  const comp = companiesDB.find(c => c.id === compId) || companiesDB[0];
  const analysis = analyzeCompanyFit(comp);
  const container = document.getElementById('companyDetailContainer');
  if(!container) return;

  const metChips = analysis.metRequirements.map(req => 
    `<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">✅ ${req.title}</span>`
  ).join(' ');

  const missingChips = analysis.missingRequirements.map(req => 
    `<span class="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">⚠️ ${req.title}</span>`
  ).join(' ');

  container.innerHTML = `
    <div class="flex justify-between items-start border-b border-slate-100 pb-3">
      <div>
        <h2 class="text-base font-bold text-slate-800">${comp.name}</h2>
        <p class="text-xs text-slate-500">${comp.role}</p>
      </div>
      <div class="text-right">
        <span class="text-xl font-black text-indigo-600">${analysis.score}%</span>
        <span class="text-[9px] text-slate-400 block">합격 가능성</span>
      </div>
    </div>

    <div class="space-y-1.5">
      <h4 class="text-xs font-bold text-slate-800">✅ 충족된 조건</h4>
      <div class="flex flex-wrap gap-1">${metChips}</div>
    </div>

    <div class="space-y-1.5">
      <h4 class="text-xs font-bold text-slate-800">⚠️ 보완이 필요한 조건</h4>
      <div class="flex flex-wrap gap-1">${missingChips}</div>
    </div>

    <div class="pt-2 border-t border-slate-100 space-y-1">
      <h4 class="text-xs font-bold text-slate-800">💡 AI 로드맵 솔루션</h4>
      <p class="text-xs text-slate-600 bg-indigo-50/60 p-2.5 rounded-xl">
        해당 기업은 <b>'${comp.requiredTech.join(', ')}'</b> 과목 지식을 중점 평가합니다. 이번 학기 내 부족 요건을 보완해보세요!
      </p>
    </div>
  `;
}

function handleTargetSearch() {
  const input = document.getElementById('targetSearchInput');
  if(!input) return;
  const query = input.value.trim();
  if (!query) return;
  const found = companiesDB.find(c => c.name.toLowerCase().includes(query.toLowerCase()));
  if (found) {
    currentSelectedCompanyId = found.id;
    renderCompanyDetail(found.id);
    showToast(`'${found.name}' 진단 결과입니다.`);
  } else {
    showToast(`'${query}' 검색 결과가 없어 기본 추천 기업으로 안내합니다.`);
  }
}

function handleProfileSubmit(e) {
  e.preventDefault();
  updateProfileFromInputs();
  showToast("마이페이지(스펙) 정보가 업데이트 되었습니다!");
  switchTab('home');
}

window.onload = function() {
  updateProfileFromInputs();
  updateHeaderAuthUI();
  switchTab('login-gate'); // 초기 앱 실행 시 로그인 선행 화면 출력
};