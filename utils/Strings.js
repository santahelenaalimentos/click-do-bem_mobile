
formatName = (name) => name.split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ')

formatCPF = (cpf) => {
    let result = cpf.replace('.', '').replace('.', '').replace('-', '').substring(0) 
    return `${result.substring(0, 3)}.${result.substring(3, 6)}.${result.substring(6, 9)}-${result.substring(9, 11)}`
}

formatCurrency = (value) => {
    value = value + ''
    if(value.indexOf('.') === -1) value = value.concat('.00')
    if(value.split('.') && value.split('.')[1].length === 1) value = value.concat('0')
    let [number, decimal] = value.split('.') 
    
    return `R$${value.replace('.',',')}`
}
    


export default { formatName, formatCPF, formatCurrency }