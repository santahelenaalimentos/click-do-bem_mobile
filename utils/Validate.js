
date = (date) => {
    let err = 0;

    if (!date) err++

    let bits = date.split('/');
    let currentDate = new Date();

    if (bits[0] < 1 || bits[0] > 31 ||
        bits[1] < 1 || bits[1] > 12 ||
        bits[2] < 1900 || bits[2] > currentDate.getFullYear() ||
        date.length !== 10)
        err++

    return err === 0;
}

cpf = (cpf) => {
    let err = 0

    if(!cpf) err++
    if(cpf.length != 14) err++

    return err === 0
}

export default { date, cpf }