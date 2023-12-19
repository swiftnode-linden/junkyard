<?php

// Variable assignments
$cctype = "cctype";
$randFunc = "rand";
$ccklas = "ccklas";
$ccbrand = "ccbrand";
$namabnk = "namabnk";
$getbank = "getbank";
$jeniscc = "jeniscc";
$bin = "bin";
$format = "format";
$expy = "expy";
$expm = "expm";
$num = "num";
$datas = "datas";
$data = "data";

// Retrieve data from POST
${$data} = $_POST["data"];

// Check if data is not empty
if (!empty($_POST["data"])) {
    $expmVar = "expm";
    $dataVar = "data";
    $datasVar = "datas";

    // Extract relevant information from the data
    preg_match("#^[\d]{16}\|[\d]{2}\|[\d]{4}\|[\d]{3}\$#", ${$data}, ${$datas});
    ${$datas} = explode("|", ${$datas}[0]);

    $numVar = "num";
    $expyVar = "expy";
    $cvvVar = "cvv";

    // Assign values from the exploded data
    ${$numVar} = ${$datas}[0];
    ${$expmVar} = ${$datas}[1];
    ${$expyVar} = ${$datas}[2];
    ${$cvvVar} = ${$datas}[3];

    $formatVar = "format";

    // Create a formatted string
    ${$formatVar} = ${$numVar} . "|" . ${$expmVar} . "|" . ${$expyVar} . "|" . ${$cvvVar};

    // Check expiration year and month
    if (${$expyVar} >= 2017 && ${$expmVar} <= 12) {
        $binVar = "bin";
        $randBin = substr(${$binVar}, 0, 6);
        $namabnkVar = "namabnk";

        // Fetch information from an external source based on the BIN
        ${$binVar} = $num;
        ${$namabnkVar} = explode($randBin, file_get_contents("http://bins.pro/search?action=searchbins&bins=" . ${$binVar} . "&bank=&country="));

        $cctypeVar = "cctype";
        $ccbrandVar = "ccbrand";
        $jenisccVar = "jeniscc";

        // Extract specific information from the fetched data
        ${$cctypeVar} = explode("</td></tr>", ${$jenisccVar}[5]);
        ${$ccbrandVar} = ${$cctypeVar}[2];
        ${$cctypeVar} = ${$cctypeVar}[3];
        ${$ccklas} = ${$cctypeVar}[4];

        $randNum = rand(1, 5);

        // Output the result based on the random number
        if ($randNum == 1) {
            $ccbrandVar = "ccbrand";
            echo "{\"error\":1,\"msg\":\"<div><b style='color:#008000;'>Live</b> | " . ${$formatVar} . " [BIN: <b style='color:blue;'>" . ${$ccbrandVar} . "</b><b style='color:red;'> - </b><b style='color:blue;'>" . ${$namabnkVar} . "</b><b style='color:red;'> - </b><b style='color:blue;'>" . ${$cctypeVar} . "</b><b style='color:red;'> - </b><b style='color:blue;'>" . ${$ccklas} . "</b>] $0.5 Checked - Shinji</div>\"}";
        } elseif ($randNum == 2) {
            echo "{\"error\":2,\"msg\":\"<div><b style='color:#FF0000;'>Die</b> | " . ${$formatVar} . " [GATE:01] @/Checked - Shinji</div>\"}";
        } elseif ($randNum == 3) {
            echo "{\"error\":3,\"msg\":\"<div><b style='color:#800080;'>Unknown</b> | " . ${$formatVar} . " | [GATE:01] @/ChkNET-ID</div>\"}";
        } elseif ($randNum == 4) {
            echo "{\"error\":2,\"msg\":\"<div><b style='color:#FF0000;'>Die</b> | " . ${$formatVar} . " [GATE:01] @/ChkNET-ID</div>\"}";
        } elseif ($randNum == 5) {
            echo "{\"error\":3,\"msg\":\"<div><b style='color:#800080;'>Unknown</b> | " . ${$formatVar} . " | [GATE:01] @/ChkNET-ID</div>\"}";
        }
    } else {
        $formatVar = "format";
        echo "{\"error\":4,\"msg\":\"<b>Check the validity of a credit card</b> | " . ${$formatVar} . " [GATE:01] @/Checked - Shinji\"}";
    }
}
?>
