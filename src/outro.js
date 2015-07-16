
if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = Faiash;
} else {
    window.Faiash = Faiash;
    if (!window.$) {
        window.$ = Faiash;
    }
}
})();
