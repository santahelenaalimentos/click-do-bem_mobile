

assurePermission = (name) => {
    const { Permissions } = Expo
    const { status } = Permissions.getAsync(Permissions[name])
    if (!status) Permissions.askAsync(Permissions[name])
}

export default { assurePermission } 

