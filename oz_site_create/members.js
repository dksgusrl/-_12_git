// Member management functionality
let members = [];

// Clear form with animation
function clearForm() {
    const form = document.getElementById('membershipForm');
    form.reset();
    
    // Add a subtle animation
    form.style.transform = 'scale(0.98)';
    setTimeout(() => {
        form.style.transform = 'scale(1)';
    }, 150);
    
    updateDisplay();
}

// Enhanced display update with animation
function updateDisplay() {
    const form = document.getElementById('membershipForm');
    const formData = new FormData(form);
    
    const fields = [
        { id: 'displayId', key: 'memberId' },
        { id: 'displayName', key: 'name' },
        { id: 'displayPhone', key: 'phone' },
        { id: 'displayRegion', key: 'region' },
        { id: 'displayGender', key: 'gender' },
        { id: 'displayEmail', key: 'email' },
        { id: 'displayIntroduction', key: 'introduction' }
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        const value = formData.get(field.key) || '-';
        
        if (element && element.textContent !== value) {
            element.style.transition = 'all 0.3s ease';
            element.style.transform = 'scale(1.05)';
            element.style.color = '#667eea';
            
            setTimeout(() => {
                element.textContent = value;
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 150);
        }
    });
}

// Enhanced form validation
function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (password !== confirmPassword) {
        showNotification('비밀번호가 일치하지 않습니다.', 'error');
        return false;
    }
    
    if (email && !isValidEmail(email)) {
        showNotification('올바른 이메일 형식을 입력해주세요.', 'error');
        return false;
    }
    
    if (phone && !isValidPhone(phone)) {
        showNotification('올바른 전화번호 형식을 입력해주세요.', 'error');
        return false;
    }
    
    return true;
}

// Utility functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^010-\d{4}-\d{4}$/.test(phone);
}

// Add member to array
function addMember(memberData) {
    members.push(memberData);
    
    // Update member count in stats
    const memberCountElement = document.querySelectorAll('.stat-number')[1];
    if (memberCountElement) {
        memberCountElement.textContent = members.length;
    }
}

// Get member by ID
function getMemberById(id) {
    return members.find(member => member.memberId === id);
}

// Update member information
function updateMember(id, updatedData) {
    const index = members.findIndex(member => member.memberId === id);
    if (index !== -1) {
        members[index] = { ...members[index], ...updatedData };
        return true;
    }
    return false;
}

// Delete member
function deleteMember(id) {
    const index = members.findIndex(member => member.memberId === id);
    if (index !== -1) {
        members.splice(index, 1);
        
        // Update member count in stats
        const memberCountElement = document.querySelectorAll('.stat-number')[1];
        if (memberCountElement) {
            memberCountElement.textContent = members.length;
        }
        return true;
    }
    return false;
}

// Initialize member management
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('membershipForm');
    
    // Real-time form updates
    if (form) {
        form.addEventListener('input', updateDisplay);
        form.addEventListener('change', updateDisplay);
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const formData = new FormData(form);
                const memberData = {};
                
                for (let [key, value] of formData.entries()) {
                    memberData[key] = value;
                }
                
                addMember(memberData);
                showNotification('회원가입이 완료되었습니다!');
                updateDisplay();
            }
        });
        
        // Initialize display
        updateDisplay();
    }
});
