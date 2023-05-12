//форма на главной станице
const dataLayer = window.dataLayer;

async function formSubmit() {
    let data = new FormData(document.forms["form"]);
    let response = await fetch("send_mail.php", {
        method: "POST",
        body: data,
    });

    if (response.ok) {
        dataLayer.push({'event': 'form_sent'});
        formReset();
    } else {
        alert("Код ошибки: " + response.status);
    }
}

// форма в модальном окне
async function formModal() {
    let dataModal = new FormData(document.forms["form-modal"]);

    let responseModal = await fetch("send_mail.php", {
        method: "POST",
        body: dataModal
    });

    if (responseModal.ok) {
        dataLayer.push({'event': 'form_sent'});
        formReset();
    } else {
        alert("Код ошибки: " + response.status);
    }
}

// форма с выбором ввода данных
async function formModalChoose() {
    let dataModalChoose = new FormData(document.forms["form-modal-choose"]);

    let responseModalChoose = await fetch("send_mail.php", {
        method: "POST",
        body: dataModalChoose
    });

    if (responseModalChoose.ok) {
        dataLayer.push({'event': 'form_sent'});
        formReset();
    } else {
        alert("Код ошибки: " + response.status);
    }
}

// форма с информацией о билете
async function formSubmitTicket() {
    const ticket = new FormData(document.forms["inf_ticket1"]);
    const sendTicket = await fetch("send_mail-ticket.php", {
        method: "POST",
        body: ticket,
    });

    if (sendTicket.ok) {
        dataLayer.push({'event': 'form_sent'});
        formReset();
    } else {
        alert("Код ошибки: " + sendTicket.status);
    }
}

async function formSubmitTicketTwo() {
    const ticket = new FormData(document.forms["inf_ticket2"]);
    const sendTicket = await fetch("send_mail-ticket.php", {
        method: "POST",
        body: ticket,
    });

    if (sendTicket.ok) {
        dataLayer.push({'event': 'form_sent'});
        formReset();
    } else {
        alert("Код ошибки: " + sendTicket.status);
    }
}

async function formSubmitTicketThree() {
    const ticket = new FormData(document.forms["inf_ticket3"]);
    const sendTicket = await fetch("send_mail-ticket.php", {
        method: "POST",
        body: ticket,
    });

    if (sendTicket.ok) {
        dataLayer.push({'event': 'form_sent'});
        formReset();
    } else {
        alert("Код ошибки: " + sendTicket.status);
    }
}


function formReset() {
    // form.reset();
}
