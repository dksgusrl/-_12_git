// 다크 모드 설정
const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;

// localStorage에서 다크 모드 설정 확인
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// 다크 모드 토글 이벤트
darkModeBtn.addEventListener('click', function() {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        darkModeBtn.textContent = '다크 모드';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkModeBtn.textContent = '라이트 모드';
    }
});

// 초기 다크 모드 버튼 텍스트 설정
if (body.getAttribute('data-theme') === 'dark') {
    darkModeBtn.textContent = '라이트 모드';
} else {
    darkModeBtn.textContent = '다크 모드';
}

// 비밀번호 유효성 검사
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordStrength = document.getElementById('passwordStrength');

passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    
    // 비밀번호 강도 업데이트
    passwordStrength.textContent = strength.text;
    passwordStrength.className = 'password-strength ' + strength.class;
});

confirmPasswordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password !== confirmPassword && confirmPassword !== '') {
        confirmPasswordInput.setCustomValidity('비밀번호가 일치하지 않습니다');
    } else {
        confirmPasswordInput.setCustomValidity('');
    }
});

// 비밀번호 강도 확인 함수
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push('최소 8자 이상');
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('대문자 포함');
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push('소문자 포함');
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push('숫자 포함');
    
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else feedback.push('특수문자 포함');
    
    switch (strength) {
        case 0:
        case 1:
            return { text: '매우 약함', class: 'very-weak' };
        case 2:
            return { text: '약함', class: 'weak' };
        case 3:
            return { text: '보통', class: 'medium' };
        case 4:
            return { text: '강함', class: 'strong' };
        case 5:
            return { text: '매우 강함', class: 'very-strong' };
        default:
            return { text: '', class: '' };
    }
}

// 폼 제출 처리
const form = document.getElementById('membershipForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // 유효성 검사
    let isValid = true;
    
    // 필수 항목 확인
    const requiredFields = ['memberId', 'password', 'confirmPassword', 'name', 'phone', 'region'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    // 아이디 중복 확인 (더미 데이터)
    const memberId = document.getElementById('memberId').value;
    const existingIds = ['admin', 'user1', 'test123'];
    if (existingIds.includes(memberId)) {
        isValid = false;
        alert('이미 사용 중인 아이디입니다.');
        return;
    }
    
    // 비밀번호 일치 확인
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        isValid = false;
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }
    
    // 이메일 형식 확인
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
        isValid = false;
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
    }
    
    // 전화번호 형식 확인
    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phonePattern.test(phone)) {
        isValid = false;
        alert('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
        return;
    }
    
    if (isValid) {
        // 로딩 상태 표시
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 처리 중...';
        
        // 가입 처리 시뮬레이션
        setTimeout(() => {
            alert('회원가입이 완료되었습니다!');
            
            // 가입 완료 페이지로 이동
            window.location.href = 'join_complete.html';
        }, 2000);
    }
});

// 아이디 중복 확인 함수
function checkIdDuplicate() {
    const memberId = document.getElementById('memberId').value;
    const idCheckResult = document.getElementById('idCheckResult');
    
    if (!memberId.trim()) {
        idCheckResult.textContent = '';
        return;
    }
    
    // 더미 데이터로 중복 확인
    const existingIds = ['admin', 'user1', 'test123'];
    
    if (existingIds.includes(memberId)) {
        idCheckResult.textContent = '이미 사용 중인 아이디입니다.';
        idCheckResult.style.color = '#e74c3c';
    } else {
        idCheckResult.textContent = '사용 가능한 아이디입니다.';
        idCheckResult.style.color = '#27ae60';
    }
}

// 아이디 입력 시 중복 확인
document.getElementById('memberId').addEventListener('input', checkIdDuplicate);

// 지역 선택 변경 시 세부 지역 표시
const regionSelect = document.getElementById('region');
const detailRegionDiv = document.getElementById('detailRegion');

regionSelect.addEventListener('change', function() {
    const selectedRegion = this.value;
    
    if (selectedRegion === '서울') {
        detailRegionDiv.style.display = 'block';
    } else {
        detailRegionDiv.style.display = 'none';
    }
});

// 폼 초기화
function clearForm() {
    form.reset();
    // 유효성 검사 메시지 초기화
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#ddd';
    });
    
    document.getElementById('idCheck
