import Cookies from 'js-cookie'

const acPerm = Cookies.get("acPerm")
const acSession = Cookies.get("acSession")

export const userId = acPerm? acPerm.split('|')[0]: acSession? acSession.split('|')[1]: null
