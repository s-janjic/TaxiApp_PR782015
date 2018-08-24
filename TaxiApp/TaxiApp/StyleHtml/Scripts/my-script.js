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
                if (data.Uloga == 2) {   // dispecer login
                    $("#dispecerDiv").show();
                    $("#IzmeniDispecera").hide();
                    $("#korisnikDiv").hide();
                    $("#vozacDiv").hide();
                    $("#usernameDispecera").show();
                    $("#usernameDispecera").html(usernameKor);
                    $("#PrikazKorisnikInfoDisp").hide();
                    $("#PrikaziVoznjeDispecer").hide();
                    $("#PrikaziVoznjeDispecerSve").hide();
                    $("#DodajVozacaDispecer").hide();
                    $("#prikazSvihKorisnika").hide();
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
                    $("#KomentarisiUspesnu").hide();
                    $("#successOrderMsg").hide();
                    $("#errorOrderMsg").hide();
                    if (data.Pol == 0) // musko
                    {
                        polShow = "Musko";
                    }
                    else {
                        polShow = "Zensko";
                    }
                } else { // vozac login
                    $("#vozacDiv").show();
                    $("#PrikazVozacInfo").hide();
                    $("#dispecerDiv").hide();
                    $("#korisnikDiv").hide();
                    $("#usernameVozaca").show();
                    $("#usernameVozaca").html(usernameKor);
                    $("#PrikaziVoznjeVozac").hide();
                    $("#PrikaziKreiraneVoznjeVozac").hide();
                    $("#KomentarNeuspesnaVoznja").hide();
                    $("#UspesnaVoznjaDiv").hide();
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
        $("#KomentarisiUspesnu").hide();

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
        $("#KomentarisiUspesnu").hide();

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
        $("#PrikaziVoznjeDispecer").hide();
        $("#PrikaziVoznjeDispecerSve").hide();
        $("#DodajVozacaDispecer").hide();
        $("#prikazSvihKorisnika").hide();
        $("#PrikazKorisnikInfoDisp").show("slow");

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
                    tableofData2 += "<tr><td>Id lokacije dolaska</td><td><input class=\"form-control\" id=\"idlok1\" type=\"text\" name\"IdLok\" value\"" + data[voznja].Dolazak.Adresa.IdLok + "\"></td></tr>" +
                        "<tr><td>X lokacije dolaska</td><td><input id=\"x1\" type=\"text\" name=\"X\" value=\"" + data[voznja].Dolazak.X + "\"/></td></tr>" +
                        "<tr><td>Y lokacije dolaska</td><td><input id=\"y1\" type=\"text\" name=\"Y\" value=\"" + data[voznja].Dolazak.Y + "\"/></td></tr>" +
                        "<tr><td>Id adrese dolaska</td><td><input id=\"idadr1\" type=\"text\" name=\"IdAdr\" value=\"" + data[voznja].Dolazak.Adresa.IdAdr + "\"/></td></tr>" +
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
        $("#prikazSvihKorisnika").hide();
        $("#PrikaziVoznjeDispecer").hide();

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
        $("#prikazSvihKorisnika").hide();
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
        $("#PrikaziVoznjeVozac").hide();
        $("#PrikaziKreiraneVoznjeVozac").hide();
        $("#KomentarNeuspesnaVoznja").hide();
        $("#UspesnaVoznjaDiv").hide();
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
        if (dataTmp.Zauzet) { // ako je true = zauzet
            tableofData += `<tr><td>Zauzet</td><td>Zauzet</td></tr>`;
        } else {
            tableofData += `<tr><td>Zauzet</td><td>Slobodan</td></tr>`;
        }
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
        $("#PrikaziVoznjeVozac").hide();
        $("#PrikaziKreiraneVoznjeVozac").hide();
        $("#KomentarNeuspesnaVoznja").hide();
        $("#UspesnaVoznjaDiv").hide();

        let tableofData = "<table class=\"table table-bordered\">";
        tableofData += "<tr><td>Korisnicko ime</td><td><input class=\"form-control\" id=\"korImeReg2\" type=\"text\" name=\"KorisnickoIme\" value=\"" + dataTmp.KorisnickoIme + "\" disabled /></td></tr>";
        tableofData += "<tr><td>Lozinka</td><td><input class=\"form-control\" id=\"korPassReg2\" type=\"password\" name=\"Lozinka\" value=\"" + dataTmp.Lozinka + "\"/></td></tr>";
        tableofData += "<tr><td>Ime</td><td><input class=\"form-control\" id=\"ime2\" type=\"text\" name=\"Ime\" value=\"" + dataTmp.Ime + "\"/></td></tr>";
        tableofData += "<tr><td>Prezime</td><td><input class=\"form-control\" id=\"prezime2\" type=\"text\" name=\"Prezime\" value=\"" + dataTmp.Prezime + "\"/></td></tr>";
        tableofData += "<tr><td>JMBG</td><td><input class=\"form-control\" id=\"jmbg2\" type=\"text\" name=\"JMBG\" value=\"" + dataTmp.JMBG + "\"/></td></tr>";
        tableofData += "<tr><td>Email</td><td><input class=\"form-control\" id=\"email2\" type=\"email\" name=\"Email\" value=\"" + dataTmp.Email + "\"/></td></tr>";
        tableofData += "<tr><td>Kontakt telefon</td><td><input class=\"form-control\" id=\"brTelefona2\" type=\"text\" name=\"KontaktTelefon\" value=\"" + dataTmp.KontaktTelefon + "\"/></td></tr>";
        tableofData += "<tr><td>ID Lokacije</td><td><input class=\"form-control\" id=\"idlokacija2\" type=\"text\" name=\"IdLok\" value=\"" + dataTmp.Lokacija.IdLok + "\"/></td></tr>";
        tableofData += "<tr><td>X</td><td><input class=\"form-control\" id=\"x2\" type=\"text\" name=\"X\" value=\"" + dataTmp.Lokacija.X + "\"/></td></tr>";
        tableofData += "<tr><td>Y</td><td><input class=\"form-control\" id=\"y2\" type=\"text\" name=\"Y\" value=\"" + dataTmp.Lokacija.Y + "\"/></td></tr>";
        tableofData += "<tr><td>ID Adrese</td><td><input class=\"form-control\" id=\"idadrese2\" type=\"text\" name=\"IdAddr\" value=\"" + dataTmp.Lokacija.Adresa.IdAdr + "\"/></td></tr>";
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
            IdAdr: `${$('#idadrese2').val()}`,
            UlicaIBroj: `${$('#ulicaibroj2').val()}`,
            NaseljenoMesto: `${$('#naseljenomesto2').val()}`,
            PozivniBroj: `${$('#pozivnibroj2').val()}`
        };

        let lokacija = {
            IdLok: `${$('#idlokacija2').val()}`,
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
            Automobil: automobil,
            Zauzet: dataTmp.Zauzet
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
            MusterijaVoznja: dataTmp.KorisnickoIme,
            VozacVoznja: null,
            Iznos: 0,
            DispecerVoznja: null,
            StatusVoznje: "Kreirana"
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
            Komentar: komentarVoznja,
            StatusVoznje: "Otkazana"
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + id2,
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
        $("#KomentarisiUspesnu").hide();
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
                    $("#successOrderMsg").show();
                    $("#msgShowSuccess").html(`Uspesno zakazana voznja!`);
                    //$(location).attr('href', 'welcome.html');
                } else {
                    $("#errorOrderMsg").show();
                    $("#msgShowError").html(`Voznja vec postoji!`);
                }
            }
        })
    });

    $("#dodajVoznjuDisp").click(function () {
        $("#PrikazKorisnikInfoDisp").hide();
    });

    $("#dodajVoznjuDispecer").click(function () {    // za dispecera
        $.get("/api/Vozac", function (data, status) {
            let pom = `${$('#tipauDisp').val()}`
            let pom1;
            let cntr = 0; // broj slobodnih vozaca
            if (pom == "Kombi") {
                pom1 = 1;
            } else {
                pom1 = 0;
            }
            let table = "<div class=\"form-group\"><label class=\"control-label\">Izaberi vozaca</label><select class=\"form-control\" id=\"vozac\" name=\"VozacVoznja\">";
            for (driver in data) {
                if (data[driver].Automobil.TipAuta == pom1 && data[driver].Zauzet == false) {
                    table += "<option>" + data[driver].KorisnickoIme + "</option>";
                    cntr++;
                }
            }
            table += "</select><button class=\"btn btn-xs btn-primary\" id=\"dodajVoznjuDispecer2\" type=\"button\"><b>Dodaj voznju</b></button></div>";
            if (cntr == 0) { // ako nema slobodnih vozaca
                alert('Nema slobodnih vozaca');
                $(location).attr('href', 'welcome.html');
            } else {
                $("#DodavanjeVoznjeDispecer").append(table);
                document.getElementById("tipauDisp").disabled = true;
                document.getElementById("dodajVoznjuDispecer").disabled = true;
            }
        });
    });

    $(document).on('click', '#dodajVoznjuDispecer2', function () {
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
            VozacVoznja: `${$('#vozac').val()}`,
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
            tableForOrders += `<thead><tr><th>Korisnik</th><th>Vreme porudzbine</th><th>Ulica</th><th>Grad</th><th>Postanski broj</th><th>Status</th><th>Komentar</th><th>Rating</th><th>Vreme kom.</th><th></th></tr></thead>`;
            for (voznja in data) {
                if (dataTmp.KorisnickoIme == data[voznja].MusterijaVoznja) {
                    if (data[voznja].StatusVoznje == 0) {
                        tableForOrders += `<tbody><tr class="Kreirana"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Kreirana</td>';
                    } else if (data[voznja].StatusVoznje == 1) {
                        tableForOrders += `<tbody><tr class="Formirana"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Formirana</td>';
                    } else if (data[voznja].StatusVoznje == 2) {
                        tableForOrders += `<tbody><tr class="Prihvacena"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Obradjena</td>';
                    } else if (data[voznja].StatusVoznje == 3) {
                        tableForOrders += `<tbody><tr class="Prihvacena"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Prihvacena</td>';
                    } else if (data[voznja].StatusVoznje == 4) {
                        tableForOrders += `<tbody><tr class="Otkazana"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Otkazana</td>';
                    } else if (data[voznja].StatusVoznje == 5) {
                        tableForOrders += `<tbody><tr class="Neuspesna"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Neuspesna</td>';
                    } else if (data[voznja].StatusVoznje == 6) {
                        tableForOrders += `<tbody><tr class="Uspesna"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Uspesna</td>';
                    } else {
                        tableForOrders += `<tbody><tr class="Utoku"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Utoku</td>';
                    }

                    if (data[voznja].StatusVoznje == 0) {
                        tableForOrders += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-default" id="izmeniVoznja" type="button" value=${data[voznja].IdVoznje}><b>Izmeni voznju</b></button><button class="btn btn-xs btn-default" id="otkaziVoznja" type="button" value=${data[voznja].IdVoznje}><b>Otkazi voznju</b></button></td></td></tr></tbody>`;
                    } else if (data[voznja].StatusVoznje == 6) {
                        tableForOrders += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-default" id="komentarisi" type="button" value=${data[voznja].IdVoznje}><b>Komentarisi voznju</b></button><button class="btn btn-xs btn-default" id="izmeniVoznja" type="button" value="disable" disabled="disabled"><b>Izmeni voznju</b></button></td></tr></tbody>`;
                    } else { 
                        tableForOrders += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-default" id="izmeniVoznja" type="button" value="disable" disabled="disabled"><b>Izmeni voznju</b></button><button class="btn btn-xs btn-default" id="otkaziVoznja" type="button" value="disable" disabled="disabled"><b>Otkazi voznju</b></button></td></td></tr></tbody>`;
                    }
                }
            }
            tableForOrders += "</table>";
            $("#PrikaziVoznjeMusterijeShow").html(tableForOrders);
        });
    });

    /* komentarisanje uspensje voznje */
    $(document).on('click', '#komentarisi', function () {
        let trigger_button22 = $(this).val();
        localStorage.setItem("voznjaKomUspesna", trigger_button22);

        $("#PrikazKorisnikInfo").hide();
        $("#PrikaziVoznjeMusterijeDiv").hide();
        $("#IzmenaVoznja").hide();
        $("#KomentarVoznja").hide();
        $("#KomentarisiUspesnu").show("slow");

        $.get("/api/Voznja", function (data, status) {
            let idKomUsp = localStorage.getItem("voznjaKomUspesna");
            let drawTable = "<table class=\"table table-bordered\">";
            for (voznja in data) {
                if (data[voznja].IdVoznje == idKomUsp) {
                    drawTable += `<tr><td>Opis</td><td><input class="form-control" id="opis11" type="text" name="Opis" value=${data[voznja].Komentar.Opis}></td></tr>`;
                    drawTable += `<tr><td>Datum objave</td><td><input class="form-control" id="datum11" type="datetime" name="DTObjave" value=${data[voznja].Komentar.DTObjave}></td></tr>`;
                    drawTable += `<tr><td>Ocena</td><td><input class="form-control" id="ocena11" min="0" max="5" type="number" name="Ocena" value=${data[voznja].Komentar.Ocena}></td></tr>`;
                }
            }

            drawTable += "</tabel><button class=\"btn btn-primary\" id=\"potvrdiKomentarUspesne\" type=\"button\">Potvrdi komentar</button><br>";
            $("#KomentarisiUspesnuShow").html(drawTable);
        });
    });

    /* potvrda komentara za uspesnu voznju */
    $(document).on('click', '#potvrdiKomentarUspesne', function () {
        let idTmp222 = localStorage.getItem("voznjaKomUspesna");

        let komentarVoznja11 = {
            Opis: `${$('#opis11').val()}`,
            DTObjava: `${$('#datum11').val()}`,
            Ocena: `${$('#ocena11').val()}`,
            KorImeKorisnikKomentar: dataTmp.KorisnickoIme,
            IdVoznjaKomentar: idTmp222
        };

        let voznja = {
            MusterijaVoznja: dataTmp.KorisnickoIme,
            Iznos: 0,
            Komentar: komentarVoznja11,
            StatusVoznje: "Uspesna"
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + idTmp222,
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno postavljen komentar');
                    localStorage.setItem("voznjaOtkaz", idTmp222);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ne postoji voznja');
                }
            }
        })
    });

    $("#prikaziVoznjeDisp").click(function () {
        $("#PrikaziVoznjeDispecer").show("slow");
        $("#PrikaziVoznjeDispecerSve").hide();
        $("#DodajVozacaDispecer").hide();
        $("#PrikazKorisnikInfoDisp").hide();
        $("#prikazSvihKorisnika").hide();

        $.get("/api/Voznja", function (data, status) {
            let tableForOrders = "<table class=\"table table-bordered\">";
            tableForOrders += `<thead><tr><th>Datum por.</th><th>Ulica</th><th>Grad</th><th>Postanski br.</th><th>Status</th><th>Komentar od</th><th>Komentar</th><th>Ocena</th><th>Datum kom.</th></tr></thead>`;
            for (voznja in data) {
                if (dataTmp.KorisnickoIme == data[voznja].DispecerVoznja) {
                    if (data[voznja].StatusVoznje == 0) {
                        tableForOrders += `<tbody><tr class="Kreirana"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Kreirana</td>';
                    } else if (data[voznja].StatusVoznje == 1) {
                        tableForOrders += `<tbody><tr class="Formirana"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Formirana</td>';
                    } else if (data[voznja].StatusVoznje == 2) {
                        tableForOrders += `<tbody><tr class="Prihvacena"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Obradjena</td>';
                    } else if (data[voznja].StatusVoznje == 3) {
                        tableForOrders += `<tbody><tr class="Prihvacena"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Prihvacena</td>';
                    } else if (data[voznja].StatusVoznje == 4) {
                        tableForOrders += `<tbody><tr class="Otkazana"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Otkazana</td>';
                    } else if (data[voznja].StatusVoznje == 5) {
                        tableForOrders += `<tbody><tr class="Neuspesna"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Neuspesna</td>';
                    } else if (data[voznja].StatusVoznje == 6) {
                        tableForOrders += `<tbody><tr class="Uspesna"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Uspesna</td>';
                    } else {
                        tableForOrders += `<tbody><tr class="Utoku"><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                        tableForOrders += '<td>Utoku</td>';
                    }
                    tableForOrders += `<td>${data[voznja].Komentar.KorImeKorisnikKomentar}</td><td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td></tr></tbody>`;
                }
            }
            tableForOrders += "</table>";
            $("#PrikaziVoznjeDispecerShow").html(tableForOrders);
        });
    });

    $("#prikaziVoznjeSve").click(function () {
        $("#PrikaziVoznjeDispecerSve").show("slow");
        $("#PrikaziVoznjeDispecer").hide();
        $("#DodajVozacaDispecer").hide();
        $("#prikazSvihKorisnika").hide();
        $("#PrikazKorisnikInfoDisp").hide();

        $.get("/api/Voznja", function (data, status) {
            let tableForOrders = "<table class=\"table table-bordered\">";
            tableForOrders += `<thead><tr><th>Mušterija vožnje</th><th>Datum porudžbine</th><th>Ulica i br. dolaska</th><th>Mesto dol.</th><th>Pozivni br. dol.</th><th>Status vož.</th><th>Vozač</th><th>Opis kom.</th><th>Ocena kom.</th><th>Objava kom.</th><th>Tip auta</th><th>Akcija</th></tr></thead>`;
            for (voznja in data) {
                if (data[voznja].StatusVoznje == 0) {
                    tableForOrders += `<tbody><tr class="Kreirana"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Kreirana</td>';
                } else if (data[voznja].StatusVoznje == 1) {
                    tableForOrders += `<tbody><tr class="Formirana"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Formirana</td>';
                } else if (data[voznja].StatusVoznje == 2) {
                    tableForOrders += `<tbody><tr class="Prihvacena"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Obradjena</td>';
                } else if (data[voznja].StatusVoznje == 3) {
                    tableForOrders += `<tbody><tr class="Prihvacena"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Prihvacena</td>';
                } else if (data[voznja].StatusVoznje == 4) {
                    tableForOrders += `<tbody><tr class="Otkazana"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Otkazana</td>';
                } else if (data[voznja].StatusVoznje == 5) {
                    tableForOrders += `<tbody><tr class="Neuspesna"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Neuspesna</td>';
                } else if (data[voznja].StatusVoznje == 6) {
                    tableForOrders += `<tbody><tr class="Uspesna"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Uspesna</td>';
                } else {
                    tableForOrders += `<tbody><tr class="Utoku"><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    tableForOrders += '<td>Utoku</td>';
                }
                if ((data[voznja].StatusVoznje == 0 && data[voznja].VozacVoznja == "") || (data[voznja].StatusVoznje == 0 && data[voznja].VozacVoznja == null)) {
                    tableForOrders += `<td>${data[voznja].VozacVoznja}</td><td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td>`;
                    if (data[voznja].TipAutaVoznje == 0) {
                        tableForOrders += '<td>Putnički</td>';
                    }
                    else {
                        tableForOrders += '<td>Kombi</td>';
                    }
                    tableForOrders += `<td><button class="btn btn-xs btn-primary" id="dispecerDodajVozaca" type="button" value=${data[voznja].IdVoznje} data-toggle=\"modal\" data-target=\"#dodavanjeVozacaDispModalDisp\"><b>Dodaj vozaca</b></button></td></tr>`;
                } else {
                    tableForOrders += `<td>${data[voznja].VozacVoznja}</td><td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td>`;
                    if (data[voznja].TipAutaVoznje == 0) {
                        tableForOrders += '<td>Putnički</td>';
                    }
                    else {
                        tableForOrders += '<td>Kombi</td>';
                    }
                    tableForOrders += `<td><button class="btn btn-xs btn-primary" id="dispecerDodajVozaca" type="button" value="disable" disabled="disabled"><b>Dodaj vozaca</b></button></td></tr>`;
                }
            }
            tableForOrders += "</tbody></table>";
            $("#PrikaziVoznjeDispecerSve").html(tableForOrders);
        });
    });

    $(document).on('click', '#dispecerDodajVozaca', function () {  // za dispecera
        let fired_button2 = $(this).val();

        localStorage.setItem("dodajVozaca", fired_button2);
        let type;
        $.get("/api/Voznja", function (data, status) {
            for (voznja in data) {
                if (data[voznja].IdVoznje == fired_button2) {
                    type = data[voznja].TipAutaVoznje;
                }
            }
        });

        $.get("/api/Vozac", function (data, status) {
            let pom = type;
            let koliko = 0;
            let table = "<table class=\"table table-bordered\"><tr><td><select class=\"form-control\" id=\"vozac1\" name=\"VozacVoznja\"> ";
            for (driver in data) {
                if (data[driver].Automobil.TipAuta == pom && data[driver].Zauzet == false) {
                    table += "<option>" + data[driver].KorisnickoIme + "</option>";
                    koliko++;
                }

            }
            table += "</select></td></tr></table><button class=\"btn btn-primary\" id=\"dispecerDodajVozaca2\" type=\"button\"><b>Potvrdi</b></button>";

            if (koliko == 0) {
                alert('Trenutno nema slobodnih vozača sa traženim automobilom.');
                $(location).attr('href', 'welcome.html');
            } else {
                $("#DodajVozacaDispecerShow").append(table);
            }
        });
    });

    $(document).on('click', '#dispecerDodajVozaca2', function () {
        let id3 = localStorage.getItem("dodajVozaca");
        $("#PrikaziVoznjeDispecerSve").hide();
        $("#PrikaziVoznjeDispecer").hide();
        $("#DodajVozacaDispecer").hide();

        let voznja = {
            VozacVoznja: `${$('#vozac1').val()}`,
            Iznos: 0,
            DispecerVoznja: dataTmp.KorisnickoIme,
        };
        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + id3,
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesno dodat vozac');
                    localStorage.setItem("dodajVozaca", id3);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Ne postoji vozac sa zeljenim tipom automobila');
                }
            },
        })
    });

    $("#prikaziVoznjeVozac").click(function () {
        $("#PrikazVozacInfo").hide();
        $("#PrikaziKreiraneVoznjeVozac").hide();
        $("#KomentarNeuspesnaVoznja").hide();
        $("#UspesnaVoznjaDiv").hide();
        $("#PrikaziVoznjeVozac").show("slow");

        $.get("/api/Voznja", function (data, status) {
            let drawTable = "<table class=\"table table-bordered\">";
            drawTable += `<thead><tr><th>Musterija</th><th>Datum por.</th><th>Ulica i br.</th><th>Grad</th><th>Postanski br.</th><th>Status</th><th>Komentar</th><th>Ocena</th><th>Datum kom.</th><th></th><th></th></tr></thead>`;
            for (voznja in data) {
                if (dataTmp.KorisnickoIme == data[voznja].VozacVoznja) {
                    drawTable += `<tbody><tr><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td>`;
                    drawTable += `<td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td>`;
                    if (data[voznja].StatusVoznje == 0) {
                        drawTable += '<td>Kreirana</td>';
                    } else if (data[voznja].StatusVoznje == 1) {
                        drawTable += '<td>Formirana</td>';
                    } else if (data[voznja].StatusVoznje == 2) {
                        drawTable += '<td>Obradjena</td>';
                    } else if (data[voznja].StatusVoznje == 3) {
                        drawTable += '<td>Prihvacena</td>';
                    } else if (data[voznja].StatusVoznje == 4) {
                        drawTable += '<td>Otkazana</td>';
                    } else if (data[voznja].StatusVoznje == 5) {
                        drawTable += '<td>Neuspesna</td>';
                    } else if (data[voznja].StatusVoznje == 6) {
                        drawTable += '<td>Uspesna</td>';
                    } else {
                        drawTable += '<td>Utoku</td>';
                    }

                    if (data[voznja].StatusVoznje == 1 || data[voznja].StatusVoznje == 2 || data[voznja].StatusVoznje == 3) {
                        drawTable += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td>`;
                        drawTable += `<td><button class="btn btn-xs btn-primary" id="uspesnaVoznja" type="button" value=${data[voznja].IdVoznje}>Uspesna voznja</button></td>`;
                        drawTable += `<td><button class="btn btn-xs btn-danger" id="neuspesnaVoznjaKomentar" type="button" value=${data[voznja].IdVoznje}>Neuspesna voznja</button></td></tr>`;
                    } else if (data[voznja].StatusVoznje == 5 || data[voznja].StatusVoznje == 6) {
                        drawTable += `<td><button class="btn btn-xs btn-primary" id="uspesnaVoznja" type="button" value="disable" disabled="disabled">Uspesna voznja</button></td>`;
                        drawTable += `<td><button class="btn btn-xs btn-dangerous" id="neuspesnaVoznjaKomentar" type="button" value="disable" disabled="disabled">Neuspesna voznja</button></td></tr>`;
                    }
                 }
            }

            drawTable += `</tbody></table>`;
            $("#PrikaziVoznjeVozacShow").html(drawTable);
        });
    });

    $("#prikaziSlobodneVoznje").click(function () {
        $("#PrikazVozacInfo").hide();
        $("#PrikaziVoznjeVozac").hide();
        $("#KomentarNeuspesnaVoznja").hide();
        $("#UspesnaVoznjaDiv").hide();
        $("#PrikaziKreiraneVoznjeVozac").show("slow");

        $.get("/api/Voznja", function (data, status) {
            let drawTable = "<table class=\"table table-bordered\">";
            drawTable += `<thead><tr><th>Musterija</th><th>Datum por.</th><th>Ulica i br.</th><th>Grad</th><th>Postanski br.</th><th>Status</th><th>Komentar</th><th>Ocena</th><th>Datum kom.</th><th></th></tr></thead><tbody>`;
            for (voznja in data) {
                if (data[voznja].StatusVoznje == 0 && data[voznja].TipAutaVoznje == dataTmp.Automobil.TipAuta) { /* mora biti status kreiran i da odgovara tip auta */
                    drawTable += `<tr><td>${data[voznja].MusterijaVoznja}</td><td>${data[voznja].DTPorudzbine}</td><td>${data[voznja].Dolazak.Adresa.UlicaIBroj}</td><td>${data[voznja].Dolazak.Adresa.NaseljenoMesto}</td><td>${data[voznja].Dolazak.Adresa.PozivniBroj}</td><td>Kreirana</td>`;
                    drawTable += `<td>${data[voznja].Komentar.Opis}</td><td>${data[voznja].Komentar.Ocena}</td><td>${data[voznja].Komentar.DTObjave}</td><td><button class="btn btn-xs btn-primary" id="prihvatiVoznju" type="button" value=${data[voznja].IdVoznje}>Prihvati voznju</button></td></tr>`;
                }
            }

            drawTable += "</tbody></table>";
            $("#PrikaziKreiraneVoznjeVozacShow").html(drawTable);
        });
    });

    $(document).on('click', '#prihvatiVoznju', function () {
        let idTmp = $(this).val();

        let voznja = {
            VozacVoznja: dataTmp.KorisnickoIme,
            Iznos: 0,
            DispecerVoznja: null,
            StatusVoznje: "Prihvacena"
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + idTmp,
            data: JSON.stringify(voznja),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert(`Prihvacena voznja ${idTmp}`);
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert(`Voznja: ${idTmp} ne postoji`);
                }
            }
        })
    });

    $(document).on('click', '#neuspesnaVoznjaKomentar', function () {
        let trigger_btn = $(this).val();
        localStorage.setItem("neuspesnaVoznja", trigger_btn);

        $("#PrikazVozacInfo").hide();
        $("#PrikaziVoznjeVozac").hide();
        $("#UspesnaVoznjaDiv").hide();
        $("#PrikaziKreiraneVoznjeVozac").hide();
        $("#KomentarNeuspesnaVoznja").show("slow");

        $.get("/api/Voznja", function (data, status) {
            let idTmp = localStorage.getItem("neuspesnaVoznja");
            let drawTable = "<table class=\"table table-bordered\">";
            for (voznja in data) {
                if (data[voznja].IdVoznje == idTmp) {
                    drawTable += `<tr><td>Opis</td><td><input class="form-control" type="text" id="opis1" name="Opis" value=${data[voznja].Komentar.Opis}></td></tr>`;
                    drawTable += `<tr><td>Datum objave</td><td><input class="form-control" type="datetime" id="datum1" name="DTObjave" value=${data[voznja].Komentar.DTObjave}></td></tr>`;
                    drawTable += `<tr><td>Ocena</td><td><input class="form-control" id="ocena1" min="0" max="5" type="number" name="Ocena" value=${data[voznja].Komentar.Ocena}></td></tr>`;
                }
            }

            drawTable += "</table>";
            $("#KomentarNeuspesnaVoznjaShow").html(drawTable);
        });
    });

    $("#neuspesnaVoznjaPotvrdi").click(function () {
        let idTmp1 = localStorage.getItem("neuspesnaVoznja");

        let komentarVoznja1 = {
            Opis: `${$('#opis1').val()}`,
            DTObjave: `${$('#datum1').val()}`,
            Ocena: `${$('#ocena1').val()}`,
            KorImeKorisnikKomentar: dataTmp.KorisnickoIme,
            IdVoznjaKomentar: idTmp1
        };

        let voznja1 = {
            VozacVoznja: dataTmp.KorisnickoIme,
            Iznos: 0,
            Komentar: komentarVoznja1,
            StatusVoznje: "Neuspesna"
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + idTmp1,
            data: JSON.stringify(voznja1),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Neuspesna voznja');
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Voznja ne postoji');
                }
            }
        })
    });

    $(document).on('click', '#uspesnaVoznja', function () {
        let trigger_button5 = $(this).val();
        localStorage.setItem("uspesnaVoznjaSorage", trigger_button5);

        $("#PrikazVozacInfo").hide();
        $("#PrikaziVoznjeVozac").hide();
        $("#PrikaziKreiraneVoznjeVozac").hide();
        $("#KomentarNeuspesnaVoznja").hide();
        $("#UspesnaVoznjaDiv").show("slow");

        $.get("/api/Voznja", function (data, status) {
            let id5 = localStorage.getItem("uspesnaVoznjaSorage");
            let drawTable = "<table class=\"table table-bordered\">";
            for (voznja in data) {
                if (data[voznja].IdVoznje == id5) {
                    drawTable += `<tr><td>Id lokacije odredista</td><td><input class="form-control" id="idlokodredista" type="text" name="IdLok" value=${data[voznja].Odrediste.IdLok}></td></tr>`;
                    drawTable += `<tr><td>X</td><td><input class="form-control" id="xlokodredista" type="text" name="X" value=${data[voznja].Odrediste.X}></td></tr>`;
                    drawTable += `<tr><td>Y</td><td><input class="form-control" id="ylokodredista" type="text" name="Y" value=${data[voznja].Odrediste.Y}></td></tr>`;
                    drawTable += `<tr><td>Id Adrese odredista</td><td><input class="form-control" id="idadrodredista" type="text" name="IdAdr" value=${data[voznja].Odrediste.Adresa.IdAdr}></td></tr>`;
                    drawTable += `<tr><td>Ulica i broj odredista</td><td><input class="form-control" id="ulicaibrojodredista" type="text" name="UlicaIBroj" value=${data[voznja].Odrediste.Adresa.UlicaIBroj}></td></tr>`;
                    drawTable += `<tr><td>Grad</td><td><input class="form-control" id="naseljenomestoodredista" type="text" name="NaseljenoMesto" value=${data[voznja].Odrediste.Adresa.NaseljenoMesto}></td></tr>`;
                    drawTable += `<tr><td>Pozivni broj odredista</td><td><input class="form-control" id="pozivnibrojodredista" type="text" name="PozivniBroj" value=${data[voznja].Odrediste.Adresa.PozivniBroj}></td></tr>`;
                    drawTable += `<tr><td>Iznos</td><td><input class="form-control" id="iznosodredista" type="text" name="Iznos" value=${data[voznja].Iznos}></td></tr>`;
                }
            }

            drawTable += "</table>";
            $("#UspesnaVoznjaDivShow").html(drawTable);
        });
    });

    $("#potvrdiUnosUspesna").click(function () {
        let id8 = localStorage.getItem("uspesnaVoznjaSorage");

        let adresaOdrediste = {
            IdAdr: `${$('#idadrodredista').val()}`,
            UlicaIBroj: `${$('#ulicaibrojodredista').val()}`,
            NaseljenoMesto: `${$('#naseljenomestoodredista').val()}`,
            PozivniBroj: `${$('#pozivnibrojodredista').val()}`
        };

        let lokacijaOdrediste = {
            IdLok: `${$('#idlokodredista').val()}`,
            X: `${$('#xlokodredista').val()}`,
            Y: `${$('#ylokodredista').val()}`,
            Adresa: adresaOdrediste
        };

        let voznja8 = {
            VozacVoznja: dataTmp.KorisnickoIme,
            Odrediste: lokacijaOdrediste,
            Iznos: `${$('#iznosodredista').val()}`,
            StatusVoznje: "Uspesna"
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Voznja/' + id8,
            data: JSON.stringify(voznja8),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alert('Uspesna voznja');
                    $(location).attr('href', 'welcome.html');
                } else {
                    alert('Voznja ne postoji');
                }
            }
        })
    });

    $("#prikaziSveKorisnike").click(function () {
        $("#PrikaziVoznjeDispecerSve").hide();
        $("#PrikaziVoznjeDispecer").hide();
        $("#DodajVozacaDispecer").hide();
        $("#prikazSvihKorisnika").show("slow");
        $("#PrikazKorisnikInfoDisp").hide();

        $.get("/api/Korisnik", function (data, status) {

            let tableofData555 = "<table class=\"table table-bordered\">";
            tableofData555 += "<thead><tr><th>ID</th><th>Korisnicko ime</th><th>Ime</th><th>Prezime</th><th>Email</th><th></th></tr></thead><tbody>";

            for (user in data) {
                tableofData555 += `<tr><td>${data[user].Id}</td><td>${data[user].KorisnickoIme}</td><td>${data[user].Ime}</td><td>${data[user].Prezime}</td><td>${data[user].Email}</td>`;
                tableofData555 += `<td class="td-caret" style="width: 60px;"><div class="dropdown pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle btn-xs-caret" data-toggle="dropdown">Opcije<span class="caret"></span></button>`;
                tableofData555 += `<ul class="dropdown-menu"><li><a>Banuj korisnika</a></li></ul></div></td></tr>`;
            }

            tableofData555 += "</tbody></table>";
            $("#prikazSvihKorisnikaShow").html(tableofData555);
        });
    });
});