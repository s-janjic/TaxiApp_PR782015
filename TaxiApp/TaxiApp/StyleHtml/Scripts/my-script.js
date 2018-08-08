$(document).ready(function () {
    let primljeno = localStorage.getItem("logovan");
    let usernameKor;
    let polShow;
    $.ajax({
        type: 'POST',
        url: '/api/Start',
        data: JSON.stringify(primljeno),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            dataTmp = data;
            usernameKor = `${dataTmp.KorisnickoIme}`;
            if (data != null) {
                alert('Uspesno slanje.');
                if (data.Uloga == 2) {   // dispecer login
                    $("#dispecerDiv").show();
                    $("#IzmeniDispecera").hide();
                    $("#korisnikDiv").hide();
                    $("#vozacDiv").hide();
                    $("#usernameDispecera").show();
                    $("#usernameDispecera").html(usernameKor);
                    $("#PrikazKorisnikInfoDisp").hide();
                    if (data.Pol == 0) // musko
                    {
                        polShow = "Musko";
                    }
                    else {
                        polShow = "Zensko";
                    }
                } else if (data.Uloga == 0) { // musterija login
                    $("#korisnikDiv").show();
                    $("#IzmeniKorisnika").hide();
                    $("#dispecerDiv").hide();
                    $("#vozacDiv").hide();
                    $("#usernameKorisnika").show();
                    $("#usernameKorisnika").html(usernameKor);
                    $("#PrikaziVoznjeMusterijeDiv").hide();
                    $("#PrikazKorisnikInfo").hide();
                    $("#IzmenaVoznja").hide();
                    $("#KomentarVoznja").hide();
                    if (data.Pol == 0) // musko
                    {
                        polShow = "Musko";
                    }
                    else {
                        polShow = "Zensko";
                    }
                } else {
                    $("#vozacDiv").show();
                    $("#dispecerDiv").hide();
                    $("#korisnikDiv").hide();
                    $("#usernameVozaca").show();
                    $("#usernameVozaca").html(usernameKor);
                    if (data.Pol == 0) // musko
                    {
                        polShow = "Musko";
                    }
                    else {
                        polShow = "Zensko";
                    }
                }
            } else {
                alert('Neuspesno slanje.');
            }
        },
    })

    $("#showInfo").click(function () {
        $("#PrikazKorisnikInfo").show("slow");
        $("#PrikaziVoznjeMusterijeDiv").hide();
        $("#IzmenaVoznja").hide();
        $("#KomentarVoznja").hide();

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += `<tr><td>ID</td><td>${dataTmp.Id}</td></tr>`;
        tableofData += `<tr><td>Korisnicko ime</td><td>${dataTmp.KorisnickoIme}</td></tr>`;
        tableofData += `<tr><td>Lozinka</td><td>${dataTmp.Lozinka}</td></tr>`;
        tableofData += `<tr><td>Ime</td><td>${dataTmp.Ime}</td></tr>`;
        tableofData += `<tr><td>Prezime</td><td>${dataTmp.Prezime}</td></tr>`;
        tableofData += `<tr><td>JMBG</td><td>${dataTmp.JMBG}</td></tr>`;
        tableofData += `<tr><td>Pol</td><td>${polShow}</td></tr>`;
        tableofData += `<tr><td>Kontakt telefon</td><td>${dataTmp.KontaktTelefon}</td></tr>`;
        tableofData += `<tr><td>Email</td><td>${dataTmp.Email}</td></tr>`;
        tableofData += "</table>";
        $("#PrikazKorisnikInfoShow").html(tableofData);
    });

    $("#izmeniKorisnik").click(function () {
        $("#PrikazKorisnikInfo").hide();
        $("#PrikaziVoznjeMusterijeDiv").hide();
        $("#IzmenaVoznja").hide();
        $("#KomentarVoznja").hide();

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += "<tr><td>Korisnicko ime</td><td><input class=\"form-control\" id=\"korImeReg\" type=\"text\" name=\"KorisnickoIme\" value=\"" + dataTmp.KorisnickoIme + "\" disabled /></td></tr>";
        tableofData += "<tr><td>Lozinka</td><td><input class=\"form-control\" id=\"korPassReg\" type=\"password\" name=\"Lozinka\" value=\"" + dataTmp.Lozinka + "\"/></td></tr>";
        tableofData += "<tr><td>Ime</td><td><input class=\"form-control\" id=\"ime\" type=\"text\" name=\"Ime\" value=\"" + dataTmp.Ime + "\"/></td></tr>";
        tableofData += "<tr><td>Prezime</td><td><input class=\"form-control\" id=\"prezime\" type=\"text\" name=\"Prezime\" value=\"" + dataTmp.Prezime + "\"/></td></tr>";
        tableofData += "<tr><td>JMBG</td><td><input class=\"form-control\" id=\"jmbg\" type=\"text\" name=\"JMBG\" value=\"" + dataTmp.JMBG + "\"/></td></tr>";
        tableofData += "<tr><td>Email</td><td><input class=\"form-control\" id=\"email\" type=\"email\" name=\"Email\" value=\"" + dataTmp.Email + "\"/></td></tr>";
        tableofData += "<tr><td>Kontakt telefon</td><td><input class=\"form-control\" id=\"brTelefona\" type=\"text\" name=\"KontaktTelefon\" value=\"" + dataTmp.KontaktTelefon + "\"/></td></tr>";
        tableofData += "</table>";
        $("#IzmenaShow").html(tableofData);
    });

    $("#showInfoDisp").click(function () {
        $("#PrikazKorisnikInfoDisp").show();

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += `<tr><td>ID</td><td>${dataTmp.Id}</td></tr>`;
        tableofData += `<tr><td>Korisnicko ime</td><td>${dataTmp.KorisnickoIme}</td></tr>`;
        tableofData += `<tr><td>Lozinka</td><td>${dataTmp.Lozinka}</td></tr>`;
        tableofData += `<tr><td>Ime</td><td>${dataTmp.Ime}</td></tr>`;
        tableofData += `<tr><td>Prezime</td><td>${dataTmp.Prezime}</td></tr>`;
        tableofData += `<tr><td>JMBG</td><td>${dataTmp.JMBG}</td></tr>`;
        tableofData += `<tr><td>Pol</td><td>${polShow}</td></tr>`;
        tableofData += `<tr><td>Kontakt telefon</td><td>${dataTmp.KontaktTelefon}</td></tr>`;
        tableofData += `<tr><td>Email</td><td>${dataTmp.Email}</td></tr>`;
        tableofData += "</table>";
        $("#PrikazKorisnikInfoShowDisp").html(tableofData);
    });

    $("#potvrdiIzmenu").click(function () {
        let korisnik = {
            Id: dataTmp.Id,
            KorisnickoIme: `${$('#korImeReg').val()}`,
            Lozinka: `${$('#korPassReg').val()}`,
            Ime: `${$('#ime').val()}`,
            Prezime: `${$('#prezime').val()}`,
            Pol: dataTmp.Pol,
            JMBG: ` ${$('#jmbg').val()}`,
            Email: `${$('#email').val()}`,
            KontaktTelefon: `${$('#brTelefona').val()}`,
            Uloga: dataTmp.Uloga
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Korisnik/' + dataTmp.Id,
            data: JSON.stringify(korisnik),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno izmenjen korisnik');
                    localStorage.setItem("logovan", korisnik.KorisnickoIme);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ne postoji korisnik kojeg zelite da menjate');
                }
            },
        })
    });

    $(document).on('click', '#izmeniVoznja', function () {
        let trigger_btn = $(this).val();
        localStorage.setItem("voznjaIzmena", trigger_btn);
        $("#PrikazKorisnikInfo").hide();
        $("#IzmenaVoznja").show();
        $("#PrikaziVoznjeMusterijeDiv").show();

        $.get("/api/Voznja", function (data, status) {
            let id = localStorage.getItem("voznjaIzmena");
            let tableofData2 = "<table class=\"table table-bordered\">";
            for (voznja in data) {
                if (data[voznja].IdVoznje == id) {
                    tableofData2 += "<tr><td>Id adrese dolaska</td><td><input id=\"idadr1\" type=\"text\" name=\"IdAdr\" value=\"" + data[voznja].Dolazak.Adresa.IdAdr + "\"/></td></tr>" +
                        "<tr><td>X lokacije dolaska</td><td><input id=\"x1\" type=\"text\" name=\"X\" value=\"" + data[voznja].Dolazak.X + "\"/></td></tr>" +
                        "<tr><td>Y lokacije dolaska</td><td><input id=\"y1\" type=\"text\" name=\"Y\" value=\"" + data[voznja].Dolazak.Y + "\"/></td></tr>" +
                        "<tr><td>Ulica i broj lokacije dolaska</td><td><input id=\"ulicaibroj1\" type=\"text\" name=\"UlicaIBroj\" value=\"" + data[voznja].Dolazak.Adresa.UlicaIBroj + "\"/></td></tr>" +
                        "<tr><td>Naseljeno mesto lokacije dolaska</td><td><input id=\"naseljenomesto1\" type=\"text\" name=\"NaseljenoMesto\" value=\"" + data[voznja].Dolazak.Adresa.NaseljenoMesto + "\"/></td></tr>" +
                        "<tr><td>Pozivni broj lokacije dolaska</td><td><input id=\"pozivnibroj1\" type=\"text\" name=\"PozivniBroj\" value=\"" + data[voznja].Dolazak.Adresa.PozivniBroj + "\"/></td></tr>";
                }
            }
            tableofData2 += "</table>";
            $("#IzmenaVoznjaShow").html(tableofData2);
        });
    });

    $(document).on('click', '#otkaziVoznja', function () {
        let trigger_btn1 = $(this).val();
        localStorage.setItem("voznjaOtkaz", trigger_btn1);
        $("#PrikazKorisnikInfo").hide();
        $("#IzmenaVoznja").hide();
        $("#PrikaziVoznjeMusterijeDiv").hide();
        $("#KomentarVoznja").show();

        $.get("/api/Voznja", function (data, status) {
            let id = localStorage.getItem("voznjaOtkaz");
            let tableofData3 = "<table class=\"table table-bordered\">";
            for (voznja in data) {
                if (data[voznja].IdVoznje == id) {
                    tableofData3 += "<tr><td>Opis</td><td><input id=\"opis\" type=\"text\" name=\"Opis\" value=\"" + data[voznja].Komentar.Opis + "\"/></td></tr>" +
                        "<tr><td>Datum objave</td><td><input id=\"datum\" type=\"datetime\" name=\"DTObjave\" value=\"" + data[voznja].Komentar.DTObjave + "\"/></td></tr>" +
                        "<tr><td>Ocena</td><td><input id=\"ocena\" min=\"0\" max=\"5\" type=\"number\" name=\"Ocena\" value=\"" + data[voznja].Komentar.Ocena + "\"/></td></tr>";
                }
            }
            tableofData3 += "</table>";
            $("#KomentarVoznjaShow").html(tableofData3);
        });
    });

    $("#izmeniKorisnikDisp").click(function () {
        $("#PrikazKorisnikInfoDisp").hide();

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += "<tr><td>Korisnicko ime</td><td><input class=\"form-control\" id=\"korImeReg\" type=\"text\" name=\"KorisnickoIme\" value=\"" + dataTmp.KorisnickoIme + "\" disabled /></td></tr>";
        tableofData += "<tr><td>Lozinka</td><td><input class=\"form-control\" id=\"korPassReg\" type=\"password\" name=\"Lozinka\" value=\"" + dataTmp.Lozinka + "\"/></td></tr>";
        tableofData += "<tr><td>Ime</td><td><input class=\"form-control\" id=\"ime\" type=\"text\" name=\"Ime\" value=\"" + dataTmp.Ime + "\"/></td></tr>";
        tableofData += "<tr><td>Prezime</td><td><input class=\"form-control\" id=\"prezime\" type=\"text\" name=\"Prezime\" value=\"" + dataTmp.Prezime + "\"/></td></tr>";
        tableofData += "<tr><td>JMBG</td><td><input class=\"form-control\" id=\"jmbg\" type=\"text\" name=\"JMBG\" value=\"" + dataTmp.JMBG + "\"/></td></tr>";
        tableofData += "<tr><td>Email</td><td><input class=\"form-control\" id=\"email\" type=\"email\" name=\"Email\" value=\"" + dataTmp.Email + "\"/></td></tr>";
        tableofData += "<tr><td>Kontakt telefon</td><td><input class=\"form-control\" id=\"brTelefona\" type=\"text\" name=\"KontaktTelefon\" value=\"" + dataTmp.KontaktTelefon + "\"/></td></tr>";
        tableofData += "</table>";
        $("#IzmenaShowDisp").html(tableofData);
    });

    $("#potvrdiIzmenuDisp").click(function () {
        let korisnik = {
            Id: dataTmp.Id,
            KorisnickoIme: `${$('#korImeReg').val()}`,
            Lozinka: `${$('#korPassReg').val()}`,
            Ime: `${$('#ime').val()}`,
            Prezime: `${$('#prezime').val()}`,
            Pol: dataTmp.Pol,
            JMBG: ` ${$('#jmbg').val()}`,
            Email: `${$('#email').val()}`,
            KontaktTelefon: `${$('#brTelefona').val()}`,
            Uloga: dataTmp.Uloga
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Dispecer/' + dataTmp.Id,
            data: JSON.stringify(korisnik),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno izmenjen korisnik');
                    localStorage.setItem("logovan", korisnik.KorisnickoIme);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ne postoji korisnik kojeg zelite da menjate');
                }
            },
        })
    });

    $("#dodajVozaca").click(function () {
        $("#PrikazKorisnikInfoDisp").hide();
    });

    $("#addVozac").click(function () {
        let adresa = {
            Id: `${$('#idadrese').val()}`,
            UlicaIBroj: `${$('#ulicaibroj').val()}`,
            NaseljenoMesto: `${$('#naseljenomesto').val()}`,
            PozivniBroj: `${$('#pozivnibroj').val()}`
        };

        let lokacija = {
            Id: `${$('#idlokacije').val()}`,
            X: `${$('#x').val()}`,
            Y: `${$('#y').val()}`,
            Adresa: adresa
        };

        let automobil = {
            Godiste: `${$('#godiste').val()}`,
            Registracija: `${$('#registracija').val()}`,
            BrojVozila: `${$('#brojvozila').val()}`,
            TipAuta: `${$('#tipauta').val()}`
        };

        let vozac = {
            KorisnickoIme: `${$('#korImeRegVoz').val()}`,
            Lozinka: `${$('#korPassRegVoz').val()}`,
            Ime: `${$('#imeVoz').val()}`,
            Prezime: `${$('#prezimeVoz').val()}`,
            Pol: `${$('#polVoz').val()}`,
            JMBG: `${$('#jmbgVoz').val()}`,
            KontaktTelefon: `${$('#brTelefonaVoz').val()}`,
            Email: `${$('#emailVoz').val()}`,
            Lokacija: lokacija,
            Automobil: automobil
        };

        $.ajax({
            type: 'POST',
            url: '/api/Vozac',
            data: JSON.stringify(vozac),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno registrovan vozac');
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Vozac je vec registrovan');
                }
            },
        })
    });

    $("#showInfoVozac").click(function () {
        $("#PrikazVozacInfo").show("slow");

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += `<tr><td>ID</td><td>${dataTmp.Id}</td></tr>`;
        tableofData += `<tr><td>Korisnicko ime</td><td>${dataTmp.KorisnickoIme}</td></tr>`;
        tableofData += `<tr><td>Lozinka</td><td>${dataTmp.Lozinka}</td></tr>`;
        tableofData += `<tr><td>Ime</td><td>${dataTmp.Ime}</td></tr>`;
        tableofData += `<tr><td>Prezime</td><td>${dataTmp.Prezime}</td></tr>`;
        tableofData += `<tr><td>JMBG</td><td>${dataTmp.JMBG}</td></tr>`;
        tableofData += `<tr><td>Pol</td><td>${polShow}</td></tr>`;
        tableofData += `<tr><td>Kontakt telefon</td><td>${dataTmp.KontaktTelefon}</td></tr>`;
        tableofData += `<tr><td>Email</td><td>${dataTmp.Email}</td></tr>`;
        tableofData += `<tr><td>Zauzet</td><td>${dataTmp.Zauzet}</td></tr>`;
        tableofData += `<tr><td>ID Lokacije</td><td>${dataTmp.Lokacija.IdLok}</td></tr>`;
        tableofData += `<tr><td>X</td><td>${dataTmp.Lokacija.X}</td></tr>`;
        tableofData += `<tr><td>Y</td><td>${dataTmp.Lokacija.Y}</td></tr>`;
        tableofData += `<tr><td>Ulica</td><td>${dataTmp.Lokacija.Adresa.UlicaIBroj}</td></tr>`;
        tableofData += `<tr><td>ID Adrese</td><td>${dataTmp.Lokacija.Adresa.IdAdr}</td></tr>`;
        tableofData += `<tr><td>Naseljeno mesto</td><td>${dataTmp.Lokacija.Adresa.NaseljenoMesto}</td></tr>`;
        tableofData += `<tr><td>Pozivni broj</td><td>${dataTmp.Lokacija.Adresa.PozivniBroj}</td></tr>`;
        tableofData += `<tr><td>ID Vozaca</td><td>${dataTmp.Id}</td></tr>`;
        tableofData += `<tr><td>Godiste auta</td><td>${dataTmp.Automobil.Godiste}</td></tr>`;
        tableofData += `<tr><td>Registracija</td><td>${dataTmp.Automobil.Registracija}</td></tr>`;
        tableofData += `<tr><td>Broj vozila</td><td>${dataTmp.Automobil.BrojVozila}</td></tr>`;
        if (dataTmp.Automobil.TipAuta == 0) { // putnicki
            tableofData += `<tr><td>Tip automobila</td><td>Putnicki</td></tr>`;
        }
        else { // kombi
            tableofData += `<tr><td>Tip automobila</td><td>Kombi</td></tr>`;
        }
        tableofData += "</table>";
        $("#PrikazVozacInfoShow").html(tableofData);
    });

    $("#izmeniVozac").click(function () {
        $("#PrikazVozacInfo").hide();

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += "<tr><td>Korisnicko ime</td><td><input class=\"form-control\" id=\"korImeReg2\" type=\"text\" name=\"KorisnickoIme\" value=\"" + dataTmp.KorisnickoIme + "\" disabled /></td></tr>";
        tableofData += "<tr><td>Lozinka</td><td><input class=\"form-control\" id=\"korPassReg2\" type=\"password\" name=\"Lozinka\" value=\"" + dataTmp.Lozinka + "\"/></td></tr>";
        tableofData += "<tr><td>Ime</td><td><input class=\"form-control\" id=\"ime2\" type=\"text\" name=\"Ime\" value=\"" + dataTmp.Ime + "\"/></td></tr>";
        tableofData += "<tr><td>Prezime</td><td><input class=\"form-control\" id=\"prezime2\" type=\"text\" name=\"Prezime\" value=\"" + dataTmp.Prezime + "\"/></td></tr>";
        tableofData += "<tr><td>JMBG</td><td><input class=\"form-control\" id=\"jmbg2\" type=\"text\" name=\"JMBG\" value=\"" + dataTmp.JMBG + "\"/></td></tr>";
        tableofData += "<tr><td>Email</td><td><input class=\"form-control\" id=\"email2\" type=\"email\" name=\"Email\" value=\"" + dataTmp.Email + "\"/></td></tr>";
        tableofData += "<tr><td>Kontakt telefon</td><td><input class=\"form-control\" id=\"brTelefona2\" type=\"text\" name=\"KontaktTelefon\" value=\"" + dataTmp.KontaktTelefon + "\"/></td></tr>";
        tableofData += "<tr><td>ID Lokacije</td><td><input class=\"form-control\" id=\"idlokacija2\" type=\"text\" name=\"IdLok\" value=\"" + dataTmp.Lokacija.Id + "\"/></td></tr>";
        tableofData += "<tr><td>X</td><td><input class=\"form-control\" id=\"x2\" type=\"text\" name=\"X\" value=\"" + dataTmp.Lokacija.X + "\"/></td></tr>";
        tableofData += "<tr><td>Y</td><td><input class=\"form-control\" id=\"y2\" type=\"text\" name=\"Y\" value=\"" + dataTmp.Lokacija.Y + "\"/></td></tr>";
        tableofData += "<tr><td>ID Adrese</td><td><input class=\"form-control\" id=\"idadrese2\" type=\"text\" name=\"IdAddr\" value=\"" + dataTmp.Lokacija.Adresa.Id + "\"/></td></tr>";
        tableofData += "<tr><td>Ulica</td><td><input class=\"form-control\" id=\"ulicaibroj2\" type=\"text\" name=\"UlicaIBroj\" value=\"" + dataTmp.Lokacija.Adresa.UlicaIBroj + "\"/></td></tr>";
        tableofData += "<tr><td>Naseljeno mesto</td><td><input class=\"form-control\" id=\"naseljenomesto2\" type=\"text\" name=\"NaseljenoMesto\" value=\"" + dataTmp.Lokacija.Adresa.NaseljenoMesto + "\"/></td></tr>";
        tableofData += "<tr><td>Pozivni broj</td><td><input class=\"form-control\" id=\"pozivnibroj2\" type=\"text\" name=\"PozivniBroj\" value=\"" + dataTmp.Lokacija.Adresa.PozivniBroj + "\"/></td></tr>";
        tableofData += "<tr><td>Godiste automobila</td><td><input class=\"form-control\" id=\"godiste2\" type=\"text\" name=\"Godiste\" value=\"" + dataTmp.Automobil.Godiste + "\"/></td></tr>";
        tableofData += "<tr><td>Registracija</td><td><input class=\"form-control\" id=\"registracija2\" type=\"text\" name=\"Registracija\" value=\"" + dataTmp.Automobil.Registracija + "\"/></td></tr>";
        tableofData += "<tr><td>Broj vozila</td><td><input class=\"form-control\" id=\"brojvozila2\" type=\"text\" name=\"BrojVozila\" value=\"" + dataTmp.Automobil.BrojVozila + "\"/></td></tr>";
        tableofData += "</table>";
        $("#IzmenaShowVozac").html(tableofData);
    });

    $("#potvrdiIzmenuVozac").click(function () {
        let adresa = {
            Id: `${$('#idadrese2').val()}`,
            UlicaIBroj: `${$('#ulicaibroj2').val()}`,
            NaseljenoMesto: `${$('#naseljenomesto2').val()}`,
            PozivniBroj: `${$('#pozivnibroj2').val()}`
        };

        let lokacija = {
            Id: `${$('#idlokacija2').val()}`,
            X: `${$('#x2').val()}`,
            Y: `${$('#y2').val()}`,
            Adresa: adresa
        };

        let automobil = {
            IdVozaca: dataTmp.Id,
            Godiste: `${$('#godiste2').val()}`,
            Registracija: `${$('#registracija2').val()}`,
            BrojVozila: `${$('#brojvozila2').val()}`,
            TipAuta: dataTmp.Automobil.TipAuta
        };

        let vozac = {
            Id: dataTmp.Id,
            KorisnickoIme: `${$('#korImeReg2').val()}`,
            Lozinka: `${$('#korPassReg2').val()}`,
            Ime: `${$('#ime2').val()}`,
            Prezime: `${$('#prezime2').val()}`,
            Pol: dataTmp.Pol,
            JMBG: `${$('#jmbg2').val()}`,
            KontaktTelefon: `${$('#brTelefona2').val()}`,
            Email: `${$('#email2').val()}`,
            Uloga: dataTmp.Uloga,
            Lokacija: lokacija,
            Automobil: automobil
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Vozac/' + automobil.IdVozaca,
            data: JSON.stringify(vozac),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno izmenjen vozac');
                    localStorage.setItem("logovan", vozac.KorisnickoIme);
                    $(location).attr('href', 'welcome.html');
                }
                else {
                    alert('Neuspesna izmena');
                }
            }
        })
    });

    $("#potvrdiIzmenuVoznja").click(function () {
        let id1 = localStorage.getItem("voznjaIzmena");
        let adresaDolazak = {
            IdAdr: `${$('#idadr1').val()}`,
            UlicaIBroj: `${$('#ulicaibroj1').val()}`,
            NaseljenoMesto: `${$('#naseljenomesto1').val()}`,
            PozivniBroj: `${$('#pozivnibroj1').val()}`
        };

        let lokacijaDolazak = {
            IdLok: `${$('#idlok1').val()}`,
            X: `${$('#x1').val()}`,
            Y: `${$('#y1').val()}`,
            Adresa: adresaDolazak
        };

        let voznja = {
            Dolazak: lokacijaDolazak,
            //TipAutaVoznje: `${$('#tipau').val()}`,
            MusterijaVoznja: dataTmp.KorisnickoIme,
            VozacVoznja: null,
            Iznos: 0,
            DispecerVoznja: null
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + id1,
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno izmenjena voznja');
                    localStorage.setItem("voznjaIzmena", id1);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ne postoji voznja koju zelite da menjate');
                }
            }
        })
    });

    $("#potvrdiKomentar").click(function () {                       //za musteriju
        let id2 = localStorage.getItem("voznjaOtkaz");
        let komentarVoznja = {
            Opis: `${$('#opis').val()}`,
            DTObjave: `${$('#datum').val()}`,
            Ocena: `${$('#ocena').val()}`,
            KorImeKorisnikKomentar: dataTmp.KorisnickoIme,
            IdVoznjaKomentar: id2
        };

        let voznja = {
            MusterijaVoznja: dataTmp.KorisnickoIme,
            VozacVoznja: null,
            Iznos: 0,
            DispecerVoznja: null,
            Komentar: komentarVoznja
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznjaotkaz/' + id2,
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno otkazana voznja');
                    localStorage.setItem("voznjaOtkaz", id2);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ne postoji voznja koju zelite da otkazete ili nije u odgovarajucem stanju');
                }
            }
        })
    });

    $("#newOrderBtn").click(function () {
        $("#PrikaziVoznjeMusterijeDiv").hide();
        $("#PrikazKorisnikInfo").hide();
        $("#IzmenaVoznja").hide();
        $("#KomentarVoznja").hide();
    });

    $("#dodajVoznjuMusterija").click(function () {
        let adresaDolazak = {
            IdAdr: `${$('#idadr').val()}`,
            UlicaIBroj: `${$('#ulicaibr').val()}`,
            NaseljenoMesto: `${$('#naseljenom').val()}`,
            PozivniBroj: `${$('#pozivnibr').val()}`
        };

        let lokacijaDolazak = {
            IdLok: `${$('#idlokdol').val()}`,
            X: `${$('#xkoordinata').val()}`,
            Y: `${$('#ykoordinata').val()}`,
            Adresa: adresaDolazak
        };

        let voznja = {
            Dolazak: lokacijaDolazak,
            TipAutaVoznje: `${$('#tipau').val()}`,
            MusterijaVoznja: dataTmp.KorisnickoIme,
            VozacVoznja: null,
            Iznos: 0,
            DispecerVoznja: null
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno zakazana voznja');
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ovakva porudzbina vec postoji');
                }
            }
        })
    });

    $("#dodajVoznjuDisp").click(function () {
        $("#PrikazKorisnikInfoDisp").hide();
    });

    $("#dodajVoznjuDispecer").click(function () {
        let adresaDolazak = {
            IdAdr: `${$('#idadrDisp').val()}`,
            UlicaIBroj: `${$('#ulicaibrDisp').val()}`,
            NaseljenoMesto: `${$('#naseljenomDisp').val()}`,
            PozivniBroj: `${$('#pozivnibrDisp').val()}`
        };

        let lokacijaDolazak = {
            IdLok: `${$('#idlokdolDisp').val()}`,
            X: `${$('#xkoordinataDisp').val()}`,
            Y: `${$('#ykoordinataDisp').val()}`,
            Adresa: adresaDolazak
        };

        let voznja = {
            Dolazak: lokacijaDolazak,
            TipAutaVoznje: `${$('#tipauDisp').val()}`,
            MusterijaVoznja: null,
            VozacVoznja: null,
            Iznos: 0,
            DispecerVoznja: dataTmp.KorisnickoIme,
        };

        $.ajax({
            type: 'POST',
            url: '/api/Voznja',
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno dodata voznja');
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Voznja vec postoji');
                }
            }
        })
    });

    $("#prikaziVoznjeBtn").click(function () {
        $("#PrikazKorisnikInfo").hide();
        $("#PrikaziVoznjeMusterijeDiv").show("slow");

        $.get("/api/Voznja", function (data, status) {
            let tableForOrders = "<table class=\"table table-bordered\">";
            tableForOrders += `<thead><tr><th>Username</th><th>Created</th><th>X</th><th>Y</th><th>Street</th><th>City</th><th>Zip code</th><th>Status</th><th>Comment</th><th>Rating</th><th>Comment posted</th><th>Actions</th></tr></thead>`;
            for (voznja in data) {
                if (dataTmp.KorisnickoIme == data[voznja].MusterijaVoznja) { 
                    tableForOrders += `<tbody><tr><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.X}</td><td>${data[voznja].Dolazak.Y}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    if (data[voznja].StatusVoznje == 0) {
                        tableForOrders += '<td>Kreirana</td>';
                    } else if (data[voznja].StatusVoznje == 1) {
                        tableForOrders += '<td>Formirana</td>';
                    } else if (data[voznja].StatusVoznje == 2) {
                        tableForOrders += '<td>Obradjena</td>';
                    } else if (data[voznja].StatusVoznje == 3) {
                        tableForOrders += '<td>Prihvacena</td>';
                    } else if (data[voznja].StatusVoznje == 4) {
                        tableForOrders += '<td>Otkazana</td>';
                    } else if (data[voznja].StatusVoznje == 5) {
                        tableForOrders += '<td>Neuspesna</td>';
                    } else if (data[voznja].StatusVoznje == 6) {
                        tableForOrders += '<td>Uspesna</td>';
                    } else {
                        tableForOrders += '<td>Utoku</td>';
                    } 
                    //tableForOrders += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-default" id="izmeniVoznja" type="button" value=${data[voznja].IdVoznje}><b>Izmeni voznju</b></button><td>`;
                    if (data[voznja].StatusVoznje == 0) {
                        //tableForOrders += `<button class="btn btn-xs btn-default" id="otkaziVoznja" type="button" value="disable" disabled="disabled"><b>Otkazi voznju</b></button></td></td></tr></tbody>`;
                        tableForOrders += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-default" id="izmeniVoznja" type="button" value=${data[voznja].IdVoznje}><b>Izmeni voznju</b></button><button class="btn btn-xs btn-default" id="otkaziVoznja" type="button" value=${data[voznja].IdVoznje}><b>Otkazi voznju</b></button></td></td></tr></tbody><td>`;
                    } else {
                        //tableForOrders += `<button class="btn btn-xs btn-default" id="otkaziVoznja" type="button" value=${data[voznja].IdVoznje}><b>Otkazi voznju</b></button></td></td></tr></tbody>`;
                        tableForOrders += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-default" id="izmeniVoznja" type="button" value="disable" disabled="disabled"><b>Izmeni voznju</b></button><button class="btn btn-xs btn-default" id="otkaziVoznja" type="button" value="disable" disabled="disabled"><b>Otkazi voznju</b></button></td></td></tr></tbody><td>`;
                    }
                }
            }
            tableForOrders += "</table>";
            $("#PrikaziVoznjeMusterijeShow").html(tableForOrders);
        });
    });
});