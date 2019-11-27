module.exports = function (app, sql, config, StationId) {
    app.post('/recept', function (req, res) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            let string = 'SELECT * FROM recipe WHERE Recipe_Name =\'' + req.body.recept + '\'  AND StationId =\'' + StationId + '\'';
            request.query(string, function (err, data) {
                if (err) { console.log(err) } else {
                    sql.close();
                    console.log(string);
                    console.log(data)
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
                }
            });
        });
    });
};