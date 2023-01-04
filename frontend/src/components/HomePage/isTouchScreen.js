var isTouchScreen = false;

if ("maxTouchPoints" in navigator) {
    isTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    isTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        isTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
        isTouchScreen = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        isTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

export default isTouchScreen;

/**reference：https://stackoverflow.com/questions/72502079/how-can-i-check-if-the-device-which-is-using-my-website-is-a-mobile-user-or-no **/