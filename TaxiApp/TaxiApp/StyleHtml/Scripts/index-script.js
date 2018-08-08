$(document).ready(function () {
    $("#prijava").click(function () {
        let korisnik = {
            KorisnickoIme: `${$('#korIme').val()}`,
            Lozinka: `${$('#korPass').val()}`
        };

        $.ajax({
            type: 'POST',
            url: '/api/Login',
            data: JSON.stringify(korisnik),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno ulogovan korisnik');
                    localStorage.setItem("logovan", korisnik.KorisnickoIme);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Neuspesno logovanje jer nije registrovan');
                }
            },
        })
    });

    $("#registracija").click(function () {
        let korisnik = {
            KorisnickoIme: `${$('#korImeReg').val()}`,
            Lozinka: `${$('#korPassReg').val()}`,
            Ime: `${$('#ime').val()}`,
            Prezime: `${$('#prezime').val()}`,
            Pol: `${$('#pol').val()}`,
            JMBG: ` ${$('#jmbg').val()}`,
            Email: `${$('#email').val()}`,
            KontaktTelefon: `${$('#brTelefona').val()}`
        };

        $.ajax({
            type: 'POST',
            url: '/api/Korisnik',
            data: JSON.stringify(korisnik),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno registrovan korisnik');
                    $(location).attr('href', 'index.html');
                } else {
                    alert('Vec je registrovan korisnik');
                }
            },
        })
    });
});