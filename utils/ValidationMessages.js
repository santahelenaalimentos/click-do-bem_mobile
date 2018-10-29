const DATA_NASCIMENTO_INVALID = 'A data de nascimento deve ser válida'
const CPF_INVALID = 'O CPF informado deve ser válido'
const PASS_CONFIRMATION_INVALID = 'As senhas informadas não coincidem'

printValidationMessages = (validation) => toast(validation.map(msg => `${msg}\n`))

export default { printValidationMessages, DATA_NASCIMENTO_INVALID, CPF_INVALID, PASS_CONFIRMATION_INVALID }