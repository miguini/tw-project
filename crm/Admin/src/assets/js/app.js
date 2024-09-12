/*
Template Name: MS- Admin & Dashboard Template
Author: Themesbrand
Version: 4.2.0
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Main Js File
*/
function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    const isLoginPage = window.location.pathname.includes('pages-login.html');
    
    if (!token && !isLoginPage) {
        window.location.href = 'pages-login.html';  // Redirige solo si no estás en la página de login
    }
}
function logout() {
    localStorage.removeItem('token');  // Elimina el token
    window.location.href = 'pages-login.html';  // Redirige al login
}


(function ($) {

    'use strict';

    function initMetisMenu() {
        //metis menu
        $("#side-menu").metisMenu();
    }

    function initLeftMenuCollapse() {
        $('#vertical-menu-btn').on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('sidebar-enable');
            if ($(window).width() >= 992) {
                $('body').toggleClass('vertical-collpsed');
            } else {
                $('body').removeClass('vertical-collpsed');
            }
        });
    }

    function initActiveMenu() {
        // === following js will activate the menu in left side bar based on url ====
        $("#sidebar-menu a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("mm-active"); // add active to li of the current link
                $(this).parent().parent().addClass("mm-show");
                $(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("mm-active");
                $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
                $(this).parent().parent().parent().parent().parent().addClass("mm-active");
            }
        });
    }

    function initMenuItem() {
        $(".navbar-nav a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) { 
                $(this).addClass("active");
                $(this).parent().addClass("active");
                $(this).parent().parent().addClass("active");
                $(this).parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().parent().addClass("active");
            }
        });
    }

    function initMenuItemScroll() {
        // focus active menu in left sidebar
        $(document).ready(function(){
            if($("#sidebar-menu").length > 0 && $("#sidebar-menu .mm-active .active").length > 0){
                var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
                if( activeMenu > 300) {
                    activeMenu = activeMenu - 300;
                    $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: activeMenu }, "slow");
                }
            }
        });
    }

    function initFullScreen() {
        $('[data-bs-toggle="fullscreen"]').on("click", function (e) {
            e.preventDefault();
            $('body').toggleClass('fullscreen-enable');
            if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        });
        document.addEventListener('fullscreenchange', exitHandler );
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange", exitHandler);
        
        function exitHandler() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                console.log('pressed');
                $('body').removeClass('fullscreen-enable');
            }
        }
    }

    function initRightSidebar() {
        // right side-bar toggle
        $('.right-bar-toggle').on('click', function (e) {
            $('body').toggleClass('right-bar-enabled');
        });

        $(document).on('click', 'body', function (e) {
            if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
                return;
            }

            $('body').removeClass('right-bar-enabled');
            return;
        });
    }

    function initDropdownMenu() {
        if(document.getElementById("topnav-menu-content")){
            var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
            for(var i = 0, len = elements.length; i < len; i++) {
                elements[i].onclick = function (elem) {
                    if(elem.target.getAttribute("href") === "#") {
                        elem.target.parentElement.classList.toggle("active");
                        elem.target.nextElementSibling.classList.toggle("show");
                    }
                }
            }
            window.addEventListener("resize", updateMenu);
        }
    }

    function updateMenu() {
        var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
        for(var i = 0, len = elements.length; i < len; i++) {
            if(elements[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
                elements[i].parentElement.classList.remove("active");
                elements[i].nextElementSibling.classList.remove("show");
            }
        }
    }
    
    function initComponents() {
        $(function () {
            $('[data-bs-toggle="tooltip"]').tooltip()
        })

        $(function () {
            $('[data-bs-toggle="popover"]').popover()
        })
    }

    function initPreloader() {
        $(window).on('load', function() {
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
        });
    }

    function initSettings() {
        if (window.sessionStorage) {
            var alreadyVisited = sessionStorage.getItem("is_visited");
            if (!alreadyVisited) {
                sessionStorage.setItem("is_visited", "light-mode-switch");
            } else {
                $(".right-bar input:checkbox").prop('checked', false);
                $("#"+alreadyVisited).prop('checked', true);
                updateThemeSetting(alreadyVisited);
            }
        }
        $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch").on("change", function(e) {
            updateThemeSetting(e.target.id);
        });
    }

    function updateThemeSetting(id) {
        if($("#light-mode-switch").prop("checked") == true && id === "light-mode-switch"){
            $("html").removeAttr("dir");
            $("#dark-mode-switch").prop("checked", false);
            $("#rtl-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr('href','assets/css/bootstrap.min.css');
            $("#app-style").attr('href','assets/css/app.min.css');
            sessionStorage.setItem("is_visited", "light-mode-switch");
        } else if($("#dark-mode-switch").prop("checked") == true && id === "dark-mode-switch"){
            $("html").removeAttr("dir");
            $("#light-mode-switch").prop("checked", false);
            $("#rtl-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr('href','assets/css/bootstrap-dark.min.css');
            $("#app-style").attr('href','assets/css/app-dark.min.css');
            sessionStorage.setItem("is_visited", "dark-mode-switch");
        } else if($("#rtl-mode-switch").prop("checked") == true && id === "rtl-mode-switch"){
            $("#light-mode-switch").prop("checked", false);
            $("#dark-mode-switch").prop("checked", false);
            $("#bootstrap-style").attr('href','assets/css/bootstrap-rtl.min.css');
            $("#app-style").attr('href','assets/css/app-rtl.min.css');
            $("html").attr("dir", 'rtl');
            sessionStorage.setItem("is_visited", "rtl-mode-switch");
        }
    }
    
    async function obtenerBalance() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/user/balance', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
            if (response.ok) {
                document.getElementById('balanceCard').textContent = '$' + data.balance;
            } else {
                console.error('Error al obtener el balance:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function obtenerOperaciones() {
        const token = localStorage.getItem('token'); // Asegúrate de que el token se almacene correctamente
    
        fetch('http://localhost:5000/api/operations', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('operationsCount').textContent = data.operations;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    
    
    // Llama a la función cuando se cargue el DOM
    document.addEventListener('DOMContentLoaded', obtenerOperaciones);
    
    
    function actualizarGraficoConRendimiento(data) {
        const chartElement = document.querySelector('#chart-with-area');
        if (chartElement && data.rendimiento && data.rendimiento.length > 0) {
            new Chartist.Line(chartElement, {
                labels: data.meses,  
                series: [data.rendimiento]
            }, {
                low: Math.min(...data.rendimiento) - 10,
                high: Math.max(...data.rendimiento) + 10,
                showArea: true,
                fullWidth: true,
                chartPadding: { right: 40 }
                // plugins: [Chartist.plugins.tooltip()] // Desactivado temporalmente
            });
        } else {
            console.error('El gráfico o los datos no están disponibles');
        }
    }
    
    
    
    
    
    
    
    
    
    let chartInstance;  // Define una variable fuera de la función para almacenar el gráfico

    function obtenerRendimiento() {
        const token = localStorage.getItem('token'); 
        fetch('http://localhost:5000/api/user/performance', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
    
            // Invertir los datos antes de mostrarlos en el gráfico
            data.meses.reverse();
            data.rendimiento.reverse();
    
            const ctx = document.getElementById('chartPerformance').getContext('2d');
    
            // Si ya existe un gráfico, destrúyelo antes de crear uno nuevo
            if (chartInstance) {
                chartInstance.destroy();
            }
    
            // Crear un nuevo gráfico
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.meses,
                    datasets: [{
                        label: 'Performance',
                        data: data.rendimiento,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al obtener el rendimiento:', error));
    }
    
    
    
    
    document.addEventListener('DOMContentLoaded', obtenerRendimiento);
    document.addEventListener('DOMContentLoaded', obtenerOperaciones);
    
    
    
    function init() {
        verificarAutenticacion();  // Añadido aquí
        obtenerBalance();
        initMetisMenu();
        initLeftMenuCollapse();
        initActiveMenu();
        initMenuItem();
        initMenuItemScroll();
        initFullScreen();
        initRightSidebar();
        initDropdownMenu();
        initComponents();
        initSettings();
        initPreloader();
        Waves.init();
        obtenerRendimiento();
        obtenerOperaciones();
    }

    init();
    
    })(jQuery);
    