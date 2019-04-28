
document.addEventListener('DOMContentLoaded', function () {

    fetch("http://localhost:2424/GetSSOURL")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            document.getElementById("ssologin").setAttribute("href", data);
        })
})