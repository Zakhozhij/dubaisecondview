
// запрос на отправку данных полета в crm систему (добавление лида)
function setFormTicket(data) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "__cf_bm=.ilzYWTcidLWsusPy.xFX.PJikmphUVjTiSqGMcQGRg-1677749423-0-AbYeNEK8lYCO48wl/3n7rFLcBgaNblu3bBVaMLCkExCehccXkH3FU+YFz8+WU9271erDTB6Skcf20yO74uPzM04=");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch("https://api.pipedrive.com/v1/leads?api_token=af8650bc565f4a29101ddaa8e12bbd62c5bf1f83&af8650bc565f4a29101ddaa8e12bbd62c5bf1f83=<API Key>", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => console.log('error', error));
}


// добавление персоны с такими же данными как у лида
function addPersonCRM(data){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "__cf_bm=IyVDSi3O78NqEFiYHCTx3ofzphiTfpd6v2wpjWsz3xA-1678781043-0-AUjsWMcBb3V2pJPp8P4VJJXC4N/Kpx+Ci2PDxbdEXT+1pd5iq70IhwJ6JIwDL/AgpXPkIyWEluUYuEoVUomP/FI=");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch("https://api.pipedrive.com/v1/persons?api_token=af8650bc565f4a29101ddaa8e12bbd62c5bf1f83&af8650bc565f4a29101ddaa8e12bbd62c5bf1f83=<API Key>", requestOptions)
        .then(response => response.text())
        .then(result => { sendReqSetForm(JSON.parse(result).data.id) })
        .catch(error => console.log('error', error));
}

