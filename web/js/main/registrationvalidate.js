// Global Variables
var nameVal = "";
var passwordVal = "";
var numberVal = "";
var cpasswordVal = "";
var otpVal = "";
var verifiedNum = [];

function showAlert(selector, msg, cls) {
    let regCardRect = document
            .getElementById("registration-card")
            .getBoundingClientRect();
    let eRect = selector.getBoundingClientRect();
    let c = eRect.bottom - regCardRect.top;
    $("#registration-card " + cls + " .tt").text(msg);
    $(cls).css("top", c - 6);
    $(cls).removeClass("display-none");
}

//  Validation on registration NAME

$("#registration-card #name").blur(function (e) {
    e.preventDefault();
    if (nameVal.length < 3 && nameVal.length > 0) {
        showAlert(e.target, "Name should atleast of 3 letters", ".n");
    }
});

$("#registration-card #name").focus(function (e) {
    $(".rtt.n").removeAttr("style");
    $(".rtt.n").addClass("display-none");
});

$("#registration-card #name").keypress(function (e) {
    let value = $(e.target).val();
    if (
            (e.charCode >= 65 && e.charCode <= 90) ||
            (e.charCode >= 97 && e.charCode <= 122)
            ) {
    } else {
        return false;
    }
});

$("#registration-card #name").keyup(function (e) {
    $(".num-verified").addClass("display-none");
    $(".login-registration-page-container button").css("cursor", "default");
    $("#registration-card #register-btn").addClass("inactive-btn");
    $("#registration-card #register-btn").removeClass("flag");
    nameVal = $(e.target).val();
    if (nameVal.length < 3 && nameVal.length > 0) {
        $("#registration-card #name").removeClass("flag");
        $("#registration-card #name").css("border", "thin solid #cc3300");
    } else if (nameVal.length !== 0 && nameVal.length >= 3) {
        $("#registration-card #name").addClass("flag");
        $("#registration-card #name").css("border", "thin solid #4BB543");
    } else {
        $("#registration-card #name").removeClass("flag");
        $("#registration-card #name").removeAttr("style");
    }
    activeButton();
});

//  Validation on registration password

$("#registration-card #registration-password").keyup(function (e) {
    $(".num-verified").addClass("display-none");
    $(".login-registration-page-container button").css("cursor", "default");
    $("#registration-card #register-btn").addClass("inactive-btn");
    $("#registration-card #register-btn").removeClass("flag");
    passwordVal = $(e.target).val();
    if (passwordVal.length < 6 && passwordVal.length !== 0) {
        $("#registration-card #registration-password").removeClass("flag");
        $("#registration-card #registration-password").css(
                "border",
                "thin solid #cc3300"
                );
    } else if (passwordVal.length === 0) {
        $("#registration-card #registration-password").removeClass("flag");
        $("#registration-card #registration-password").removeAttr("style");
    } else {
        $("#registration-card #registration-password").addClass("flag");
        $("#registration-card #registration-password").css(
                "border",
                "thin solid #4BB543"
                );
    }
    activeButton();
});

$("#registration-card #registration-password").blur(function (e) {
    e.preventDefault();
    if (passwordVal.length < 6 && passwordVal.length > 0) {
        showAlert(
                e.target,
                "Password length should be 6-14 characters long",
                ".p"
                );
    }
});

$("#registration-card #registration-password").focus(function (e) {
    $(".rtt.p").removeAttr("style");
    $(".rtt.p").addClass("display-none");
});

//  Validation on registration NUMBER

$("#registration-card #phone").keypress(function (e) {
    if (e.charCode >= 48 && e.charCode <= 57) {
    } else {
        return false;
    }
});

$("#registration-card #phone").keyup(function (e) {
    $(".num-verified").addClass("display-none");
    $(".login-registration-page-container button").css("cursor", "default");
    $("#registration-card #register-btn").addClass("inactive-btn");
    $("#registration-card #register-btn").removeClass("flag");
    numberVal = $(e.target).val();
    if (numberVal.length < 10 && numberVal.length !== 0) {
        $("#registration-card #phone").removeClass("flag");
        $("#registration-card .pno").css("border", "thin solid #cc3300");
    } else if (numberVal.length === 0) {
        $("#registration-card #phone").removeClass("flag");
        $("#registration-card .pno").removeAttr("style");
    } else {
        $("#registration-card #phone").addClass("flag");
        $("#registration-card .pno").css("border", "thin solid #4BB543");
    }
    activeButton();
});

$("#registration-card #phone").blur(function (e) {
    e.preventDefault();
    if (numberVal.length < 10 && numberVal.length > 0) {
        showAlert(e.target, "Please enter a valid phone number", ".num");
    }
});

$("#registration-card #phone").focus(function (e) {
    $(".rtt.num").removeAttr("style");
    $(".rtt.num").addClass("display-none");
});

// Showing request otp link

function activeButton() {
    let count = 0;
    $("#registration-card input").each(function (i, e) {
        if ($(e).hasClass("flag")) {
            count++;
        }
    });
    if (count === 3) {
        for (let n of verifiedNum) {
            if (n === numberVal) {
                $(".num-verified").removeClass("display-none");
                $("#registration-card #register-btn").removeClass("inactive-btn");
                $("#registration-card #register-btn").addClass("flag");
                $("#registration-card #register-btn").css("cursor", "pointer");
            }
        }
        if ($(".num-verified").hasClass("display-none")) {
            $("#registration-card .request-otp").removeClass("display-none");
        }
    } else {
        $("#registration-card .request-otp").addClass("display-none");
    }
}

// OTP and confirm password Verification

$(".otp-section .bx-arrow-back").click(function (e) {
    $(".otp-section").addClass("display-none");
    $("#registration-card .request-otp").removeClass("display-none");
    $(".otp-section input").val("");
    $(".otp-section input").removeAttr("style");
    $(".rtt.n").removeAttr("style");
    $(".rtt.n").addClass("display-none");
    $(".rtt.p").removeAttr("style");
    $(".rtt.p").addClass("display-none");
});

// 1.) Confirm password verification
$("#c-pwd").keyup(function (e) {
    cpasswordVal = $(e.target).val();
    if (cpasswordVal === "") {
        $(e.target).removeAttr("style");
        $(e.target).removeClass("flag2");
    } else if (cpasswordVal === passwordVal) {
        $(e.target).addClass("flag2");
        $(e.target).css("border-bottom", "thin solid #4BB543");
    } else {
        $(e.target).css("border-bottom", "thin solid #cc3300");
        $(e.target).removeClass("flag2");
    }
});

$("#registration-card #c-pwd").blur(function (e) {
    if (cpasswordVal !== passwordVal && cpasswordVal !== "") {
        showAlert(e.target, "Not matched with password!", ".n");
    }
});

$("#registration-card #c-pwd").focus(function (e) {
    $(".rtt.n").removeAttr("style");
    $(".rtt.n").addClass("display-none");
});

// 2.) Otp Verification

$("#otp").keyup(function (e) {
    otpVal = $(e.target).val();
    if (otpVal === "") {
        $(e.target).removeAttr("style");
        $(e.target).removeClass("flag2");
    } else if (otpVal.length === 4) {
        $(e.target).css("border-bottom", "thin solid #4BB543");
        $(e.target).addClass("flag2");
    } else {
        $(e.target).css("border-bottom", "thin solid #cc3300");
        $(e.target).removeClass("flag2");
    }
});

$("#registration-card #otp").blur(function (e) {
    if (otpVal.length < 4 && otpVal.length > 0) {
        showAlert(e.target, "Wrong otp!", ".p");
    }
});

$("#registration-card #otp").focus(function (e) {
    $(".rtt.p").removeAttr("style");
    $(".rtt.p").addClass("display-none");
});

//Request OTP

$(".request-otp a").click(function (e) {
    e.preventDefault();
    $(".request-otp a").addClass("loading");
    let data = {username: nameVal, password: passwordVal, phone: numberVal};
    let xhr = $.post("SmsSenderServlet", data, responseText => {
        if (responseText === "success") {
            $(".request-otp a").removeClass("loading");
            $(".otp-section button").removeAttr("style");
            $(".otp-section").removeClass("display-none");
            $("#registration-card .request-otp").addClass("display-none");
        } else if(responseText==="error"){
            $(".request-otp a").removeClass("loading");
            swal("Error!", "Server facing some issues. Try again later!", "error");
        }else {
            $(".request-otp a").removeClass("loading");
            showAlert($("#phone")[0], responseText, ".num");
        }
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});


// Submit otp handling

$(".otp-section .submit-otp-btn").click(function (e) {
    if (!$("#registration-card #c-pwd").hasClass("flag2")) {
        if (cpasswordVal.length === 0) {
            showAlert($("#c-pwd")[0], "Confirm password can't be empty", ".n");
            return false;
        }
        return false;
    }
    if (!$("#otp").hasClass("flag2")) {
        if (otpVal.length === 0) {
            showAlert($("#otp")[0], "OTP missing!", ".p");
            return false;
        }
        return false;
    }
    $(e.target).addClass("loading");
    let data = {username: nameVal, password: passwordVal, phone: numberVal, otp: otpVal};
    let p1 = new Promise(function (resolve, reject) {
        let xhr = $.post("CheckOtpServlet", data, responseText => {
            if (responseText === "correct") {
                resolve();
            } else {
                showAlert($("#otp")[0], "OTP not matched!", ".p");
                $(".submit-otp-btn").removeClass("loading");
            }
        });
        xhr.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    });
    p1.then(() => {
        verifiedNum.push(numberVal);
        $(".otp-section input").val("");
        $(".otp-section input").removeAttr("style");
        $(".otp-section").addClass("display-none");
        $(".submit-otp-btn").removeClass("loading");
        $(".num-verified").removeClass("display-none");
        $("#registration-card #register-btn").removeClass("inactive-btn");
        $("#registration-card #register-btn").addClass("flag");
        $("#registration-card #register-btn").css("cursor", "pointer");
    });
});

//Register button handler

$("body").on('click', '#registration-card #register-btn', function (e) {
    if (!$("#registration-card #register-btn").hasClass("flag")) {
        return false;
    }
    $("#registration-card #register-btn").addClass("loading");
    let data = {username: nameVal, password: passwordVal, phone: numberVal};
    let xhr = $.post("RegistrationServlet", data, responseText => {
        if (responseText === "success") {
            $("#registration-card #register-btn").removeClass("loading");
            $("#registration-card #register-btn").text("Registered");
            $("#registration-card #register-btn").css("background-color", "green");
            $("#registration-card *").addClass("pointer-none");
            setTimeout(function () {
                $("#registration-card *").removeClass("pointer-none");
                $("#registration-card #register-btn").text("Register");
                $("#registration-card #register-btn").removeAttr("style");
                $("#registration-card #login-link").trigger("click");
                $(".login-registration-page-container .company-logo strong").trigger('click');
            }, 2000);
        } else {
            swal("Error!", "Server facing some issues. Try again later!", "error");
        }
    });
});