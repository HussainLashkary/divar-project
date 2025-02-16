document.getElementById('sendOtpForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const mobile = document.getElementById('mobile').value;

    try {
        const response = await fetch('/send-otp', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: mobile })
        });

        const result = await response.json();

        const otpPopup = document.getElementById('otpPopup');
        const otpMessage = document.getElementById('otpMessage');

        if (result.success) {
            otpMessage.innerText = `Your OTP is: ${result.otp}`;
            document.getElementById('otpForm').style.display = 'block';
            document.getElementById('mobileHidden').value = mobile; // Set hidden input value
        } else {
            otpMessage.innerText = result.message; 
            otpPopup.style.display = "block"; // Ensure the popup is displayed
        }

        const closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.onclick = function() {
            otpPopup.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == otpPopup) {
                otpPopup.style.display = "none";
            }
        };

        document.getElementById('closePopupButton').addEventListener('click', function() {
            otpPopup.style.display = 'none';
        });
    } catch (error) {
        const otpMessage = document.getElementById('otpMessage');
        otpMessage.innerText = 'An error occurred while sending OTP.';
        const otpPopup = document.getElementById('otpPopup');
        otpPopup.style.display = "block";
    }
});

document.getElementById('verifyOtpButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const otp = document.getElementById('otp').value;
    const mobile = document.getElementById('mobileHidden').value;

    try {
        const response = await fetch('/auth/verify-otp', { // Update to the correct route for OTP verification
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile, otp })
        });

        const result = await response.json({
            message: "failed to verify otp"
        });

        if (result.success) {
            window.location.href = '/post/my'; // Redirect to the desired route
        } else {
            displayMessage(result.message);
        }
    } catch (error) {
        displayMessage('An error occurred while verifying OTP.');
    }
});

function displayMessage(message) {
    const otpPopup = document.getElementById('otpPopup');
    const otpMessage = document.getElementById('otpMessage');
    otpMessage.innerText = message;
    otpPopup.style.display = 'block';

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        otpPopup.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === otpPopup) {
            otpPopup.style.display = 'none';
        }
    };
}
