
export const Invited = {
  success(data: any, msg: String = ''): Object {
    return {
      success: true,
      message: msg,
      data
    }
  },
  fail(msg: String = '', failData: any = null): Object {
    return {
      success: false,
      message: msg,
      data: failData
    }
  }
}