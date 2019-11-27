var express = require('express');
var bodyParser = require("body-parser");
var app = express();
require('dotenv').config();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render('stationId');
});

var sql = require("mssql");
var config = {
    user: 'nodejs',
    password: 'nodejs',
    server: process.env.SERVER,
    database: 'PLC_AM',
    dialect: "mssql",
};

var StationId = '14';

app.post('/dropdown', function (req, res) {
    var names_recept = '';
    var names_rullsarg = '';
    var names_rullhjul = '';
    var names_indexhjul = '';
    var names_mothall = '';

    if (req.body.StationId === 'AM1') {
        StationId = '13';
    } else {
        StationId = '14';
    }
    sql.connect(config, function (err) {
        var count = 0;
        if (err) {
            console.log(err);
            sql.close();
        } else {
            var request = new sql.Request();
            //let search = req.body.search;
            let string = 'SELECT Recipe_Name FROM PLC_AM.dbo.recipe WHERE StationId = ' + StationId + 'ORDER BY Recipe_Name';
            console.log(string);
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err);
                    sql.close();
                } else {
                    names_recept = data.recordset.map(function (item) {
                        return item['Recipe_Name'];
                    });
                    console.log(data.recordset);
                    console.log(names_recept);
                    sql.close();
                    count++;
                    if (count == 5) {
                        res.render('dropdown', {
                            dropdownVals_recept: names_recept,
                            dropdownVals_rullsarg: names_rullsarg,
                            dropdownVals_rullhjul: names_rullhjul,
                            dropdownVals_indexhjul: names_indexhjul,
                            dropdownVals_mothall: names_mothall,
                            StationId: StationId
                        });
                    }
                }
            });

            string = 'SELECT Rullsarg_beteckning FROM PLC_AM.dbo.tool_rullsarg WHERE Rullsarg_StationId = ' + StationId + 'ORDER BY Rullsarg_beteckning';
            console.log(string);
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err);
                    sql.close();
                } else {
                    names_rullsarg = data.recordset.map(function (item) {
                        return item['Rullsarg_beteckning'];
                    });
                    console.log(data.recordset);
                    console.log(names_rullsarg);
                    sql.close();
                    count++;
                    if (count == 5) {
                        res.render('dropdown', {
                            dropdownVals_recept: names_recept,
                            dropdownVals_rullsarg: names_rullsarg,
                            dropdownVals_rullhjul: names_rullhjul,
                            dropdownVals_indexhjul: names_indexhjul,
                            dropdownVals_mothall: names_mothall,
                            StationId: StationId
                        });
                    }
                }
            });

            string = 'SELECT Rullhjul_beteckning FROM PLC_AM.dbo.tool_rullhjul WHERE Rullhjul_StationId = ' + StationId + 'ORDER BY Rullhjul_beteckning';
            console.log(string);
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err);
                    sql.close();
                } else {
                    names_rullhjul = data.recordset.map(function (item) {
                        return item['Rullhjul_beteckning'];
                    });
                    console.log(data.recordset);
                    console.log(names_rullhjul);
                    sql.close();
                    count++;
                    if (count == 5) {
                        res.render('dropdown', {
                            dropdownVals_recept: names_recept,
                            dropdownVals_rullsarg: names_rullsarg,
                            dropdownVals_rullhjul: names_rullhjul,
                            dropdownVals_indexhjul: names_indexhjul,
                            dropdownVals_mothall: names_mothall,
                            StationId: StationId
                        });
                    }
                }
            });

            string = 'SELECT Indexhjul_beteckning FROM PLC_AM.dbo.tool_indexhjul WHERE Indexhjul_StationId = ' + StationId + 'ORDER BY Indexhjul_beteckning';
            console.log(string);
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err);
                    sql.close();
                } else {
                    names_indexhjul = data.recordset.map(function (item) {
                        return item['Indexhjul_beteckning'];
                    });
                    console.log(data.recordset);
                    console.log(names_indexhjul);
                    sql.close();
                    count++;
                    if (count == 5) {
                        res.render('dropdown', {
                            dropdownVals_recept: names_recept,
                            dropdownVals_rullsarg: names_rullsarg,
                            dropdownVals_rullhjul: names_rullhjul,
                            dropdownVals_indexhjul: names_indexhjul,
                            dropdownVals_mothall: names_mothall,
                            StationId: StationId
                        });
                    }
                }
            });

            string = 'SELECT Mothåll_beteckning FROM PLC_AM.dbo.tool_mothåll WHERE Mothåll_StationId = ' + StationId + 'ORDER BY Mothåll_beteckning';
            console.log(string);
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                    sql.close();
                } else {
                    names_mothall = data.recordset.map(function (item) {
                        return item['Mothåll_beteckning'];
                    });
                    console.log(data.recordset);
                    console.log(names_mothall);
                    sql.close();
                    count++;
                    if (count == 5) {
                        res.render('dropdown', {
                            dropdownVals_recept: names_recept,
                            dropdownVals_rullsarg: names_rullsarg,
                            dropdownVals_rullhjul: names_rullhjul,
                            dropdownVals_indexhjul: names_indexhjul,
                            dropdownVals_mothall: names_mothall,
                            StationId: StationId
                        });
                    }
                }
            });
        }

    });
});

app.post('/recept', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
            sql.close();
        } else {
            var request = new sql.Request();
            let string = 'SELECT * FROM recipe WHERE Recipe_Name =\'' + req.body.recept + '\'  AND StationId =\'' + StationId + '\'';
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    console.log(string);
                    console.log(data)
                    try {
                        res.render('recipe', {
                            Designation: JSON.stringify(data.recordset[0].Designation).replace(/['"]+/g, ''),
                            Recipe_Name: JSON.stringify(data.recordset[0].Recipe_Name).replace(/['"]+/g, ''),
                            VA: JSON.stringify(data.recordset[0].VA).replace(/['"]+/g, ''),
                            SfärningsVinkel_RH19: JSON.stringify(data.recordset[0].SfärningsVinkel_RH19).replace(/['"]+/g, ''),
                            ÅtersfäringVinkel_Rullstöd_RH20: JSON.stringify(data.recordset[0].ÅtersfäringVinkel_Rullstöd_RH20).replace(/['"]+/g, ''),
                            MonteringsVinkel_C_eq_IRA50_E_eq_BCA21: JSON.stringify(data.recordset[0].MonteringsVinkel_C_eq_IRA50_E_eq_BCA21, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            OffsetFrånCentrum_RH11: JSON.stringify(data.recordset[0].OffsetFrånCentrum_RH11, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            MonteringsRadie_C_eq_RD75_add_RSD10_div_2_E_eq_RH12: JSON.stringify(data.recordset[0].MonteringsRadie_C_eq_RD75_add_RSD10_div_2_E_eq_RH12, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Hållare_YtterDiameter_C_eq_CPD10_E_eq_CPD15: JSON.stringify(data.recordset[0].Hållare_YtterDiameter_C_eq_CPD10_E_eq_CPD15, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Mothall_Mothall_ID: JSON.stringify(data.recordset[0].Mothall_Mothall_ID).replace(/['"]+/g, ''),
                            RullHjul_RullHjul_ID: JSON.stringify(data.recordset[0].RullHjul_RullHjul_ID).replace(/['"]+/g, ''),
                            RullSarg_RullSarg_ID: JSON.stringify(data.recordset[0].RullSarg_RullSarg_ID).replace(/['"]+/g, ''),
                            Innerringsplatta1_Innerringsplatta1_ID: JSON.stringify(data.recordset[0].Innerringsplatta1_Innerringsplatta1_ID).replace(/['"]+/g, ''),
                            Innerringsplatta2_Innerringsplatta2_ID: JSON.stringify(data.recordset[0].Innerringsplatta2_Innerringsplatta2_ID).replace(/['"]+/g, ''),
                            Rullstöd_Rullstöd_ID: JSON.stringify(data.recordset[0].Rullstöd_Rullstöd_ID).replace(/['"]+/g, ''),
                            Ytterringsstöd_Ytterringsstöd_ID: JSON.stringify(data.recordset[0].Ytterringsstöd_Ytterringsstöd_ID).replace(/['"]+/g, ''),
                            RobotGripper_Gripper_ID: JSON.stringify(data.recordset[0].RobotGripper_Gripper_ID).replace(/['"]+/g, ''),
                            Indexhjul_Indexhjul_ID: JSON.stringify(data.recordset[0].Indexhjul_Indexhjul_ID).replace(/['"]+/g, ''),
                            StationId: JSON.stringify(data.recordset[0].StationId).replace(/['"]+/g, ''),
                        });
                    } catch (error) {
                        console.log('Failed to retrieve SQL-data');
                    }
                }
            });
        };
    });
});

app.post('/rullsarg', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'SELECT * FROM tool_rullsarg WHERE Rullsarg_beteckning =\'' + req.body.rullsarg + '\'  AND Rullsarg_StationId =\'' + StationId + '\'';
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    console.log(req.body);
                    console.log(data)
                    try {
                        res.render('rullsarg', {
                            Rullsarg_beteckning: JSON.stringify(data.recordset[0].Rullsarg_beteckning).replace(/['"]+/g, ''),
                            E_lager: JSON.stringify(data.recordset[0].E_lager).replace(/['"]+/g, ''),
                            Rulle_Höjd_Midja_RH21: JSON.stringify(data.recordset[0].Rulle_Höjd_Midja_RH21, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Rulltryckare_Radie_RH13: JSON.stringify(data.recordset[0].Rulltryckare_Radie_RH13, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Rulltryckare_OffsetFrånCentrum_RH15: JSON.stringify(data.recordset[0].Rulltryckare_OffsetFrånCentrum_RH15, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Laddningsvinkel_RH14: JSON.stringify(data.recordset[0].Laddningsvinkel_RH14, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Rullsarg_StationId: JSON.stringify(data.recordset[0].Rullsarg_StationId).replace(/['"]+/g, ''),
                            StationId: StationId,
                        });
                    } catch (error) {
                        console.log('Failed to retrieve SQL-data');
                    }
                }
            });
        }
    });
});

app.post('/rullhjul', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'SELECT * FROM tool_rullhjul WHERE Rullhjul_beteckning =\'' + req.body.rullhjul + '\'  AND Rullhjul_StationId =\'' + StationId + '\'';
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    console.log(req.body);
                    console.log(data)
                    try {
                        res.render('rullhjul', {
                            Rullhjul_beteckning: JSON.stringify(data.recordset[0].Rullhjul_beteckning).replace(/['"]+/g, ''),
                            Radie_RH18: JSON.stringify(data.recordset[0].Radie_RH18, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            VinkelSistaRulle_RH07: JSON.stringify(data.recordset[0].VinkelSistaRulle_RH07, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Rullhjul_StationId: JSON.stringify(data.recordset[0].Rullhjul_StationId).replace(/['"]+/g, ''),
                            StationId: StationId,
                        });
                    } catch (error) {
                        console.log('Failed to retrieve SQL-data');
                    }
                }
            });
        }
    });
});

app.post('/indexhjul', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'SELECT * FROM tool_indexhjul WHERE Indexhjul_beteckning =\'' + req.body.indexhjul + '\'  AND Indexhjul_StationId =\'' + StationId + '\'';
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    console.log(req.body);
                    console.log(data)
                    try {
                        res.render('indexhjul', {
                            Indexhjul_Beteckning: JSON.stringify(data.recordset[0].Indexhjul_Beteckning).replace(/['"]+/g, ''),
                            Indexhjul_Delning: JSON.stringify(data.recordset[0].Indexhjul_Delning, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Indexhjul_Utmatningslangd: JSON.stringify(data.recordset[0].Indexhjul_Utmatningslangd, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Indexhjul_StationId: JSON.stringify(data.recordset[0].Indexhjul_StationId).replace(/['"]+/g, ''),
                            StationId: StationId,
                        });
                    } catch (error) {
                        console.log('Failed to retrieve SQL-data');
                    }
                }
            });
        }
    });
});

app.post('/mothall', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'SELECT * FROM tool_mothåll WHERE Mothåll_beteckning =\'' + req.body.mothall + '\'  AND Mothåll_StationId =\'' + StationId + '\'';
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    console.log(req.body);
                    console.log(data)
                    try {
                        res.render('mothåll', {
                            Mothåll_beteckning: JSON.stringify(data.recordset[0].Mothåll_beteckning).replace(/['"]+/g, ''),
                            Höjd_RH22: JSON.stringify(data.recordset[0].Höjd_RH22, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Hojd_Offset: JSON.stringify(data.recordset[0].Hojd_Offset, function (key, val) {
                                return val.toPrecision(5)
                            }).replace(/['"]+/g, ''),
                            Mothåll_StationId: JSON.stringify(data.recordset[0].Mothåll_StationId).replace(/['"]+/g, ''),
                            StationId: StationId,
                        });
                    } catch (error) {
                        console.log('Failed to retrieve SQL-data');
                    }
                }
            });
        }
    });
});

app.post("/test_recept", function (req, res) {

    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'EXEC PLC_AM.dbo.Test_New_Recipe \'' + req.body.designation + '\' , \'' + req.body.recipe_name + '\' , \'' + req.body.Mothall_Mothall_ID + '\' , \'' + req.body.RullHjul_RullHjul_ID + '\' , \'' + req.body.RullSarg_RullSarg_ID + '\' , \'' + req.body.Indexhjul_Indexhjul_ID + '\' , \'' + req.body.StationId + '\'';
            console.log(string)
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    if (data.recordset[0]["Status Indexhjul"] === 'OK' &
                        data.recordset[0]["Status Mothåll"] === 'OK' &
                        data.recordset[0]["Status Rullhjul"] === 'OK' &
                        data.recordset[0]["Status Rullsarg"] === 'OK' &
                        data.recordset[0]["Status Windchill"] === 'Finns i Windchill' &
                        data.recordset[0]["Status Receptnamn"] === 'Ledigt' &
                        data.recordset[0]["Status Ancestor"] === 'Har inte recept') {
                        data.recordset[0]["show_new"] = 'yes';
                    } else {
                        data.recordset[0]["show_new"] = 'no';
                    }

                    if (data.recordset[0]["Status Indexhjul"] === 'OK' &
                        data.recordset[0]["Status Mothåll"] === 'OK' &
                        data.recordset[0]["Status Rullhjul"] === 'OK' &
                        data.recordset[0]["Status Rullsarg"] === 'OK' &
                        data.recordset[0]["Status Windchill"] === 'Finns i Windchill' &
                        data.recordset[0]["Status Receptnamn"] !== 'Ledigt') {
                        data.recordset[0]["show_overwrite"] = 'yes';
                    } else {
                        data.recordset[0]["show_overwrite"] = 'no';
                    }

                    if (data.recordset[0]["Status Receptnamn"] !== 'Ledigt') {
                        data.recordset[0]["show_delete"] = 'yes';
                    } else {
                        data.recordset[0]["show_delete"] = 'no';
                    }
                    console.log(data)
                    console.log(data.recordset[0])
                    res.send(data.recordset[0]);
                }
            });
        }
    });
});

app.post("/edit_recept", function (req, res) {
    sql.connect(config).then(pool => {
        return pool.request()
            .input('Designation', sql.VarChar(255), req.body.designation)
            .input('Recipe_Name', sql.VarChar(255), req.body.recipe_name)
            .input('VA', sql.VarChar(255), req.body.VA)
            .input('SfärningsVinkel_RH19', sql.VarChar(255), req.body.SfärningsVinkel_RH19)
            .input('ÅtersfäringVinkel_Rullstöd_RH20', sql.VarChar(255), req.body.ÅtersfäringVinkel_Rullstöd_RH20)
            .input('MonteringsVinkel_C_eq_IRA50_E_eq_BCA21', sql.VarChar(255), req.body.MonteringsVinkel_C_eq_IRA50_E_eq_BCA21)
            .input('OffsetFrånCentrum_RH11', sql.VarChar(255), req.body.OffsetFrånCentrum_RH11)
            .input('MonteringsRadie_C_eq_RD75_add_RSD10_div_2_E_eq_RH12', sql.VarChar(255), req.body.MonteringsRadie_C_eq_RD75_add_RSD10_div_2_E_eq_RH12)
            .input('Hållare_YtterDiameter_C_eq_CPD10_E_eq_CPD15', sql.VarChar(255), req.body.Hållare_YtterDiameter_C_eq_CPD10_E_eq_CPD15)
            .input('Mothall_Mothall_ID', sql.VarChar(255), req.body.Mothall_Mothall_ID)
            .input('RullHjul_RullHjul_ID', sql.VarChar(255), req.body.RullHjul_RullHjul_ID)
            .input('RullSarg_RullSarg_ID', sql.VarChar(255), req.body.RullSarg_RullSarg_ID)
            .input('Innerringsplatta1_Innerringsplatta1_ID', sql.VarChar(255), req.body.Innerringsplatta1_Innerringsplatta1_ID)
            .input('Innerringsplatta2_Innerringsplatta2_ID', sql.VarChar(255), req.body.Innerringsplatta2_Innerringsplatta2_ID)
            .input('Rullstöd_Rullstöd_ID', sql.VarChar(255), req.body.Rullstöd_Rullstöd_ID)
            .input('Ytterringsstöd_Ytterringsstöd_ID', sql.VarChar(255), req.body.Ytterringsstöd_Ytterringsstöd_ID)
            .input('RobotGripper_Gripper_ID', sql.VarChar(255), req.body.RobotGripper_Gripper_ID)
            .input('Robot_LängdSugkopp', sql.VarChar(255), req.body.Robot_LängdSugkopp)
            .input('Indexhjul_Indexhjul_ID', sql.VarChar(255), req.body.Indexhjul_Indexhjul_ID)
            .input('StationId', sql.VarChar(255), req.body.StationId)
            .input('Operation', sql.VarChar(255), req.body.operation)
            .execute('PLC_AM.dbo.Edit_Recipe')
    }).then(result => {
        console.log(result)
        res.send(result);
        sql.close();
    }).catch(err => {
        console.log(err);
    })
})

app.post("/test_rullsarg", function (req, res) {

    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'EXEC PLC_AM.dbo.Test_Rullsarg \'' + req.body.Rullsarg_beteckning + '\' , \'' + req.body.Rullsarg_StationId + '\'';
            console.log(string)
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    if (data.recordset[0]["Status Rullsarg"] === 'Ledigt') {
                        data.recordset[0]["show_change_delete"] = 'no';
                        data.recordset[0]["show_new"] = 'yes';
                    } else {
                        data.recordset[0]["show_change_delete"] = 'yes';
                        data.recordset[0]["show_new"] = 'no';
                    }

                    console.log(data)
                    console.log(data.recordset[0])
                    res.send(data.recordset[0]);
                }
            });
        }
    });
});

app.post("/edit_rullsarg", function (req, res) {
    sql.connect(config).then(pool => {
        return pool.request()
            .input('Rullsarg_beteckning', sql.VarChar(255), req.body.Rullsarg_beteckning)
            .input('E_lager', sql.VarChar(255), req.body.E_lager)
            .input('Rulle_Höjd_Midja_RH21', sql.VarChar(255), req.body.Rulle_Höjd_Midja_RH21)
            .input('Rulltryckare_Radie_RH13', sql.VarChar(255), req.body.Rulltryckare_Radie_RH13)
            .input('Rulltryckare_OffsetFrånCentrum_RH15', sql.VarChar(255), req.body.Rulltryckare_OffsetFrånCentrum_RH15)
            .input('Laddningsvinkel_RH14', sql.VarChar(255), req.body.Laddningsvinkel_RH14)
            .input('RullHjul_Fram_Offset', sql.VarChar(255), req.body.RullHjul_Fram_Offset)
            .input('RullHjul_Upp_Offset', sql.VarChar(255), req.body.RullHjul_Upp_Offset)
            .input('Rulltryckare_Fram_Offset', sql.VarChar(255), req.body.Rulltryckare_Fram_Offset)
            .input('Rulltryckare_Upp_Offset', sql.VarChar(255), req.body.Rulltryckare_Upp_Offset)
            .input('Rullsarg_StationId', sql.VarChar(255), req.body.Rullsarg_StationId)
            .input('Operation', sql.VarChar(255), req.body.operation)
            .execute('PLC_AM.dbo.Edit_Rullsarg')
    }).then(result => {
        console.log(result)
        res.send(result);
        sql.close();
    }).catch(err => {
        console.log(err);
    })
})

app.post("/test_rullhjul", function (req, res) {

    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'EXEC PLC_AM.dbo.Test_Rullhjul \'' + req.body.Rullhjul_beteckning + '\' , \'' + req.body.Rullhjul_StationId + '\'';
            console.log(string)
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    if (data.recordset[0]["Status Rullhjul"] === 'Ledigt') {
                        data.recordset[0]["show_change_delete"] = 'no';
                        data.recordset[0]["show_new"] = 'yes';
                    } else {
                        data.recordset[0]["show_change_delete"] = 'yes';
                        data.recordset[0]["show_new"] = 'no';
                    }

                    console.log(data)
                    console.log(data.recordset[0])
                    res.send(data.recordset[0]);
                }
            });
        }
    });
});

app.post("/edit_rullhjul", function (req, res) {
    sql.connect(config).then(pool => {
        return pool.request()
            .input('Rullhjul_beteckning', sql.VarChar(255), req.body.Rullhjul_beteckning)
            .input('Radie_RH18', sql.VarChar(255), req.body.Radie_RH18)
            .input('VinkelSistaRulle_RH07', sql.VarChar(255), req.body.VinkelSistaRulle_RH07)
            .input('Rullhjul_StationId', sql.VarChar(255), req.body.Rullhjul_StationId)
            .input('Operation', sql.VarChar(255), req.body.operation)
            .execute('PLC_AM.dbo.Edit_Rullhjul')
    }).then(result => {
        console.log(result)
        res.send(result);
        sql.close();
    }).catch(err => {
        console.log(err);
    })
})

app.post("/test_indexhjul", function (req, res) {

    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'EXEC PLC_AM.dbo.Test_Indexhjul \'' + req.body.Indexhjul_Beteckning + '\' , \'' + req.body.Indexhjul_StationId + '\'';
            console.log(string)
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    if (data.recordset[0]["Status Indexhjul"] === 'Ledigt') {
                        data.recordset[0]["show_change_delete"] = 'no';
                        data.recordset[0]["show_new"] = 'yes';
                    } else {
                        data.recordset[0]["show_change_delete"] = 'yes';
                        data.recordset[0]["show_new"] = 'no';
                    }
                    console.log(data)
                    console.log(data.recordset[0])
                    res.send(data.recordset[0]);
                }
            });
        }
    });
});

app.post("/edit_indexhjul", function (req, res) {
    sql.connect(config).then(pool => {
        return pool.request()
            .input('Indexhjul_Beteckning', sql.VarChar(255), req.body.Indexhjul_Beteckning)
            .input('Indexhjul_Delning', sql.VarChar(255), req.body.Indexhjul_Delning)
            .input('Indexhjul_Utmatningslangd', sql.VarChar(255), req.body.Indexhjul_Utmatningslangd)
            .input('Indexhjul_StationId', sql.VarChar(255), req.body.Indexhjul_StationId)
            .input('Operation', sql.VarChar(255), req.body.operation)
            .execute('PLC_AM.dbo.Edit_Indexhjul')
    }).then(result => {
        console.log(result)
        res.send(result);
        sql.close();
    }).catch(err => {
        console.log(err);
    })
})

app.post("/test_mothall", function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err)
        } else {
            var request = new sql.Request();
            let string = 'EXEC PLC_AM.dbo.Test_Mothåll \'' + req.body.Mothåll_beteckning + '\' , \'' + req.body.Mothåll_StationId + '\'';
            console.log(string)
            request.query(string, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    sql.close();
                    if (data.recordset[0]["Status Mothåll"] === 'Ledigt') {
                        data.recordset[0]["show_change_delete"] = 'no';
                        data.recordset[0]["show_new"] = 'yes';
                    } else {
                        data.recordset[0]["show_change_delete"] = 'yes';
                        data.recordset[0]["show_new"] = 'no';
                    }

                    console.log(data)
                    console.log(data.recordset[0])
                    res.send(data.recordset[0]);
                }
            });
        }
    });
});

app.post("/edit_mothall", function (req, res) {
    sql.connect(config).then(pool => {
        return pool.request()
            .input('Mothåll_beteckning', sql.VarChar(255), req.body.Mothåll_beteckning)
            .input('Höjd_RH22', sql.VarChar(255), req.body.Höjd_RH22)
            .input('Hojd_Offset', sql.VarChar(255), req.body.Hojd_Offset)
            .input('Mothåll_StationId', sql.VarChar(255), req.body.Mothåll_StationId)
            .input('Operation', sql.VarChar(255), req.body.operation)
            .execute('PLC_AM.dbo.Edit_Mothåll')
    }).then(result => {
        console.log(result)
        res.send(result);
        sql.close();
    }).catch(err => {
        console.log(err);
    })
})

var server = app.listen(5000, function () {
    console.log('Server is running on the hittepåport.. ');
});